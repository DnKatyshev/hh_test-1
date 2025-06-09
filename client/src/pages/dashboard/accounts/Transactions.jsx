import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import useProjectsStore from '@/store/projectsStore';
import useDataStore from '@/store/dataStore';

import { TransactionsFilters } from '@/components/dashboard/filters/transactions-filters';
import { TransactionsList } from '../accounts-list/transactionsList';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass } from '@phosphor-icons/react';



export function TransactionsItem({id}) {

    return (
        <Stack spacing={4}>
            <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: '700' }}>Транзакции</Typography>

                <TransactionsFilters/>

                <TransactionsList id={id}/>

            </Stack>
        </Stack>
    );
}
