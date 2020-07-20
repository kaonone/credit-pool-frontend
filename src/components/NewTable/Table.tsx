/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import * as R from 'ramda';
import cn from 'classnames';

import { useStyles } from './Table.style';
import * as views from './components';
import * as M from './models';

type Props<T, U> = {
  entries: T[];
  columns: Array<M.Column<T, U>>;
  withStripes?: boolean;
  withOuterPadding?: boolean;
  summary?: M.Summary;
};

type RowToExpandedState = Record<number, boolean>;

export function Table<T, U = null>(props: Props<T, U>) {
  const classes = useStyles();

  const alignPropertyToClass: Record<M.AlignProperty, string> = {
    center: classes.cellAlignCenter,
    left: classes.cellAlignLeft,
    right: classes.cellAlignRight,
  };

  const { columns, entries, summary, withStripes, withOuterPadding } = props;

  const [rowToExpanded, setRowToExpanded] = React.useState<RowToExpandedState>(() =>
    entries.reduce(
      (acc, _, index) => ({
        ...acc,
        [index]: false,
      }),
      {},
    ),
  );

  const expandedArea: M.ExpandedArea<T, U> | null = (() => {
    const contentWithRowExpander = columns.find(x => x.cellContent.kind === 'for-row-expander')
      ?.cellContent as M.CellContentForRowExpander<T, U> | undefined;

    return contentWithRowExpander?.expandedArea || null;
  })();

  return (
    <table
      className={cn([
        classes.root,
        {
          [classes.withStripes]: withStripes,
          [classes.withOuterPadding]: withOuterPadding,
        },
      ])}
    >
      <thead>
        <tr>{columns.map(renderTitle)}</tr>
      </thead>
      <tbody>{renderEntriesAndSummary()}</tbody>
    </table>
  );

  function renderEntriesAndSummary() {
    if (summary) {
      return (
        <>
          {entries.map((x, index) => renderEntry(x, index, index === entries.length - 1))}
          {renderSummary(summary)}
        </>
      );
    }

    return entries.map((x, index) => renderEntry(x, index));
  }

  function renderSummary(x: M.Summary) {
    return (
      <tr key="summary">
        <td colSpan={columns.length} className={cn(classes.cell, classes.summaryCell)}>
          <views.Summary summary={x} />
        </td>
      </tr>
    );
  }

  function getAlignClass({ align }: M.Column<T, U>) {
    return align && alignPropertyToClass[align];
  }

  function renderTitle(column: M.Column<T, U>, columnIndex: number) {
    return (
      <th
        className={cn(classes.title, classes.cell, classes.topLevelTitle, getAlignClass(column))}
        key={columnIndex}
      >
        {column.renderTitle()}
      </th>
    );
  }

  function renderEntry(entry: T, rowIndex: number, beforeSummary?: boolean) {
    if (expandedArea === null) {
      return renderEntryRow(entry, rowIndex, beforeSummary);
    }

    return (
      <React.Fragment key={rowIndex}>
        {renderEntryRow(entry, rowIndex, beforeSummary)}
        {rowToExpanded[rowIndex] && renderEntryExpandedArea(entry, expandedArea)}
      </React.Fragment>
    );
  }

  function renderEntryExpandedArea(entry: T, area: M.ExpandedArea<T, U>) {
    switch (area.kind) {
      case 'single-cell':
        return renderAreaWithingSingleCell(entry, area);
      case 'subtable':
        return renderAreaWithinSubtable(entry, area);
    }
  }

  function renderAreaWithingSingleCell(entry: T, area: M.ExpandedAreaWithinSingleCell<T>) {
    return (
      <tr>
        <td
          className={cn(classes.singleCellExpandedArea, classes.cellData, classes.cell)}
          colSpan={columns.length}
        >
          {area.renderContent(entry)}
        </td>
      </tr>
    );
  }

  function renderAreaWithinSubtable(entry: T, area: M.ExpandedAreaWithinSubtable<T, U>) {
    const subtableEntries = area.getSubtableEntries(entry);

    const adjustedSubtableColumns = (() => {
      const subtableCols = area.subtableColumns;

      const subtableColsNumber = area.subtableColumns.length;
      const tableColsNumber = columns.length;

      if (subtableColsNumber < tableColsNumber) {
        const colsToAdd = R.repeat<M.SubtableColumn<U>>(
          {
            renderCell: () => null,
            renderTitle: () => null,
          },
          tableColsNumber - subtableColsNumber,
        );

        return subtableCols.concat(colsToAdd);
      }

      if (subtableColsNumber > tableColsNumber) {
        console.warn('unexpeced subtable columns number > table columns number');

        return subtableCols.slice(0, subtableColsNumber);
      }

      return subtableCols;
    })();

    return (
      <>
        <tr key="subtable-header" className={classes.subtableRow}>
          {adjustedSubtableColumns.map(renderSubtableHeader)}
        </tr>
        {subtableEntries.map((x, index) =>
          renderSubtableEntry(
            adjustedSubtableColumns,
            x,
            index,
            index === subtableEntries.length - 1,
          ),
        )}
      </>
    );
  }

  function renderSubtableHeader(x: M.SubtableColumn<U>, columnIndex: number) {
    return (
      <th className={cn(classes.title, classes.cell)} key={columnIndex}>
        {x.renderTitle()}
      </th>
    );
  }

  function renderSubtableEntry(
    subtableColumns: Array<M.SubtableColumn<U>>,
    subtableEntry: U,
    subtableRowIndex: number,
    last: boolean,
  ) {
    return (
      <tr
        className={cn([classes.subtableRow, { [classes.lastSubtableRow]: last }])}
        key={subtableRowIndex}
      >
        {subtableColumns.map(makeSubtableCellRenderer(subtableEntry))}
      </tr>
    );
  }

  function makeSubtableCellRenderer(entry: U) {
    return (column: M.SubtableColumn<U>, columnIndex: number) => {
      return (
        <td className={cn(classes.cell, classes.cellData)} key={columnIndex}>
          <div>{column.renderCell(entry)}</div>
        </td>
      );
    };
  }

  function renderEntryRow(entry: T, rowIndex: number, beforeSummary?: boolean) {
    return (
      <tr className={cn({ [classes.rowBeforeSummary]: beforeSummary })}>
        {columns.map(makeCellRenderer(entry, rowIndex))}
      </tr>
    );
  }

  function makeCellRenderer(entry: T, rowIndex: number) {
    return (column: M.Column<T, U>, columnIndex: number) => {
      switch (column.cellContent.kind) {
        case 'simple':
          return renderCellWithSimpleContent(entry, column.cellContent, columnIndex, column);

        case 'for-row-expander':
          return renderCellWithContentForRowExpander(rowIndex, column);
      }
    };
  }

  function renderCellWithSimpleContent(
    entry: T,
    content: M.SimpleCellContent<T>,
    columnIndex: number,
    column: M.Column<T, U>,
  ) {
    return (
      <td className={cn(classes.cell, classes.cellData, getAlignClass(column))} key={columnIndex}>
        {content.render(entry)}
      </td>
    );
  }

  function renderCellWithContentForRowExpander(rowIndex: number, column: M.Column<T, U>) {
    const handleToggle = (newValue: boolean) =>
      setRowToExpanded({ ...rowToExpanded, [rowIndex]: newValue });

    return (
      <td className={cn(classes.cell, classes.cellData, getAlignClass(column))} key="row-expander">
        <views.RowExpander expanded={rowToExpanded[rowIndex]} onToggle={handleToggle} />
      </td>
    );
  }
}
