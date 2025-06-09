import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

import useDataStore from '@/store/dataStore';
import useProjectsStore from '@/store/projectsStore';
import {getOneAccountTransactions} from '@/actions/accounts/getAccount';
import { OrdersPagination } from '@/components/dashboard/settings/orders-pagination';
import { TransactionsTable } from '@/components/dashboard/accounts/transactions-table';


export function TransactionsList({id}) {

  const { data, setData, loading, filters } = useDataStore();
  const {currentProject} = useProjectsStore();

  const transactionsData = data.transactions && data.transactions.data;

  const [currentPage, setCurrentPage] = useState(0);


  const token = localStorage.getItem('token');

  const filterNonEmptyValues = (filters) => {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== "")
    );
  };


  const fetchPayments = async (page) => {
    const projectId = currentProject.id;

    if(filters.transactions) {
      var realFilters = filterNonEmptyValues(filters.transactions);
    }

    const { status, response } = await getOneAccountTransactions(token, projectId, page + 1, id, realFilters); // Сервер использует страницы с 1

    console.log('== TRANS TABLE ==', response);

    if (status === 200) {
      setData('transactions', response.data); // Сохраняем данные в store
    }
  };


  useEffect(() => {
    fetchPayments(currentPage); // Загружаем данные для текущей страницы
  }, [currentProject, currentPage, filters.transactions]);

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
                <TransactionsTable rows={transactionsData} />
              </Box>
              <Divider />
              <OrdersPagination
                count={data.transactions && data.transactions.total}
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
