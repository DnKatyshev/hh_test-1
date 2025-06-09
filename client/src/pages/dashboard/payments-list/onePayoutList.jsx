import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

import { OnePayoutTable } from '@/components/dashboard/onePayment/one-payout-table';
import usePaymentsStore from '@/store/paymentsStore';


export function OnePayoutList({onePayoutData}) {

    const {paymentsLoading} = usePaymentsStore();


    return (
        <React.Fragment>
            {
                paymentsLoading
                                ?
                <Skeleton variant="rectangular" width={'100%'} height={'100vh'} />
                                :
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
                            <OnePayoutTable rows={onePayoutData} />
                        </Box>
                    </Card>
                    </Stack>

                </Box>
            }
        </React.Fragment>
    );
}
