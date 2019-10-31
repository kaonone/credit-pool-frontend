import * as React from 'react';
import BN from 'bn.js';

import { useUsersQuery } from 'generated/compaund-graphql';
import { Loading, Typography } from 'components';

export function CompoundUsers() {
  const { data, error, loading } = useUsersQuery({ variables: { first: 5 } });
  return (
    <Loading meta={{ error: error ? error.message : null, loaded: !loading }}>
      {data && data.users.length
        ? data.users.map(item => (
            <Typography component="pre" gutterBottom key={item.id}>
              User ID: {item.id}
              {'\t'}
              cTokens:{' '}
              {item.cTokens
                .reduce<BN>(
                  (acc, cur) => acc.add(new BN(cur.cTokenBalance.replace(/^(\d+)\.?.*$/, '$1'))),
                  new BN(0),
                )
                .toString()}
            </Typography>
          ))
        : 'Compound users is not found'}
    </Loading>
  );
}
