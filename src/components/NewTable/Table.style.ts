import { makeStyles } from 'utils/styles';

const cellStyle = {
  padding: '20px 0',
}

const firstCellStyle = {
  paddingLeft: '50px',
}

const headStyle = {
  textAlign: 'left',
  ...cellStyle,
}

export const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '100%',
      borderSpacing: 0,

      '& th': headStyle,

      '& thead th': {
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '16px',
      },

      '& td:first-child': firstCellStyle,
      '& th:first-child': firstCellStyle,

      '& td:last-child': {
        paddingRight: '50px',
      },

      '& td': cellStyle,

      '& tbody td': {
        fontWeight: 300,
      },
    },

    singleCellExpandedArea: {
      backgroundColor: theme.colors.jaguar,
    },

    subtableRow: {
      backgroundColor: theme.colors.jaguar,
    },
  };
});
