import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Box, Typography, Card, CardContent } from 'components';
import { DistributionMetrics } from 'features/distibutions';

import { useStyles } from './Distributions.style';

const tKeys = tKeysAll.app.pages.overview;

function Distributions() {
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box mb={3}>
          <Typography className={classes.title} variant="subtitle2">
            {t(tKeys.distributions.getKey())}
          </Typography>
        </Box>
        <DistributionMetrics orientation="vertical" />
      </CardContent>
      <CardContent className={classes.actions}>Withdraw my distributions button</CardContent>
    </Card>
  );
}

export { Distributions };
