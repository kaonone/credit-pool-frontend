import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Hint } from './Hint/Hint';

interface IMeta {
  loaded: boolean;
  error: string | null;
}

interface IProps {
  children: React.ReactNode;
  meta: IMeta | IMeta[];
  variant?: 'hint';
  progressVariant?: 'linear' | 'circle';
}

const useStyles = makeStyles({
  linearProgress: {
    flexGrow: 1,
  },
});

export function Loading(props: IProps) {
  const classes = useStyles();
  const { children, variant, progressVariant, meta } = props;
  const metas = Array.isArray(meta) ? meta : [meta];

  const loaded = metas.every(value => value.loaded);
  const { error } = metas.find(value => value.error) || { error: null };

  const Wrapper = variant === 'hint' ? Hint : React.Fragment;

  return (
    <>
      {!loaded && (
        <Wrapper>
          {progressVariant === 'circle' ? (
            <CircularProgress />
          ) : (
            <LinearProgress className={classes.linearProgress} />
          )}
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
