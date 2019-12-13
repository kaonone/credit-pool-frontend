import { makeStyles, Theme, colors } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '0.25rem',
    backgroundColor: colors.white,
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
  },

  mainInformation: {
    padding: theme.spacing(2),
  },

  metrics: {
    color: colors.haiti,
  },

  highlightedMetric: {
    color: colors.royalPurple,
  },

  lendIcon: {
    fontSize: theme.spacing(2.5),
    display: 'block',
  },

  collateral: {
    borderLeft: `solid ${colors.athensGray} 1px`,
    padding: theme.spacing(2),
  },

  votingForIcon: {
    marginRight: theme.spacing(1),
    composes: '$votingIcon',
    color: colors.shamrock,
  },

  votingAgainstIcon: {
    marginRight: theme.spacing(1),
    composes: '$votingIcon',
    color: colors.geraldine,
  },
}));
