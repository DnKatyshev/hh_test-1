'use client';

import * as React from 'react';

import useDataStore from '@/store/dataStore';
import { SortableTable } from '../dashboard/payments/SortableTable';

export function DataTable({
  columns,
  rows,
  selectable,
  lastRowRef,
  ...props
}) {
  const { actionCheckboxes, setActionCheckboxes } = useDataStore();

  return (
      <SortableTable 
        rows={rows}
        columns={columns}
        selectable={true}
        lastRowRef={lastRowRef}
      />
  );
}
