import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { MakeTableType } from 'components/Table/Table';
import { Table as GeneralTable, Typography } from 'components';
import { ExpansionPanel } from 'components/ExpansionPanel/ExpansionPanel';
import { FormattedBalance } from 'components/FormattedBalance/FormattedBalance';

import { AddressCell } from './LoansTableCells';
import { useStyles } from './LoansPanel.style';

const Table = GeneralTable as MakeTableType<ILoan>;

export interface ILoan {
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
  account: string;
  list: ILoan[];
  withEarn?: boolean;
  withPaymentDate?: boolean;
  expanded?: boolean;
}

function LoansPanel(props: IProps) {
  const { title, account, list, withEarn, withPaymentDate, expanded } = props;
  const classes = useStyles();
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
        <Table.Cell>{() => <AddressCell address={account} />}</Table.Cell>
      </Table.Column>
      <Table.Column>
        <Table.Head>{t(tKeys.loan.getKey())}</Table.Head>
        <Table.Cell>{({ data }) => <FormattedBalance sum={data.loan} token="dai" />}</Table.Cell>
      </Table.Column>
      <Table.Column>
        <Table.Head>{t(tKeys.duePayment.getKey())}</Table.Head>
        <Table.Cell>
          {({ data }) => <FormattedBalance sum={data.duePayment} token="dai" />}
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
            {({ data }) => data.earn && <FormattedBalance sum={data.earn} token="dai" />}
          </Table.Cell>
        </Table.Column>
      )}
      <Table.Column>
        <Table.Head>{t(tKeys.status.getKey())}</Table.Head>
        <Table.Cell>{({ data }) => t(tKeys.statuses[data.status].getKey())}</Table.Cell>
      </Table.Column>
      <Table.Column>
        <Table.Head>{t(tKeys.myStake.getKey())}</Table.Head>
        <Table.Cell>{({ data }) => <FormattedBalance sum={data.myStake} token="dai" />}</Table.Cell>
      </Table.Column>
    </Table>
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
