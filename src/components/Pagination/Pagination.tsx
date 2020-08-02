import * as React from 'react';
import cn from 'classnames';
import * as R from 'ramda';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { AngleArrow } from 'components/icons';

import { useStyles } from './Pagination.style';

const tKeys = tKeysAll.components.pagination;

interface IProps {
  currentPage: number;
  totalItems: number;
  perPage: number;
  paginationSteps: number[];
  nextStepLoading?: boolean;
  onChangePerPage(itemsPerPage: number): void;
  onChangePage(currentPage: number): void;
}

function Pagination(props: IProps) {
  const { perPage, currentPage, totalItems, onChangePage, nextStepLoading } = props;
  const { t } = useTranslate();
  const classes = useStyles();

  const from = currentPage * perPage;
  const to = R.clamp(0, totalItems, from + perPage);

  const isDisabledDecrease = from <= 0;
  const isDisabledIncrease = to >= totalItems;

  return totalItems > perPage ? (
    <div className={classes.root}>
      <Grid container wrap="nowrap" justify="flex-end" alignItems="center" spacing={3}>
        <Grid item>
          <Typography className={classes.currentItems} variant="subtitle1">
            {t(tKeys.currentPagination.getKey(), { from: from + 1, to })}
            &nbsp;
            <span className={classes.total}>
              {t(tKeys.ofTotal.getKey(), { total: totalItems })}
            </span>
          </Typography>
        </Grid>
        <Grid item>
          <Grid container wrap="nowrap" justify="space-between" spacing={1}>
            <Grid item>
              <IconButton
                className={cn(classes.toggleButton, classes.toggleBack)}
                onClick={() => onChangePage(currentPage - 1)}
                disabled={isDisabledDecrease}
              >
                <AngleArrow
                  className={cn(classes.toggleIcon, { [classes.disabled]: isDisabledDecrease })}
                />
              </IconButton>
            </Grid>
            <Grid item>
              {nextStepLoading ? (
                <CircularProgress className={classes.buttonLoading} size={24} />
              ) : (
                <IconButton
                  className={classes.toggleButton}
                  onClick={() => onChangePage(currentPage + 1)}
                  disabled={isDisabledIncrease}
                >
                  <AngleArrow
                    className={cn(classes.toggleIcon, { [classes.disabled]: isDisabledIncrease })}
                  />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : null;
}

export { Pagination };
