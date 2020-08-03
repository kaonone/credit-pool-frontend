import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

// tslint:disable:max-line-length
function Lend(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && theme.gradients.main.svgLinear('LendIconGradient')}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <path
            fill="url(#LendIconGradient)"
            d="M11.998 22.107c5.618 0 10.248-4.64 10.248-10.259 0-5.607-4.64-10.248-10.248-10.248C6.38 1.6 1.75 6.24 1.75 11.848c0 5.618 4.64 10.259 10.248 10.259zm0-1.483c-4.855 0-8.766-3.91-8.766-8.776 0-4.855 3.9-8.766 8.766-8.766 4.856 0 8.766 3.91 8.776 8.766.011 4.866-3.91 8.776-8.776 8.776zM8.41 15.737c.215 0 .376-.075.505-.204l4.125-4.125 1.354-1.44-.119 1.633v2.052c0 .408.258.676.645.676s.644-.29.644-.698V8.68c0-.516-.29-.72-.73-.72H9.86c-.419 0-.676.247-.676.634s.268.645.687.645h2.213l1.482-.13-1.45 1.365-4.136 4.136c-.128.129-.214.3-.214.472 0 .398.257.656.644.656z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M11.84 21.69c5.414 0 9.84-4.436 9.84-9.85S17.254 2 11.84 2 2 6.426 2 11.84s4.426 9.85 9.84 9.85zm0-.59c-5.103 0-9.26-4.158-9.26-9.26 0-5.103 4.157-9.25 9.26-9.25 5.102 0 9.26 4.147 9.26 9.25 0 5.102-4.158 9.26-9.26 9.26zm-3.717-5.5c.107 0 .183-.043.236-.097l5.511-5.51.956-1-.01 1.826v3.062c0 .182.118.3.29.3.16 0 .268-.118.268-.31V8.348c0-.183-.107-.301-.28-.301H9.553c-.183 0-.301.107-.301.268 0 .172.118.28.3.28h4.9l-1 .966-5.521 5.522c-.054.054-.097.129-.097.226 0 .171.118.29.29.29z"
          />
        )}
      </g>
    </SvgIcon>
  );
}

export { Lend };
