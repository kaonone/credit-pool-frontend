import React from 'react';

import { CreatingLoanProposalForm } from 'features/createLoanProposal';
import { makeStyles } from 'utils/styles';

import { WithAccount } from '../../components/WithAccount/WithAccount';

export const Borrow: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <WithAccount>{({ account }) => <CreatingLoanProposalForm account={account} />}</WithAccount>
      </div>
    </div>
  );
};

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      height: '100%',
    },

    form: {
      flex: 0.5,
    },
  }),
  { name: 'BorrowPage' },
);
