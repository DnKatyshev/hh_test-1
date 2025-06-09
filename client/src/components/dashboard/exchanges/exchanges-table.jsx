'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

import { useOrdersSelection } from '../payments/orders-selection-context';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';


export function ExchangesTable({ rows }) {


  const columns = [
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}>{row.id}</Typography>
      ),
      name: 'ID',
      width: '50px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}> #{row.from_project_account_id} {Number(row.from_amount).toFixed(2)} {row.from_currency} </Typography>
      ),
      name: 'Списать со счёта',
      width: '170px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>{Number(row.from_amount).toFixed(2)}</Typography>
      ),
      name: 'Сумма',
      width: '150px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {Number(row.rate).toFixed(2) + ' ' + '$'}
        </Typography>
      ),
      name: 'Курс',
      width: '150px',
    },
    {
      formatter: (row) => (
        <Chip label={row.status} color={row.status === 'completed' ? 'success' : 'error'} sx={{ minWidth: '90px', padding: '4px 0' }} />
      ),
      name: 'Статус',
      width: '150px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}> #{row.to_project_account_id} {Number(row.to_amount).toFixed(2)} {row.from_currency} </Typography>
      ),
      name: 'Зачислить на счёт',
      width: '170px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.to_currency}
        </Typography>
      ),
      name: 'Валюта зачисления',
      width: '150px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          -
        </Typography>
      ),
      name: 'Номер счёта',
      width: '100px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.created_at ? new Date(row.created_at).toLocaleString() : '-'}
        </Typography>
      ),
      name: 'Дата',
      width: '200px',
    },

    {
      formatter: (row) => (
        <IconButton component={RouterLink} href={paths.dashboard.exchanges.details(row.id)}>
          <EyeIcon />
        </IconButton>
      ),
      name: 'Actions',
      hideName: true,
      width: '100px',
      align: 'right',
    },
  ];


  const { selected, deselectAll, deselectOne, selectAll, selectOne } = useOrdersSelection();

  return (
    <React.Fragment>
      <DataTable
        columns={columns}
        onDeselectAll={deselectAll}
        onDeselectOne={(_, row) => {
          deselectOne(row.id);
        }}
        onSelectAll={selectAll}
        onSelectOne={(_, row) => {
          selectOne(row.id);
        }}
        rows={rows}
        selectable
        selected={selected}
      />
      {rows && !rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center', fontWeight: "700", fontSize: "24px" }} variant="body2">
            НЕТ ОБМЕНОВ ДЛЯ ПРОЕКТА
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
