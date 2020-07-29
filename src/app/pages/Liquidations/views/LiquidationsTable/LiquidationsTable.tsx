import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { NewTable, AccountAddress, FormattedAmount, Hint } from 'components';
import { makeStyles } from 'utils/styles';
import { LoanToLiquidate } from 'model/loans';

import { LiquidateLoanButton } from '../LiquidateLoanButton/LiquidateLoanButton';

type Props = {
  loansToLiquidate: LoanToLiquidate[];
};

const mkColumns = (
  classes: ReturnType<typeof useStyles>,
): Array<NewTable.models.Column<LoanToLiquidate>> => [
  {
    renderTitle: () => 'Borrower',
    cellContent: {
      kind: 'simple',
      render: x => (
        <>
          <div style={{ display: 'inline-flex' }}>
            <AccountAddress address={x.borrower} size="small" />
          </div>
        </>
      ),
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

  {
    renderTitle: () => 'Past Due',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <span style={{ color: 'red' }}>{`${x.pastDueInDays} Days`}</span>,
    },
  },

  {
    renderTitle: () => null,
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => (
        <LiquidateLoanButton
          borrower={x.borrower}
          debtId={x.debtID}
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
          className={classes.liquidateButton}
        >
          Liquidate
        </LiquidateLoanButton>
      ),
    },
  },
];

export function LiquidationsTable(props: Props) {
  const { loansToLiquidate } = props;
  const classes = useStyles();

  function renderTableHeader() {
    return (
      <div className={classes.tableHeader}>
        <div className={classes.tableTitle}>Liquidations</div>
      </div>
    );
  }

  const columns = React.useMemo(() => mkColumns(classes), [classes]);

  return (
    <div className={classes.root}>
      {renderTableHeader()}
      {!loansToLiquidate.length ? (
        <Hint>
          <Typography>No data</Typography>
        </Hint>
      ) : (
        <NewTable.Component
          withStripes
          withOuterPadding
          columns={columns}
          entries={loansToLiquidate}
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
    liquidateButton: {
      width: 106,
    },
  }),
  { name: 'LiquidationsTable' },
);
