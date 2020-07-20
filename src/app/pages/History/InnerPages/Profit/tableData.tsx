import { NewTable } from 'components';

type Order = {
  date: string;
  profit: string;
  claimed: Deal[];
};

type Deal = {
  currency: number;
  address: string;
  date: string;
};

export const entries: Order[] = [
  {
    date: '2012-01-02',
    profit: '$20000',
    claimed: [
      { currency: 10, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
      { currency: 20, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
      { currency: 70, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
    ],
  },
  {
    date: '2013-02-04',
    profit: '$10000',
    claimed: [
      { currency: 200, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
      { currency: 500, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
      { currency: 300, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
    ],
  },
];

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
            renderCell: x => `$${x.currency}`,
          },
        ],
      },
    },
  },
];
