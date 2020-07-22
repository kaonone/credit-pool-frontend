import React from 'react';

import { NewTable, Label } from 'components';

import { DoubleLineCell } from '../../../../private/DoubleLineCell';
import * as views from './views';
import { useStyles } from './PendingLoans.style';

const columns: Array<NewTable.models.Column<any>> = [
  {
    renderTitle: () => 'Loan amount',
    cellContent: {
      kind: 'simple',
      render: () => '100,000.00',
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
      render: () => '15.00%',
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
      render: () => (
        <DoubleLineCell renderTopPart={() => '50,000.00'} renderBottomPart={() => '50.00%'} />
      ),
    },
  },

  {
    renderTitle: () => null,
    align: 'center',
    cellContent: {
      kind: 'simple',
      render: () => <views.Buttons />,
    },
  },
];

const entries = [1];

export const PendingLoans: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NewTable.Component columns={columns} entries={entries} />
    </div>
  );
};
