import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export function makeIcon(IconComponent: React.FC): React.FC {
  return () => {

    return (
      <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24">
          <defs>
            <linearGradient id="grad" x1="100%" x2="0%" y1="50%" y2="50%">
              <stop offset="0%" stopColor="#544CF2" />
              <stop offset="100%" stopColor="#D93CEF" />
            </linearGradient>
          </defs>
          <IconComponent />
        </svg>
      </SvgIcon>
    )
  };
}
