import * as React from 'react';
import { useMemo } from 'react';

import { makeStyles } from 'utils/styles';
import { NewTable, Loading, Typography, Hint } from 'components';
import { useDistributionEventsQuery, DistributionEventsQuery } from 'generated/gql/pool';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import { Token, TokenAmount } from 'model/entities';
import { useApi } from 'services/api';
import { ETH_NETWORK_CONFIG } from 'env';

import * as tableData from './tableData';

function convertDistributions(
  list: DistributionEventsQuery['distributionEvents'],
  pToken: Token,
): tableData.Order[] {
  return list.map<tableData.Order>(order => {
    return {
      date: parseInt(order.date, 10) * 1000,
      profit: new TokenAmount(order.amount, pToken),
      claimed: new TokenAmount(order.claimed, pToken),
      usersLength: parseInt(order.poolState.usersLength, 10),
      claims: order.claims.map<tableData.Claim>(claim => ({
        address: claim.user.id,
        amount: new TokenAmount(claim.pAmount, pToken),
        date: parseInt(claim.date, 10) * 1000,
      })),
    };
  });
}

export function Profit() {
  const classes = useStyles();

  const api = useApi();
  const [pToken, pTokenMeta] = useSubscribable(
    () => api.erc20.getToken$(ETH_NETWORK_CONFIG.contracts.ptk),
    [api],
  );

  const { result } = useSubgraphPagination(useDistributionEventsQuery, {});
  const list = result.data?.distributionEvents || [];

  const entries = useMemo(() => (pToken ? convertDistributions(list, pToken) : []), [pToken, list]);

  return (
    <div className={classes.root}>
      <Loading gqlResults={result} meta={pTokenMeta}>
        {!entries.length ? (
          <Hint>
            <Typography>Not found</Typography>
          </Hint>
        ) : (
          <NewTable.Component
            withOuterPadding
            columns={tableData.columnsWithSubtable}
            entries={entries}
          />
        )}
      </Loading>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
  }),
  { name: 'MySummary' },
);
