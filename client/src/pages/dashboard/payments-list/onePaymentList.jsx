import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

import { OnePaymentTable } from '@/components/dashboard/onePayment/one-payment-table';
import usePaymentsStore from '@/store/paymentsStore';


export function OnePaymentList({onePaymentData}) {


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
                        <OnePaymentTable rows={onePaymentData} />
                    </Box>
                </Card>
                </Stack>

            </Box>
        </React.Fragment>
    );
}
