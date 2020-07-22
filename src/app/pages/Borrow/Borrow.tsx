import React from 'react';

import { CreatingLoanProposalForm } from 'features/createLoanProposal';
import { makeStyles } from 'utils/styles';

export const Borrow: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <CreatingLoanProposalForm account="" onCancel={() => console.log('cancel')} />
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: 15,
  },

  form: {
    flex: 0.5,
  },
}), { name: 'BorrowPage' });
