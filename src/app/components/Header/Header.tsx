import * as React from 'react';
import { withRouter, RouteComponentProps, Link as RouterLink } from 'react-router-dom';

import { ThemeButton } from 'services/theme';
import { Back, InfoIcon } from 'components/icons';
import { Grid, IconButton, Typography, Button, Tooltip, Link, LinkProps } from 'components';
import { AuthButton } from 'features/auth';

import { useStyles } from './Header.style';

interface IOwnProps {
  backRoutePath?: string;
  title: React.ReactNode;
}

type IProps = IOwnProps & RouteComponentProps;

function HeaderComponent(props: IProps) {
  const { title, backRoutePath } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" spacing={3}>
        {backRoutePath && (
          <Grid item>
            <IconButton component={RouterLink} to={backRoutePath} className={classes.backButton}>
              <Back />
            </IconButton>
          </Grid>
        )}

        <Grid item xs zeroMinWidth>
          <Typography variant="h4" noWrap className={classes.title}>
            {title}{' '}
            <Tooltip
              title="Sparta is an Undercollateraliszed Loans and Savings Pool designed to deliver access to undercollateralised credit, and provide a combination of native yield and “interest rate income” to its members."
              placement="right"
            >
              <span>
                <InfoIcon className={classes.infoIcon} />
              </span>
            </Tooltip>
          </Typography>
        </Grid>

        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <ThemeButton />
            </Grid>
            <Grid item>
              <Button
                component={Link as React.FunctionComponent<Omit<LinkProps, 'variant'>>}
                href="https://wiki.akropolis.io/spartafaq/"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="outlined"
              >
                FAQ
              </Button>
            </Grid>
            <Grid item>
              <AuthButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export const Header = withRouter(HeaderComponent);
