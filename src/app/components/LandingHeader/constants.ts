import { tKeys } from 'services/i18n';
import { IMenuItem } from 'utils/types/common';

export const menuItems: IMenuItem[] = [
  {
    path: 'https://wiki.akropolis.io',
    title: tKeys.modules.navigation.wiki.getKey(),
    isExternal: true,
  },
];
