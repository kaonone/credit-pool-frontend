import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(() => ({
  root: {
    '& path': {
      fill: 'url(#grad) #fff',
    },
  },
}), { name: 'icon' });
