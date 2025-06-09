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



export function OneExchangeTable({ rows }) {


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
      name: 'ID',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}> #{row.from_project_account_id} {Number(row.from_amount).toFixed(2)} {row.from_currency} </Typography>
      ),
      name: 'Списать со счёта',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>{Number(row.from_amount).toFixed(2)}</Typography>
      ),
      name: 'Сумма',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}>
          {Number(row.rate).toFixed(2) + ' ' + '$'}
        </Typography>
      ),
      name: 'Курс',
    },
    {
      formatter: (row) => (
        <Chip label={row.status} color={row.status === 'completed' ? 'success' : 'error'} sx={{ minWidth: '90px', padding: '4px 0' }} />
      ),
      name: 'Статус',
    },
  ];
  

  const columns_2 = [
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code ? row.service_code : '—'}
        </Typography>
      ),
      name: 'Сумма',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code
            ? row.service_code
            : '—'}
        </Typography>
      ),
      name: 'Комиссия',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700", color: "#ffc01d"}}> #{row.to_project_account_id} {Number(row.to_amount).toFixed(2)} {row.from_currency} </Typography>
      ),
      name: 'Зачислить на счёт',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code ? row.service_code : '—'}
        </Typography>
      ),
      name: 'Транзакция списания',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code
            ? row.service_code
            : '—'}
        </Typography>
      ),
      name: 'Ссылка на транзацию',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code
            ? row.service_code
            : '—'}
        </Typography>
      ),
      name: 'Валюта зачисления',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {row.service_code
            ? row.service_code
            : '—'}
        </Typography>
      ),
      name: 'Номер счёта',
    },
  ];


  console.log('ROWS', rows);
  

  return (
    <React.Fragment>
        <Stack spacing={4} sx={{ display: 'flex', flexDirection: 'column', rowGap: '50px' }}>
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom sx={{fontWeight: "700"}}>
              Обмен
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              {renderVerticalTable(columns_1, rows)}
            </Box>
          </Card>
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom sx={{fontWeight: "700"}}>
              Зачислить на счет
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              {renderVerticalTable(columns_2, rows)}
            </Box>
          </Card>
        </Stack>
    </React.Fragment>
  );
}
