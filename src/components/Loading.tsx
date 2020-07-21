import React from 'react';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Skeleton, { SkeletonProps } from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SubscriptionResult } from '@apollo/react-common';
import { SubSet } from '_helpers';

import { CommunicationState } from 'utils/react';

interface IMeta {
  loaded: boolean;
  error?: string | null;
}

type MaybeArray<T> = T | T[];
type ProgressVariant = 'linear' | 'circle' | 'skeleton';

type DefaultProgressVariant = SubSet<ProgressVariant, 'skeleton'>;
const defaultProgressVariant: DefaultProgressVariant = 'skeleton';

interface IProps<V extends ProgressVariant> {
  children?: React.ReactNode;
  meta?: MaybeArray<IMeta>;
  communication?: MaybeArray<CommunicationState<any, any>>;
  gqlResults?: MaybeArray<SubscriptionResult>;
  component?: React.ComponentType;
  loader?: React.ReactNode;
  progressVariant?: V;
  progressProps?: {
    linear: LinearProgressProps;
    circle: CircularProgressProps;
    skeleton: SkeletonProps;
  }[V];
  ignoreError?: boolean;
}

const useStyles = makeStyles({
  linearProgress: {
    flexGrow: 1,
  },
});

function toArray<T>(value: MaybeArray<T>): T[] {
  return Array.isArray(value) ? value : [value];
}

function communicationsToMetas(values: MaybeArray<CommunicationState<any, any>>): IMeta[] {
  return toArray(values).map<IMeta>(value => ({
    loaded: value.status !== 'pending',
    error: value.error,
  }));
}

function gqlResultsToMetas(values: MaybeArray<SubscriptionResult>): IMeta[] {
  return toArray(values).map<IMeta>(value => ({
    loaded: typeof value.data !== 'undefined' || !value.loading,
    error: value.error?.message,
  }));
}

export function Loading<T extends ProgressVariant = DefaultProgressVariant>(props: IProps<T>) {
  const classes = useStyles();
  const {
    children,
    loader,
    progressVariant = defaultProgressVariant,
    progressProps,
    component,
    ignoreError,
    meta = [],
    communication = [],
    gqlResults = [],
  } = props;
  const metas = [
    ...toArray(meta),
    ...communicationsToMetas(communication),
    ...gqlResultsToMetas(gqlResults),
  ];

  const loaded = metas.every(value => value.loaded);
  const { error } = metas.find(value => value.error) || { error: null };

  const Wrapper = component || React.Fragment;

  const needToShowError = !!error && !ignoreError;

  return (
    <>
      {!loaded && (
        <Wrapper>
          {loader ||
            {
              linear: () => (
                <LinearProgress
                  className={classes.linearProgress}
                  {...(progressProps as LinearProgressProps)}
                />
              ),
              circle: () => <CircularProgress {...(progressProps as CircularProgressProps)} />,
              skeleton: () => <Skeleton {...(progressProps as SkeletonProps)} />,
            }[progressVariant]()}
        </Wrapper>
      )}
      {loaded && needToShowError && (
        <Wrapper>
          <Typography color="error">{error}</Typography>
        </Wrapper>
      )}
      {loaded && !needToShowError && children}
    </>
  );
}
