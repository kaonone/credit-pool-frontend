import { models } from '../Sidebar';

export type SidebarIcon = models.Icon;

export type AbstractLink = {
  label: string;
  target: string;
}

export type InternalLink = AbstractLink & {
  kind: 'internal';
  icon?: SidebarIcon;
}

export type ExternalLink = AbstractLink & {
  kind: 'external';
}

export type Link = InternalLink | ExternalLink;
