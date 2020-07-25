import React from 'react';

import { NewTable, Label, FormattedAmount } from 'components';
import { MyCollateralCell } from 'features/loans/components/MyCollateralCell';

import { UserDebt } from './models'
import { ActionsCell } from 'features/loans/components/ActionsCell';

export const makeTableColumns = (account: string): Array<NewTable.models.Column<UserDebt>> => ([
  {
    renderTitle: () => 'Loan amount',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.total} variant="plain" />,
    },
  },

  {
    renderTitle: () => (
      <Label inline hint="hint">
        Interest rate
      </Label>
    ),
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.apr} variant="plain" />,
    },
  },

  {
    renderTitle: () => 'Loan Term',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => '90 days',
    },
  },

  {
    renderTitle: () => (
      <Label inline hint="hint">
        My Collateral
      </Label>
    ),
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => (
        <MyCollateralCell
          debt={x.rawDebt}
          account={account}
          loanRequested={x.total}
          lStaked={x.lStaked}
        />
      ),
    },
  },

  {
    renderTitle: () => null,
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <ActionsCell account={account} debt={x.rawDebt} />,
    },
  },
]);
