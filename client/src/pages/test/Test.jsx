import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import { config } from '@/config';

import { FiltersNavbar } from '@/components/test/FiltersNavbar';
import { DataList } from '../dashboard/payments-list/DataList';

export function Page() {
  

  return (
    <>
      <Box
        sx={{
          p: '40px 20px',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }}>

            <Typography variant="h4" sx={{mb: '10px', color: '#fff'}}>Тестовое для "ООО Цифровые решения"</Typography>

            <FiltersNavbar/>

            <DataList/>

          </Stack>
        </Stack>
      </Box>
    </>
  );
}
