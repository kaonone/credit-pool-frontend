import build from 'build-route-tree';

const rawTree = {
  demo: null,
  overwiew: null,
  activities: null,
  loans: null,
  keepers: null,
};

export const routes = build(rawTree);
