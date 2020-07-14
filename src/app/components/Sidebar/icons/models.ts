import { GetProps } from '_helpers';
import SvgIcon from '@material-ui/core/SvgIcon';

type Props = {
  withGradient?: boolean;
};

export type SidebarIconProps = Props & GetProps<typeof SvgIcon>;
