import React from 'react';

import { makeStyles } from 'utils/styles';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import { useMyIssuedLoansQuery, useMyPendingLoansQuery } from 'generated/gql/pool';
import { Loading } from 'components';
import { useApi } from 'services/api';

import { LoansTable } from '../components/LoansTable';

type Props = {
  title: string;
  filter: 'issued' | 'pending';
};

export const MyStakes: React.FC<Props> = ({ title, filter }) => {
  const classes = useStyles();
  const api = useApi();

  const [account] = useSubscribable(() => api.web3Manager.account, []);

  const useQuery = filter === 'issued' ? useMyIssuedLoansQuery : useMyPendingLoansQuery;
  const { result } = useSubgraphPagination(useQuery, {
    supporters: [account?.toLowerCase() || ''],
  });
  const debts = result.data?.debts || [];

  return (
    <div className={classes.root}>
      <div className={classes.tableTitle}>{title}</div>
      <Loading gqlResults={result} progressVariant="circle">
        <LoansTable type={filter} debts={debts} account={account} />
      </Loading>
    </div>
  );
};

export const useStyles = makeStyles(
  () => ({
    root: {},

    tableTitle: {
      marginBottom: 20,
    },
  }),
  { name: 'MyStakes' },
);
