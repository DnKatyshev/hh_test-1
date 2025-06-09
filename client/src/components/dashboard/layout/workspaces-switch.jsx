'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import { usePopover } from '@/hooks/use-popover';

import { WorkspacesPopover } from './workspaces-popover';

// Zustand
import useProjectsStore from '@/store/projectsStore';

// Actions


export function WorkspacesSwitch() {

  const popover = usePopover();
  const { projects, currentProject, setCurrentProject } = useProjectsStore();


  const workspaceHandler = async (project) => {

    setCurrentProject(project);
    popover.handleClose();
  }


  return (
    <React.Fragment>
      <Stack
        direction="row"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        spacing={2}
        sx={{
          alignItems: 'center',
          border: '2px solid #6f6f6f',
          borderRadius: '6px',
          cursor: 'pointer',
          p: '10px 8px',
        }}
      >
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography color="#969696" sx={{fontSize: '14px', fontWeight: '600'}}>
            Выбор проекта
          </Typography>
          <Typography color="var(--Workspaces-name-color)" variant="subtitle2">
            {currentProject.name}
          </Typography>
        </Box>
        <CaretUpDownIcon color="var(--Workspaces-expand-color)" fontSize="var(--icon-fontSize-sm)" />
      </Stack>
      <WorkspacesPopover
        anchorEl={popover.anchorRef.current}
        onChange={(project) => workspaceHandler(project)}
        onClose={popover.handleClose}
        open={popover.open}
        projects={projects} // Передаём список проектов
      />
    </React.Fragment>
  );
}

