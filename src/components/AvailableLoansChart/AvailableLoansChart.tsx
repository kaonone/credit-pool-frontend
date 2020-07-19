import * as React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ProgressChart } from 'components/ProgressChart/ProgressChart';
import { Title, FormattedAmount } from 'components';
import { liquidityAmount } from 'utils/mock';

import { useStyles, CHART_WIDTH } from './AvailableLoansChart.style';

const tKeys = tKeysAll.components.availableLoansChart;

function AvailableLoansChart() {
  const classes = useStyles();
  const { t } = useTranslate();

  const renderTitle = () => (
    <div className={classes.label}>
      <div className={classes.title}>
        <Title>{t(tKeys.totalAvailable.getKey())}</Title>
      </div>
      <div className={classes.sum}>
        <FormattedAmount sum={liquidityAmount} />
      </div>
      <div className={classes.percentage}>70.00%</div>
    </div>
  );

  return (
    <div className={classes.root}>
      <ProgressChart
        value={70}
        total={100}
        renderTitle={renderTitle}
        innerRadius="95%"
        startAngle={190}
        endAngle={-10}
        cy={CHART_WIDTH / 2}
      />
    </div>
  );
}

export { AvailableLoansChart };
