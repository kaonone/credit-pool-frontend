/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { attachStaticFields } from 'utils/object';
import { filterChildrenByComponent } from 'utils/react';

import { useStyles } from './Table.style';

interface IColumnProps {
  children?: React.ReactNode;
}

interface IHeadProps {
  className?: string;
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
  children: React.ReactNode | string;
}



interface ICellProps<T> {
  className?: string;
  align?: 'left' | 'center' | 'right';
  expander?: React.ComponentType;
  colSpan?: number;
  prop?: keyof T;
  children?: ({ index, data }: { index: number; data: T }) => React.ReactNode;
}

interface ITableProps<T> {
  className?: string;
  children?: React.ReactNode;
  data: T[];
  /** default: separated */
  variant?: 'separated' | 'compact';
  onClick?(): void;
}

type RowToExpandedState = Record<number, boolean>;


function TableComponent<T>(props: ITableProps<T>) {
  const classes = useStyles();
  const { children, data } = props;

  interface IAggregatedColumn {
    headProps?: IHeadProps;
    cellProps?: ICellProps<T>;
  }

  const [rowToExpanded, setRowToExpanded] = React.useState<RowToExpandedState>(data.reduce((acc, _, index) => ({
    ...acc,
    [index]: false,
  }), {}));

  const columns: IAggregatedColumn[] = filterChildrenByComponent<IColumnProps>(
    children,
    Column,
  ).map(column => ({
    headProps: (filterChildrenByComponent(column.props.children, Head)[0] || {}).props,
    cellProps: (filterChildrenByComponent(column.props.children, Cell)[0] || {}).props,
  }));


  const columnWithExpander: number | null = (() => {
    const index = columns.findIndex(x => x.cellProps?.expander !== undefined);
    return index === -1 ? null : index;
  })();

  const needToRenderHead = columns.some(column => column.headProps);

  return (
    <table className={classes.root}>
      {needToRenderHead && (
        <thead>
          <tr>
            {columns.map(({ headProps }, index) =>
              headProps ? (
                <td key={index} align={headProps.align}>
                  {headProps.children}
                </td>
              ) : (
                  <td key={index} />
                ),
            )}
          </tr>
        </thead>
      )}
      <tbody>
        {data.map((entry, index) => {
          if (rowToExpanded[index]) {

            if (columnWithExpander === null) {
              console.warn('unexpected columnWithExpander = null');
              return renderRow(entry, index);
            }

            const ExpandedContent = columns[columnWithExpander].cellProps?.expander;

            return (
              <>
                {renderRow(entry, index)}
                <tr key={index} >
                  <td colSpan={columns.length}>
                    {ExpandedContent && <ExpandedContent />}
                  </td>
                </tr>
              </>
            );
          }

          return renderRow(entry, index);
        }
        )}
      </tbody>
    </table >
  );


  function renderRow(entry: T, index: number) {
    return (
      <tr key={index}>
        {columns.map(({ cellProps }, cellIndex) => {
          if (cellProps) {
            const { align, expander, prop, children } = cellProps;
            if (expander) {
              const isExpanded = rowToExpanded[index];

              const handleClick = () => setRowToExpanded({ ...rowToExpanded, [index]: !isExpanded });

              return (
                <td key={cellIndex} onClick={handleClick}>
                  {isExpanded ? 'close' : 'open'}
                </td>
              );
            }
            return (
              <td key={cellIndex} align={align}>
                {prop
                  ? entry[prop]
                  : children && children({ index, data: entry })}
              </td>
            )
          }

          return (
            <td key={cellIndex} />
          );
        }
        )}
      </tr>
    );
  }
}

function Column(_props: IColumnProps) {
  return <noscript />;
}

function Head(_props: IHeadProps) {
  return <noscript />;
}

function Cell<T>(_props: ICellProps<T>) {
  return <noscript />;
}

export type MakeTableType<T> = React.FunctionComponent<ITableProps<T>> & {
  Column: React.FunctionComponent<IColumnProps>;
  Head: React.FunctionComponent<IHeadProps>;
  Cell: React.FunctionComponent<ICellProps<T>>;
};

export const Table = attachStaticFields(TableComponent, { Column, Head, Cell });
