import * as React from 'react';
import { useMemo } from 'react';

import { NewTable } from 'components';

import { makeTableColumns } from './loansTableColumns';
import { TableType, PartialDebt } from './types';

export type Props = {
  type: TableType;
  debts: PartialDebt[];
  account?: string | null;
};

export function LoansTable({ account, type, debts }: Props) {
  const columns = useMemo(() => makeTableColumns({ account, type }), [account, type]);

  return <NewTable.Component columns={columns} entries={debts} />;
}
