import moment from 'moment';

import { Period } from '../models';

export function makeFormatDateByPeriod(period: Period, firstDate: number) {
  const monthAgo = moment(Date.now()).subtract(1, 'months').endOf('day').valueOf();
  return (date: number) => {
    const mDate = moment(date);
    const formatByPeriod: Record<Period, string> = {
      d: `${mDate.format('hh:00 A')}`,
      w: mDate.format('ddd'),
      m: mDate.format('DD MMM'),
      '6m': monthAgo < firstDate ? mDate.format('DD MMM') : mDate.format('MMM'),
      all: mDate.format('DD MMM'),
    };
    return formatByPeriod[period];
  };
}
