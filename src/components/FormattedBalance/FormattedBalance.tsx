import React, { FunctionComponent } from 'react';
import BN from 'bn.js';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

import { useFormattedBalance } from 'utils/react';
import { Loading } from 'components/Loading';
import { Token } from 'model/types';

interface IProps {
  sum: BN | string;
  token: Token;
  isWei?: boolean;
  children?: FunctionComponent<{ formattedBalance: string }>;
}

function FormattedBalance(props: IProps) {
  const { sum, token, children, isWei = true } = props;
  const [{ formattedBalance, notRoundedBalance }, formattedBalanceMeta] = useFormattedBalance(
    token,
    sum,
    isWei,
  );

  return (
    <Loading
      meta={formattedBalanceMeta}
      progressVariant="circle"
      progressProps={{ size: '0.8em', color: 'inherit' }}
    >
      <Tooltip title={notRoundedBalance}>
        <span>{children ? children({ formattedBalance }) : formattedBalance}</span>
      </Tooltip>
    </Loading>
  );
}

export { FormattedBalance };
