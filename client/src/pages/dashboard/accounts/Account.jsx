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

// Components
import { OneAccountList } from '../accounts-list/oneAccountList';
import { AccountAdditionalList } from '../accounts-list/accountAdditionalList';
import { TransactionsItem } from './Transactions';

// Zustand
import useDataStore from '@/store/dataStore';
import useProjectsStore from '@/store/projectsStore';

// actions
import { getOneAccount } from '@/actions/accounts/getAccount';


const metadata = { title: `${config.site.name} Exchange` };

export function Page() {

    const {id} = useParams()
    const {loading, setLoading} = useDataStore();
    const [accountsData, setAccountsData] = useState([]);

    const {currentProject} = useProjectsStore();

    const getAccountData = async (id) => {
        setLoading(true)

        const token = localStorage.getItem('token');
        const { response } = await getOneAccount(token, currentProject.id, id);
      
        const accountData = response.data;
      
        setAccountsData(accountData); // Обновляем состояние
      
        setLoading(false)
      };
      
      
      

    useEffect(() => {
        getAccountData(id);
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
                        loading
                                ? 
                        <Skeleton variant="rectangular" width="100%" height={200} />
                                : 
                        <OneAccountList oneAccountData={accountsData} />
                    }

                        <AccountAdditionalList id={id}/>

                        <TransactionsItem id={id}/>
                        
                    </Stack>

                </Stack>
            </Box>
        </React.Fragment>
    );
}
