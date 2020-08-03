import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

// tslint:disable:max-line-length
function History(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && theme.gradients.main.svgLinear('HistoryIconGradient')}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <path
            fill="url(#HistoryIconGradient)"
            d="M11.998 22.207c5.618 0 10.248-4.64 10.248-10.259 0-5.607-4.64-10.248-10.248-10.248C6.38 1.7 1.75 6.34 1.75 11.948c0 5.618 4.64 10.259 10.248 10.259zm0-1.483c-4.855 0-8.766-3.91-8.766-8.776 0-4.855 3.9-8.766 8.766-8.766 4.856 0 8.766 3.91 8.776 8.766.011 4.866-3.91 8.776-8.776 8.776zm0-7.745c.344 0 .612-.268.612-.612V5.352c0-.343-.268-.612-.612-.612s-.612.269-.612.612v6.403H6.563c-.344 0-.613.268-.613.612s.269.612.612.612h5.436z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M11.84 21.69c5.414 0 9.84-4.436 9.84-9.85S17.254 2 11.84 2 2 6.426 2 11.84s4.426 9.85 9.84 9.85zm0-.59c-5.103 0-9.26-4.158-9.26-9.26 0-5.103 4.157-9.25 9.26-9.25 5.102 0 9.26 4.147 9.26 9.25 0 5.102-4.158 9.26-9.26 9.26zm0-8.465c.172 0 .29-.13.29-.301V4.771c0-.16-.118-.279-.29-.279-.15 0-.269.118-.269.28v7.293H5.975c-.172 0-.29.13-.29.269 0 .172.118.3.29.3h5.865z"
          />
        )}
      </g>
    </SvgIcon>
  );
}

export { History };
