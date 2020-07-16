import * as React from 'react';

import { MyLoans } from 'features/loans';
import { WithAccount } from 'app/components/WithAccount/WithAccount';
import { NewTable } from 'components';

type Order = {
  date: string;
  kind: 'sell' | 'buy';
  values: number[];
}

const entries: Order[] = [
  { date: '2012-01-02', kind: 'buy', values: [1.13] },
  { date: '2013-02-04', kind: 'buy', values: [21.1] },
  { date: '2015-03-01', kind: 'sell', values: [5.52, 1, 2] },
]

export function MyLoansPage() {
  const columns: Array<NewTable.models.Column<Order>> = [
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
              <div>left</div>
              <div>right</div>
            </div>
          ),
        },
      },
    },
  ]


  const columnsWithSubtable: Array<NewTable.models.Column<Order, number>> = [
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
  ]

  return (
    <>
      <WithAccount>{({ account }) => <MyLoans account={account} />}</WithAccount>
      <NewTable.Component columns={columnsWithSubtable} entries={entries} />

      <div style={{ marginTop: '30px' }}>
        <NewTable.Component columns={columns} entries={entries} />
      </div>
    </>
  )

}
