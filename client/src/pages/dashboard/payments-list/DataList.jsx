import React, { useEffect } from 'react';
import { Box, Stack, Skeleton, Typography, CircularProgress } from '@mui/material';
import useDataStore from '@/store/dataStore';
import { SortableList } from '@/components/test/SortableList';

export function DataList() {
  
  const { data, loading, hasMore, searchingStop, loadMoreData, sortOrder } = useDataStore();

  useEffect(() => {    
    // Загружаем только если нет данных И нет сохраненного порядка
    if (data.test_data.length === 0 && !sortOrder && !searchingStop) {
      loadMoreData();
    }
  }, []);

  const lastRowRef = (node) => {
    if (!node || loading || !hasMore || searchingStop) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreData();
      }
    }, {
      threshold: 0.1 // Срабатывает при 10% видимости элемента
    });
    
    observer.observe(node);
    return () => observer.disconnect();
  };


  return (
    <React.Fragment>
      <Box>
        <SortableList 
          rows={data.test_data || []} 
          lastRowRef={lastRowRef}
        />
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress color="success" size={60}/>
          </Box>
        )}
        
        {!hasMore && data.test_data.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Typography>Все данные загружены</Typography>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}