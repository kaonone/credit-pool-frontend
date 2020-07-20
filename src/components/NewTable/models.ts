import * as React from 'react';

export type AlignProperty = 'left' | 'right' | 'center';

export type Column<T, U = null> = {
  cellContent: CellContent<T, U>;
  align?: AlignProperty;
  renderTitle(): React.ReactNode;
};

export type CellContent<T, U> = SimpleCellContent<T> | CellContentForRowExpander<T, U>;

export type SimpleCellContent<T> = {
  kind: 'simple';
  render(entry: T): React.ReactNode;
};

export type CellContentForRowExpander<T, U> = {
  kind: 'for-row-expander';
  expandedArea: ExpandedArea<T, U>;
};

export type ExpandedArea<T, U> = ExpandedAreaWithinSingleCell<T> | ExpandedAreaWithinSubtable<T, U>;

export type ExpandedAreaWithinSingleCell<T> = {
  kind: 'single-cell';
  renderContent(entry: T): React.ReactNode;
};

export type ExpandedAreaWithinSubtable<T, U> = {
  kind: 'subtable';
  getSubtableEntries(entry: T): U[];
  subtableColumns: Array<SubtableColumn<U>>;
};

export type SubtableColumn<T> = {
  renderTitle(): React.ReactNode;
  renderCell(subtableEntry: T): React.ReactNode;
};

export type Summary = {
  renderLabel(): React.ReactNode;
  renderValue(): React.ReactNode;
};
