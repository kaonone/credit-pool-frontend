import React from 'react';

import { NewTable, Label, DoubleLineCell, FormattedAmount } from 'components';
import { DueDateCell } from 'features/loans/components/DueDateCell';
import { ActionsCell } from 'features/loans/components/ActionsCell';

import { UserDebt } from '../../../models'

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
      render: () => (
        <DoubleLineCell renderTopPart={() => '50,000.00'} renderBottomPart={() => '50.00%'} />
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
