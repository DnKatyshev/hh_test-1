'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { Button } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { height } from '@mui/system';


const dialogTable = (data) => (
  <Table>
    <TableHead>
      <TableRow>
        {
          data.map((item, index) => (
            <TableCell key={index} align="center">
              <Typography variant="body1">{item.currency}</Typography>
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        {
          data.map((item, index) => (
            <TableCell key={index} align="left">
              <Typography sx={{fontWeight: '700'}} variant="body2">{Number(item.balance).toFixed(2)}</Typography>
            </TableCell>
          ))
        }
      </TableRow>
    </TableBody>
  </Table>
);


export function BalanceDialog({ onClose, open = false, balance }) {


  return (
    <Dialog fullWidth maxWidth="lg" onClose={onClose} open={open} sx={{maxHeight: '500px', height: '100%'}}>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2}}>
        <Typography variant="h6">Баланс</Typography>
        <IconButton onClick={onClose}>
          <XIcon />
        </IconButton>
      </Stack>

      <DialogContent>
        <Stack spacing={3} sx={{ flexDirection: 'column', alignItems: 'center', rowGap: '50px' }}>
          { dialogTable(balance) }
        </Stack>
      </DialogContent>

      <Stack sx={{display: 'flex', justifyContent: 'center', p: 3, maxWidth: '200px', margin: '0 auto'}}>
        <Button sx={{ color: '#fff', backgroundColor: '#000410', padding: '8px 24px', fontSize: '18px', fontWeight: 500, '&:hover': {backgroundColor: '#001626'} }}>
          Вывести
        </Button>
      </Stack>
    </Dialog>
  );
}
