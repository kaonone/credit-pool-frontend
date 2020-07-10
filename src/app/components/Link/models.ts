import { models } from '../Sidebar';

type RouteNode = {
  getRoutePath(): string;
}

export type Link = {
  icon?: models.Icon;
  label: string;
  target: RouteNode | string;
}
