import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { empty } from 'rxjs';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';
import { Metric, Label, FormattedAmount, Loading } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { progressProps } from './common';

const tKeys = tKeysAll.components.metrics.myPoolShare;

export function MyPoolShare() {
  const classes = useStyles();
  const { t } = useTranslate();

  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);
  const [userShare, userShareMeta] = useSubscribable(
    () => (account ? api.pToken.getUserShare$(account) : empty()),
    [api, account],
  );
  const [currentLiquidity, currentLiquidityMeta] = useSubscribable(
    () => api.fundsModule.getCurrentLiquidity$(),
    [api],
  );

  return (
    <Metric
      title={<Label hint={t(tKeys.description.getKey())}>{t(tKeys.myPoolShare.getKey())}</Label>}
      value={
        <Loading meta={userShareMeta} progressProps={progressProps}>
          {userShare && <FormattedAmount sum={userShare} />}
        </Loading>
      }
      subValue={
        <>
          <Loading meta={currentLiquidityMeta} progressProps={progressProps}>
            {currentLiquidity && <FormattedAmount sum={currentLiquidity} />}
          </Loading>
          <Typography className={classes.totalLiquidity}>
            {t(tKeys.totalPoolLiquidity.getKey())}
          </Typography>
        </>
      }
    />
  );
}

const useStyles = makeStyles(
  () => ({
    totalLiquidity: {
      fontSize: 12,
      fontWeight: 300,
    },
  }),
  { name: 'MyPoolShare' },
);
