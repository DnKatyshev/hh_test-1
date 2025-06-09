'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { usePathname } from '@/hooks/use-pathname';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

// NOTE: First level elements are groups.

const navItems = [
  {
    key: 'group-0',
    items: [
      {
        key: 'group-0',
        title: 'About company',
        items: [
          { key: 'overview', title: 'Overview', href: paths.dashboard.overview },
          { key: 'customers', title: 'Customers', href: paths.dashboard.customers.list },
        ],
      },
      {
        key: 'group-1',
        title: 'Solutions',
        items: [
          { key: 'blog', title: 'Blog', href: paths.dashboard.blog.list },
          { key: 'pricing', title: 'Pricing', href: paths.pricing },
          { key: 'contact', title: 'Contact', href: paths.pricing },
        ],
      },
      {
        key: 'group-2',
        title: 'Integration',
        items: [
          { key: 'process', title: 'Integration process', href: paths.dashboard.blog.list },
          { key: 'documentation', title: 'Documentation', href: paths.pricing },
          { key: 'solutions', title: 'Ready solutions', href: paths.pricing },
        ],
      },
    ],
  },
];


export function MobileNav({ onClose, open = false }) {
  const pathname = usePathname();

  return (
      <Dialog fullScreen open={open} onClose={onClose} sx={{}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '60px', position: 'fixed', width: '100vw', height: '100vh', background: '#000', color: '#fff', fontFamily: 'Neu Montreal', padding: '24px' }}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
              <img src="../public/icons/logo.svg" alt="" />
            </Box>
            <IconButton onClick={onClose}>
              <XIcon fill='#fff'/>
            </IconButton>
          </Stack>
          <Box component="nav">
            <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {renderNavGroups({ items: navItems, onClose, pathname })}
            </Stack>
          </Box>
        </Box>
      </Dialog>

  );
}

function renderNavGroups({ items, onClose, pathname }) {
  const children = items.reduce((acc, curr) => {
    acc.push(
      <Stack component="li" key={curr.key} spacing={1.5}>
        {curr.title ? (
          <div>
            <Typography sx={{ color: 'var(--NavGroup-title-color)', fontSize: '0.875rem', fontWeight: 500 }}>
              {curr.title}
            </Typography>
          </div>
        ) : null}
        <div>{renderNavItems({ depth: 0, items: curr.items, onClose, pathname })}</div>
      </Stack>
    );

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

function renderNavItems({ depth = 0, items = [], onClose, pathname }) {
  const children = items.reduce((acc, curr) => {
    const { items: childItems, key, ...item } = curr;

    const forceOpen = childItems
      ? Boolean(childItems.find((childItem) => childItem.href && pathname.startsWith(childItem.href)))
      : false;

    acc.push(
      <NavItem depth={depth} forceOpen={forceOpen} key={key} onClose={onClose} pathname={pathname} {...item}>
        {childItems ? renderNavItems({ depth: depth + 1, items: childItems, onClose, pathname }) : null}
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

function NavItem({ children, depth, disabled, external, forceOpen = false, href, matcher, onClose, pathname, title }) {
  const [open, setOpen] = React.useState(forceOpen);
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const ExpandIcon = open ? CaretDownIcon : CaretRightIcon;
  const isBranch = children && !href;
  const showChildren = Boolean(children && open);

  return (
    <Box component="li" data-depth={depth} sx={{ userSelect: 'none' }}>
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
                    onClick: () => {
                      onClose?.();
                    },
                  }
                : { role: 'button' }),
            })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          p: '12px',
          textDecoration: 'none',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
          ...(open && { color: 'var(--NavItem-open-color)' }),
          '&:hover': {
            ...(!disabled &&
              !active && { bgcolor: 'var(--NavItem-hover-background)', color: 'var(--NavItem-hover-color)' }),
          },
        }}
        tabIndex={0}
      >
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {isBranch ? <ExpandIcon fontSize="var(--icon-fontSize-sm)" /> : null}
      </Box>
      {showChildren ? <Box sx={{ pl: '20px' }}>{children}</Box> : null}
    </Box>
  );
}
