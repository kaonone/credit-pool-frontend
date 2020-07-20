import * as React from 'react';
import cn from 'classnames';

import { Period, periods } from '../../models';
import { useStyles } from './PeriodSwitch.style';

interface IPeriodSwitchProps {
  period: Period;
  onSelect(period: Period): void;
}

function PeriodSwitch(props: IPeriodSwitchProps) {
  const { period: selectedPeriod, onSelect } = props;
  const classes = useStyles();

  const selectPeriod = React.useCallback(
    (period: Period) => () => {
      onSelect(period);
    },
    [onSelect],
  );

  return (
    <div className={classes.root}>
      {periods.map(period => (
        <button
          key={period}
          type="button"
          onClick={selectPeriod(period)}
          className={cn(classes.switchButton, {
            [classes.switchButtonSelected]: period === selectedPeriod,
            [classes.switchButtonInCaps]: period.search(/^\d+\w$/) !== -1,
          })}
        >
          {period}
        </button>
      ))}
    </div>
  );
}

export { PeriodSwitch };
