import * as React from 'react';

import { MyLoans } from 'features/loans';
import { WithAccount } from 'app/components/WithAccount/WithAccount';
import { Table } from 'components';

type Order = {
  date: string;
  kind: 'sell' | 'buy';
  value: number;
}

const entries: Order[] = [
  { date: '2012-01-02', kind: 'buy', value: 1.13 },
  { date: '2013-02-04', kind: 'buy', value: 21.1 },
  { date: '2015-03-01', kind: 'sell', value: 5.52 },
]

export function MyLoansPage() {
  const columns: Array<Table.models.Column<Order>> = [
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
          renderContent: () => 'privet',
        }
      },
    },

  ]

  return (
    <>
      <WithAccount>{({ account }) => <MyLoans account={account} />}</WithAccount>
      <Table.Component columns={columns} entries={entries} />
    </>
  )

}
