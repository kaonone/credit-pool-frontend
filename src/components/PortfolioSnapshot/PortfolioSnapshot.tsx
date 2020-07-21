import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles, rgba, colors } from 'utils/styles';
import { Label } from 'components/Label/Label';
import { ComingSoon } from 'components/ComingSoon/ComingSoon';

import { DAIIcon, USDTIcon, USDCIcon, TUSDIcon } from '../icons';

type Asset = 'DAI' | 'USDC' | 'USDT' | 'TUSD';

type AssetInfo = {
  asset: Asset;
  apy: string;
  earned: string;
  balance: string;
};

type Column = keyof AssetInfo;

const columns: Column[] = ['asset', 'apy', 'earned', 'balance'];

const assetIcons: Record<Asset, JSX.Element> = {
  DAI: <DAIIcon />,
  USDC: <USDCIcon />,
  USDT: <USDTIcon />,
  TUSD: <TUSDIcon />,
};

type Props = {
  data: AssetInfo[];
  loansIssued: string;
};

const tKeys = tKeysAll.components.portfolioSnapshot;

export function PortfolioSnapshot(props: Props) {
  const { data, loansIssued } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <div className={classes.root}>
      <ComingSoon />
      <table className={classes.table}>
        <caption className={classes.caption}>
          <Label fontSize="large" hint={t(tKeys.description.getKey())}>
            {t(tKeys.caption.getKey())}
          </Label>
        </caption>
        <thead>
          <tr>
            {columns.map(x => (
              <th key={x}>{t(tKeys[x].getKey())}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map(renderRow(classes))}</tbody>
      </table>
      {renderLoansIssued(classes, loansIssued)}
    </div>
  );
}

function renderRow(classes: ReturnType<typeof useStyles>) {
  return (rowData: AssetInfo) => {
    return (
      <tr key={rowData.asset}>
        <td>
          <div className={classes.assetCellContent}>
            {assetIcons[rowData.asset]}
            <span className={classes.assetName}>{rowData.asset}</span>
          </div>
        </td>
        <td>{rowData.apy}</td>
        <td>{rowData.earned}</td>
        <td>{rowData.balance}</td>
      </tr>
    );
  };
}

function renderLoansIssued(
  classes: ReturnType<typeof useStyles>,
  loansIssued: Props['loansIssued'],
) {
  const { t } = useTranslate();

  return (
    <Grid container item xs={12} justify="space-between">
      <Grid item xs>
        {t(tKeys.loansIssued.getKey())}
      </Grid>
      <Grid item container alignItems="center" justify="flex-end" xs>
        {assetIcons.DAI}
        <span className={classes.loansIssuedCount}>{loansIssued}</span>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    // TODO remove after integration
    root: {
      position: 'relative',
    },

    table: {
      borderCollapse: 'collapse',
      fontWeight: 300,
      width: '100%',
      marginBottom: 30,
      '& td, th': {
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: 'right',
      },
      '& th': {
        fontWeight: 400,
        paddingBottom: 20,
      },
      '& th:first-child': {
        textAlign: 'left',
      },
      '& tr:last-child': {
        borderBottom: `1px solid ${rgba(colors.white, 0.1)}`,
        borderRadius: 6,
      },
    },
    caption: {
      textAlign: 'left',
    },
    assetName: {
      marginLeft: 10,
    },
    assetCellContent: {
      display: 'flex',
      alignItems: 'center',
    },
    loansIssuedCount: {
      marginLeft: 10,
      fontWeight: 300,
    },
  }),
  { name: 'PortfolioSnapshot' },
);
