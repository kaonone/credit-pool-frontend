import * as React from 'react';

import { NewTable } from 'components';

type Order = {
  date: string;
  kind: 'sell' | 'buy';
  values: number[];
};

export const entries: Order[] = [
  { date: '2012-01-02', kind: 'buy', values: [1.13] },
  { date: '2013-02-04', kind: 'buy', values: [21.1] },
  { date: '2015-03-01', kind: 'sell', values: [5.52, 1, 2] },
];

export const columnsWithoutExpandableRows: Array<NewTable.models.Column<Order>> = [
  {
    renderTitle: () => 'Date',
    cellContent: {
      kind: 'simple',
      render: x => x.date,
    },
  },

  {
    renderTitle: () => 'Kind',
    cellContent: {
      kind: 'simple',
      render: x => x.kind,
    },
  },

  {
    renderTitle: () => null,
    cellContent: {
      kind: 'simple',
      render: x => x.values[0],
    },
  },
];

export const columns: Array<NewTable.models.Column<Order>> = [
  {
    renderTitle: () => 'Date',
    cellContent: {
      kind: 'simple',
      render: x => x.date,
    },
  },

  {
    renderTitle: () => 'Kind',
    cellContent: {
      kind: 'simple',
      render: x => x.kind,
    },
  },

  {
    renderTitle: () => null,
    cellContent: {
      kind: 'for-row-expander',
      expandedArea: {
        kind: 'single-cell',
        renderContent: () => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>left </div>
            <div>right</div>
          </div>
        ),
      },
    },
  },
];

export const columnsWithSubtable: Array<NewTable.models.Column<Order, number>> = [
  {
    renderTitle: () => 'Date',
    cellContent: {
      kind: 'simple',
      render: x => x.date,
    },
  },

  {
    renderTitle: () => 'Kind',
    cellContent: {
      kind: 'simple',
      render: x => x.kind,
    },
  },

  {
    renderTitle: () => null,
    cellContent: {
      kind: 'for-row-expander',
      expandedArea: {
        kind: 'subtable',
        getSubtableEntries: x => x.values,
        subtableColumns: [
          {
            renderTitle: () => 'num',
            renderCell: x => x,
          },

          {
            renderTitle: () => 'const',
            renderCell: () => 'hm',
          },
        ],
      },
    },
  },
];
