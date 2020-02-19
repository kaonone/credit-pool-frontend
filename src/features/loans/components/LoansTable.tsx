import React from 'react';
import BN from 'bn.js';

import { Typography, Hint, Grid, Loading, Table as GeneralTable, MakeTableType } from 'components';
import { FormattedBalance } from 'components/FormattedBalance/FormattedBalance';
import { Debt } from 'generated/gql/pool';
import { formatBalance } from 'utils/format';
import { useApi } from 'services/api';
import { useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { getLoanDuePaymentDate } from 'model';

import { AddressCell, MyStakeCell, MyEarnCell, MyInterestShareCell } from './LoansTableCells';
import { ActionsCell } from './ActionsCell';

export const Table = GeneralTable as MakeTableType<Debt>;

type HidableColumn = 'address' | 'earn' | 'myStake' | 'myInterestShare';

interface Props {
  list: Debt[];
  hideColumns?: HidableColumn[];
  paginationView: React.ReactNode;
}

export function LoansTable({ list, hideColumns = [], paginationView }: Props) {
  const { t, tKeys: tKeysAll } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansPanel;

  const api = useApi();

  const [account] = useSubscribable(() => api.web3Manager.account, []);

  const [aprDecimals, aprDecimalsMeta] = useSubscribable(
    () => api.loanModule.getAprDecimals$(),
    [],
    0,
  );

  const [loansConfig, loansConfigMeta] = useSubscribable(() => api.loanModule.getConfig$(), []);

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
                {!hideColumns.includes('address') && (
                  <Table.Column>
                    <Table.Head>{t(tKeys.address.getKey())}</Table.Head>
                    <Table.Cell>{({ data }) => <AddressCell address={data.borrower} />}</Table.Cell>
                  </Table.Column>
                )}
                <Table.Column>
                  <Table.Head>{t(tKeys.loan.getKey())}</Table.Head>
                  <Table.Cell>
                    {({ data }) => (
                      <FormattedBalance
                        sum={new BN(data.total).sub(new BN(data.repayed))}
                        token="dai"
                      />
                    )}
                  </Table.Cell>
                </Table.Column>
                <Table.Column>
                  <Table.Head>{t(tKeys.duePayment.getKey())}</Table.Head>
                  <Table.Cell>
                    {({ data }) => (
                      <Loading meta={loansConfigMeta}>
                        {(loansConfig &&
                          getLoanDuePaymentDate(
                            data.last_update,
                            loansConfig.debtRepayDeadlinePeriod,
                          )?.toLocaleDateString()) ||
                          '-'}
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
                {account && !hideColumns.includes('earn') && (
                  <Table.Column>
                    <Table.Head>{t(tKeys.earn.getKey())}</Table.Head>
                    <Table.Cell>
                      {({ data }) => (
                        <MyEarnCell
                          supporter={account}
                          borrower={data.borrower}
                          proposalId={data.proposal_id}
                        />
                      )}
                    </Table.Cell>
                  </Table.Column>
                )}
                <Table.Column>
                  <Table.Head>{t(tKeys.status.getKey())}</Table.Head>
                  <Table.Cell>{({ data }) => t(tKeys.statuses[data.status].getKey())}</Table.Cell>
                </Table.Column>
                {account && !hideColumns.includes('myStake') && (
                  <Table.Column>
                    <Table.Head>{t(tKeys.myStake.getKey())}</Table.Head>
                    <Table.Cell>
                      {({ data }) => (
                        <MyStakeCell
                          loanBody={new BN(data.total).sub(new BN(data.repayed)).toString()}
                          status={data.status}
                          supporter={account}
                          borrower={data.borrower}
                          proposalId={data.proposal_id}
                        />
                      )}
                    </Table.Cell>
                  </Table.Column>
                )}
                {account && !hideColumns.includes('myInterestShare') && (
                  <Table.Column>
                    <Table.Head>{t(tKeys.myInterestShare.getKey())}</Table.Head>
                    <Table.Cell>
                      {({ data }) => (
                        <MyInterestShareCell
                          initialLoanSize={data.total}
                          supporter={account}
                          borrower={data.borrower}
                          proposalId={data.proposal_id}
                        />
                      )}
                    </Table.Cell>
                  </Table.Column>
                )}
                {account && (
                  <Table.Column>
                    <Table.Cell>
                      {({ data }) => <ActionsCell debt={data} account={account} />}
                    </Table.Cell>
                  </Table.Column>
                )}
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
