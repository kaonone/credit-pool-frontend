import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
export const Switch: React.FC<React.ComponentProps<typeof SvgIcon>> = props => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M11.6 18.43c.42 0 .74-.32.74-.74 0-.2-.09-.4-.22-.53L6.8 11.97l5.3-5.2a.78.78 0 0 0 .23-.53.73.73 0 0 0-.75-.74.71.71 0 0 0-.52.22l-5.82 5.69a.75.75 0 0 0 0 1.12l5.82 5.68c.14.14.31.22.52.22zm6.6 0c.42 0 .74-.32.74-.74 0-.2-.08-.4-.22-.53l-5.31-5.2 5.3-5.19a.74.74 0 0 0 .23-.53.73.73 0 0 0-.75-.74c-.2 0-.38.08-.52.22l-5.82 5.69a.75.75 0 0 0 0 1.12l5.82 5.68c.14.14.32.22.52.22z"
      />
    </SvgIcon>
  );
};
