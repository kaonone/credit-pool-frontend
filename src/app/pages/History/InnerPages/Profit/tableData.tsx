import { NewTable } from 'components';

export type Order = {
  date: string;
  profit: string;
  claimed: Deal[];
};

type Deal = {
  currency: number;
  address: string;
  date: string;
};

export const columnsWithSubtable: Array<NewTable.models.Column<Order, Deal>> = [
  {
    renderTitle: () => 'Date',
    cellContent: {
      kind: 'simple',
      render: x => x.date,
    },
  },

  {
    renderTitle: () => 'LPs Profit',
    cellContent: {
      kind: 'simple',
      render: x => x.profit,
    },
  },

  {
    renderTitle: () => 'Claimed',
    cellContent: {
      kind: 'simple',
      render: x => `$${x.claimed.map(deal => deal.currency).reduce((sum, cash) => sum + cash)}`,
    },
  },

  {
    renderTitle: () => 'Members',
    cellContent: {
      kind: 'simple',
      render: x => x.claimed.length,
    },
  },

  {
    renderTitle: () => null,
    cellContent: {
      kind: 'for-row-expander',
      expandedArea: {
        kind: 'subtable',
        getSubtableEntries: x => x.claimed,
        subtableColumns: [
          {
            renderTitle: () => 'Date',
            renderCell: x => x.date,
          },

          {
            renderTitle: () => 'Address',
            renderCell: x => x.address,
          },

          {
            renderTitle: () => 'Claimed',
            renderCell: x => x.currency,
          },
        ],
      },
    },
  },
];
