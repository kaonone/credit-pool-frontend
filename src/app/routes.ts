import build from 'build-route-tree';

const rawTree = {
  demo: null,
  overview: null,
  proposals: null,
  liquidations: null,
  balance: null,
  'my-loans': null,
  'my-guarantees': null,
};

export const routes = build(rawTree);
