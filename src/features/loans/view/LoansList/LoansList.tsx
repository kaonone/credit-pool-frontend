import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, Hint, Grid } from 'components';

import { LoansPanel, ILoan } from '../LoansPanel/LoansPanel';
import { LoansTitle } from '../LoansTitle/LoansTitle';

function LoansList() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansList;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const loan: ILoan = {
    address: account,
    loan: '3000000000000000',
    duePayment: '3000000000000000',
    borrowApr: 17.5,
    status: 'closed',
    myStake: '7000000000000000',
    paymentDate: new Date(),
  };

  const guarantee: ILoan = {
    address: account,
    loan: '3000000000000000',
    duePayment: '3000000000000000',
    borrowApr: 17.5,
    earn: '7000000000000000',
    status: 'closed',
    myStake: '7000000000000000',
  };

  return (
    <Loading meta={accountMeta}>
      {account ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.myLoans.getKey())} amount={94} />}
              list={[loan, loan, loan]}
              expanded
              withPaymentDate
            />
          </Grid>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.myGuarantees.getKey())} amount={94} />}
              list={[guarantee, guarantee, guarantee]}
              withEarn
            />
          </Grid>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.others.getKey())} amount={94} />}
              list={[guarantee, guarantee, guarantee]}
              withEarn
            />
          </Grid>
        </Grid>
      ) : (
        <Hint>You need connect to wallet</Hint>
      )}
    </Loading>
  );
}

export { LoansList };
