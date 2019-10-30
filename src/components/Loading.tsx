import React from 'react';
import { Paper, LinearProgress, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

interface IMeta {
  loaded: boolean;
  error: string | null;
}

interface IProps {
  children: React.ReactNode;
  meta: IMeta | IMeta[];
  variant?: 'paper';
  progressVariant?: 'linear' | 'circle';
}

const useStyles = makeStyles({
  linearProgress: {
    flexGrow: 1,
  },
});

const StyledPaper = withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.spacing(6),
    padding: theme.spacing(1.5),
    borderRadius: '0.25rem',
    textAlign: 'center',
  },
}))(Paper);

export function Loading(props: IProps) {
  const classes = useStyles();
  const { children, variant, progressVariant, meta } = props;
  const metas = Array.isArray(meta) ? meta : [meta];

  const loaded = metas.every(value => value.loaded);
  const { error } = metas.find(value => value.error) || { error: null };

  const Wrapper = variant === 'paper' ? StyledPaper : React.Fragment;

  return (
    <>
      {!loaded && (
        <Wrapper>
          {progressVariant === 'circle' ? <CircularProgress /> : <LinearProgress className={classes.linearProgress} />}
        </Wrapper>
      )}
      {loaded && !!error && (
        <Wrapper>
          <Typography color="error">{error}</Typography>
        </Wrapper>
      )}
      {loaded && !error && children}
    </>
  );
}
