import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.primary,
      textDecoration: 'none',
      fontSize: 16,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      opacity: 0.5,

      '&:hover': {
        opacity: 1,

        '& $label': {
          opacity: 0.75,
        },
      },
    },

    active: {
      opacity: 1,
    },

    icon: {
      fontSize: 24,
    },

    label: {
      '$icon + &': {
        marginLeft: 12,
      },
    },
  }),
  { name: 'Link' },
);
