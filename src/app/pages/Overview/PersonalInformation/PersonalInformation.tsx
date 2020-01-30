import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { PoolMetrics } from 'features/poolInfo';
import { GetLoanButton } from 'features/cashExchange';
import { Loading, Box, Typography, Card, CardContent } from 'components';

import { useStyles } from './PersonalInformation.style';

const tKeys = tKeysAll.app.pages.overview;

function PersonalInformation() {
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Loading progressVariant="circle">
      <Card className={classes.root}>
        <CardContent>
          <Box mb={3}>
            <Typography className={classes.title} variant="subtitle2">
              {t(tKeys.poolInfoTitle.getKey())}
            </Typography>
          </Box>
          <PoolMetrics orientation="vertical" />
        </CardContent>
        <CardContent className={classes.actions}>
          <GetLoanButton />
        </CardContent>
      </Card>
    </Loading>
  );
}

export { PersonalInformation };
