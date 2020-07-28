import moment from 'moment';

import { usePoolMetricsSubscription, usePoolMetricByDateSubscription } from 'generated/gql/pool';

export function usePoolInfo() {
  const poolMetricsGqlResult = usePoolMetricsSubscription();

  const {
    lBalance,
    lDebt,
    lProposals,
    usersLength,
    depositSum,
    withdrawSum,
    proposalsCount,
  } = poolMetricsGqlResult.data?.pools[0] || {
    lBalance: '0',
    lDebt: '0',
    lProposals: '0',
    usersLength: '0',
    depositSum: '0',
    withdrawSum: '0',
    proposalsCount: '0',
  };

  return {
    lBalance,
    lDebt,
    lProposals,
    usersLength,
    depositSum,
    withdrawSum,
    proposalsCount,
    gqlResult: poolMetricsGqlResult,
  };
}

export function usePoolInfoDayAgo() {
  const lastDay = moment().subtract(1, 'day').unix(); // Date in seconds

  const poolMetricsDayAgoGqlResult = usePoolMetricByDateSubscription({
    variables: {
      date: `0x${lastDay.toString(16)}`, // Date in seconds
    },
  });

  const lBalanceDayAgo = poolMetricsDayAgoGqlResult.data?.pools[0]?.lBalance || '0';
  const lDebtDayAgo = poolMetricsDayAgoGqlResult.data?.pools[0]?.lDebt || '0';
  const lProposalsDayAgo = poolMetricsDayAgoGqlResult.data?.pools[0]?.lProposals || '0';
  const usersLengthDayAgo = poolMetricsDayAgoGqlResult.data?.pools[0]?.usersLength || '0';
  const depositSumDayAgo = poolMetricsDayAgoGqlResult.data?.pools[0]?.depositSum || '0';
  const withdrawSumDayAgo = poolMetricsDayAgoGqlResult.data?.pools[0]?.withdrawSum || '0';

  return {
    lBalanceDayAgo,
    lDebtDayAgo,
    lProposalsDayAgo,
    usersLengthDayAgo,
    depositSumDayAgo,
    withdrawSumDayAgo,
    gqlResultDayAgo: poolMetricsDayAgoGqlResult,
  };
}
