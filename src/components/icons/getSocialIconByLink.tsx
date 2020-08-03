import React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import LaunchIcon from '@material-ui/icons/Launch';

import { GithubIcon } from './GithubIcon';
import { MediumIcon } from './MediumIcon';
import { TelegramIcon } from './TelegramIcon';
import { TwitterIcon } from './TwitterIcon';
import { DiscordIcon } from './DiscordIcon';
import { DeFiPulseIcon } from './DeFiPulseIcon';

type LinkType = 'github' | 'twitter' | 'telegram' | 'medium' | 'discord' | 'defipulse';

export function getSocialIconByLink(
  href: string,
  FallbackIcon?: React.ComponentType<SvgIconProps>,
) {
  const linkType = getLinkType(href);
  const Icon = linkType === 'unknown' ? FallbackIcon || LaunchIcon : IconByType[linkType];
  return Icon;
}

const IconByType: Record<LinkType, React.StatelessComponent<SvgIconProps>> = {
  github: GithubIcon,
  medium: MediumIcon,
  telegram: TelegramIcon,
  twitter: TwitterIcon,
  discord: DiscordIcon,
  defipulse: DeFiPulseIcon,
};

const githubRegExp = /^.+?\bgithub\.com\b.+$/;
const mediumRegExp = /^.+?\bmedium\.com\b.+$/;
const telegramRegExp = /^.+?\bt\.me\b.+$/;
const twitterRegExp = /^.+?\btwitter\.com\b.+$/;
const discordRegExp = /^.+?\bdiscord\.gg\b.+$/;
const defipulseRegExp = /^.+?\bdefipulse\.com\b.+$/;

const typeByRegExp = new Map<RegExp, LinkType>([
  [githubRegExp, 'github'],
  [mediumRegExp, 'medium'],
  [telegramRegExp, 'telegram'],
  [twitterRegExp, 'twitter'],
  [discordRegExp, 'discord'],
  [defipulseRegExp, 'defipulse'],
]);

function getLinkType(link: string): LinkType | 'unknown' {
  const regExps = [
    githubRegExp,
    mediumRegExp,
    telegramRegExp,
    twitterRegExp,
    discordRegExp,
    defipulseRegExp,
  ];
  const linkRegExp = regExps.find(item => item.test(link));
  return (linkRegExp && typeByRegExp.get(linkRegExp)) || 'unknown';
}
