import * as React from 'react';
import * as R from 'ramda';

import { useTranslate, tKeys } from 'services/i18n';
import { useTheme, makeStyles } from 'utils/styles';
import { CompositionChart } from 'components/CompositionChart/CompositionChart';

import { mockSectors } from './constants';

function PoolCompositionChart() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslate();

  const colors = React.useMemo(
    () =>
      theme.gradients.poolCompositionChart.map(({ points }, index) => ({
        sector: `url(#poolCompositionSector${index})`,
        label: R.last(points)!.color,
      })),
    [theme],
  );

  const renderGradients = () => (
    <svg>
      {theme.gradients.poolCompositionChart.map((gradient, index) => (
        <React.Fragment key={index}>
          {gradient.svgLinear(`poolCompositionSector${index}`)}
        </React.Fragment>
      ))}
    </svg>
  );

  return (
    <div className={classes.root}>
      <div className={classes.hidden}>{renderGradients()}</div>
      <CompositionChart
        title={t(tKeys.components.poolCompositionChart.title.getKey())}
        sectors={mockSectors}
        sectorColors={R.pluck('sector', colors)}
        labelColors={R.pluck('label', colors)}
      />
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
    hidden: {
      height: 0,
      visibility: 'hidden',
      width: 0,
    },
  }),
  { name: 'PoolCompositionChart' },
);

export { PoolCompositionChart };
