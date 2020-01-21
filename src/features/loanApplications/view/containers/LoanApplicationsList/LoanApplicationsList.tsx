import * as React from 'react';

import { Grid, Loading, Hint, Typography, Box } from 'components';
import { useMyUserDebtsQuery, Status } from 'generated/gql/pool';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useSubgraphPagination } from 'utils/react';

import { LoanApplicationCard } from '../../components/LoanApplicationCard/LoanApplicationCard';

const tKeys = tKeysAll.features.loanApplications;

interface Activity {
  lendValue: string;
  address: string;
  aprValue: number;
  stakedValue: string;
  expansionPanelDetails: string;
  status: Status;
}

function LoanApplicationsList() {
  const { t } = useTranslate();

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const { result, paginationView } = useSubgraphPagination(useMyUserDebtsQuery, {
    address: account?.toLowerCase() || '',
  });

  const debts = result.data?.debts;

  const activities: Activity[] = React.useMemo(
    () =>
      debts?.map(debt => ({
        lendValue: debt.total,
        address: debt.borrower,
        aprValue: Number(debt.apr),
        stakedValue: debt.staked,
        expansionPanelDetails:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti alias aut ab placeat exercitationem minus illo repudiandae molestias delectus perferendis harum qui quis, quasi vero mollitia rem, temporibus odio excepturi?',
        status: debt.status,
      })) || [],
    [debts],
  );

  return (
    <div>
      {!activities.length ? (
        <Hint>
          <Typography>{t(tKeys.notFound.getKey())}</Typography>
        </Hint>
      ) : (
        <>
          <Loading meta={accountMeta} gqlResults={result}>
            <Grid container spacing={3}>
              {activities.map((activity, index) => (
                <Grid key={index} item xs={12}>
                  <LoanApplicationCard {...activity} />
                </Grid>
              ))}
            </Grid>
          </Loading>
          <Box my={3}>{paginationView}</Box>
        </>
      )}
    </div>
  );
}

export { LoanApplicationsList };
