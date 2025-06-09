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


export function AccountAdditionalTable({ rows, columns }) {


  return (
    <React.Fragment>
      <DataTable
        columns={columns}
        rows={rows}
      />
      {rows && !rows.length ? (
        <Box sx={{ pb: 6 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center', fontWeight: "700", fontSize: "24px" }} variant="body2">
            НЕТ ДАННЫХ
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
