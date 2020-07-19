import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function ProfitArrow(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 9 12">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.648 11.248c.311 0 .534-.223.534-.533V3.566L5.14 2.377l1.582 1.746 1.265 1.248c.094.094.235.147.381.147.293 0 .516-.223.516-.522 0-.14-.053-.27-.17-.387L5.047.936C4.936.818 4.795.754 4.648.754c-.146 0-.287.064-.398.182L.582 4.609c-.117.118-.17.246-.17.387 0 .299.223.522.516.522.146 0 .287-.053.38-.147l1.26-1.248 1.588-1.752-.04 1.195v7.149c0 .31.216.533.532.533z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export { ProfitArrow };
