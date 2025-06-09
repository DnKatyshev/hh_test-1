import { useEffect, useState } from 'react';
import { Stack, OutlinedInput, InputAdornment } from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { searchByNumber } from '@/actions/data/getData';
import useDataStore from '@/store/dataStore';

export function FiltersNavbar() {
  const {
    setData,
    setLoading,
    setSearchingStop,
    setCurrentChunk,
    setHasMore,
    loadMoreData,
  } = useDataStore();

  const [value, setValue] = useState('');

  const handleSearch = async (searchValue) => {
    setCurrentChunk(1);

    if (searchValue.trim() === '') {
      setSearchingStop(false);
      setHasMore(true);
      setData('test_data', []);
      await loadMoreData(); // загрузка первых данных
      return;
    }

    setLoading(true);
    setSearchingStop(true);

    const { status, response } = await searchByNumber(searchValue);
    
    if (status === 200) {
      setData('test_data', response || []);
    } else {
      setData('test_data', []);
    }

    setLoading(false);
  };


  useEffect(() => {
    handleSearch(value);
  }, [value]);

  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', justifyContent: 'end', p: 3, bgcolor: '#242424', borderRadius: '10px' }}
    >
      <OutlinedInput
        sx={{
          width: '260px',
          height: '50px',
          bgcolor: '#1C1C1C',
          color: '#fff',
          border: '2px solid rgba(255, 255, 255, .5)',
        }}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Найти"
        endAdornment={
          <InputAdornment>
            <MagnifyingGlass fill="#fff" />
          </InputAdornment>
        }
        value={value}
      />
    </Stack>
  );
}