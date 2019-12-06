/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { useTranslate, tKeys as tKeysAll, ITranslateKey } from 'services/i18n';
import { ShortAddress } from 'components/ShortAddress/ShortAddress';
import { Loading } from 'components/Loading';
import {
  LendIcon,
  ContainedCircleArrow,
  OutlinedCircleArrow,
  Checked,
  ContainedCross,
} from 'components/icons';
import { attachStaticFields } from 'utils/object';
import { filterChildrenByComponent } from 'utils/react';

import { useStyles } from './ActivitiesCard.style';
import { Column } from './Column/Column';
import { Progress } from './Progress/Progress';

const tKeys = tKeysAll.components.activitiesCard;

interface IOwnProps {}

function ActivitiesCard(props: IOwnProps) {
  const expansionPanelDetails =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti alias aut ab placeat exercitationem minus illo repudiandae molestias delectus perferendis harum qui quis, quasi vero mollitia rem, temporibus odio excepturi?';

  const classes = useStyles();
  const { t } = useTranslate();
  const [expanded, setExpanded] = React.useState(false);

  const isOver = false;

  const handleExpansionPanelChange = (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Grid className={classes.root} container wrap="nowrap">
      <Grid item xs={9} className={classes.mainInformation}>
        <Grid container spacing={3}>
          <Column
            xs={2}
            title={t(tKeys.lend.getKey())}
            value="120 DAI"
            icon={<LendIcon style={{ fontSize: '19px' }} />}
          />
          <Column
            xs={3}
            title={t(tKeys.to.getKey())}
            value={
              <ShortAddress address="0x0000000000000000000000000000000000000000000000000000000000000000" />
            }
          />
          <Column xs={2} title={t(tKeys.apr.getKey())} value="15.8%" />
          <Column
            xs={4}
            title={t(tKeys.staked.getKey())}
            value="170PTK"
            subValue="~230PTK needed"
            isHighlighted
          />
          <Grid item xs={12}>
            <ExpansionPanel
              onChange={handleExpansionPanelChange}
              className={classes.expansionPanel}
            >
              <ExpansionPanelSummary
                className={classes.expansionPanelSummary}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {expanded && <ContainedCircleArrow className={classes.toggleExpandIcon} />}
                {!expanded && <OutlinedCircleArrow className={classes.toggleExpandIcon} />}
                <div className={classes.ellipsisRow}>
                  <Typography className={classes.showButtonText} component="span" noWrap>
                    {`${t(tKeys.expansionPanelTitle.getKey())}: `}
                  </Typography>
                  <Typography className={classes.detailsShortText} component="span" noWrap>
                    {expansionPanelDetails}
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>{expansionPanelDetails}</ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} className={classes.voting}>
        {isOver ? (
          <Grid container spacing={3} justify="center" direction="column">
            <Grid item />
          </Grid>
        ) : (
          <Progress percent={85} timeLeft={15} />
        )}
      </Grid>
    </Grid>
  );
}

export { ActivitiesCard };
