import * as icons from './icons';

// TODO fix build-route-tree
type RouteNode = {
  getRoutePath(): string;
}

export type Link = {
  Icon?: icons.models.SidebarIcon;
  label: string;
  target: RouteNode | string;
}
