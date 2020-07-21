import React, { useCallback } from 'react';

import { NewTable, Label, ConfirmationDialog } from 'components';

import { DoubleLineCell } from '../../DoubleLineCell';
import * as views from './views';
import { useStyles } from './IssuedLoans.style';

function getColumns(handleToggleIsOpen: () => void): Array<NewTable.models.Column<any>> {
  return [
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
              <views.WithdrawButton onClick={handleToggleIsOpen} />
            </div>
          </div>
        ),
      },
    },
  ];
}

const entries = [1, 2];

export const IssuedLoans: React.FC = () => {
  const classes = useStyles();

  const [isOpened, setIsOpened] = React.useState(false);
  const toggleIsOpened = React.useCallback(() => setIsOpened(!isOpened), [isOpened]);
  const handleConfirmationClick = useCallback(async () => {}, []);

  return (
    <div className={classes.root}>
      <NewTable.Component columns={getColumns(toggleIsOpened)} entries={entries} />
      <ConfirmationDialog
        isOpen={isOpened}
        message="You’re about to liquidate an outstanding loan with repayment due 02.12.2020. Liquidate?"
        noText="Cancel"
        yesText="Liquidate"
        title="Confirm Liquidation"
        onConfirm={handleConfirmationClick}
        onCancel={toggleIsOpened}
      />
    </div>
  );
};
