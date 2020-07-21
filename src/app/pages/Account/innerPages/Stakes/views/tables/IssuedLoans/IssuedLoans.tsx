import React from 'react';

import { NewTable, Label } from 'components';

import { DoubleLineCell } from '../../DoubleLineCell';
import * as views from './views';
import { useStyles } from './IssuedLoans.style';

const columns: Array<NewTable.models.Column<any>> = [
  {
    renderTitle: () => 'Lend to',
    cellContent: {
      kind: 'simple',
      render: () => '0x5d50...218b',
    },
  },

  {
    renderTitle: () => 'Total loan sum',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => '1,900,200.00',
    },
  },

  {
    renderTitle: () => 'Interest rate',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => '10.00%',
    },
  },

  {
    renderTitle: () => 'Due date',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <DoubleLineCell renderTopPart={() => '5 days'} renderBottomPart={() => '07/22/2020'} />
      ),
    },
  },

  {
    renderTitle: () => 'My APY',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <DoubleLineCell renderTopPart={() => '5 days'} renderBottomPart={() => '07/22/2020'} />
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
      render: () => (
        <DoubleLineCell
          renderTopPart={() => '5 days'}
          renderBottomPart={() => (
            <Label inline hint="50% info">
              50%
            </Label>
          )}
        />
      ),
    },
  },

  {
    renderTitle: () => 'Available For Withdrawal',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <div>
          <div>1,100.00</div>
          <div style={{ marginTop: 10 }}>
            <views.WithdrawButton />
          </div>
        </div>
      ),
    },
  },
];

const entries = [1, 2];

export const IssuedLoans: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NewTable.Component columns={columns} entries={entries} />
    </div>
  );
};
