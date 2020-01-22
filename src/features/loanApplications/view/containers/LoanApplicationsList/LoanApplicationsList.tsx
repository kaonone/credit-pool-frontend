import * as React from 'react';

import { Grid, Hint, Typography, Box, Loading } from 'components';
import { useDebtsQuery, Status } from 'generated/gql/pool';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useSubgraphPagination } from 'utils/react';

import { LoanApplicationCard } from '../../components/LoanApplicationCard/LoanApplicationCard';

const tKeys = tKeysAll.features.loanApplications;

interface Activity {
  lendValue: string;
  address: string;
  aprValue: string;
  stakedValue: string;
  expansionPanelDetails: string;
  status: Status;
}

function LoanApplicationsList() {
  const { t } = useTranslate();

  const { result, paginationView } = useSubgraphPagination(useDebtsQuery, {});
  const debts = result.data?.debts;

  const activities: Activity[] = React.useMemo(
    () =>
      debts?.map(debt => ({
        lendValue: debt.total,
        address: debt.borrower,
        aprValue: debt.apr,
        stakedValue: debt.staked,
        expansionPanelDetails:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti alias aut ab placeat exercitationem minus illo repudiandae molestias delectus perferendis harum qui quis, quasi vero mollitia rem, temporibus odio excepturi?',
        status: debt.status,
      })) || [],
    [debts],
  );

  return (
    <Loading gqlResults={result}>
      {!activities.length ? (
        <Hint>
          <Typography>{t(tKeys.notFound.getKey())}</Typography>
        </Hint>
      ) : (
        <>
          <Grid container spacing={3}>
            {activities.map((activity, index) => (
              <Grid key={index} item xs={12}>
                <LoanApplicationCard {...activity} />
              </Grid>
            ))}
          </Grid>
          <Box my={3}>{paginationView}</Box>
        </>
      )}
    </Loading>
  );
}

export { LoanApplicationsList };
