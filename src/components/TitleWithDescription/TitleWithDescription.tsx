import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { InfoIconV2 } from 'components/icons';
import { makeStyles, useTheme, colors } from 'utils/styles';

type Props = {
  title: string;
  description: string;
  titleSize: 'medium' | 'big';
  iconBeforeTitle?: JSX.Element;
};

export function TitleWithDescription(props: Props) {
  const { title, description, iconBeforeTitle } = props;
  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <Typography variant="h6" component="h6" className={classes.title}>
      {iconBeforeTitle && <>{iconBeforeTitle}&nbsp;</>}
      {title}
      <Tooltip title={description} placement="right">
        <span>
          &nbsp;
          <InfoIconV2
            className={classes.infoIcon}
            backgroundColor={theme.palette.type === 'dark' ? colors.white : colors.gray}
            width={15}
            height={15}
          />
        </span>
      </Tooltip>
    </Typography>
  );
}

TitleWithDescription.defaultProps = {
  titleSize: 'medium',
} as Partial<Props>;

const useStyles = makeStyles(
  () => ({
    title: {
      marginBottom: 13,
      display: 'flex',
      alignContent: 'center',
      lineHeight: 'normal',
      fontSize: ({ titleSize }: Props) => (titleSize === 'big' ? 22 : 16),
      fontWeight: ({ titleSize }: Props) => (titleSize === 'big' ? 300 : 400),
    },
    infoIcon: {
      height: 15,
    },
    content: {
      marginBottom: 8,
    },
  }),
  { name: 'Metric' },
);
