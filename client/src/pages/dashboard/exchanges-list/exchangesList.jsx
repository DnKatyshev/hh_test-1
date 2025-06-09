import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

import useDataStore from '@/store/dataStore';
import useProjectsStore from '@/store/projectsStore';
import { getExchanges } from '@/actions/exchanges/getExchanges';
import { OrdersPagination } from '@/components/dashboard/settings/orders-pagination';
import { ExchangesTable } from '@/components/dashboard/exchanges/exchanges-table';


export function ExchangesList() {

  const { data, setData, loading, filters } = useDataStore();
  const {currentProject} = useProjectsStore();

  const exchangesData = data.exchanges && data.exchanges.data;

  const [currentPage, setCurrentPage] = useState(0);


  const token = localStorage.getItem('token');

  const filterNonEmptyValues = (filters) => {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== "")
    );
  };

  const fetchPayments = async (page) => {
    const projectId = currentProject.id;

    if(filters.exchanges) {
      var realFilters = filterNonEmptyValues(filters.exchanges);
    }

    console.log('== LIST-DATA ==', realFilters, filters);
    const { status, response } = await getExchanges(token, projectId, page + 1, realFilters); // Сервер использует страницы с 1

    if (status === 200) {
      setData('exchanges', response.data); // Сохраняем данные в store
    }
  };

  useEffect(() => {
    fetchPayments(currentPage); // Загружаем данные для текущей страницы
  }, [currentProject, currentPage, filters.exchanges]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  console.log('CURRENT PROJECT', currentProject);



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
                <ExchangesTable rows={exchangesData} />
              </Box>
              <Divider />
              <OrdersPagination
                count={data.exchanges && data.exchanges.total}
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
