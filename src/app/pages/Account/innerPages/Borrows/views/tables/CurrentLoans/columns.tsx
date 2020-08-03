import React from 'react';

import { NewTable, Label, FormattedAmount, Box } from 'components';
import { DueDateCell } from 'features/loans/components/DueDateCell';
import { ActionsCell } from 'features/loans/components/ActionsCell';
import { MyCollateralCell } from 'features/loans/components/MyCollateralCell';

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
    renderTitle: () => 'Due date',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <DueDateCell dueDate={x.dueDate} />,
    },
  },

  // TODO implement
  // {
  //   renderTitle: () => 'Due payment',
  //   align: 'right',
  //   cellContent: {
  //     kind: 'simple',
  //     render: x => x.dueDate,
  //   },
  // },

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
        <Box display="inline-flex" minWidth={210} justifyContent="flex-end">
          <ActionsCell account={account} debt={x.rawDebt} />
        </Box>
      ),
    },
  },
];
