import React, { useMemo } from 'react';
import BN from 'bn.js';

import { makeStyles } from 'utils/styles';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import {
  useMyIssuedLoansQuery,
  useMyPendingLoansQuery,
  MyIssuedLoansQuery,
} from 'generated/gql/pool';
import { Loading, NewTable, Typography, Hint } from 'components';
import { useApi } from 'services/api';
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

export const MyStakes: React.FC<Props> = ({ title, filter, account }) => {
  const classes = useStyles();
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
          <Hint>
            <Typography>Not found</Typography>
          </Hint>
        ) : (
          <>
            <NewTable.Component columns={columns} entries={entries} />
            {paginationView}
          </>
        )}
      </Loading>
    </div>
  );
};

export const useStyles = makeStyles(
  () => ({
    root: {},
    tableTitle: {
      marginBottom: 20,
    },
  }),
  { name: 'MyStakes' },
);
