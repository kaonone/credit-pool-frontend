import * as React from 'react';

import { NewTable, Label, DoubleLineCell, AccountAddress } from 'components';

import { DueDateCell } from './DueDateCell';
import { ActionsCell } from './ActionsCell';
import { TotalSumCell } from './TotalSumCell';
import { InterestRateCell } from './InterestRateCell';
import { Props as LoansTableProps } from './LoansTable';
import { MyCollateralCell } from './MyCollateralCell';

export const makeTableColumns = ({
  account,
  type,
}: Pick<LoansTableProps, 'account' | 'type'>): Array<NewTable.models.Column<any>> => [
  {
    renderTitle: () => 'Lend to',
    cellContent: {
      kind: 'simple',
      render: debt => <AccountAddress address={debt.borrower.id} size="small" />,
    },
  },

  {
    renderTitle: () => 'Total loan sum',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => <TotalSumCell amount={debt.total} />,
    },
  },

  {
    renderTitle: () => (
      <Label inline hint="Interest rate info">
        Interest rate
      </Label>
    ),
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => <InterestRateCell amount={debt.apr} />,
    },
  },

  {
    renderTitle: () => 'Due date',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => <DueDateCell lastUpdate={debt.last_update} />,
    },
  },

  {
    renderTitle: () => 'My APY',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        // TODO: Integrate data
        <DoubleLineCell renderTopPart={() => '4.00%'} renderBottomPart={() => '200,000.00'} />
      ),
    },
  },

  {
    renderTitle: () => (
      <Label inline hint="My collateral info">
        My collateral
      </Label>
    ),
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => <MyCollateralCell debt={debt} account={account} />,
    },
  },

  {
    renderTitle: () => <>{type === 'issued' && 'Available For Withdrawal'}</>,
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => <>{!!account && <ActionsCell debt={debt} account={account} />}</>,
    },
  },
];
