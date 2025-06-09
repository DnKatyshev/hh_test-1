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
    setSearchValue,
    setSearchChunk
  } = useDataStore();

  const [value, setValue] = useState('');

  const handleSearch = async (searchValue) => {
    setSearchValue(searchValue);
    setCurrentChunk(1);
    setSearchChunk(1);
  
    if (searchValue.trim() === '') {
      setSearchingStop(false);
      setHasMore(true);
      setData('test_data', []);
      await loadMoreData(); // обычная загрузка
      return;
    }
  
    setLoading(true);
    setSearchingStop(true);
  
    const { status, response } = await searchByNumber(searchValue, 1);
  
    if (status === 200) {
      setData('test_data', response || []);
      setHasMore((response || []).length === 20); // если есть ещё
      setSearchChunk(2);
    } else {
      setData('test_data', []);
      setHasMore(false);
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