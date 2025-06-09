import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowSquareOut as ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareOut';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { useDialog } from '@/hooks/use-dialog';
import Skeleton from '@mui/material/Skeleton';

import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { usePathname } from '@/hooks/use-pathname';
import { RouterLink } from '@/components/core/link';
import { BalanceDialog } from '../balance-dialog';
import Logo from '@/assets/base-icons/logo.svg'

// Zustand
import useDataStore from '@/store/dataStore';

import { icons } from '../nav-icons';
import { WorkspacesSwitch } from '../workspaces-switch';
import { navColorStyles } from './styles';

const logoColors = {
  dark: { blend_in: 'light', discrete: 'light', evident: 'light' },
  light: { blend_in: 'dark', discrete: 'dark', evident: 'light' },
};


export function SideNav({ color = 'evident', items = [] }) {
  const pathname = usePathname();

  const { colorScheme = 'light' } = useColorScheme();

  const styles = navColorStyles[colorScheme][color];
  const logoColor = logoColors[colorScheme][color];

  const {loading} = useDataStore();
  

  const dialog = useDialog();

  return (
    <Box
      sx={{
        ...styles,
        bgcolor: '#1C1C1C',
        borderRight: '1px solid rgba(255, 255, 255, .1)',
        color: 'var(--main-black)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        position: 'fixed',
        top: 0,
        p: '20px 0',
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
      }}
      >
      <Box 
        component={RouterLink} 
        href={paths.home} 
        sx={{
          display: 'inline-flex',
          margin: '0 auto',
          pb: '20px'
        }}
      >
        <Logo/>
      </Box>


      <Box
        component="nav"
        sx={{
          flex: '1 1 auto',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          pt: '40px',
          borderTop: '1px solid rgba(255, 255, 255, .1)',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {renderNavGroups({ items, pathname })}
      </Box>
    </Box>
  );
}

function renderNavGroups({ items, pathname }) {
  const children = items.reduce((acc, curr) => {
    acc.push(
      <Stack component="li" key={curr.key} sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px', p: '0 20px' }}>
        <Box component={'div'} sx={{ display: 'flex', alignItems: 'center', columnGap: '10px', pl: '10px' }}>
          <Typography sx={{ fontSize: '20', fontWeight: 500, color: 'rgba(255, 255, 255, .4)' }}>
            {curr.title}
          </Typography>
        </Box>
        <div>{renderNavItems({ depth: 0, items: curr.items, pathname })}</div>
        <Divider sx={{bgcolor: '#fff', m: '0 -20px', opacity: .1}}/>
      </Stack>
    );

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
      {children}
    </Stack>
  );
}

function renderNavItems({ depth = 0, items = [], pathname }) {
  const children = items.reduce((acc, curr) => {
    const { items: childItems, key, id, ...item } = curr;

    const forceOpen = childItems
      ? Boolean(childItems.find((childItem) => childItem.href && pathname.startsWith(childItem.href)))
      : false;

    acc.push(
      <NavItem depth={depth} forceOpen={forceOpen} key={key} id={id} pathname={pathname} {...item}>
        {childItems ? renderNavItems({ depth: depth + 1, pathname, items: childItems }) : null}
      </NavItem>
    );

    return acc;
  }, []);

  return (
    <Stack component="ul" data-depth={depth} spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

function NavItem({
  children,
  id,
  depth,
  disabled,
  external,
  forceOpen = false,
  href,
  onePageHref,
  label,
  matcher,
  pathname,
  title,
}) {
  const [open, setOpen] = useState(forceOpen);
  const active = isNavItemActive({ href, onePageHref, pathname });
  const Icon = icons[id];
  const ExpandIcon = open ? CaretDownIcon : CaretRightIcon;
  const isBranch = children && !href;
  const showChildren = Boolean(children && open);


  return (
    <Box component="li" data-depth={depth} sx={{ userSelect: 'none', maxWidth: '190px' }}>
      <Box
        {...(isBranch
          ? {
              onClick: () => {
                setOpen(!open);
              },
              onKeyUp: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setOpen(!open);
                }
              },
              role: 'button',
            }
          : {
              ...(href
                ? {
                    component: external ? 'a' : RouterLink,
                    href,
                    target: external ? '_blank' : undefined,
                    rel: external ? 'noreferrer' : undefined,
                  }
                : { role: 'button' }),
            })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '12px 10px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'all .2s ease',
          ...(active && {
            bgcolor: 'rgba(255, 255, 255, .1)',
            color: '#fff',
            ...(depth > 0 && {
              '&::before': {
                bgcolor: 'var(--NavItem-children-indicator)',
                borderRadius: '2px',
                content: '" "',
                height: '20px',
                left: '-14px',
                position: 'absolute',
                width: '3px',
              },
            }),
          }),
          '&:hover': {
            ...(!disabled &&
              !active && {  }),
          },
        }}
        tabIndex={0}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
          {
            <Icon
              fill='#fff'
              fontSize="var(--icon-fontSize-md)"
            />
          }
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {label ? <Chip color="primary" label={label} size="small" /> : null}
        {external ? (
          <Box sx={{ alignItems: 'center', display: 'flex', flex: '0 0 auto' }}>
            <ArrowSquareOutIcon color="var(--NavItem-icon-color)" fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
        {isBranch ? (
          <Box sx={{ alignItems: 'center', display: 'flex', flex: '0 0 auto' }}>
            <ExpandIcon color="var(--NavItem-expand-color)" fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
      </Box>
      {showChildren ? (
        <Box sx={{ pl: '24px' }}>
          <Box sx={{ borderLeft: '1px solid var(--NavItem-children-border)', pl: '12px' }}>{children}</Box>
        </Box>
      ) : null}
    </Box>
  );
}
