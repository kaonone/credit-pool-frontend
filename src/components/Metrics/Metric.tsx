import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from 'utils/styles';

import { TitleWithDescription } from '../TitleWithDescription/TitleWithDescription';

type Props = {
  title: string;
  titleDescription: string;
  content: JSX.Element;
  iconBeforeTitle?: JSX.Element;
  button?: JSX.Element;
  additionalInfo?: JSX.Element;
};

export function Metric(props: Props) {
  const { title, titleDescription, content, button, additionalInfo, iconBeforeTitle } = props;
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="space-between" className={classes.root}>
      <Grid item xs>
        <TitleWithDescription
          title={title}
          description={titleDescription}
          iconBeforeTitle={iconBeforeTitle}
        />
        {content && <Grid className={classes.content}>{content}</Grid>}
        {additionalInfo}
      </Grid>
      <Grid item>{button}</Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      height: '100%',
    },
    title: {
      marginBottom: 13,
      display: 'flex',
      alignContent: 'center',
      lineHeight: 'normal',
    },
    content: {
      marginBottom: 8,
    },
  }),
  { name: 'Metric' },
);
