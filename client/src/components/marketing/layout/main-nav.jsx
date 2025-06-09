import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { usePathname } from '@/hooks/use-pathname';
import { Dropdown } from '@/components/core/dropdown/dropdown';
import { DropdownPopover } from '@/components/core/dropdown/dropdown-popover'; 
import { DropdownTrigger } from '@/components/core/dropdown/dropdown-trigger';
import { RouterLink } from '@/components/core/link';

import { MobileNav } from './mobile-nav';
import { PagesPopover } from './pages-popover';



export function MainNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const pathname = usePathname();

  console.log('OPEN', openNav)

  const groups = [
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
  ];


  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          bgcolor: '#0d0911',
          color: 'var(--mui-palette-common-white)',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 'var(--MainNav-zIndex)',
        }}
      >
        <Container sx={{ maxWidth: '1400px !important', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 'var(--MainNav-height)', py: '26px' }}>

          <Stack component="div" direction="row" sx={{ color: '#fff', m: 0, p: 0, alignItems: 'center', columnGap: '50px' }}>
            <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
              <img src="../public/icons/logo.svg" alt="" />
            </Box>

              <Stack component="ul" direction="row" sx={{ display: { xs: 'none', md: 'flex' }, listStyle: 'none', mt: '7px', p: 0, color: '#fff', columnGap: '20px' }}>
                {groups.map((group, index) => (
                  <NavItem key={group.key} pathname={pathname} title={group.title}>
                    <PagesPopover group={group} />
                  </NavItem>
                ))}
              </Stack>
          </Stack>

          <Stack component="div" direction="row" sx={{ columnGap: '10px' }}>
            <Button
              component="a"
              href={'/'}
              sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 700, backgroundColor: 'transparent', color: '#fff', borderRadius: '30px', padding: '5px 20px', border: '1px solid #fff', textTransform: 'initial', transition: 'all .3s ease', '&:hover': { backgroundColor: '#fff', color: '#000' } }}
            >
              Log in
            </Button>
            <Button
              component="a"
              href={'/signup'}
              sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 700, backgroundColor: '#fff', color: '#000', borderRadius: '30px', padding: '5px 20px', border: '1px solid #fff', textTransform: 'initial', transition: 'all .3s ease', '&:hover': { backgroundColor: '#3737cc', color: '#fff', border: '1px solid #3737cc' } }}
            >
              Connect
            </Button>
          </Stack>

          <IconButton
            onClick={() => {
              setOpenNav(true);
            }}
            sx={{ color: '#fff', display: { xs: 'flex', md: 'none' } }}
          >
            <ListIcon />
          </IconButton>
        </Container>
      </Box>

      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

export function NavItem({ children, disabled, external, href, matcher, pathname, title }) {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const hasPopover = Boolean(children);

  const element = (
    <Box component="li" sx={{ userSelect: 'none' }}>
      <Box
        {...(hasPopover
          ? {
              onClick: (event) => {
                event.preventDefault();
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
          color: 'var(--mui-palette-neutral-300)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          textAlign: 'left',
          textDecoration: 'none',
          fontFamily: 'HalvarBreit',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--mui-palette-action-disabledBackground)',
            color: 'var(--mui-action-disabled)',
            cursor: 'not-allowed',
          }),
          ...(active && { color: 'var(--mui-palette-common-white)' }),
          '&:hover': {
            ...(!disabled &&
              !active && { bgcolor: 'rgba(255, 255, 255, 0.04)', color: 'var(--mui-palette-common-white)' }),
          },
        }}
        tabIndex={0}
      >
        <Box component="span" sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {hasPopover ? (
          <Box sx={{ alignItems: 'center', color: 'inherit', display: 'flex', flex: '0 0 auto' }}>
            <CaretDownIcon fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
      </Box>
    </Box>
  );

  if (hasPopover) {
    return (
      <Dropdown>
        <DropdownTrigger>{element}</DropdownTrigger>
        <DropdownPopover
          PaperProps={{ sx: { width: '800px', maxWidth: '100%' } }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          {children}
        </DropdownPopover>
      </Dropdown>
    );
  }

  return element;
}
