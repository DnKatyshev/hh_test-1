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
import { Link } from '@mui/material';

import { useOrdersSelection } from '../payments/orders-selection-context';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';


export function TransactionsTable({ rows }) {


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
        <Typography variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}> {row.type ? row.type : '—'} </Typography>
      ),
      name: 'Тип',
      width: '200px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>{Number(row.amount).toFixed(2)}</Typography>
      ),
      name: 'Сумма',
      width: '250px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {Number(row.commission).toFixed(2)}
        </Typography>
      ),
      name: 'Комиссия',
      width: '100px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.project_account_old_balance ? Number(row.project_account_old_balance).toFixed(2) : '—'}
        </Typography>
      ),
      name: 'Баланс до',
      width: '150px',
      align: 'center',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}> 
          {row.project_account_new_balance ? Number(row.project_account_new_balance).toFixed(2) : '—'}
        </Typography>
      ),
      name: 'Баланс после',
      width: '100px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.project_account_old_hold ? Number(row.project_account_old_hold).toFixed(2) : '—'}
        </Typography>
      ),
      name: 'Холд до',
      width: '100px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.project_account_new_hold ? Number(row.project_account_new_hold).toFixed(2) : '—'}
        </Typography>
      ),
      name: 'Холд после',
      width: '150px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.project_account_old_rolling_reserve ? Number(row.project_account_old_rolling_reserve).toFixed(2) : '—'}
        </Typography>
      ),
      name: 'RR до',
      width: '100px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.project_account_new_rolling_reserve ? Number(row.project_account_new_rolling_reserve).toFixed(2) : '—'}
        </Typography>
      ),
      name: 'RR после',
      width: '150px',
      align: 'center',
    },
    {
      formatter: (row) => (
        <Link href={`/dashboard/payout/${row.payment_id}`} variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}>
          {row.payment_id ? row.payment_id : '—'}
        </Link>
      ),
      name: 'Payment	',
      width: '150px',
      align: 'center',
    },
    {
      formatter: (row) => (
        <Link href={`/dashboard/payout/${row.payout_id}`} variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}>
          {row.payout_id ? row.payout_id : '—'}
        </Link>
      ),
      name: 'Payout	',
      width: '150px',
      align: 'center',
    },
    {
      formatter: (row) => (
        <Link href={`/dashboard/payout/${row.project_exchange_id}`} variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}>
          {row.project_exchange_id ? row.project_exchange_id : '—'}
        </Link>
      ),
      name: 'Обмен	',
      width: '150px',
      align: 'center',
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
        <IconButton component={RouterLink} href={paths.dashboard.transactions.one(row.id)}>
          <EyeIcon />
        </IconButton>
      ),
      name: 'open',
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
            НЕТ СЧЕТОВ ДЛЯ ПРОЕКТА
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
