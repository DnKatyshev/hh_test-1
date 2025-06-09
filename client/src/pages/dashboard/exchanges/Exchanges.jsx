import * as React from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RouterLink } from '@/components/core/link';
import { Helmet } from 'react-helmet-async';
import Skeleton from '@mui/material/Skeleton';

import { config } from '@/config';
import { paths } from '@/paths';

import useDataStore from '@/store/dataStore';
import useProjectsStore from '@/store/projectsStore';
import { getBalance } from '@/actions/payments/getBalance';
import { ExchangesFilters } from '@/components/dashboard/filters/exchanges-filters';
import { ExchangesList } from '../exchanges-list/exchangesList';


const metadata = { title: `${config.site.name} Exchanges` };


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
                <Typography variant="h4">Обмены</Typography>
                <Box 
                  component={RouterLink} 
                  href={paths.dashboard.exchanges.create} 
                  sx={{ color: '#fff', backgroundColor: '#000410', padding: '8px 24px', fontSize: '18px', borderRadius: '10px', fontWeight: 500, '&:hover': {backgroundColor: '#001626'} }}
                >
                    Создать обмен
                </Box>
            </Stack>

            {
              loading
                        ? 
              <Skeleton width={'100%'} height={400} sx={{transform: "inherit"}} />
                        : 
              <ExchangesFilters/>
            }

            {
              loading
                        ? 
              <Skeleton width={'100%'} height={900} sx={{transform: "inherit"}} />
                        :
              <ExchangesList/>
            }


          </Stack>

        </Stack>
      </Box>
    </React.Fragment>
  );
}
