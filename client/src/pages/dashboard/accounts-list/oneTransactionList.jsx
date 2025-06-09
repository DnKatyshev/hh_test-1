import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

import { OneTransactionTable } from '@/components/dashboard/accounts/one-transaction-table';


export function OneTransactionList({oneTransactionData}) {


    return (
        <React.Fragment>
                <Box
                    sx={{
                        maxWidth: 'var(--Content-maxWidth)',
                        m: 'var(--Content-margin)',
                        width: 'var(--Content-width)',
                    }}
                >

                    <Stack spacing={4}>
                    <Card>
                        <Box sx={{ overflowX: 'auto' }}>
                            <OneTransactionTable rows={oneTransactionData} />
                        </Box>
                    </Card>
                    </Stack>

                </Box>
        </React.Fragment>
    );
}
