import React from 'react';

import { NewTable, Label, FormattedAmount, Box } from 'components';
import { MyCollateralCell } from 'features/loans/components/MyCollateralCell';
import { ActionsCell } from 'features/loans/components/ActionsCell';

import { UserDebt } from '../../../models';

export const makeTableColumns = (account: string): Array<NewTable.models.Column<UserDebt>> => [
  {
    renderTitle: () => 'Loan amount',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.body} variant="plain" />,
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
          loanRequested={x.body}
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
      render: x => (
        <Box display="inline-flex">
          <ActionsCell account={account} debt={x.rawDebt} />
        </Box>
      ),
    },
  },
];
