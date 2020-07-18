import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(() => ({
  root: {
    overflow: 'auto',

    titleWithDescription: {},

    description: {
      position: 'absolute',
    }
  },
}), { name: 'IssuedLoansTable' });
