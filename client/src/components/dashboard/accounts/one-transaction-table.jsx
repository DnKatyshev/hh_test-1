'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack, Card } from '@mui/material';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export function OneTransactionTable({ rows }) {


  const renderVerticalTable = (columns, data) => (
    <Table>
      <TableBody>
        {columns.map((column, index) => (
          <TableRow key={index}>
            {/* Заголовок */}
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              {column.name}
            </TableCell>
            {/* Контент */}
            <TableCell align="left">{column.formatter(data)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );


  const columns_1 = [
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
        <Link href={`/dashboard/payout/${row.payment_id}`} variant="body2" sx={{fontWeight: "700", color: "#ffc01d", pointerEvents: row.payment_id !== null ? 'auto' : 'none' }}>
          {row.payment_id ? row.payment_id : '—'}
        </Link>
      ),
      name: 'Payment	',
      width: '150px',
      align: 'center',
    },
    {
      formatter: (row) => (
        <Link href={`/dashboard/payout/${row.payout_id}`} variant="body2" sx={{fontWeight: "700", color: "#ffc01d", pointerEvents: row.payout_id !== null ? 'auto' : 'none' }}>
          {row.payout_id ? row.payout_id : '—'}
        </Link>
      ),
      name: 'Payout	',
      width: '150px',
      align: 'center',
    },
    {
      formatter: (row) => (
        <Link href={`/dashboard/payout/${row.project_exchange_id}`} variant="body2" sx={{fontWeight: "700", color: "#ffc01d", pointerEvents: row.project_exchange_id !== null ? 'auto' : 'none' }}>
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
  ];


  console.log('ROWS', rows);
  

  return (
    <React.Fragment>
        <Stack spacing={4} sx={{ display: 'flex', flexDirection: 'column', rowGap: '50px' }}>
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom sx={{fontWeight: "700"}}>
              Транзакция {rows.id}
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              {renderVerticalTable(columns_1, rows)}
            </Box>
          </Card>
        </Stack>
    </React.Fragment>
  );
}
