import * as React from 'react';

import { NewTable, Label, Button, AccountAddress } from 'components';
import { DAIIcon } from 'components/icons';
import { makeStyles } from 'utils/styles';

import { Collateral } from '../Collateral/Collateral';
import { LoanProposalAdditionalInfo } from '../LoanProposalAdditionalInfo/LoanProposalAdditionalInfo';

const columns: Array<NewTable.models.Column<any>> = [
  {
    renderTitle: () => 'Borrower',
    cellContent: {
      kind: 'simple',
      render: () => (
        <>
          <div style={{ display: 'inline-flex' }}>
            <AccountAddress address="0x5d50...218b" size="small" />
          </div>
        </>
      ),
    },
  },

  {
    renderTitle: () => 'Loan requested',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <div style={{ display: 'inline-flex' }}>
          <span style={{ marginRight: 6 }}>1,900,200.00</span>
          <DAIIcon />
        </div>
      ),
    },
  },

  {
    renderTitle: () => 'Loan APY',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => '15.40%',
    },
  },

  {
    renderTitle: () => 'Loan duration',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => '7 days',
    },
  },

  {
    renderTitle: () => (
      <Label inline hint="My collateral info">
        Collateral
      </Label>
    ),
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => <Collateral userProvided={33} poolProvided={55} />,
    },
  },
  {
    renderTitle: () => null,
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <Button variant="outlined" color="primary" onClick={() => undefined}>
          Stake
        </Button>
      ),
    },
  },
  {
    renderTitle: () => null,
    align: 'right',
    cellContent: {
      kind: 'for-row-expander',
      expandedArea: {
        kind: 'single-cell',
        renderContent: () => (
          <LoanProposalAdditionalInfo reason="To make even more" riskScore="7.4" />
        ),
      },
    },
  },
];

const entries = [1, 2, 3];

export function LoanProposalsTable() {
  const classes = useStyles();

  function renderTableHeader() {
    return (
      <div className={classes.tableHeader}>
        <div className={classes.tableTitle}>Loan proposals</div>
        <Button variant="contained" color="primary" onClick={() => undefined}>
          My Stakes
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {renderTableHeader()}
      <NewTable.Component withStripes withOuterPadding columns={columns} entries={entries} />
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: 50,
      paddingLeft: 50,
      marginTop: 50,
      marginBottom: 28,
    },
    tableTitle: {
      fontWeight: 300,
      fontSize: 22,
    },
  }),
  { name: 'LoanProposalsTable' },
);
