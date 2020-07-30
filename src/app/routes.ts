import build from 'build-route-tree';

const rawTree = {
  demo: null,
  account: {
    summary: null,
    stakes: null,
    borrows: null,
  },
  stats: null,
  lend: null,
  borrow: null,
  history: {
    transaction: null,
    profit: null,
    liquidations: null,
  },
  liquidations: null,
  governance: null,
  'privacy-policy': null,
  'terms-of-service': null,
};

export const routes = build(rawTree);
