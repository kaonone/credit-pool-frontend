import * as React from 'react';
import cn from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';

import { makeStyles } from 'utils/styles';

import { SocialLink } from '../SocialLink/SocialLink';
import { MainSvgGradient } from '../icons';

interface IProps {
  direction?: 'row' | 'column';
}

// [url, need_to_fill_svg-paths]
const links: Array<[string, boolean]> = [
  ['https://github.com/akropolisio', true],
  ['https://twitter.com/akropolisio', true],
  ['https://t.me/akropolis_official', true],
  ['https://medium.com/akropolis', true],
  ['https://discord.gg/Y58CGUW', true],
  ['https://defipulse.com/defi-list', true],
];

function AkropolisSocialLinks(props: IProps) {
  const { direction = 'row' } = props;
  const classes = useStyles();
  return (
    <div className={cn(classes.root, { [classes[direction]]: true })}>
      <div className={classes.hidden}>
        <SvgIcon>
          <MainSvgGradient />
        </SvgIcon>
      </div>
      {links.map(([link, needToFill]) => (
        <SocialLink
          key={link}
          className={cn(classes.link, { [classes.fillPath]: needToFill })}
          href={link}
        />
      ))}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',

    '&$row': {
      flexDirection: 'row',
    },

    '&$column': {
      flexDirection: 'column',
    },
  },

  link: {
    color: 'inherit',
  },

  fillPath: {
    '& path, & circle': {
      fill: `url(#${MainSvgGradient.ID})`,
    },
  },

  hidden: {
    opacity: 1,
    width: 0,
    height: 0,
  },

  row: {},
  column: {},
}));

export { AkropolisSocialLinks };
