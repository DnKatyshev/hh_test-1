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



export function OnePaymentTable({ rows }) {


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
      name: 'Payment ID',
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
      name: 'Сервис',
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
  ];
  
  const columns_2 = [
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.c2c_card_number ? row.c2c_card_number : '—'}
        </Typography>
      ),
      name: 'Карта/Счёт/Телефон',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.c2c_card_holder_name
            ? row.c2c_card_holder_name
            : '—'}
        </Typography>
      ),
      name: 'ФИО Владельца',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.status ? row.status : '—'}
        </Typography>
      ),
      name: 'Банк',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.bik_bank ? row.bik_bank : '—'}
        </Typography>
      ),
      name: 'Бин банка',
    },
  ];
  
  const columns_3 = [
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.ID ? row.ID : '—'}
        </Typography>
      ),
      name: 'ID',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_ip ? row.customer_ip : '—'}
        </Typography>
      ),
      name: 'IP',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_email ? row.customer_email : '—'}
        </Typography>
      ),
      name: 'Email',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_firstname
            ? row.customer_firstname
            : '—'}
        </Typography>
      ),
      name: 'First name',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_lastname ? row.customer_lastname : '—'}
        </Typography>
      ),
      name: 'Last name',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_address ? row.customer_address : '—'}
        </Typography>
      ),
      name: 'Address',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_browser_user_agent
            ? row.customer_browser_user_agent
            : '—'}
        </Typography>
      ),
      name: 'User agent',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_phone ? row.customer_phone : '—'}
        </Typography>
      ),
      name: 'Phone',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_card_number
            ? row.customer_card_number
            : '—'}
        </Typography>
      ),
      name: 'Card Number',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_post_code
            ? row.customer_post_code
            : '—'}
        </Typography>
      ),
      name: 'Post code',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_country ? row.customer_country : '—'}
        </Typography>
      ),
      name: 'Country',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_state ? row.customer_state : '—'}
        </Typography>
      ),
      name: 'State',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.customer_city ? row.customer_city : '—'}
        </Typography>
      ),
      name: 'City',
    },
  ];

  console.log('ROWS: ', rows.main);

  return (
    <React.Fragment>
      {
        rows.main && rows.p2p && rows.gateway
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
              P2P information
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              {renderVerticalTable(columns_2, rows.p2p)}
            </Box>
          </Card>
  
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Customer
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              {renderVerticalTable(columns_3, rows.gateway)}
            </Box>
          </Card>
        </Stack>
                :
        <></>
      }
    </React.Fragment>
  );
}
