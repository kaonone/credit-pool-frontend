import React from 'react';
import BN from 'bn.js';

import { Typography, Hint, Grid, Loading, Table as GeneralTable, MakeTableType } from 'components';
import { FormattedBalance } from 'components/FormattedBalance/FormattedBalance';
import { Debt } from 'generated/gql/pool';
import { formatBalance } from 'utils/format';
import { useApi } from 'services/api';
import { useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';

import { AddressCell } from './LoansTableCells';

export const Table = GeneralTable as MakeTableType<Debt>;

interface Props {
  list: Debt[];
  withEarn?: boolean;
  paginationView: React.ReactNode;
}

export function LoansTable({ list, withEarn, paginationView }: Props) {
  const { t, tKeys: tKeysAll } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansPanel;

  const api = useApi();

  const [aprDecimals, aprDecimalsMeta] = useSubscribable(
    () => api.loanModule.getAprDecimals$(),
    [],
    0,
  );

  const [duePaymentTimeout, duePaymentTimeoutMeta] = useSubscribable(
    () => api.loanModule.getDuePaymentTimeout$(),
    [],
    new BN(0),
  );

  return (
    <>
      {!list.length ? (
        <Hint>
          <Typography>{t(tKeys.notFound.getKey())}</Typography>
        </Hint>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Table data={list}>
                <Table.Column>
                  <Table.Head align="center">#</Table.Head>
                  <Table.Cell align="center">
                    {({ index }) => <Typography variant="body1">{index + 1}</Typography>}
                  </Table.Cell>
                </Table.Column>
                <Table.Column>
                  <Table.Head>{t(tKeys.address.getKey())}</Table.Head>
                  <Table.Cell>{({ data }) => <AddressCell address={data.borrower} />}</Table.Cell>
                </Table.Column>
                <Table.Column>
                  <Table.Head>{t(tKeys.loan.getKey())}</Table.Head>
                  <Table.Cell>
                    {({ data }) => <FormattedBalance sum={data.total} token="dai" />}
                  </Table.Cell>
                </Table.Column>
                <Table.Column>
                  <Table.Head>{t(tKeys.duePayment.getKey())}</Table.Head>
                  <Table.Cell>
                    {({ data }) => (
                      <Loading meta={duePaymentTimeoutMeta}>
                        {getDuePayment(data.last_update, duePaymentTimeout)}
                      </Loading>
                    )}
                  </Table.Cell>
                </Table.Column>
                <Table.Column>
                  <Table.Head>{t(tKeys.borrowApr.getKey())}</Table.Head>
                  <Table.Cell>
                    {({ data }) => (
                      <Loading meta={aprDecimalsMeta}>
                        {formatBalance({
                          amountInBaseUnits: data.apr,
                          baseDecimals: aprDecimals,
                        })}
                        %
                      </Loading>
                    )}
                  </Table.Cell>
                </Table.Column>
                {withEarn && (
                  <Table.Column>
                    <Table.Head>{t(tKeys.earn.getKey())}</Table.Head>
                    <Table.Cell>
                      {() => <FormattedBalance sum="7000000000000000" token="dai" />}
                    </Table.Cell>
                  </Table.Column>
                )}
                <Table.Column>
                  <Table.Head>{t(tKeys.status.getKey())}</Table.Head>
                  <Table.Cell>{({ data }) => t(tKeys.statuses[data.status].getKey())}</Table.Cell>
                </Table.Column>
                <Table.Column>
                  <Table.Head>{t(tKeys.myStake.getKey())}</Table.Head>
                  <Table.Cell>
                    {({ data }) => <FormattedBalance sum={data.lStaked} token="dai" />}
                  </Table.Cell>
                </Table.Column>
              </Table>
            </Grid>
            {paginationView && (
              <Grid item xs={12}>
                {paginationView}
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  );
}

function getDuePayment(lastUpdate: string | null | undefined, paymentTimeout: BN) {
  return lastUpdate
    ? new Date(new BN(lastUpdate).add(paymentTimeout).toNumber()).toLocaleDateString()
    : '–';
}
