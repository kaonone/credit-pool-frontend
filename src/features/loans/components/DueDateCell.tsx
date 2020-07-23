import React from 'react';
import moment from 'moment';

import { DoubleLineCell } from 'components';

import { EmptyCell } from './EmptyCell';

type Props = {
  dueDate: Date | null;
};

export function DueDateCell({ dueDate }: Props) {
  if (!dueDate) {
    return <EmptyCell />;
  }
  const dueMoment = moment(dueDate);
  const daysLeft = dueMoment.diff(Date.now(), 'days');

  const diffUnit = daysLeft === 1 ? 'day' : 'days';

  return (
    <DoubleLineCell
      renderTopPart={() => `${daysLeft} ${diffUnit}`}
      renderBottomPart={() => dueMoment.format('MM/DD/YYYY')}
    />
  );
}
