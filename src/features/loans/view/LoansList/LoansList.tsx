import React from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useSubgraphPagination } from 'utils/react';
import { Loading, Hint, Grid } from 'components';
import { useDebtsQuery, useMyLoansQuery, useMyGuaranteesQuery } from 'generated/gql/pool';

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
      currentAddress: '0x5d507818b52a891fe296463adc01eed9c51e218b', // TODO change on account
    },
  );

  const loansData = myLoansResult.data?.debts;
  const [duePayment, duePaymentMeta] = useSubscribable(() => api.getDuePayment$(), [], 0); // TODO rename method

  const getDuePayment = (lastUpdate: string | null | undefined, due: number) => {
    return lastUpdate ? new Date(new BN(lastUpdate).add(new BN(due)).toNumber()) : new Date();
  };

  const loans: ILoan[] = React.useMemo(
    () =>
      loansData?.map(debt => ({
        loan: debt.total,
        duePayment: getDuePayment(debt.last_update, duePayment).toLocaleDateString(), // TODO last_update=null
        borrowApr: Number(debt.apr),
        status: debt.status,
        myStake: debt.staked,
      })) || [],
    [loansData],
  );

  const {
    result: myGuaranteesResult,
    paginationView: myGuaranteesPaginationView,
  } = useSubgraphPagination(useMyGuaranteesQuery, {
    address: account || '',
  });

  const guaranteesData = myGuaranteesResult.data?.debts;

  const guarantees: ILoan[] = React.useMemo(
    () =>
      guaranteesData?.map(debt => ({
        loan: debt.total,
        duePayment: getDuePayment(debt.last_update, duePayment).toLocaleDateString(),
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
        duePayment: getDuePayment(debt.last_update, duePayment).toLocaleDateString(),
        borrowApr: Number(debt.apr),
        earn: '7000000000000000',
        status: debt.status,
        myStake: debt.staked,
      })) || [],
    [othersData],
  );

  return (
    <Loading meta={[accountMeta, duePaymentMeta]} gqlResults={[myLoansResult]}>
      {account ? (
        <Grid container>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.myLoans.getKey())} />}
              account={account}
              list={loans}
              expanded
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
