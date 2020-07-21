import * as React from 'react';
import { useMemo } from 'react';
import BN from 'bn.js';

import {
  NewTable,
  Label,
  DoubleLineCell,
  AccountAddress,
  Loading,
  FormattedTokenAmount,
  FormattedAmount,
} from 'components';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import {
  useMyIssuedGuaranteesQuery,
  useMyPendingGuaranteesQuery,
  MyIssuedGuaranteesQuery,
  Status,
} from 'generated/gql/pool';
import { TokenAmount, Token, PercentAmount } from 'model/entities';
import { ETH_NETWORK_CONFIG } from 'env';
import { getLoanDuePaymentDate } from 'model';

import { DueDateCell } from './MyLoansTableCells';

const columns: Array<NewTable.models.Column<any>> = [
  {
    renderTitle: () => 'Lend to',
    cellContent: {
      kind: 'simple',
      render: x => <AccountAddress address={x.borrower} size="small" />,
    },
  },

  {
    renderTitle: () => 'Total loan sum',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedTokenAmount sum={x.total} />,
    },
  },

  {
    renderTitle: () => (
      <Label inline hint="Interest rate info">
        Interest rate
      </Label>
    ),
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.apr} theme="plain" />,
    },
  },

  {
    renderTitle: () => 'Due date',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <DueDateCell dueDate={x.dueDate} />,
    },
  },

  {
    renderTitle: () => 'My APY',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <DoubleLineCell renderTopPart={() => '5 days'} renderBottomPart={() => '07/22/2020'} />
      ),
    },
  },

  {
    renderTitle: () => (
      <Label inline hint="My collateral info">
        My collateral
      </Label>
    ),
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <DoubleLineCell
          renderTopPart={() => '5 days'}
          renderBottomPart={() => (
            <Label inline hint="50% info">
              50%
            </Label>
          )}
        />
      ),
    },
  },

  {
    renderTitle: () => 'Available For Withdrawal',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: () => (
        <div>
          <div>1,100.00</div>
          <div style={{ marginTop: 10 }}>{/*<views.WithdrawButton />*/}</div>
        </div>
      ),
    },
  },
];

type Props = {
  type: 'issued' | 'pending';
};

const getDueDate = (status: Status, last_update?: string | null, debtRepayDeadlinePeriod?: BN) => {
  const isPending = status === Status.Executed || status === Status.PartiallyRepayed;
  const loanDueDate =
    debtRepayDeadlinePeriod && getLoanDuePaymentDate(last_update, debtRepayDeadlinePeriod);

  return (isPending && loanDueDate) || null;
};

const convertDebts = (
  list: MyIssuedGuaranteesQuery['debts'],
  dai: Token,
  debtRepayDeadlinePeriod?: BN,
) => {
  return list.map(entry => ({
    borrower: entry.borrower.id,
    total: new TokenAmount(entry.total, dai),
    apr: new PercentAmount(entry.apr),
    dueDate: getDueDate(entry.status, entry.last_update, debtRepayDeadlinePeriod),
  }));
};

export function MyLoansTable({ type }: Props) {
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);
  const useQuery = type === 'issued' ? useMyIssuedGuaranteesQuery : useMyPendingGuaranteesQuery;

  const { result } = useSubgraphPagination(useQuery, {
    supporters: [account?.toLowerCase() || ''],
  });

  // Add multitoken support
  const [dai, daiMeta] = useSubscribable(
    () => api.erc20.getToken$(ETH_NETWORK_CONFIG.contracts.dai),
    [api],
  );

  const [loansConfig, loansConfigMeta] = useSubscribable(() => api.loanModule.getConfig$(), []);

  const list = result.data?.debts || [];
  console.log(list);
  const entries = useMemo(
    () => (dai ? convertDebts(list, dai, loansConfig?.debtRepayDeadlinePeriod) : []),
    [dai, list],
  );

  return (
    <Loading gqlResults={result} progressVariant="circle" meta={[daiMeta, loansConfigMeta]}>
      <NewTable.Component columns={columns} entries={entries} />
    </Loading>
  );
}
