import React from 'react';
import cn from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import { useStyles } from './ExpansionPanel.style';

interface IProps {
  title: React.ReactNode;
  details: React.ReactNode;
  showPreview?: boolean;
  detailsClassName?: string;
  expanded?: boolean;
}

function ExpansionPanelComponent(props: IProps) {
  const { title, details, showPreview, detailsClassName, expanded: defaultExpanded } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(!!defaultExpanded);

  const handleExpansionPanelChange = (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={handleExpansionPanelChange}
      className={classes.root}
    >
      <ExpansionPanelSummary
        className={classes.summary}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid item xs className={classes.summaryContent}>
          <Typography noWrap={!!showPreview}>
            {expanded && (
              <ArrowDropDownCircleRoundedIcon
                className={cn(classes.toggleExpandIcon, classes.expanded)}
              />
            )}
            {!expanded && <ArrowDropDownCircleOutlinedIcon className={classes.toggleExpandIcon} />}
            <span className={classes.summaryTitle}>{title}</span>
            {!expanded && showPreview && details}
          </Typography>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={detailsClassName}>{details}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export { ExpansionPanelComponent as ExpansionPanel };
