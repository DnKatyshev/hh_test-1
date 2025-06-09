import * as React from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Skeleton from '@mui/material/Skeleton';

import { config } from '@/config';

import { getBalance } from '@/actions/payments/getBalance';
import useProjectsStore from '@/store/projectsStore';
import useDataStore from '@/store/dataStore';
import { AccountsFilters } from '@/components/dashboard/filters/accounts-filters';
import { AccountsList } from '../accounts-list/accountsList';


const metadata = { title: `${config.site.name} Accounts` };


export function Page() {

    const {loading} = useDataStore();

    const token = localStorage.getItem('token');
    const {currentProject, setBalance} = useProjectsStore()
  
    const getBalanceHandler = async (projectId) => {
      const {response} = await getBalance(token, projectId)
      setBalance(response.data)
    }
  
    useEffect(() => {
      getBalanceHandler(currentProject.id)
    }, [currentProject]);


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

                        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Typography variant="h4">Счета</Typography>
                        </Stack>

                        {
                            loading
                                    ? 
                            <Skeleton width={'100%'} height={400} sx={{transform: "inherit"}} />
                                    : 
                            <AccountsFilters/>
                        }

                        {
                            loading
                                    ? 
                            <Skeleton width={'100%'} height={900} sx={{transform: "inherit"}} />
                                    :
                            <AccountsList/>
                        }


                        </Stack>

                    </Stack>
                </Box>
        </React.Fragment>
    );
}
