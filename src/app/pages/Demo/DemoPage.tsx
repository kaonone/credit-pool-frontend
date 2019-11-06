import { empty } from 'rxjs';
import * as React from 'react';
import { Form } from 'react-final-form';

import { useApi } from 'services/api';
import { Typography, Loading } from 'components';
import { useSubscribable } from 'utils/reactHooks';
import { DecimalsField } from 'components/form/DecimalsField/DecimalsField';

import { DaiBalance } from './DaiBalance';
import { CompoundUsers } from './CompoundUsers';

export function DemoPage() {
  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.getEthAccount$(), []);
  const [balance, balanceMeta] = useSubscribable(() => {
    return account ? api.getDaiBalance$(account) : empty();
  }, [account]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
      <Form
        onSubmit={() => {}}
        initialValues={{ amount: '' }}
        subscription={{ submitError: true, submitting: true }}
      >
        {() => (
          <form onSubmit={() => {}}>
            <DecimalsField baseDecimals={0} name="amount" />
          </form>
        )}
      </Form>
      <Typography variant="h5">DAI balance from web3.eth.Contract</Typography>
      <Loading meta={accountMeta}>
        {account ? (
          <>
            <Typography>{account}</Typography>
            <Loading meta={balanceMeta}>
              <Typography>{balance && balance.toString()}</Typography>
            </Loading>
          </>
        ) : (
          <Typography color="error">Ethereum account is not found</Typography>
        )}
      </Loading>
      <Typography variant="h5">DAI balance from GraphQL</Typography>
      <DaiBalance />
      <Typography variant="h5">Compound users from GraphQL</Typography>
      <CompoundUsers />
    </div>
  );
}
