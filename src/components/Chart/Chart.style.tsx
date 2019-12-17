import { Theme, makeStyles, colors } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },

  title: {
    fontWeight: 500,
    color: colors.topaz,
  },

  header: {
    marginBottom: theme.spacing(3),
  },

  headerTitle: {
    color: colors.topaz,
  },

  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: '-0.375rem',
  },

  membersCount: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    composes: '$avatarStub',
    backgroundColor: colors.athensGray,
    color: colors.haiti,
  },

  balance: {
    marginBottom: theme.spacing(1),
  },

  balanceValue: {
    marginRight: theme.spacing(1),
    lineHeight: 1.15,
  },

  graphic: {
    width: '100%',
    marginTop: theme.spacing(2),
    height: '260px',
  },
}));
