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

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';



export function OneAccountTable({ rows }) {


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
        <Typography variant="body2" sx={{fontWeight: "700"}}>{row.id}</Typography>
      ),
      name: 'ID',
      width: '50px',
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700"}}> {row.name ? row.name : '—'} </Typography>
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
        <Typography variant="body2" sx={{fontWeight: "700"}}> {Number(row.balance).toFixed(2)} </Typography>
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
  ];


  console.log('ROWS', rows);
  

  return (
    <React.Fragment>
        <Stack spacing={4} sx={{ display: 'flex', flexDirection: 'column', rowGap: '50px' }}>
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom sx={{fontWeight: "700"}}>
              Счёт #{rows.id} {Number(rows.balance).toFixed(2)} {rows.currency}
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              {renderVerticalTable(columns_1, rows)}
            </Box>
          </Card>
        </Stack>
    </React.Fragment>
  );
}
