import { makeStyles, Theme, colors } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '0.25rem',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
  },

  mainInformation: {
    padding: theme.spacing(2),
  },

  metrics: {
    color: theme.palette.text.primary,
  },

  asideContent: {
    borderLeft: `solid ${colors.athensGray} 1px`,
    padding: theme.spacing(2),
  },
}));
