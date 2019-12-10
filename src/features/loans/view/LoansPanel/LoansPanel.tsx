import React from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { MakeTableType } from 'components/Table/Table';
import { Table as GeneralTable, Typography } from 'components';
import { ExpansionPanel } from 'components/ExpansionPanel/ExpansionPanel';
import { formatBalance } from 'utils/format';

import { AddressCell } from './LoansTableCells';

const Table = GeneralTable as MakeTableType<ILoansList>;

interface ILoansList {
  address: string;
  loan: string;
  duePayment: string;
  borrowApr: number;
  earn?: string;
  status: 'closed' | 'opened';
  myStake: string;
  paymentDate?: Date;
}

interface IProps {
  title: React.ReactNode;
  list: ILoansList[];
  withEarn?: boolean;
  withPaymentDate?: boolean;
}

function LoansPanel(props: IProps) {
  const { title, list, withEarn, withPaymentDate } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansPanel;

  const LoansTable = (
    <Table data={list}>
      <Table.Column>
        <Table.Head align="center">#</Table.Head>
        <Table.Cell align="center">
          {({ index }) => <Typography variant="body1">{index + 1}</Typography>}
        </Table.Cell>
      </Table.Column>
      <Table.Column>
        <Table.Head>{t(tKeys.address.getKey())}</Table.Head>
        <Table.Cell>{({ data }) => <AddressCell address={data.address} />}</Table.Cell>
      </Table.Column>
      <Table.Column>
        <Table.Head>{t(tKeys.loan.getKey())}</Table.Head>
        <Table.Cell>
          {({ data }) =>
            formatBalance({
              amountInBaseUnits: new BN(data.loan),
              baseDecimals: 0,
              tokenSymbol: 'DAI',
            })
          }
        </Table.Cell>
      </Table.Column>
      <Table.Column>
        <Table.Head>{t(tKeys.duePayment.getKey())}</Table.Head>
        <Table.Cell>
          {({ data }) =>
            formatBalance({
              amountInBaseUnits: new BN(data.duePayment),
              baseDecimals: 0,
              tokenSymbol: 'DAI',
            })
          }
        </Table.Cell>
      </Table.Column>
      {withPaymentDate && (
        <Table.Column>
          <Table.Head>{t(tKeys.paymentDate.getKey())}</Table.Head>
          <Table.Cell>
            {({ data }) => data.paymentDate && data.paymentDate.toLocaleDateString()}
          </Table.Cell>
        </Table.Column>
      )}
      <Table.Column>
        <Table.Head>{t(tKeys.borrowApr.getKey())}</Table.Head>
        <Table.Cell>{({ data }) => `${data.borrowApr}%`}</Table.Cell>
      </Table.Column>
      {withEarn && (
        <Table.Column>
          <Table.Head>{t(tKeys.earn.getKey())}</Table.Head>
          <Table.Cell>
            {({ data }) =>
              data.earn &&
              formatBalance({
                amountInBaseUnits: new BN(data.earn),
                baseDecimals: 0,
                tokenSymbol: 'DAI',
              })
            }
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
          {({ data }) =>
            formatBalance({
              amountInBaseUnits: new BN(data.myStake),
              baseDecimals: 0,
              tokenSymbol: 'DAI',
            })
          }
        </Table.Cell>
      </Table.Column>
    </Table>
  );

  return <ExpansionPanel title={title} details={LoansTable} />;
}

export { LoansPanel };
