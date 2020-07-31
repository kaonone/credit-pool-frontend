import React, { useMemo } from 'react';
import BN from 'bn.js';

import { useApi } from 'services/api';
import { NewTable, Loading, Hint, Typography } from 'components';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import { useMyBorrowedCurrentLoansQuery } from 'generated/gql/pool';
import { MyBorrowedPendingLoansQuery } from 'generated/gql/subgraphRequests';
import { getLoanDuePaymentDate } from 'model';
import { PercentAmount, LiquidityAmount, Currency } from 'model/entities';

import { UserDebt } from '../../../models';
import { makeTableColumns } from './columns';
import { useStyles } from './CurrentLoans.style';

type Props = {
  account: string;
};

function convertDebts(
  debts: MyBorrowedPendingLoansQuery['debts'],
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

export const CurrentLoans: React.FC<Props> = props => {
  const { account } = props;
  const classes = useStyles();

  const api = useApi();

  const { result, paginationView } = useSubgraphPagination(useMyBorrowedCurrentLoansQuery, {
    address: account,
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

  const columns = useMemo(() => (account ? makeTableColumns(account) : []), [debts, account]);

  return (
    <div className={classes.root}>
      <Loading gqlResults={result} meta={[liquidityCurrencyMeta, loansConfigMeta]}>
        {!entries.length ? (
          <Hint>
            <Typography>Not found</Typography>
          </Hint>
        ) : (
          <>
            <NewTable.Component columns={columns} entries={entries} withStripes />
            {paginationView}
          </>
        )}
      </Loading>
    </div>
  );
};
