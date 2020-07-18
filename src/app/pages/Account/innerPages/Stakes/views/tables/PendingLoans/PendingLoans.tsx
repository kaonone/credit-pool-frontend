import React from 'react';
import { NewTable } from 'components';

import { DoubleLineCell } from '../../DoubleLineCell'
import { LabelWithInfoTooltip } from '../../LabelWithInfoTooltip'
import * as views from './views';
import { useStyles } from './PendingLoans.style';

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
        <DoubleLineCell
          renderTopPart={() => '5 days'}
          renderBottomPart={() => '07/22/2020'}
        />
      ),
    },
  },

  {
    renderTitle: () => 'My APY',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <DoubleLineCell
          renderTopPart={() => '5 days'}
          renderBottomPart={() => '07/22/2020'}
        />
      ),
    },
  },

  {
    renderTitle: () => <LabelWithInfoTooltip renderLabel={() => 'My collateral'} tooltipText="My collateral info" />,
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <DoubleLineCell
          renderTopPart={() => '5 days'}
          renderBottomPart={() => <LabelWithInfoTooltip renderLabel={() => '50%'} tooltipText="50% info" />}
        />
      ),
    },
  },

  {
    renderTitle: () => 'Available For Withdrawal',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => <views.UnstakeButton />,
    },
  },
]

const entries = [1];

export const PendingLoans: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NewTable.Component
        columns={columns}
        entries={entries}
      />
    </div>
  );
};
