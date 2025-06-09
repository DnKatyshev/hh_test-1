import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getData, searchByNumber } from '@/actions/data/getData';


const useDataStore = create( persist( (set, get) => ({
  data: { test_data: [] },
  loading: false,
  currentChunk: 1,
  hasMore: true,
  searchingStop: false,
  actionCheckboxes: [],
  sortOrder: null,
  searchValue: '',
  searchChunk: 1,


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
    const {
      currentChunk,
      hasMore,
      loading,
      data,
      searchingStop,
      sortOrder,
      searchValue,
      searchChunk,
    } = get();
  
    if (loading || !hasMore) return;
  
    set({ loading: true });
  
    try {
      let response;
      let newData = [];
  
      if (searchingStop && searchValue !== '') {
        // Поиск по номеру
        response = await searchByNumber(searchValue, searchChunk, 20);
        newData = response.response || [];
  
        set({
          data: {
            test_data: [...data.test_data, ...newData],
          },
          searchChunk: searchChunk + 1,
        });
      } else {
        // Обычная загрузка
        response = await getData(currentChunk, 20);
        newData = response.response || [];
  
        set({
          data: {
            test_data: [...data.test_data, ...newData],
          },
          currentChunk: currentChunk + 1,
        });
      }
  
      if (newData.length < 20) {
        set({ hasMore: false });
      }
    } 
    
    catch (error) {
      console.error('Error loading more data:', error);
    } 
    
    finally {
      set({ loading: false });
    }
  },

  setSearchValue: (value) => set({ searchValue: value }),
  setSearchChunk: (chunk) => set({ searchChunk: chunk }),

}),

  {
    name: 'data-store',
  }

));

export default useDataStore;