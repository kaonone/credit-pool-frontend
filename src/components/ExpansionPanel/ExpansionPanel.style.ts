import { makeStyles, Theme } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none',
    background: 'none',
  },

  toggleExpandIcon: {
    position: 'relative',
    top: '0.25em',
    marginRight: theme.spacing(1),
    color: theme.palette.type === 'dark' ? theme.colors.heliotrope : theme.colors.royalPurple,

    '&$expanded': {
      transform: 'rotate(180deg)',
    },
  },

  summary: {
    padding: 0,
  },

  summaryContent: {
    width: 0,
    color: theme.palette.text.secondary,
  },

  summaryTitle: {
    color: theme.palette.type === 'dark' ? theme.colors.heliotrope : theme.colors.royalPurple,
  },

  expanded: {},
}));
