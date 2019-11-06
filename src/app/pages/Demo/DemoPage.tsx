import { empty } from 'rxjs';
import * as React from 'react';
import { Form } from 'react-final-form';

import { useApi } from 'services/api';
import { DecimalsField, TextInputField } from 'components/form';
import { Typography, Loading, CircularProgress, Hint, Button, Grid } from 'components';
import { useSubscribable } from 'utils/reactHooks';
import { composeValidators, validateInteger, validatePositiveNumber } from 'utils/validators';

import { DaiBalance } from './DaiBalance';
import { CompoundUsers } from './CompoundUsers';

export function DemoPage() {
  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.getEthAccount$(), []);
  const [balance, balanceMeta] = useSubscribable(() => {
    return account ? api.getDaiBalance$(account) : empty();
  }, [account]);

  const initialFormValues = React.useMemo(
    () => ({
      amount: '',
      name: '',
      surname: '',
    }),
    [],
  );

  const validate = React.useMemo(() => {
    return composeValidators(validateInteger, validatePositiveNumber);
  }, []);

  const onSubmit = React.useCallback(
    // eslint-disable-next-line no-console
    (values: { amount: string; name: string; surname: string }) => console.log(values),
    [],
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={5}>
          <Form
            onSubmit={onSubmit}
            initialValues={initialFormValues}
            subscription={{ submitError: true, submitting: true }}
          >
            {({ handleSubmit, submitError, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={12}>
                    <DecimalsField
                      validate={validate}
                      baseDecimals={0}
                      name="amount"
                      placeholder="amount"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInputField variant="outlined" fullWidth name="name" placeholder="name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInputField
                      variant="outlined"
                      fullWidth
                      name="surname"
                      placeholder="surname"
                    />
                  </Grid>
                  {!!submitError && (
                    <Grid item xs={12}>
                      <Hint>
                        <Typography color="error">{submitError}</Typography>
                      </Hint>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      disabled={submitting}
                    >
                      {submitting ? <CircularProgress size={24} /> : 'submit'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Form>
        </Grid>
      </Grid>
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
