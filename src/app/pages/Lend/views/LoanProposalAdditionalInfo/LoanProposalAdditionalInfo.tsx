import * as React from 'react';

import { makeStyles } from 'utils/styles';

type Props = {
  reason: string;
  riskScore: string;
};

export function LoanProposalAdditionalInfo(props: Props) {
  const { reason, riskScore } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        Reason: <em className={classes.reason}>{reason}</em>
      </div>
      <div>
        Risk Score: <span className={classes.riskScoreValue}>{riskScore}</span>
      </div>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 300,
    },
    reason: {
      fontStyle: 'italic',
    },
    riskScoreValue: {
      color: '#6bff97',
      fontSize: 22,
    },
  }),
  { name: 'LoanProposalAdditionalInfo' },
);
