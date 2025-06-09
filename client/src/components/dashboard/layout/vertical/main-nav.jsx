'use client';

import * as React from 'react';
import { useTransition } from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { useTranslation } from 'react-i18next';

import { useDialog } from '@/hooks/use-dialog';
import { usePopover } from '@/hooks/use-popover';

import { ContactsPopover } from '../contacts-popover';
import { languageFlags, LanguagePopover } from '../language-popover';
import { MobileNav } from '../mobile-nav';
import { NotificationsPopover } from '../notifications-popover';
import { SearchDialog } from '../search-dialog';
import { UserPopover } from '../user-popover/user-popover';

import { useNavigate } from 'react-router-dom';

export function MainNav({ items }) {
  const [openNav, setOpenNav] = React.useState(false);

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const signOutHandler = () => {
    startTransition(() => navigate('/'))
  }


  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, .1)',
          bgcolor: '#1C1C1C',
          left: 0,
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: 'var(--MainNav-zIndex)',
        }}
        >

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            gap: '20px',
            minHeight: 'var(--MainNav-height)',
            p: '14px',
            borderBottom: '1px solid var(--MainNav-divider)',
          }}
        >
            <NotificationsButton/>
            <UserButton/>
        </Box>

      </Box>
      
      <MobileNav
        items={items}
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

function SearchButton() {
  const dialog = useDialog();

  return (
    <React.Fragment>
      <Tooltip title="Search">
        <IconButton onClick={dialog.handleOpen} sx={{ display: { xs: 'none', lg: 'inline-flex' } }}>
          <MagnifyingGlassIcon />
        </IconButton>
      </Tooltip>
      <SearchDialog onClose={dialog.handleClose} open={dialog.open} />
    </React.Fragment>
  );
}

function LanguageSwitch() {
  const { i18n } = useTranslation();
  const popover = usePopover();
  const language = 'ru';  // i18n.language
  const flag = languageFlags[language];

  return (
    <React.Fragment>
      <Tooltip title="Language">
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
          sx={{ display: { xs: 'none', lg: 'flex' } }}
        >
          <Box sx={{display: 'flex'}}>
            <Box alt={language} component="img" src={flag} sx={{ height: 'auto' }} />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}


function ContactsButton() {
  const popover = usePopover();

  return (
    <React.Fragment>
      <Tooltip title="Contacts">
        <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
          <UsersIcon />
        </IconButton>
      </Tooltip>
      <ContactsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}



function NotificationsButton() {
  const popover = usePopover();

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <Badge
          color="error"
          sx={{ '& .MuiBadge-dot': { borderRadius: '50%', height: '10px', right: '6px', top: '6px', width: '10px' } }}
          variant="dot"
        >
          <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
            <BellIcon fill='#fff' />
          </IconButton>
        </Badge>
      </Tooltip>
      <NotificationsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}


const user = {
  id: 'USR-000',
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  email: 'sofia@devias.io',
};

function UserButton() {
  const popover = usePopover();

  return (
    <React.Fragment>
      <Box
        component="button"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="success"
          sx={{
            '& .MuiBadge-dot': {
              border: '2px solid var(--MainNav-background)',
              borderRadius: '50%',
              bottom: '6px',
              height: '12px',
              right: '6px',
              width: '12px',
            },
          }}
          variant="dot"
        >
          <Avatar sx={{bgcolor: '#fff', color: '#000', fontWeight: 700, fontSize: 16}}>
            A
          </Avatar>
        </Badge>
      </Box>
      <UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}
