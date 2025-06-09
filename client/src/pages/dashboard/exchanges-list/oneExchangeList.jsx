import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

import { OneExchangeTable } from '@/components/dashboard/oneExchange/one-exchange-table';


export function OneExchangeList({oneExchangeData}) {


    return (
        <React.Fragment>
                <Box
                    sx={{
                        maxWidth: 'var(--Content-maxWidth)',
                        m: 'var(--Content-margin)',
                        p: '40px 0',
                        width: 'var(--Content-width)',
                    }}
                >

                    <Stack spacing={4}>
                    <Card>
                        <Box sx={{ overflowX: 'auto' }}>
                            <OneExchangeTable rows={oneExchangeData} />
                        </Box>
                    </Card>
                    </Stack>

                </Box>
        </React.Fragment>
    );
}
