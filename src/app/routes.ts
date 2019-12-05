import build from 'build-route-tree';

const rawTree = {
  demo: null,
  overview: null,
  activities: null,
  loans: null,
  keepers: null,
};

export const routes = build(rawTree);
