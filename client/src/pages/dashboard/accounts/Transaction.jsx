import * as React from 'react';
import { useState, useEffect, useTransition } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Skeleton from '@mui/material/Skeleton';

import { config } from '@/config';

// Components
import { OneTransactionList } from '../accounts-list/oneTransactionList';

// Zustand
import useDataStore from '@/store/dataStore';
import useProjectsStore from '@/store/projectsStore';

// actions
import { getOneTransaction } from '@/actions/accounts/getAccount';


const metadata = { title: `${config.site.name} Transaction` };

export function Page() {

    const { id } = useParams();
    const { currentProject } = useProjectsStore();
  
    const [isPending, startTransition] = useTransition();
    const [transactionData, setTransactionData] = useState([]);
  
    const fetchTransactionData = async (id) => {
      const token = localStorage.getItem('token');
      const { response } = await getOneTransaction(token, currentProject.id, id);
      setTransactionData(response.data);
    };
  
    useEffect(() => {
      startTransition(() => {
        fetchTransactionData(id);
      });
    }, [id]);


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

                    <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>

                    {
                        isPending
                                ? 
                        <Skeleton variant="rectangular" width="100%" height={'100vh'} />
                                : 
                        <OneTransactionList oneTransactionData={transactionData} />
                    }
                        
                    </Stack>

                </Stack>
            </Box>
        </React.Fragment>
    );
}
