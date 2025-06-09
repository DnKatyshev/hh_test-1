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
import { OneExchangeList } from '../exchanges-list/oneExchangeList';


// Zustand
import useProjectsStore from '@/store/projectsStore';

// actions
import { getOneExchange } from '@/actions/exchanges/getOneExchange';


const metadata = { title: `${config.site.name} Exchange` };

export function Page() {

    const {id} = useParams()
    const [exchangeData, setExchangeData] = useState([]);

    const {currentProject} = useProjectsStore();

    const getExchangeData = async (id) => {

        const token = localStorage.getItem('token');
        const {response}  = await getOneExchange(token, currentProject.id, id);

        setExchangeData(response.data);
    }

    useEffect(() => {
        getExchangeData(id);
    }, [id]);

    console.log('ONE EXCHANGE DATA: ', exchangeData);

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

                        <OneExchangeList oneExchangeData={exchangeData} />

                    </Stack>

                </Stack>
            </Box>
        </React.Fragment>
    );
}
