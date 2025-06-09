import * as React from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import Skeleton from '@mui/material/Skeleton';

import { config } from '@/config';
import { getBalance } from '@/actions/payments/getBalance';
import useProjectsStore from '@/store/projectsStore';
import { PayoutsFilters } from '@/components/dashboard/filters/payouts-filters';
import { PayoutsList } from '../payments-list/payoutsList';

// Zustand
import useDataStore from '@/store/dataStore';


const metadata = { title: `${config.site.name} Payouts` };

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

            <Typography variant="h4">Выплаты</Typography>

            {
              loading
                        ? 
              <Skeleton width={'100%'} height={400} sx={{transform: "inherit"}} />
                        : 
              <PayoutsFilters/>
            }

            {
              loading
                        ? 
              <Skeleton width={'100%'} height={900} sx={{transform: "inherit"}} />
                        :
              <PayoutsList/>
            }


          </Stack>

        </Stack>
      </Box>
    </React.Fragment>
  );
}
