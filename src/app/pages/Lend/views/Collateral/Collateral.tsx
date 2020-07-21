import * as React from 'react';

import { makeStyles } from 'utils/styles';

type Props = {
  userProvided: number;
  poolProvided: number;
};

export function Collateral(props: Props) {
  const { poolProvided } = props;
  const classes = useStyles(props);

  function renderPledgeDistribution() {
    return (
      <div className={classes.pledgeDistribution}>
        <div className={classes.userProvidedPart} />
        <div className={classes.poolProvidedPart} />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {renderPledgeDistribution()}
      <span>{`${poolProvided}%`}</span>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    pledgeDistribution: {
      width: 60,
      height: 5,
      backgroundColor: '#0a0a0e',
      position: 'relative',
      borderRadius: 23,
      marginRight: 10,
    },
    userProvidedPart: {
      position: 'absolute',
      background: 'linear-gradient(to top, #33a455, #6bff97)',
      height: '100%',
      zIndex: 1,
      borderRadius: 23,
      width: ({ userProvided }) => `${userProvided + 5}%`, // 5 is for visual overlap
    },
    poolProvidedPart: {
      position: 'absolute',
      background: 'linear-gradient(to bottom, #c6b0ff, #9360ff)',
      borderRadius: 23,
      height: '100%',
      left: ({ userProvided }: Props) => `${userProvided}%`,
      width: ({ poolProvided }: Props) => `${poolProvided}%`,
    },
  }),
  { name: 'Collateral' },
);
