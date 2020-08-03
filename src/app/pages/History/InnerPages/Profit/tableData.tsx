import React from 'react';
import { map } from 'rxjs/operators';

import { NewTable, FormattedAmount, AccountAddress, Loading } from 'components';
import { TokenAmount } from 'model/entities';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

export type Order = {
  date: number;
  profit: TokenAmount;
  claimed: TokenAmount;
  usersLength: number;
  claims: Claim[];
};

export type Claim = {
  amount: TokenAmount;
  address: string;
  date: number;
};

export const columnsWithSubtable: Array<NewTable.models.Column<Order, Claim>> = [
  {
    renderTitle: () => 'Date',
    cellContent: {
      kind: 'simple',
      render: x => new Date(x.date).toLocaleString(),
    },
  },

  {
    renderTitle: () => 'LPs Profit',
    cellContent: {
      kind: 'simple',
      render: x => <PTKToLiquidity sum={x.profit} />,
    },
  },

  {
    renderTitle: () => 'Claimed',
    cellContent: {
      kind: 'simple',
      render: x => <PTKToLiquidity sum={x.claimed} />,
    },
  },

  {
    renderTitle: () => 'Members',
    cellContent: {
      kind: 'simple',
      render: x => x.usersLength,
    },
  },

  {
    renderTitle: () => null,
    cellContent: {
      kind: 'for-row-expander',
      expandedArea: {
        kind: 'subtable',
        getSubtableEntries: x => x.claims,
        subtableColumns: [
          {
            renderTitle: () => 'Date',
            renderCell: x => new Date(x.date).toLocaleString(),
          },

          {
            renderTitle: () => 'Address',
            renderCell: x => <AccountAddress address={x.address} size="small" />,
          },

          {
            renderTitle: () => 'Claimed',
            renderCell: x => <PTKToLiquidity sum={x.amount} />,
          },
        ],
      },
    },
  },
];

function PTKToLiquidity({ sum }: { sum: TokenAmount }) {
  const api = useApi();
  const [liquidity, liquidityMeta] = useSubscribable(
    () =>
      api.fundsModule.toLiquidityAmount$(
        api.fundsModule.getPtkToDaiExitInfo$(sum.toString()).pipe(map(({ user }) => user)),
      ),
    [api, sum.toString()],
  );

  return <Loading meta={liquidityMeta}>{liquidity && <FormattedAmount sum={liquidity} />}</Loading>;
}
