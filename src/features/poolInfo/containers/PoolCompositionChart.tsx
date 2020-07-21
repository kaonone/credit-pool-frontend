import * as React from 'react';
import * as R from 'ramda';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useTheme, makeStyles } from 'utils/styles';
import { mockSectors } from 'utils/mock';
import { CompositionChart, ComingSoon } from 'components';

const tKeys = tKeysAll.components.poolCompositionChart;

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

  const renderGradients = React.useCallback(
    () => (
      <svg>
        {theme.gradients.poolCompositionChart.map((gradient, index) => (
          <React.Fragment key={index}>
            {gradient.svgLinear(`poolCompositionSector${index}`)}
          </React.Fragment>
        ))}
      </svg>
    ),
    [theme],
  );

  return (
    <div className={classes.root}>
      <div className={classes.hidden}>{renderGradients()}</div>
      <CompositionChart
        title={t(tKeys.poolComposition.getKey())}
        chartData={mockSectors}
        sectorColors={R.pluck('sector', colors)}
        labelColors={R.pluck('label', colors)}
      />
      <ComingSoon position="overlay" />
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      padding: 10,
    },
    hidden: {
      height: 0,
      visibility: 'hidden',
      width: 0,
      position: 'absolute',
      zIndex: -100,
    },
  }),
  { name: 'PoolCompositionChart' },
);

export { PoolCompositionChart };
