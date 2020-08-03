import * as React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import { NewTable, AccountAddress, FormattedAmount, Hint } from 'components';
import { makeStyles } from 'utils/styles';
import { LoanToLiquidate } from 'model/loans';

type Props = {
  upcomingLoans: LoanToLiquidate[];
};

const columns: Array<NewTable.models.Column<LoanToLiquidate>> = [
  {
    renderTitle: () => 'Borrower',
    cellContent: {
      kind: 'simple',
      render: x => <AccountAddress address={x.borrower} size="small" />,
    },
  },

  {
    renderTitle: () => 'Loan Granted',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.loanGranted} />,
    },
  },

  {
    renderTitle: () => 'Repayment Due',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <>{moment(x.repaymentDue).format('DD.MM.YYYY')}</>,
    },
  },
];

export function UpcomingLiquidationsTable(props: Props) {
  const { upcomingLoans } = props;
  const classes = useStyles();

  function renderTableHeader() {
    return (
      <div className={classes.tableHeader}>
        <div className={classes.tableTitle}>Upcoming Liquidations</div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {renderTableHeader()}
      {!upcomingLoans.length ? (
        <Hint>
          <Typography>No data</Typography>
        </Hint>
      ) : (
        <NewTable.Component
          withStripes
          withOuterPadding
          columns={columns}
          entries={upcomingLoans}
        />
      )}
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: 50,
      paddingLeft: 50,
      marginTop: 50,
      marginBottom: 28,
    },
    tableTitle: {
      fontWeight: 300,
      fontSize: 22,
    },
  }),
  { name: 'UpcomingLiquidationsTable' },
);
