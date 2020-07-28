import * as React from 'react';
import BN from 'bn.js';
import moment from 'moment';

import { Metric, Label, FormattedAmount, Loading } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';
import { usePoolInfo } from 'features/poolInfo';
import { LiquidityAmount } from 'model/entities';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

const tKeys = tKeysAll.components.metrics.poolSize;

type Props = {
  title?: string;
  withoutEstablished?: boolean;
};

export function PoolSize(props: Props) {
  const { title = 'Pool size', withoutEstablished } = props;

  const { t } = useTranslate();
  const classes = useStyles();

  const api = useApi();
  const [liquidityCurrency, liquidityCurrencyMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [api],
  );
  const { lBalance, lDebt, gqlResult } = usePoolInfo();
  const value = React.useMemo(
    () =>
      liquidityCurrency
        ? new LiquidityAmount(new BN(lBalance).add(new BN(lDebt)), liquidityCurrency)
        : null,
    [lBalance, lDebt, liquidityCurrency],
  );

  const establishedDate = moment.utc('Jun-30-2020 02:06:47 PM');

  return (
    <Loading gqlResults={gqlResult} meta={liquidityCurrencyMeta}>
      {value && (
        <Metric
          title={<Label>{title}</Label>}
          value={<FormattedAmount sum={value} />}
          subValue={
            !withoutEstablished && (
              <span className={classes.established}>{`${t(
                tKeys.established.getKey(),
              )} ${establishedDate.format('DD MMMM YYYY')}`}</span>
            )
          }
        />
      )}
    </Loading>
  );
}

const useStyles = makeStyles(
  () => ({
    established: {
      fontSize: 12,
      fontWeight: 300,
    },
  }),
  { name: 'PoolSize' },
);
