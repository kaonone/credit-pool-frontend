import { makeStyles } from 'utils/styles';

const firstCellStyle = {
  paddingLeft: '50px',
};

const lastCellStyle = {
  paddingRight: '50px',
};

export const useStyles = makeStyles(theme => {
  const crossRowBorderStyleForFirstCell = {
    borderImage: `linear-gradient(to right, transparent 50px, ${theme.colors.jaguar} 50px) 1 / 0 0 1 0`,
    border: '1px solid',
  };

  const crossRowBorderStyleForLastCell = {
    borderImage: `linear-gradient(to right, ${theme.colors.jaguar} calc(100% - 50px), transparent calc(100% - 50px)) 1 / 0 0 1 0`,
    border: '1px solid',
  }

  const crossRowBorder = `1px solid ${theme.colors.jaguar}`;

  return {
    root: {
      width: '100%',
      borderSpacing: 0,

      '& tr:not($subtableRow) + $subtableRow $cell': {
        paddingTop: 30,
      },
    },

    withOuterPadding: {
      '& $cell:first-child': firstCellStyle,
      '& $cell:last-child': lastCellStyle,
    },

    withStripes: {
      '& $cellData': {
        borderBottom: crossRowBorder,

        '&:first-child': crossRowBorderStyleForFirstCell,
        '&:last-child': crossRowBorderStyleForLastCell,
      },
    },

    cell: {},

    title: {
      textAlign: 'left',
      fontWeight: 'normal',
      padding: '10px',
    },

    cellAlignLeft: {
      textAlign: 'left',
    },

    cellAlignRight: {
      textAlign: 'right',
    },

    cellAlignCenter: {
      textAlign: 'center',
    },

    topLevelTitle: {
      borderBottom: crossRowBorder,

      '&:first-child': crossRowBorderStyleForFirstCell,
      '&:last-child': crossRowBorderStyleForLastCell,
    },

    subtableRow: {
      backgroundColor: theme.colors.jaguar,
    },

    lastSubtableRow: {
      '& $cell': {
        paddingBottom: 30,
      },
    },

    cellData: {
      fontWeight: 300,
      padding: '10px',
    },

    singleCellExpandedArea: {
      padding: '10px 50px',
      backgroundColor: theme.colors.jaguar,
    },

    summaryCell: {
      paddingTop: 30,
    },

    rowBeforeSummary: {
      '& $cell': {
        borderBottom: crossRowBorder,

        '&:first-child': crossRowBorderStyleForFirstCell,
        '&:last-child': crossRowBorderStyleForLastCell,
      },
    },
  };
}, { name: 'Table' });
