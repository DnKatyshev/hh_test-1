import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import useDataStore from '@/store/dataStore';
import useProjectsStore from '@/store/projectsStore';

import { getOneAccountPayments, getOneAccountPayouts, getOneAccountWallets } from '@/actions/accounts/getAccount';
import {AccountPagination} from '@/components/dashboard/settings/account-pagination'
import { AccountAdditionalTable } from '@/components/dashboard/accounts/accounts-additional-table';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass } from '@phosphor-icons/react';


export function AccountAdditionalList({id}) {

  const token = localStorage.getItem('token');

  const {loading, setLoading} = useDataStore();
  const {currentProject} = useProjectsStore();
  const [additionalData, setAdditionalData] = useState([])

  const [currentPages, setCurrentPages] = useState({}); // объект для хранения текущих страниц для разных таблиц

  
  const getAdditionalAccountData = async (id, pages) => {

    setLoading(true)
    
    const payments = await getOneAccountPayments(token, Number(currentProject[0]), (pages[0] || 0) + 1, id);
    const payouts = await getOneAccountPayouts(token, Number(currentProject[0]), (pages[1] || 0) + 1, id);
    const wallets = await getOneAccountWallets(token, Number(currentProject[0]), (pages[2] || 0) + 1, id);

    const mainData = [ payments.response.accountDataResponse, payouts.response.accountDataResponse, wallets.response.accountDataResponse];
    

    // Объект для сопоставления ключей с заголовками
    const titlesMapping = ['Способы приёма', 'Payout methods', 'Криптокошельки'];


    const getColumnsForTitle = (title) => {
      switch (title) {
        case 'Способы приёма':
          return [
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>{row.id}</Typography>
              ),
              name: 'ID',
              width: '50px',
              align: 'center',
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}> {row.service_code} </Typography>
              ),
              name: 'Сервис',
              width: '100px'
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>{row.rolling_reserve}</Typography>
              ),
              name: 'Rolling reserve',
              width: '250px'
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>
                  {row.percent}
                </Typography>
              ),
              name: 'Комиссия',
              width: '100px',
              align: 'center',
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>
                  {row.hold !== null ? row.hold : '-'}
                </Typography>
              ),
              name: 'Холд',
              width: '100px',
              align: 'center',
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>
                  {Number(row.min).toFixed(2)}
                </Typography>
              ),
              name: 'Мин.сумма',
              width: '100px',
              align: 'center',
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>
                  {Number(row.max).toFixed(2)}
                </Typography>
              ),
              name: 'Макс.сумма',
              width: '200px',
              align: 'center',
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>
                  <Chip label={row.status} color={row.status === 'active' ? 'success' : 'error'} sx={{ minWidth: '65px', padding: '4px 0' }} />
                </Typography>
              ),
              name: 'Статус',
              width: '200px',
              align: 'center',
            },
          ];
          
        case 'Payout methods':
          return [
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>{row.id}</Typography>
              ),
              name: 'ID',
              width: '15%',
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}> {row.service_code} </Typography>
              ),
              name: 'Сервис',
              width: '100px'
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>
                  {row.percent}
                </Typography>
              ),
              name: 'Комиссия',
              width: '15%',
              align: 'center',
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>
                  {Number(row.min).toFixed(2)}
                </Typography>
              ),
              name: 'Мин.сумма',
              width: '15%',
              align: 'center',
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>
                  {Number(row.max).toFixed(2)}
                </Typography>
              ),
              name: 'Макс.сумма',
              width: '15%',
              align: 'center',
            },
            {
              formatter: (row) => (
                <Typography variant="body2" sx={{fontWeight: "700"}}>
                  <Chip label={row.status} color={row.status === 'active' ? 'success' : 'error'} sx={{ minWidth: '65px', padding: '4px 0' }} />
                </Typography>
              ),
              name: 'Статус',
              width: '15%',
              align: 'center',
            },
          ];
        default:
          return [];
      }
    };


    // Преобразование данных
    const transformedData = mainData.map((item, index) => ({
        title: titlesMapping[index], // Заголовок
        rows: item.data, // Массив данных
        columns: getColumnsForTitle(titlesMapping[index]), // Колонки для таблицы
    }));


      setAdditionalData(transformedData);
      setLoading(false)
    };


    useEffect(() => {
      getAdditionalAccountData(id, currentPages);
    }, [id, currentPages]);


    const handlePageChange = (newPage, index) => {
      setCurrentPages((prev) => ({
        ...prev,
        [index]: newPage
      }));
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
            width: 'var(--Content-width)',
          }}
        >
        <Stack spacing={4}>
          {additionalData.map((item, index) => (
            <Card key={index}>
              <Box sx={{ overflowX: 'auto', p: 2, display: 'flex', flexDirection: 'column', rowGap: '30px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '700' }}>
                  {item.title} {/* Заголовок таблицы */}
                </Typography>

                <Box sx={{ overflowX: 'auto' }}>
                  <AccountAdditionalTable rows={item.rows.data} columns={item.columns} />
                </Box>
                
                <Divider />
                
                <AccountPagination
                  count={item.rows.total}
                  page={currentPages[index] || 0}
                  onPageChange={(newPage) => handlePageChange(newPage, index)}
                />

              </Box>
              <Divider />
            </Card>
          ))}
        </Stack>
        </Box>
      }
    </React.Fragment>
  );
}
