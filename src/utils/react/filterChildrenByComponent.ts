import React from 'react';
import getEnvParams from 'core/getEnvParams';

export function filterChildrenByComponent<Props>(child: React.ReactNode, Component: React.ComponentType<Props>) {
  const { withHot } = getEnvParams();
  return React.Children.toArray(child).filter(
    (item): item is React.ReactElement<Props, any> =>
      React.isValidElement(item) &&
      (withHot ? ((item.type as any).displayName || (item.type as any).name) === Component.name : item.type === Component),
  );
}