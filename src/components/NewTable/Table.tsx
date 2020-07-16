/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { useStyles } from './Table.style';
import * as c from './components';
import * as M from './models';

type Props<T, U> = {
  entries: T[];
  columns: Array<M.Column<T, U>>;
}

type RowToExpandedState = Record<number, boolean>;

export function Table<T, U = null>(props: Props<T, U>) {
  const classes = useStyles();

  const { columns, entries } = props;

  const [rowToExpanded, setRowToExpanded] = React.useState<RowToExpandedState>(entries.reduce((acc, _, index) => ({
    ...acc,
    [index]: false,
  }), {}));


  const expandedArea: M.ExpandedArea<T, U> | null = (() => {
    const contentWithRowExpander = columns
      .find(x => x.cellContent.kind === 'for-row-expander')?.cellContent as M.CellContentForRowExpander<T, U> | undefined

    return contentWithRowExpander?.expandedArea || null;
  })();

  return (
    <table className={classes.root}>
      <thead>
        <tr>
          {columns.map(renderTitle)}
        </tr>
      </thead>
      <tbody>
        {entries.map(renderEntry)}
      </tbody>
    </table>
  )

  function renderTitle(column: M.Column<T, U>) {
    return (
      <th>
        {column.renderTitle()}
      </th>
    )
  }

  function renderEntry(entry: T, rowIndex: number) {
    if (expandedArea === null) {
      return renderPrimaryEntryRow(entry, rowIndex);
    }

    return (
      <>
        {renderPrimaryEntryRow(entry, rowIndex)}
        {rowToExpanded[rowIndex] && renderExpandedArea(entry, expandedArea)}
      </>
    )
  }

  function renderExpandedArea(entry: T, area: M.ExpandedArea<T, U>) {
    switch (area.kind) {
      case 'single-cell':
        return renderAreaWithingSingleCell(entry, area);
      case 'subtable':
        return renderAreaWithinSubtable(entry, area);
    }
  }

  function renderAreaWithingSingleCell(entry: T, area: M.ExpandedAreaWithinSingleCell<T>) {
    return (
      <td colSpan={columns.length}>
        {area.renderContent(entry)}
      </td>
    )
  }

  function renderAreaWithinSubtable(_: T, __: M.ExpandedAreaWithinSubtable<T, U>) {
    return null;
  }

  function renderPrimaryEntryRow(entry: T, rowIndex: number) {
    return (
      <tr>
        {columns.map(makeCellRenderer(entry, rowIndex))}
      </tr>
    );
  }


  function makeCellRenderer(entry: T, rowIndex: number) {
    return (column: M.Column<T, U>) => {
      switch (column.cellContent.kind) {
        case 'simple':
          return renderCellWithSimpleContent(entry, column.cellContent);

        case 'for-row-expander':
          return renderCellWithContentForRowExpander(rowIndex);
      }

    }
  }

  function renderCellWithSimpleContent(entry: T, content: M.SimpleCellContent<T>) {
    return (
      <td>
        {content.render(entry)}
      </td>
    );
  }

  function renderCellWithContentForRowExpander(rowIndex: number) {
    const handleToggle = (newValue: boolean) => setRowToExpanded({ ...rowToExpanded, [rowIndex]: newValue });

    return (
      <td>
        <c.RowExpander expanded={rowToExpanded[rowIndex]} onToggle={handleToggle} />
      </td>
    );
  }
}
