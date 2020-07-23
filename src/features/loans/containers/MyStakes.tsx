import React, { useMemo } from 'react';
import BN from 'bn.js';

import { makeStyles } from 'utils/styles';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import {
  useMyIssuedLoansQuery,
  useMyPendingLoansQuery,
  MyIssuedLoansQuery,
} from 'generated/gql/pool';
import { Loading, NewTable } from 'components';
import { useApi } from 'services/api';
import { getLoanDuePaymentDate } from 'model';
import { Currency, LiquidityAmount, PercentAmount } from 'model/entities';

import { makeTableColumns, UserDebt } from '../components/makeTableColumns';

type Props = {
  title: string;
  filter: 'issued' | 'pending';
};

function convertDebts(
  debts: MyIssuedLoansQuery['debts'],
  liquidityCurrency: Currency,
  repayDeadlinePeriod: BN,
): UserDebt[] {
  return debts.map<UserDebt>(debt => ({
    total: new LiquidityAmount(debt.total, liquidityCurrency),
    borrower: debt.borrower.id,
    apr: new PercentAmount(debt.apr).div(10),
    dueDate: getLoanDuePaymentDate(debt.last_update, repayDeadlinePeriod),
    rawDebt: debt,
  }));
}

export const MyStakes: React.FC<Props> = ({ title, filter }) => {
  const classes = useStyles();
  const api = useApi();

  const [account] = useSubscribable(() => api.web3Manager.account, []);

  const useQuery = filter === 'issued' ? useMyIssuedLoansQuery : useMyPendingLoansQuery;
  const { result } = useSubgraphPagination(useQuery, {
    supporters: [account?.toLowerCase() || ''],
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
  const columns = useMemo(() => (account ? makeTableColumns(account!, filter) : []), [
    account,
    filter,
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.tableTitle}>{title}</div>
      <Loading
        gqlResults={result}
        progressVariant="circle"
        meta={[liquidityCurrencyMeta, loansConfigMeta]}
      >
        <NewTable.Component columns={columns} entries={entries} />
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
