import build from 'build-route-tree';

const rawTree = {
  demo: null,
  home: null,
};

const routes = build(rawTree);

export default routes;
