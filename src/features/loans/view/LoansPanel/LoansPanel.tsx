import React from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { MakeTableType } from 'components/Table/Table';
import { Table as GeneralTable, Typography, Hint, Grid, Loading } from 'components';
import { ExpansionPanel } from 'components/ExpansionPanel/ExpansionPanel';
import { FormattedBalance } from 'components/FormattedBalance/FormattedBalance';
import { Status, Debt } from 'generated/gql/pool';
import { formatBalance } from 'utils/format';
import { useSubscribable } from 'utils/react';

import { AddressCell } from './LoansTableCells';
import { useStyles } from './LoansPanel.style';

const Table = GeneralTable as MakeTableType<Debt>;

export interface ILoan {
  loan: string;
  duePayment: string;
  borrowApr: string;
  earn?: string;
  status: Status;
  myStake: string;
}

interface IProps {
  title: React.ReactNode;
  account: string;
  list: Debt[];
  withEarn?: boolean;
  expanded?: boolean;
  paginationView?: React.ReactNode;
}

function LoansPanel(props: IProps) {
  const { title, account, list, withEarn, expanded, paginationView } = props;
  const classes = useStyles();
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansPanel;

  const api = useApi();
  const [aprDecimals, aprDecimalsMeta] = useSubscribable(() => api.getAprDecimals$(), [], 0);

  const [duePaymentTimeout, duePaymentTimeoutMeta] = useSubscribable(
    () => api.getDuePaymentTimeout$(),
    [],
    0,
  );

  const getDuePayment = (lastUpdate: string | null | undefined, paymentTimeout: number) => {
    return lastUpdate
      ? new Date(new BN(lastUpdate).add(new BN(paymentTimeout)).toNumber()).toLocaleDateString()
      : '–';
  };

  const LoansTable = (
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
                  <Table.Cell>{() => <AddressCell address={account} />}</Table.Cell>
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
                    {({ data }) => <FormattedBalance sum={data.staked} token="dai" />}
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

  return (
    <ExpansionPanel
      title={title}
      details={LoansTable}
      detailsClassName={classes.details}
      expanded={expanded}
    />
  );
}

export { LoansPanel };
