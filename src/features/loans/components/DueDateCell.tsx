import React, { useMemo } from 'react';
import moment from 'moment';

import { DoubleLineCell, Loading } from 'components';
import { getLoanDuePaymentDate } from 'model';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { EmptyCell } from './EmptyCell';

type Props = {
  lastUpdate?: string | null;
};

export function DueDateCell({ lastUpdate }: Props) {
  const api = useApi();
  const [loansConfig, loansConfigMeta] = useSubscribable(() => api.loanModule.getConfig$(), []);

  const dueDate = useMemo(() => {
    const repayDeadlinePeriod = loansConfig?.debtRepayDeadlinePeriod;
    const duePaymentDate =
      repayDeadlinePeriod && getLoanDuePaymentDate(lastUpdate, repayDeadlinePeriod);
    return duePaymentDate || null;
  }, [lastUpdate, loansConfig]);

  if (!dueDate) {
    return <EmptyCell />;
  }
  const dueMoment = moment(dueDate);
  const daysLeft = dueMoment.diff(Date.now(), 'days');

  const diffUnit = daysLeft === 1 ? 'day' : 'days';

  return (
    <Loading meta={loansConfigMeta}>
      <DoubleLineCell
        renderTopPart={() => `${daysLeft} ${diffUnit}`}
        renderBottomPart={() => dueMoment.format('MM/DD/YYYY')}
      />
    </Loading>
  );
}
