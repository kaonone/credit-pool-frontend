import React from 'react';

import { Typography, ExpansionPanel } from 'components';
import { Debt } from 'generated/gql/pool';

import { useStyles } from './LoansPanel.style';
import { LoansTable } from '../../components/LoansTable';

interface IProps {
  title: string;
  list: Debt[];
  withEarn?: boolean;
  expanded?: boolean;
  paginationView?: React.ReactNode;
}

function LoansPanel(props: IProps) {
  const { title, list, withEarn, expanded, paginationView } = props;
  const classes = useStyles();

  return (
    <ExpansionPanel
      title={
        <Typography component="span" variant="subtitle1" className={classes.title}>
          {title}
        </Typography>
      }
      details={<LoansTable list={list} withEarn={withEarn} paginationView={paginationView} />}
      detailsClassName={classes.details}
      expanded={expanded}
    />
  );
}

export { LoansPanel };
