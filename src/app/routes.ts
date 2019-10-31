import build from 'build-route-tree';

const rawTree = {
  demo: null,
  home: null,
};

export const routes = build(rawTree);
