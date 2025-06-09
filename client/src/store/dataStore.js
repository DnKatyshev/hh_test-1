import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getData } from '@/actions/data/getData';


const useDataStore = create( persist( (set, get) => ({
  data: { test_data: [] },
  loading: false,
  currentChunk: 1,
  hasMore: true,
  searchingStop: false,
  actionCheckboxes: [],
  sortOrder: null,


  setData: (key, value) => set((state) => ({ 
    data: { ...state.data, [key]: value },
  })),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setLoading: (loading) => set({ loading }),
  setHasMore: (hasMore) => set({ hasMore }),
  setCurrentChunk: (chunk) => set({ currentChunk: chunk }),
  setSearchingStop: (searchingStop) => set({ searchingStop }),
  setActionCheckboxes: (id) => set((state) => {
    const index = state.actionCheckboxes.indexOf(id);

    if (index === -1) {
      return { actionCheckboxes: [...state.actionCheckboxes, id] };
    } 
    
    else {
      return { actionCheckboxes: state.actionCheckboxes.filter(item => item !== id) };
    }
  }),


  loadMoreData: async () => {
    const { currentChunk, hasMore, loading, data, searchingStop, sortOrder } = get();
    
    if (loading || !hasMore || searchingStop) return;
    
    set({ loading: true });
    
    try {
      const response = await getData(currentChunk, 20);
      const newData = response.response || [];
      
      if (newData.length === 0) {
        set({ hasMore: false });
      } else {
        set({
          data: { 
            test_data: currentChunk === 1 && !sortOrder ? newData : [...data.test_data, ...newData] 
          },
          currentChunk: currentChunk + 1,

          // не сбрасываем sortOrder при подгрузке
          sortOrder: sortOrder 
        });
      }
    } 
    
    catch (error) {
      console.error('Error loading more data:', error);
    } 
    
    finally {
      set({ loading: false });
    }
  },

}),

  {
    name: 'data-store',
  }

));

export default useDataStore;