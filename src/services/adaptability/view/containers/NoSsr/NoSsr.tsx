import * as React from 'react';

import { useAdaptabilityContext } from 'services/adaptability/AdaptabilityContext';

interface IProps {
  children: React.ReactElement;
}

export function NoSsr(props: IProps) {
  const { children } = props;
  const { hydrated } = useAdaptabilityContext();

  // eslint-disable-next-line no-underscore-dangle
  const isServer = window.__PRERENDER_INJECTED__ ? window.__PRERENDER_INJECTED__.isServer : false;

  return isServer || !hydrated ? null : children;
}
