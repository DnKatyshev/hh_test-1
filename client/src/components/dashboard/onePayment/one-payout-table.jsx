'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack, Card } from '@mui/material';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export function OnePayoutTable({ rows }) {


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
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.id ? row.id : '—'}
        </Typography>
      ),
      name: 'Payout ID',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.order_id ? row.order_id : '—'}
        </Typography>
      ),
      name: 'Order ID',
    },
    {
      formatter: (row) => (
        <Chip
          label={row.status ? row.status : '—'}
          color={row.status === 'paid' ? 'success' : 'error'}
          sx={{ minWidth: '65px', padding: '4px 0' }}
        />
      ),
      name: 'Статус',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code ? row.service_code : '—'}
        </Typography>
      ),
      name: 'Способ выплат',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.amount ? `${Number(row.amount).toFixed(2)}` : '—'}
        </Typography>
      ),
      name: 'Сумма',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.commission_amount
            ? `${Number(row.commission_amount).toFixed(2)}`
            : '—'}
        </Typography>
      ),
      name: 'Комиссия',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.created_at
            ? new Date(row.created_at).toLocaleString()
            : '—'}
        </Typography>
      ),
      name: 'Дата',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.notification_id ? row.notification_id : '—'}
        </Typography>
      ),
      name: 'ID уведомления',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.notification_endpoint_id
            ? row.notification_endpoint_id
            : '—'}
        </Typography>
      ),
      name: 'Endpoint уведомления',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.notification_status ? row.notification_status : '—'}
        </Typography>
      ),
      name: 'Статус уведомления',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.request_ip ? row.request_ip : '—'}
        </Typography>
      ),
      name: 'Request ip',
    },

    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.project_account_old_balance ? row.project_account_old_balance : '—'}
        </Typography>
      ),
      name: 'Баланс до',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.project_account_new_balance ? row.project_account_new_balance : '—'}
        </Typography>
      ),
      name: 'Баланс после',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.account_payout_amount ? row.account_payout_amount : '—'}
        </Typography>
      ),
      name: 'Списано с баланса',
    },
  ];
  

  const columns_2 = [
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code ? row.service_code : '—'}
        </Typography>
      ),
      name: 'Частичная выплата',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code
            ? row.service_code
            : '—'}
        </Typography>
      ),
      name: 'Оплаченная сумма',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code
            ? row.service_code
            : '—'}
        </Typography>
      ),
      name: 'Транзакция зачисления остатка',
    },
  ];


  console.log('ROWS', rows);
  

  return (
    <React.Fragment>
      {
        rows.main && rows.gateway
              ?
        <Stack spacing={4} sx={{ display: 'flex', flexDirection: 'column', rowGap: '50px' }}>
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Основные данные
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              {renderVerticalTable(columns_1, rows.main)}
            </Box>
          </Card>
  
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Частичная выплата
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              {renderVerticalTable(columns_2, rows.gateway)}
            </Box>
          </Card>
  
        </Stack>
                :
        <></>
      }
    </React.Fragment>
  );
}
