import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

import useDataStore from '@/store/dataStore';
import useProjectsStore from '@/store/projectsStore';
import { getAccounts } from '@/actions/accounts/getAccounts';
import { OrdersPagination } from '@/components/dashboard/settings/orders-pagination';
import { AccountsTable } from '@/components/dashboard/accounts/accounts-table';


export function AccountsList() {

  const { data, setData, loading, filters } = useDataStore();
  const {currentProject} = useProjectsStore();

  const accountsData = data.accounts && data.accounts.data;

  const [currentPage, setCurrentPage] = useState(0);


  const token = localStorage.getItem('token');

  const filterNonEmptyValues = (filters) => {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== "")
    );
  };

  const fetchPayments = async (page) => {
    const projectId = currentProject.id;

    if(filters.accounts) {
      var realFilters = filterNonEmptyValues(filters.accounts);
    }

    console.log('== LIST-DATA ==', realFilters, filters);
    const { status, response } = await getAccounts(token, projectId, page + 1, realFilters); // Сервер использует страницы с 1

    if (status === 200) {
      setData('accounts', response.data); // Сохраняем данные в store
    }
  };

  useEffect(() => {
    fetchPayments(currentPage); // Загружаем данные для текущей страницы
  }, [currentProject, currentPage, filters.accounts]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };



  return (
    <React.Fragment>
      {
        loading
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
                <AccountsTable rows={accountsData} />
              </Box>
              <Divider />
              <OrdersPagination
                count={data.accounts && data.accounts.total}
                page={currentPage}
                onPageChange={handlePageChange}
              />
            </Card>
          </Stack>
        </Box>
      }
    </React.Fragment>
  );
}
