import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { NewTable, Loading, Typography, Hint } from 'components';
import { useDistributionEventsQuery, useDistributionClaimsByEventQuery } from 'generated/gql/pool';
import { useSubgraphPagination } from 'utils/react';

import * as tableData from './tableData';

function convertDistibutions(list: any, dealsList: any): tableData.Order[] {
  return list.map((order: any) => {
    const deals = dealsList.map((deal: any) => {
      if (order.id === deal.eventId) {
        return {
          date: deal.date,
          address: deal.user.id,
          currency: deal.pAmount,
        };
      }
      return {};
    });

    return {
      date: order.date,
      profit: order.amount,
      claimed: order.claimed,
      usersLength: order.poolState.usersLength,
      deals,
    };
  });
}

export function Profit() {
  const classes = useStyles();

  const { result } = useSubgraphPagination(useDistributionEventsQuery, {});
  const list = result.data?.distributionEvents || [];

  const resultDeals = useSubgraphPagination(useDistributionClaimsByEventQuery, {}).result;
  const dealsList = resultDeals.data?.earnings || [];

  const entries = convertDistibutions(list, dealsList);

  return (
    <div className={classes.root}>
      <Loading gqlResults={result}>
        {!list.length ? (
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
