import * as React from 'react';
import BN from 'bn.js';

import { NewTable, Label, Button, AccountAddress } from 'components';
import { DAIIcon } from 'components/icons';
import { makeStyles } from 'utils/styles';
import { useApi } from 'services/api';
import { LiquidityAmount, PercentAmount } from 'model/entities';
import { useSubscribable } from 'utils/react';
import { calcCollateral } from 'domainLogic';

import { Collateral } from '../Collateral/Collateral';
import { LoanProposalAdditionalInfo } from '../LoanProposalAdditionalInfo/LoanProposalAdditionalInfo';

export type LoanProposal = {
  borrower: string;
  loanRequested: string;
  loanAPY: string;
  loanDuration: string;
  lStaked: string;
};

type Props = {
  loanProposals: LoanProposal[];
};

function LoanRequested(props: Pick<LoanProposal, 'loanRequested'>) {
  const { loanRequested } = props;
  const api = useApi();

  const [liquidityCurrency] = useSubscribable(() => api.fundsModule.getLiquidityCurrency$(), [api]);

  return (
    <div style={{ display: 'inline-flex' }}>
      <span style={{ marginRight: 6 }}>
        {liquidityCurrency
          ? new LiquidityAmount(loanRequested, liquidityCurrency).toFormattedString()
          : '⏳'}
      </span>
      <DAIIcon />
    </div>
  );
}

function useCollateral(loanRequested: string, lStaked: string) {
  const api = useApi();

  const [fullLoanStake] = useSubscribable(
    () => api.loanModule.calculateFullLoanStake$(loanRequested),
    [loanRequested],
  );

  const lBorrowerStake = fullLoanStake?.divn(3); // TODO: add this value in subgraph to be able to calc collateral

  return {
    poolProvided: new PercentAmount(calcCollateral(fullLoanStake, lStaked)).toNumber(),
    userProvided:
      lBorrowerStake && fullLoanStake
        ? lBorrowerStake.div(fullLoanStake).mul(new BN(100)).toNumber()
        : 0,
  };
}

function CollateralContent(props: Pick<LoanProposal, 'loanRequested' | 'lStaked'>) {
  const { loanRequested, lStaked } = props;
  const { userProvided, poolProvided } = useCollateral(loanRequested, lStaked);
  return (
    <Collateral
      userProvided={userProvided} // FIXME: rename Collateral -> CollateralDistributionBar
      poolProvided={poolProvided}
    />
  );
}

const columns: Array<NewTable.models.Column<LoanProposal>> = [
  {
    renderTitle: () => 'Borrower',
    cellContent: {
      kind: 'simple',
      render: x => (
        <>
          <div style={{ display: 'inline-flex' }}>
            <AccountAddress address={x.borrower} size="small" />
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
      render: x => <LoanRequested loanRequested={x.loanRequested} />,
    },
  },

  {
    renderTitle: () => 'Loan APY',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <>{new PercentAmount(x.loanAPY).div(10).toFormattedString()}</>, // TODO: use value from the api after combining api & subgraph
    },
  },

  {
    renderTitle: () => 'Loan duration',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <>{x.loanDuration}</>,
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
      render: x => <CollateralContent lStaked={x.lStaked} loanRequested={x.loanRequested} />,
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

export function LoanProposalsTable(props: Props) {
  const { loanProposals } = props;
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
      <NewTable.Component withStripes withOuterPadding columns={columns} entries={loanProposals} />
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
