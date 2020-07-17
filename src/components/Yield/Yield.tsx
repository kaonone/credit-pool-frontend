import React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Title } from 'components/Title/Title';

import * as YieldChart from './images/chart-yield.svg';
import { Typography } from '@material-ui/core';

const periods = ['d', 'w', 'm', '6m', 'all'];

function Yield() {
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Title fontSize="large">
          {t(tKeysAll.components.yield.title.getKey())}
        </Title>
        <div className={classes.periodSwitch}>
          {periods.map(period => (
            <button
              type="button"
              className={cn(classes.switchButton, {
                [classes.switchButtonSelected]: period === 'd',
                [classes.switchButtonInCaps]: period.search(/^\d+\w$/) !== -1,
              })}
            >
              {period}
            </button>
        ))}
        </div>
      </header>
      <div className={classes.overlay}>
        <Typography variant="h4" component="span">Coming soon</Typography>
      </div>
      <div className={classes.chart} />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 10,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  periodSwitch: {
    display: 'flex',
  },

  switchButton: {
    minWidth: 30,
    height: 20,
    border: 0,
    borderRadius: 24,
    fontSize: 12,
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
    background: 'transparent',
    outline: 'none',
    cursor: 'pointer',

    '& + &': {
      marginLeft: 5,
      marginRight: 5,
    },
  },

  switchButtonSelected: {
    background:
      theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
  },

  switchButtonInCaps: {
    textTransform: 'uppercase',
  },

  chart: {
    flex: 1,
    background: `url('${YieldChart}') no-repeat center / contain`,
  },

  overlay: {
    position: 'absolute',
    borderRadius: 6,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    overflow: 'hidden',
    color: theme.palette.text.secondary,

    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: theme.palette.background.hint,
      opacity: 0.5,
      zIndex: -1,
    }
  },
}));

export { Yield };
