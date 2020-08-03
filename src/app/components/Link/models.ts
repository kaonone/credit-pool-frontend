export type AbstractLink = {
  label: string;
  ref: string;
};

export type InternalLink = AbstractLink & {
  kind: 'internal';
  renderIcon?: (isActive: boolean) => React.ReactElement;
};

export type ExternalLink = AbstractLink & {
  kind: 'external';
};

export type Link = InternalLink | ExternalLink;
