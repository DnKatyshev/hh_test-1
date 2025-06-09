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
import EditIcon from '@mui/icons-material/Edit';


export function AccountsTable({ rows }) {


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
        <Typography variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}> {row.name ? row.name : '—'} </Typography>
      ),
      name: 'Название',
      width: '200px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>{row.uuid}</Typography>
      ),
      name: 'UUID',
      width: '250px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.currency}
        </Typography>
      ),
      name: 'Валюта',
      width: '100px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.is_test_mode === false ? <CancelRoundedIcon/> : <DoneRoundedIcon/>}
        </Typography>
      ),
      name: 'Test mode',
      width: '150px',
      align: 'center',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}> {Number(row.balance).toFixed(2)} </Typography>
      ),
      name: 'Баланс',
      width: '100px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {Number(row.overdraft).toFixed(2)}
        </Typography>
      ),
      name: 'Overdraft',
      width: '100px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {Number(row.rolling_reserve).toFixed(2)}
        </Typography>
      ),
      name: 'Роллинг резерв',
      width: '150px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {Number(row.hold).toFixed(2)}
        </Typography>
      ),
      name: 'Холд',
      width: '100px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.is_allowed_deposit === false ? <CancelRoundedIcon/> : <DoneRoundedIcon/>}
        </Typography>
      ),
      name: 'Разрешено пополнять',
      width: '150px',
      align: 'center',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {row.is_allowed_withdrawal === false ? <CancelRoundedIcon/> : <DoneRoundedIcon/>}
        </Typography>
      ),
      name: 'Разрешено выводить',
      width: '150px',
      align: 'center',
    },

    {
      formatter: (row) => (
        <IconButton component={RouterLink} href={paths.dashboard.accounts.one(row.id)}>
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
