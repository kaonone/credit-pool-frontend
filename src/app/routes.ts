import build from 'build-route-tree';

const rawTree = {
  demo: null,
  account: null,
  balance: null,
  pool: null,
  stats: null,
  proposals: null,
  distributions: null,
  buy: null,
  sell: null,
  history: null,
  bounty: null,
  liquidation: null,
};

export const routes = build(rawTree);
