import * as React from 'react';
import moment from 'moment';

import { DoubleLineCell } from 'components';

type DueDateCellProps = {
  dueDate?: Date | null,
};

export function DueDateCell({ dueDate }: DueDateCellProps) {
  if (!dueDate) {
    return <EmptyCell />;
  }

  const daysLeft = moment().diff(dueDate, 'days');

  const diffUnit = daysLeft === 1 ? 'day' : 'days';

  return (
    <DoubleLineCell
      renderTopPart={() => `${daysLeft} ${diffUnit}`}
      renderBottomPart={() => moment(dueDate).format('MM/DD/YYYY')}
    />
  );
};

export function EmptyCell() {
  return <>—</>;
}