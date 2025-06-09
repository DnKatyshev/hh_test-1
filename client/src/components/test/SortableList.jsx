'use client';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { SortableTable } from './SortableTable';



export function SortableList({ rows, lastRowRef }) {
  const columns = [
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700", color: '#fff'}}>{row.id}</Typography>
      ),
      name: 'ID',
      align: 'left'
    },
    {
      formatter: (row) => (
        <Typography variant="body2" sx={{fontWeight: "700", color: '#fff'}}>{row.number}</Typography>
      ),
      name: 'Номер',
      align: 'left'
    },
    {
      formatter: (row) => (
        <IconButton>
          <EyeIcon style={{ fill: '#fff' }}/>
        </IconButton>
      ),
      name: 'Actions',
      hideName: true,
      align: 'right',
    },
  ];

  return (
    <>
      <SortableTable
        columns={columns}
        rows={rows}
        lastRowRef={lastRowRef}
        selectable
      />
      {rows && !rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center', fontWeight: "700", fontSize: "24px" }} variant="body2">
            НЕТ ДАННЫХ
          </Typography>
        </Box>
      ) : null}
    </>
  );
}
