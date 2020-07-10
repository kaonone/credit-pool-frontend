import React from 'react';

import * as Link from '../../../Link';
import { useStyles } from './Link.style';

type Props = {
  shouldRenderLabel: boolean;
  link: Link.models.Link;
}

const LinkWrapper: React.FC<Props> = props => {
  const { link, shouldRenderLabel } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link.Link
        link={link}
        shouldRenderLabel={shouldRenderLabel}
      />
    </div>
  );
};
export { LinkWrapper as Link }
