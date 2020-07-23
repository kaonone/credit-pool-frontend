import * as React from 'react';
import BN from 'bn.js';
import Typography from '@material-ui/core/Typography';

import {
  NewTable,
  Label,
  Button,
  AccountAddress,
  FormattedAmount,
  Hint,
  Loading,
} from 'components';
import { makeStyles } from 'utils/styles';
import { useApi } from 'services/api';
import { LiquidityAmount, PercentAmount } from 'model/entities';
import { useSubscribable } from 'utils/react';
import { calcCollateral } from 'domainLogic';

import { CollateralDistributionBar } from '../CollateralDistributionBar/CollateralDistributionBar';
import { LoanProposalAdditionalInfo } from '../LoanProposalAdditionalInfo/LoanProposalAdditionalInfo';

export type LoanProposal = {
  borrower: string;
  loanRequested: LiquidityAmount;
  loanAPY: PercentAmount;
  loanDuration: string;
  lStaked: string;
  descriptionHash: string;
};

type Props = {
  loanProposals: LoanProposal[];
};

function LoanRequested(props: Pick<LoanProposal, 'loanRequested'>) {
  const { loanRequested } = props;
  return <FormattedAmount sum={loanRequested} />;
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
  const { userProvided, poolProvided } = useCollateral(loanRequested.toString(), lStaked);
  return <CollateralDistributionBar userProvided={userProvided} poolProvided={poolProvided} />;
}

function AdditionalInfoContent(props: Pick<LoanProposal, 'descriptionHash'>) {
  const { descriptionHash } = props;
  const api = useApi();
  const [description, descriptionMeta] = useSubscribable(
    () => api.swarmApi.read<string>(descriptionHash),
    [descriptionHash],
  );

  return (
    <Loading meta={descriptionMeta}>
      <LoanProposalAdditionalInfo reason={description as string} riskScore={null} />
    </Loading>
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
      render: x => <>{x.loanAPY.div(10).toFormattedString()}</>, // TODO: use value from the api after combining api & subgraph
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
        renderContent: x => <AdditionalInfoContent descriptionHash={x.descriptionHash} />,
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
      {!loanProposals.length ? (
        <Hint>
          <Typography>No data</Typography>
        </Hint>
      ) : (
        <NewTable.Component
          withStripes
          withOuterPadding
          columns={columns}
          entries={loanProposals}
        />
      )}
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
