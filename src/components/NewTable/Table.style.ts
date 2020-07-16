import { makeStyles } from 'utils/styles';

const cellStyle = {
  padding: '10px 0px',
};

const firstCellStyle = {
  paddingLeft: '50px',
};

const lastCellStyle = {
  paddingRight: '50px',
};

const headStyle = {
  textAlign: 'left',
  ...cellStyle,
};

const crossRowBorder = '1px solid rgba(255, 255, 255, 0.1)';

export const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '100%',
      borderSpacing: 0,

      '& th': headStyle,

      '& thead th': {
        paddingBottom: 0,
      },

      '& td:first-child': firstCellStyle,
      '& th:first-child': firstCellStyle,

      '& th:last-child': lastCellStyle,

      '& td:last-child': {
        ...lastCellStyle,
        paddingRight: '50px',
      },

      '& tbody td': {
        fontWeight: 300,
      },

      '& td': {
        padding: 0,
      },

      '& th:first-child $title': {
        marginLeft: 10,
        paddingRight: 10,
      },
    },

    title: {
      height: 40,
      borderBottom: crossRowBorder,
    },

    singleCellExpandedArea: {
      backgroundColor: theme.colors.jaguar,
    },

    subtableRow: {
      backgroundColor: theme.colors.jaguar,
    },

    cellContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '10px',
      height: 55,
    },

    summary: {
      marginTop: 30,
      padding: '0 10px',
    },

    rowBeforeSummary: {
      '& $cellContent': {
        borderBottom: crossRowBorder,
      },

      '& td:first-child $cellContent': {
        paddingLeft: 0,
        marginLeft: 10,
      },
    },
  };
});
