import React from 'react';

import { NewTable, Label } from 'components';

import { DoubleLineCell } from '../../../../private/DoubleLineCell';
import * as views from './views';
import { useStyles } from './CurrentLoans.style';

const columns: Array<NewTable.models.Column<any>> = [
  {
    renderTitle: () => 'Loan amount',
    cellContent: {
      kind: 'simple',
      render: () => '22,900,500.00',
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
      render: () => '100%',
    },
  },

  {
    renderTitle: () => 'Due date',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <DoubleLineCell renderTopPart={() => '10 days'} renderBottomPart={() => '07/22/2020'} />
      ),
    },
  },

  {
    renderTitle: () => 'Due payment',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => '12,000,250.00',
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
      render: () => <views.RepayButton />,
    },
  },
];

const entries = [1];

export const CurrentLoans: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NewTable.Component columns={columns} entries={entries} />
    </div>
  );
};
