import { PRIVACY_POLICY_URL, T_AND_C_URL } from 'docs';
import { IMenuItem } from 'utils/types/common';
import { tKeys } from 'services/i18n';
import { Benefit } from 'components';

export const menuItems: IMenuItem[] = [
  {
    path: '#',
    title: tKeys.modules.navigation.tutorials.getKey(),
    isExternal: true,
  },
  {
    path: 'https://wiki.akropolis.io',
    title: tKeys.modules.navigation.wiki.getKey(),
    isExternal: true,
  },
];

export const footerNavItems: IMenuItem[] = [
  {
    path: PRIVACY_POLICY_URL,
    title: tKeys.modules.navigation.privacyPolicy.getKey(),
  },
  {
    path: T_AND_C_URL,
    title: tKeys.modules.navigation.termsConditions.getKey(),
  },
];

export const benefits: Benefit[] = [
  {
    title: 'Undercollateralised loans',
    description: 'Take up to 2x from your collateral',
  },
  {
    title: 'Higher APR',
    description: 'Rebalancing between DeFi protocol with RAY (soonTM)',
  },
  {
    title: 'Passive savings',
    description: 'Earn rewards from pool activity and rising liquidity',
  },
];
