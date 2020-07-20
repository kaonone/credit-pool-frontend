import * as React from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { InfoIconV2 } from 'components/icons';
import { makeStyles } from 'utils/styles';

type Props = {
  hint?: React.ReactNode;
  fontSize?: 'inherit' | 'medium' | 'large';
  icon?: React.ReactNode;
  inline?: boolean;
};

export const Label: React.FC<Props> = props => {
  const { hint, inline, icon, children, fontSize = 'inherit' } = props;
  const classes = useStyles(props);

  return (
    <Typography
      variant="h6"
      component="h6"
      className={cn(classes.title, classes[fontSize], { [classes.inline]: inline })}
    >
      {icon && <>{icon}&nbsp;</>}
      {children}
      {hint ? (
        <>
          &nbsp;
          <Tooltip title={hint} placement="right">
            <span>
              <InfoIconV2 fontSize="small" />
            </span>
          </Tooltip>
        </>
      ) : null}
    </Typography>
  );
};

const useStyles = makeStyles(
  () => ({
    title: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 'normal',

      '&$inherit': {
        fontSize: 'inherit',
        fontWeight: 400,
      },
      '&$medium': {
        fontSize: 16,
        fontWeight: 400,
      },
      '&$large': {
        fontSize: 22,
        fontWeight: 300,
      },
    },

    inline: {
      display: 'inline-flex',
    },

    content: {
      marginBottom: 8,
    },

    inherit: {},
    medium: {},
    large: {},
  }),
  { name: 'Label' },
);