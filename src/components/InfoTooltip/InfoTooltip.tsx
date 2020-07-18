import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { InfoIconV2 } from 'components/icons';

type Props = Omit<React.ComponentProps<typeof Tooltip>, 'children'>;

export const InfoTooltip: React.FC<Props> = props => {
  return (
    <Tooltip {...props}>
      <span>
        <InfoIconV2 fontSize="small" />
      </span>
    </Tooltip>

  );
};
