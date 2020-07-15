import * as React from 'react';
import cn from 'classnames';

import { Card } from 'app/components/Card';
import { makeStyles } from 'utils/styles';

import { Preview } from '../Preview/Preview';
import { Section } from '../Section/Section';

export interface Benefit {
  title: React.ReactNode;
  description: string;
}

interface IProps {
  className?: string;
  benefits: Benefit[];
}

export function Benefits(props: IProps) {
  const { className, benefits } = props;
  const classes = useStyles();

  return (
    <Section className={className}>
      <div className={classes.container}>
        {benefits.map(({ title, description }, index) => (
          <div key={index} className={classes.item}>
            <Card className={cn(classes.card)} variant="contained">
              <Preview title={title} description={description} />
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    padding: theme.spacing(2, 2.5),

    [theme.breakpoints.up('tabletSM')]: {
      padding: theme.spacing(3.75, 5),
    },

    [theme.breakpoints.up('desktopMD')]: {
      padding: theme.spacing(3.75, 2.5),
    },
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',

    [theme.breakpoints.up('tabletSM')]: {
      flexDirection: 'row',
    },
  },

  item: {
    flexBasis: '100%',
    flexGrow: 1,
    marginTop: 20,

    '&:nth-child(1) $card': {
      background: theme.gradients.products[0].linear(),

      [theme.breakpoints.up('tabletSM')]: {
        margin: [[0, 10, 0, 0]],
      },
    },
    '&:nth-child(2) $card': {
      background: theme.gradients.products[1].linear(),

      [theme.breakpoints.up('tabletSM')]: {
        margin: [[0, 10]],
      },
    },
    '&:nth-child(3) $card': {
      background: theme.gradients.products[2].linear(),

      [theme.breakpoints.up('tabletSM')]: {
        margin: [[0, 0, 0, 10]],
      },
    },
  },
}));
