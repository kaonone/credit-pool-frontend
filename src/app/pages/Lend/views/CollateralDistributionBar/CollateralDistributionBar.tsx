import * as React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';
import { PercentAmount } from 'model/entities';

type Props = {
  userProvided: PercentAmount;
  poolProvided: PercentAmount;
};

export function CollateralDistributionBar(props: Props) {
  const { poolProvided, userProvided } = props;
  const classes = useStyles(props);

  function renderPledgeDistribution() {
    return (
      <div className={classes.pledgeDistribution}>
        {!userProvided.isZero() && (
          <div
            className={cn(classes.barPart, classes.userProvided)}
            style={{
              width: `${userProvided.toNumber()}%`,
            }}
          />
        )}
        {!poolProvided.isZero() && (
          <div
            className={cn(classes.barPart, classes.poolProvided)}
            style={{
              left: `${userProvided.toNumber()}%`,
              width: `${poolProvided.toNumber()}%`,
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {renderPledgeDistribution()}
      <span>{poolProvided.add(userProvided).toFormattedString()}</span>
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
    barPart: {
      minWidth: 2,
      height: '100%',
      position: 'absolute',

      '&:first-child': {
        borderRadius: [[23, 0, 0, 23]],
      },

      '&:last-child': {
        borderRadius: [[0, 23, 23, 0]],
      },

      '&$userProvided': {
        background: 'linear-gradient(to top, #33a455, #6bff97)',
      },

      '&$poolProvided': {
        background: 'linear-gradient(to bottom, #c6b0ff, #9360ff)',
      },
    },

    userProvided: {},
    poolProvided: {},
  }),
  { name: 'CollateralDistributionBar' },
);
