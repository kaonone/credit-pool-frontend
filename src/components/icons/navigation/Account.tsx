import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

// tslint:disable:max-line-length
function Account(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && theme.gradients.main.svgLinear('AccountIconGradient')}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <path
            fill="url(#AccountIconGradient)"
            d="M12 12.3c2.4 0 4.32-2.11 4.32-4.71C16.32 5.03 14.39 3 12 3S7.68 5.06 7.69 7.6c.01 2.6 1.93 4.7 4.32 4.7zm0-1.33c-1.58 0-2.9-1.47-2.9-3.37-.01-1.84 1.3-3.28 2.9-3.28 1.6 0 2.9 1.42 2.9 3.27 0 1.89-1.3 3.38-2.9 3.38zm6.48 10.67c1.56 0 2.3-.49 2.3-1.55 0-2.65-3.34-6.46-8.78-6.46-5.46 0-8.8 3.8-8.8 6.46 0 1.06.74 1.55 2.31 1.55h12.96zm.38-1.32H5.12c-.38 0-.51-.11-.51-.38 0-1.84 2.66-4.98 7.39-4.98 4.72 0 7.39 3.14 7.39 4.98 0 .27-.14.38-.53.38z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M12.03 11.88c2.28 0 4.04-1.95 4.04-4.49C16.07 5 14.25 3 12.03 3 9.8 3 7.97 5 7.99 7.4c.03 2.53 1.76 4.48 4.04 4.48zm0-.58c-1.95 0-3.45-1.68-3.45-3.9-.03-2.09 1.54-3.82 3.45-3.82 1.9 0 3.46 1.72 3.46 3.81 0 2.23-1.52 3.91-3.46 3.91zm6.82 9.68c1.13 0 1.67-.38 1.67-1.27 0-2.6-3.28-6.24-8.51-6.24S3.5 17.1 3.5 19.71c0 .89.54 1.27 1.67 1.27h13.68zm.02-.57H5.14c-.8 0-1.06-.19-1.06-.7 0-2.38 2.96-5.66 7.93-5.66s7.91 3.28 7.91 5.65c0 .52-.24.71-1.05.71z"
          />
        )}
      </g>
    </SvgIcon>
  );
}

export { Account };
