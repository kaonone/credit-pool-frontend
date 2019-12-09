import * as React from 'react';
import { GetProps } from '_helpers';
import SvgIcon from '@material-ui/core/SvgIcon';

function BuyCashIcon(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path
        opacity="0.8"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.75 3.25H12.75C12.4739 3.25 12.25 3.47386 12.25 3.75V4.2425C12.25 4.51864 12.4739 4.7425 12.75 4.7425H16.75V15.265H3.25V4.7425H7.25C7.52614 4.7425 7.75 4.51864 7.75 4.2425V3.75C7.75 3.47386 7.52614 3.25 7.25 3.25H3.25C2.425 3.25 1.75 3.925 1.75 4.75V15.25C1.75 16.075 2.425 16.75 3.25 16.75H16.75C17.575 16.75 18.25 16.075 18.25 15.25V4.75C18.25 3.925 17.575 3.25 16.75 3.25Z"
        fill="#613AAF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.6475 12.6463C9.84276 12.8416 10.1593 12.8416 10.3546 12.6463L12.4889 10.512C12.6779 10.323 12.5441 9.99988 12.2768 9.99988H10.7511V3.74988C10.7511 3.47374 10.5272 3.24988 10.2511 3.24988H9.75105C9.47491 3.24988 9.25105 3.47374 9.25105 3.74988V9.99988H7.72531C7.45804 9.99988 7.32419 10.323 7.51318 10.512L9.6475 12.6463Z"
        fill="#613AAF"
      />
    </SvgIcon>
  );
}

export { BuyCashIcon };
