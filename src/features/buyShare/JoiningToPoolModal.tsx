import React, { useCallback, useState } from 'react';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { useApi } from 'services/api';
import { useSubscribable, useOnChangeState } from 'utils/react';
import { Dialog, DialogContent } from 'components';
import { makeStyles } from 'utils/styles';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { BuyingShareForm } from './BuyingShareForm';

export function JoiningToPoolModal() {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const classes = useStyles();

  const api = useApi();

  const [balance] = useSubscribable(
    () =>
      api.web3Manager.account.pipe(
        switchMap(account => (account ? api.erc20.getPtkBalance$(account) : of(null))),
      ),
    [api],
    null,
  );

  useOnChangeState(balance, (prev, cur) => !prev && !!cur && cur.isZero(), open);

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={close}>
      <DialogContent className={classes.dialogContent}>
        <WithAccount>
          {({ account }) => <BuyingShareForm onCancel={close} account={account} />}
        </WithAccount>
      </DialogContent>
    </Dialog>
  );
}

const useStyles = makeStyles(theme => ({
  dialogContent: {
    padding: theme.spacing(2.5),
  },
}));
