import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


const useProjectsStore = create()(
    persist(immer((set) => ({

        projects: [{
          
        }],
        setProjects: (projects) => {
            set((state) => {
              state.projects = projects
            });
        },

        currentProject: [],
        setCurrentProject: (project) => {
            set((state) => {
              state.currentProject = project
            });
        },

        balance: [],
        setBalance: (balance) => {
            set((state) => {
              state.balance = balance
            });
        },

    })),
      {
          name: 'projects-store',
      }
    )
);

export default useProjectsStore;