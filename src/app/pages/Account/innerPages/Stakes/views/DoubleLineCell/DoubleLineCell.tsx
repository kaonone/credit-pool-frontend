import React from 'react';

import { useStyles } from './DoubleLineCell.style';

type Props = {
  renderTopPart(): React.ReactNode;
  renderBottomPart(): React.ReactNode;
};

export const DoubleLineCell: React.FC<Props> = props => {
  const classes = useStyles();
  const { renderBottomPart, renderTopPart } = props;

  return (
    <div className={classes.root}>
      <div className={classes.topPart}>{renderTopPart()}</div>
      <div className={classes.bottomPart}>{renderBottomPart()}</div>
    </div>
  );
};
