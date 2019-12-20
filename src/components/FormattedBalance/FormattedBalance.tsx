import React, { FunctionComponent } from 'react';
import BN from 'bn.js';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';
import { Loading } from 'components/Loading';
import { Token } from 'model/types';

interface IProps {
  sum: BN | string;
  token: Token;
  children?: FunctionComponent<{ formattedBalance: string }>;
}

function FormattedBalance(props: IProps) {
  const { sum, token, children } = props;
  const api = useApi();
  const [tokenInfo, tokenInfoMeta] = useSubscribable(() => api.getTokenInfo$(token), []);

  const formattedBalance =
    (tokenInfo &&
      formatBalance({
        amountInBaseUnits: sum,
        baseDecimals: tokenInfo.decimals,
        tokenSymbol: tokenInfo.symbol,
      })) ||
    '';

  return (
    <Loading
      meta={tokenInfoMeta}
      progressVariant="circle"
      progressProps={{ size: '0.8em', color: 'inherit' }}
    >
      {children ? children({ formattedBalance }) : formattedBalance}
    </Loading>
  );
}

export { FormattedBalance };
