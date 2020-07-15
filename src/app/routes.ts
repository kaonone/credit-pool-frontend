import build from 'build-route-tree';

const rawTree = {
  demo: null,
  account: null,
  balance: null,
  pool: null,
  stats: null,
  proposals: null,
  distributions: null,
  lend: null,
  borrow: null,
  sell: null,
  history: {
    transaction: null,
    profit: null,
    liquidations: null,
  },
  bounty: null,
  liquidations: null,
  governance: null,
  'privacy-policy': null,
  'terms-of-service': null,
};

export const routes = build(rawTree);
