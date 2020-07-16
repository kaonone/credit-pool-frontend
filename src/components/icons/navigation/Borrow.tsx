import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

// tslint:disable:max-line-length
function Borrow(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && theme.gradients.main.svgLinear('BorrowIconGradient')}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <path
            fill="url(#BorrowIconGradient)"
            d="M11.998 22.207c5.618 0 10.248-4.64 10.248-10.259 0-5.607-4.64-10.248-10.248-10.248C6.38 1.7 1.75 6.34 1.75 11.948c0 5.618 4.64 10.259 10.248 10.259zm0-1.483c-4.855 0-8.766-3.91-8.766-8.776 0-4.855 3.9-8.766 8.766-8.766 4.856 0 8.766 3.91 8.776 8.766.011 4.866-3.91 8.776-8.776 8.776zm0-3.534c.193 0 .355-.086.516-.247l3.555-3.545c.108-.118.183-.28.183-.462 0-.354-.29-.623-.645-.623-.193 0-.343.065-.472.194l-1.45 1.471-1.096 1.246.075-1.987V7.383c0-.376-.28-.656-.666-.656-.376 0-.655.28-.655.656v5.854l.064 1.977-1.074-1.236-1.46-1.471c-.13-.119-.28-.194-.474-.194-.354 0-.633.269-.633.623 0 .183.064.344.182.462l3.545 3.545c.183.172.322.247.505.247z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M11.84 21.69c5.41 0 9.84-4.44 9.84-9.85S17.25 2 11.84 2 2 6.43 2 11.84s4.43 9.85 9.84 9.85zm0-.59a9.27 9.27 0 1 1 9.26-9.26c0 5.1-4.16 9.26-9.26 9.26zm0-4.06c.07 0 .14-.03.2-.1l3.94-3.93a.28.28 0 0 0 .08-.2.26.26 0 0 0-.27-.26.29.29 0 0 0-.21.1l-3.47 3.47.03-1.41V6.9c0-.18-.12-.3-.3-.3-.17 0-.3.12-.3.3v7.8l.03 1.4-3.46-3.46a.28.28 0 0 0-.21-.1.26.26 0 0 0-.27.26c0 .08.03.15.09.2l3.92 3.93c.06.07.13.1.2.1z"
          />
        )}
      </g>
    </SvgIcon>
  );
}

export { Borrow };
