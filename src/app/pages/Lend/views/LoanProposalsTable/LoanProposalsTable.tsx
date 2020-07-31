import React, { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import {
  NewTable,
  Label,
  Button,
  AccountAddress,
  FormattedAmount,
  Hint,
  Loading,
} from 'components';
import { makeStyles, useTheme } from 'utils/styles';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { LiquidityAmount, PercentAmount } from 'model/entities';
import { CollateralContent } from 'features/loans/containers/CollateralContent';
import { GivingStakeButton } from 'features/giveStake';
import { routes } from 'app/routes';

import { LoanProposalAdditionalInfo } from '../LoanProposalAdditionalInfo/LoanProposalAdditionalInfo';

export type LoanProposal = {
  borrower: string;
  loanRequested: LiquidityAmount;
  loanAPY: PercentAmount;
  loanDuration: string;
  lStaked: LiquidityAmount;
  descriptionHash: string;
  proposalId: string;
  isOwnProposal: boolean;
};

type Props = {
  loanProposals: LoanProposal[];
  isStakingAllowed: boolean;
};

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

const makeColumns = (
  isStakingAllowed: boolean,
  backgroundColor: string,
): Array<NewTable.models.Column<LoanProposal>> => [
  {
    renderTitle: () => 'Borrower',
    cellContent: {
      kind: 'simple',
      render: x => <AccountAddress address={x.borrower} size="small" />,
    },
  },

  {
    renderTitle: () => 'Loan requested',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.loanRequested} variant="plain" />,
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
      render: x => (
        <>
          {!x.isOwnProposal && (
            <GivingStakeButton
              variant="outlined"
              color="primary"
              size="small"
              backgroundColor={backgroundColor}
              loanSize={x.loanRequested.toString()}
              proposalId={x.proposalId}
              borrower={x.borrower}
              disabled={!isStakingAllowed}
            />
          )}
        </>
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
  const { loanProposals, isStakingAllowed } = props;
  const classes = useStyles();
  const theme = useTheme();

  const columns = useMemo(() => makeColumns(isStakingAllowed, theme.palette.background.paper), [
    isStakingAllowed,
    theme,
  ]);

  function renderTableHeader() {
    return (
      <div className={classes.tableHeader}>
        <div className={classes.tableTitle}>Loan proposals</div>
        {isStakingAllowed && (
          <Button
            component={Link}
            variant="contained"
            color="primary"
            size="small"
            to={routes.account.stakes.getRedirectPath()}
          >
            My Stakes
          </Button>
        )}
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

LoanProposalsTable.defaultProps = {
  isStakingAllowed: true,
} as Partial<Props>;

const useStyles = makeStyles(
  () => ({
    root: {},
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: 50,
      paddingLeft: 50,
      marginTop: 50,
      marginBottom: 22,
    },
    tableTitle: {
      fontWeight: 300,
      fontSize: 22,
    },
  }),
  { name: 'LoanProposalsTable' },
);
