import React from 'react';

import { InfoTooltip } from 'components';
import { useStyles } from './LabelWithInfoTooltip.style';

type Props = {
  renderLabel(): React.ReactNode;
  tooltipText: string;
}

export const LabelWithInfoTooltip: React.FC<Props> = props => {
  const classes = useStyles();
  const { renderLabel, tooltipText } = props;

  return (
    <div className={classes.root}>
      {renderLabel()}
      <div className={classes.tooltip}>
        <InfoTooltip title={tooltipText} />
      </div>
    </div>
  );
};
