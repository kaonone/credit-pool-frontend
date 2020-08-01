import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BN from 'bn.js';

import { NewTable, Loading, Hint, Typography, Button } from 'components';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import { useMyBorrowedPendingLoansQuery } from 'generated/gql/pool';
import { MyBorrowedPendingLoansQuery } from 'generated/gql/subgraphRequests';
import { getLoanDuePaymentDate } from 'model';
import { PercentAmount, LiquidityAmount, Currency } from 'model/entities';
import { useApi } from 'services/api';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { routes } from 'app/routes';

import { UserDebt } from '../../../models';
import { makeTableColumns } from './columns';
import { useStyles } from './PendingLoans.style';

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

const tKeys = tKeysAll.features.loans.myBorrows;

export const PendingLoans: React.FC<Props> = props => {
  const { account } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  const api = useApi();

  const { result, paginationView } = useSubgraphPagination(useMyBorrowedPendingLoansQuery, {
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
          <Hint renderButton={renderBorrowButton}>
            <Typography>{t(tKeys.noPendingLoans.getKey())}</Typography>
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

  function renderBorrowButton() {
    return (
      <Button
        component={Link}
        variant="contained"
        color="primary"
        size="small"
        to={routes.borrow.getRedirectPath()}
      >
        {t(tKeys.borrowButton.getKey())}
      </Button>
    );
  }
};
