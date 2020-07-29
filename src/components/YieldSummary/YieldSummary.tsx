import React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Label } from 'components/Label/Label';
import { PeriodSwitch } from 'components/BalanceChart/components/PeriodSwitch/PeriodSwitch';

import { useStyles } from './YieldSummary.style';

function YieldSummary() {
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Label fontSize="large" hasComingSoonLabel>
          {t(tKeysAll.components.yield.title.getKey())}
        </Label>
        <PeriodSwitch period="d" onSelect={() => {}} />
      </header>
      <div className={classes.chart} />
    </div>
  );
}

export { YieldSummary };
