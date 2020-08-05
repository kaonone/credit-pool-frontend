import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BN from 'bn.js';

import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import {
  useMyIssuedLoansQuery,
  useMyPendingLoansQuery,
  MyIssuedLoansQuery,
} from 'generated/gql/pool';
import { ChillCat } from 'components/icons';
import { Loading, NewTable, Hint, Typography, Button } from 'components';
import { useApi } from 'services/api';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { getLoanDuePaymentDate } from 'model';
import { Currency, LiquidityAmount, PercentAmount } from 'model/entities';

import { makeTableColumns, UserDebt } from '../components/makeTableColumns';

type Props = {
  title: string;
  filter: 'issued' | 'pending';
  account: string;
};

function convertDebts(
  debts: MyIssuedLoansQuery['debts'],
  liquidityCurrency: Currency,
  repayDeadlinePeriod: BN,
): UserDebt[] {
  return debts.map<UserDebt>(debt => ({
    borrower: debt.borrower.id,
    body: new LiquidityAmount(debt.total, liquidityCurrency).sub(debt.repayed),
    lStaked: new LiquidityAmount(debt.lStaked, liquidityCurrency),
    apr: new PercentAmount(debt.apr).div(10),
    dueDate: getLoanDuePaymentDate(debt.last_update, repayDeadlinePeriod),
    rawDebt: debt,
  }));
}

const tKeys = tKeysAll.features.loans.myStakes;

export const MyStakes: React.FC<Props> = ({ title, filter, account }) => {
  const classes = useStyles();
  const { t } = useTranslate();
  const api = useApi();

  const useQuery = useMemo(
    () => (filter === 'issued' ? useMyIssuedLoansQuery : useMyPendingLoansQuery),
    [filter],
  );

  const { result, paginationView } = useSubgraphPagination(useQuery, {
    supporters: [account.toLowerCase() || ''],
  });
  const debts = result.data?.debts || [];

  const [liquidityCurrency, liquidityCurrencyMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [],
  );

  const [loansConfig, loansConfigMeta] = useSubscribable(() => api.loanModule.getConfig$(), []);
  const repayDeadlinePeriod = loansConfig?.debtRepayDeadlinePeriod;

  const entries = useMemo(
    () =>
      liquidityCurrency && repayDeadlinePeriod
        ? convertDebts(debts, liquidityCurrency, repayDeadlinePeriod)
        : [],
    [debts, liquidityCurrency, repayDeadlinePeriod],
  );
  const columns = useMemo(() => (account ? makeTableColumns(account, filter) : []), [
    debts,
    account,
    filter,
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.tableTitle}>{title}</div>
      <Loading gqlResults={result} meta={[liquidityCurrencyMeta, loansConfigMeta]}>
        {!entries.length ? (
          renderEmptyResultMessage(filter)
        ) : (
          <>
            <NewTable.Component columns={columns} entries={entries} withStripes />
            {paginationView}
          </>
        )}
      </Loading>
    </div>
  );

  function renderEmptyResultMessage(loanType: 'issued' | 'pending') {
    return loanType === 'issued' ? (
      <Hint>
        <div className={classes.issuedLoan}>
          <div className={classes.iconContainer}>{renderCatIcon()}</div>
          <Typography align="left">{t(tKeys.noOutstandingLoans.getKey())}</Typography>
        </div>
      </Hint>
    ) : (
      <Hint renderButton={renderLendButton}>
        <Typography>{t(tKeys.noPendingLoans.getKey())}</Typography>
      </Hint>
    );
  }

  function renderCatIcon() {
    return <ChillCat className={classes.catIcon} />;
  }

  function renderLendButton() {
    return (
      <Button
        component={Link}
        variant="contained"
        color="primary"
        size="small"
        to={routes.lend.getRedirectPath()}
      >
        {t(tKeys.lendButton.getKey())}
      </Button>
    );
  }
};

export const useStyles = makeStyles(
  () => ({
    root: {},
    tableTitle: {
      marginBottom: 30,
    },
    catIcon: {
      fontSize: 180,
      maxHeight: 146,
    },
    issuedLoan: {
      backgroundColor: '#171722',
      position: 'relative',
      padding: '10px 0 10px 210px',
      minHeight: 70,
    },
    iconContainer: {
      position: 'absolute',
      left: 0,
      top: -25,
    },
  }),
  { name: 'MyStakes' },
);
