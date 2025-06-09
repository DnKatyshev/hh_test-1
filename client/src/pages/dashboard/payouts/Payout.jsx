import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Skeleton from '@mui/material/Skeleton';

import { config } from '@/config';

// MUI-components
import { OnePayoutList } from '../payments-list/onePayoutList';


// Zustand
import useProjectsStore from '@/store/projectsStore';
import usePaymentsStore from '@/store/paymentsStore';

// actions
import { getOnePayout } from '@/actions/payments/getOnePayout';


const metadata = { title: `${config.site.name} Payment` };

export function Page() {

    const {id} = useParams()
    const [paymentData, setPaymentData] = useState([]);

    const {currentProject} = useProjectsStore();

    const getPaymentData = async (id) => {

        const token = localStorage.getItem('token');
        const {response}  = await getOnePayout(token, currentProject.id, id);

        setPaymentData(response.data);

    }

    useEffect(() => {
        getPaymentData(id);
    }, [id]);

    console.log('PAYMENT DATA: ', paymentData)


    return (
        <React.Fragment>
            <Helmet>
            <title>{metadata.title}</title>
            </Helmet>
            <Box
                sx={{
                    p: '40px',
                    width: 'var(--Content-width)',
                }}
            >
                <Stack spacing={4}>

                    <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>

                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant="h5">Выплата №{id}</Typography>
                            <Button>Скачать в Exel</Button>
                        </Box>

                        <OnePayoutList onePayoutData={paymentData} />

                    </Stack>

                </Stack>
            </Box>
        </React.Fragment>
    );
}
