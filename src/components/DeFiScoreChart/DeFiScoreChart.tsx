import * as React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ProgressChart } from 'components/ProgressChart/ProgressChart';
import { Label } from 'components/Label/Label';

import { useStyles, CHART_WIDTH } from './DeFiScoreChart.style';

const tKeys = tKeysAll.components.deFiScoreChart;

function DeFiScoreChart() {
  const classes = useStyles();
  const { t } = useTranslate();

  const renderTitle = () => (
    <div className={classes.title}>
      <div>
        <Label>{t(tKeys.deFiScore.getKey())}</Label>
      </div>
      <div className={classes.score}>7.4</div>
    </div>
  );

  return (
    <div className={classes.root}>
      <div className={classes.label}>0</div>
      <div className={classes.chart}>
        <ProgressChart
          value={7.4}
          total={10}
          renderTitle={renderTitle}
          innerRadius="93%"
          startAngle={210}
          endAngle={-30}
          cy={CHART_WIDTH / 2}
        />
      </div>
      <div className={classes.label}>10</div>
    </div>
  );
}

export { DeFiScoreChart };
