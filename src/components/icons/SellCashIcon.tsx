import * as React from 'react';
import { GetProps } from '_helpers';
import SvgIcon from '@material-ui/core/SvgIcon';

function SellCashIcon(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.354 3.6036C10.1587 3.40834 9.84213 3.40834 9.64687 3.6036L7.51256 5.73791C7.32357 5.9269 7.45742 6.25005 7.72469 6.25005L9.25042 6.25005L9.25043 13H10.7504L10.7504 6.25005H12.2762C12.5434 6.25005 12.6773 5.9269 12.4883 5.73791L10.354 3.6036Z"
        fill="#613AAF"
      />
      <path
        opacity="0.8"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.75 3.25H13.6812C13.4477 3.25 13.3038 3.50497 13.4243 3.70492L14.05 4.7425H16.75V15.265H3.25V4.7425H5.95L6.57568 3.70492C6.69625 3.50497 6.55226 3.25 6.31877 3.25H3.25C2.425 3.25 1.75 3.925 1.75 4.75V15.25C1.75 16.075 2.425 16.75 3.25 16.75H16.75C17.575 16.75 18.25 16.075 18.25 15.25V4.75C18.25 3.925 17.575 3.25 16.75 3.25Z"
        fill="#613AAF"
      />
    </SvgIcon>
  );
}

export { SellCashIcon };
