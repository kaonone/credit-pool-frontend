import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useSubgraphPagination } from 'utils/react';
import { Loading, Hint, Grid } from 'components';
import { useDebtsQuery, useMyLoansQuery } from 'generated/gql/pool';

import { LoansPanel, ILoan } from '../LoansPanel/LoansPanel';
import { LoansTitle } from '../LoansTitle/LoansTitle';

function LoansList() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansList;
  const tKeysApp = tKeysAll.app;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const { result: myLoansResult, paginationView: myLoansPaginationView } = useSubgraphPagination(
    useMyLoansQuery,
    {
      currentAddress: account || '',
    },
  );

  const loansData = myLoansResult.data?.debts;

  const loans: ILoan[] = React.useMemo(
    () =>
      loansData?.map(debt => ({
        loan: debt.total,
        duePayment: '3000000000000000',
        borrowApr: Number(debt.apr),
        status: debt.status,
        myStake: debt.staked,
        paymentDate: new Date(),
      })) || [],
    [loansData],
  );

  const {
    result: myGuaranteesResult,
    paginationView: myGuaranteesPaginationView,
  } = useSubgraphPagination(useMyLoansQuery, {
    currentAddress: account || '',
  });

  const guaranteesData = myGuaranteesResult.data?.debts;

  const guarantees: ILoan[] = React.useMemo(
    () =>
      guaranteesData?.map(debt => ({
        loan: debt.total,
        duePayment: '3000000000000000',
        borrowApr: Number(debt.apr),
        earn: '7000000000000000',
        status: debt.status,
        myStake: debt.staked,
      })) || [],
    [guaranteesData],
  );

  const { result: othersResult, paginationView: othersPaginationView } = useSubgraphPagination(
    useDebtsQuery,
    {},
  );
  const othersData = othersResult.data?.debts;

  const others: ILoan[] = React.useMemo(
    () =>
      othersData?.map(debt => ({
        loan: debt.total,
        duePayment: '3000000000000000',
        borrowApr: Number(debt.apr),
        earn: '7000000000000000',
        status: debt.status,
        myStake: debt.staked,
      })) || [],
    [othersData],
  );

  return (
    <Loading meta={accountMeta} gqlResults={[myLoansResult]}>
      {account ? (
        <Grid container>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.myLoans.getKey())} />}
              account={account}
              list={loans}
              expanded
              withPaymentDate
              paginationView={myLoansPaginationView}
            />
          </Grid>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.myGuarantees.getKey())} />}
              account={account}
              list={guarantees}
              withEarn
              paginationView={myGuaranteesPaginationView}
            />
          </Grid>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.others.getKey())} />}
              account={account}
              list={others}
              withEarn
              paginationView={othersPaginationView}
            />
          </Grid>
        </Grid>
      ) : (
        <Hint>{t(tKeysApp.connectingWarning.getKey())}</Hint>
      )}
    </Loading>
  );
}

export { LoansList };
