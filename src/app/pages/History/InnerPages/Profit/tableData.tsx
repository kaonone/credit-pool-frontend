import React from 'react';
import BN from 'bn.js';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { NewTable, FormattedBalance, ShortAddress, Grid } from 'components';

export type Order = {
  date: number;
  profit: number;
  claimed: number;
  usersLength: number;
  deals: Deal[];
};

export type Deal = {
  currency: number;
  address: string;
  date: number;
};

export const columnsWithSubtable: Array<NewTable.models.Column<Order, Deal>> = [
  {
    renderTitle: () => 'Date',
    cellContent: {
      kind: 'simple',
      render: x => new Date(new BN(x.date).toNumber() * 1000).toLocaleString(),
    },
  },

  {
    renderTitle: () => 'LPs Profit',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedBalance sum={new BN(x.profit)} token="ptk" />,
    },
  },

  {
    renderTitle: () => 'Claimed',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedBalance sum={new BN(x.claimed)} token="ptk" />,
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
        getSubtableEntries: x => x.deals,
        subtableColumns: [
          {
            renderTitle: () => 'Date',
            renderCell: x => new Date(new BN(x.date).toNumber() * 1000).toLocaleString(),
          },

          {
            renderTitle: () => 'Address',
            renderCell: x => (
              <Grid container>
                <Jazzicon diameter={20} seed={jsNumberForAddress(x.address)} />
                <ShortAddress address={x.address} disableCopy />
              </Grid>
            ),
          },

          {
            renderTitle: () => 'Claimed',
            renderCell: x => <FormattedBalance sum={new BN(x.currency)} token="ptk" />,
          },
        ],
      },
    },
  },
];
