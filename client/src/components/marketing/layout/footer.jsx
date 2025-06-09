import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

const footerTopLinks = [
  {
    key: 'company',
    title: 'About company',
    items: [
      { key: 'components', title: 'About us', href: paths.components.index },
      { key: 'dashboard', title: 'Contacts', href: paths.dashboard.overview },
      { key: 'documentation', title: 'Documentation', external: true, href: paths.docs },
    ],
  },
  {
    key: 'solutions',
    title: 'Solutions',
    items: [
      { key: 'terms-and-conditions', title: 'Accepting payments worldwide' },
      { key: 'privacy-policy', title: 'Mass payouts' },
      { key: 'contact', title: 'Payment and disbursement methods' },
    ],
  },
  {
    key: 'integration',
    title: 'Integration',
    items: [
      { key: 'instagram', title: 'Integration process' },
      { key: 'linkedin', title: 'Documentation' },
      { key: 'linkedin', title: 'Ready solutions' },
    ],
  },
];

const footerBottomLinks = [
  { key: 'components', title: 'General terms and conditions', href: paths.components.index },
  { key: 'dashboard', title: 'Website Terms of Use', href: paths.dashboard.overview },
  { key: 'documentation', title: 'Privacy Policy', href: paths.docs },
  { key: 'documentation', title: 'Cookies Policy', href: paths.docs },
]


export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0d0911',
        p: '40px 0'
      }}
    >
      <Container sx={{maxWidth: '1400px !important'}}>
        <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }}>

          <Stack direction={{ md: 'row', xs: 'column-reverse' }} sx={{ justifyContent: 'space-between', gap: '30px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px'}}>
              <img src="../public/icons/logo-footer.svg" alt="" width={200} />
              <Link
                component={RouterLink}
                href="mailto:mail@htmlacademy.ru"
                color="#a1a1b9"
                variant="subtitle2"
              >
                mail@htmlacademy.ru
              </Link>
              {/* <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Link
                  component={RouterLink}
                  href="https://www.facebook.com/alikassaofficial"
                  color="#a1a1b9"
                  variant="subtitle2"
                >
                  <svg width="20" height="20">
                      <use xlinkHref="https://merchant.alikassa.com/images/new-sprite.svg#fb"></use>
                  </svg>
                </Link>
                <Link
                  component={RouterLink}
                  href="https://vk.com/alikassaofficial"
                  color="#a1a1b9"
                  variant="subtitle2"
                >
                  <svg width="20" height="20">
                      <use xlinkHref="https://merchant.alikassa.com/images/new-sprite.svg#vk"></use>
                  </svg>
                </Link>
                <Link
                  component={RouterLink}
                  href="skype:live:.cid.5c20f3c70e07530a"
                  color="#a1a1b9"
                  variant="subtitle2"
                >
                  <svg width="20" height="20">
                      <use xlinkHref="https://merchant.alikassa.com/images/new-sprite.svg#skype"></use>
                  </svg>
                </Link>
                <Link
                  component={RouterLink}
                  href="https://t.me/alikassa_official"
                  color="#a1a1b9"
                  variant="subtitle2"
                >
                  <svg width="20" height="20">
                      <use xlinkHref="https://merchant.alikassa.com/images/new-sprite.svg#tg"></use>
                  </svg>
                </Link>
              </Stack> */}
            </Box>


              {footerTopLinks.map((section, index) => (
                <Grid
                  key={section.key}
                  sx={{ order: { md: index + 2, xs: index + 1 } }}
                  size={{
                    md: 3,
                    sm: 4,
                    xs: 12,
                  }}
                >
                  <Typography color="#fff" variant="overline" sx={{display: 'block', mb: '30px'}}>
                    {section.title}
                  </Typography>
                  <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
                    {section.items.map((item) => (
                      <NavItem {...item} key={item.key} />
                    ))}
                  </Stack>
                </Grid>
              ))}

          </Stack>

          <Divider sx={{borderColor: "#a1a1b9 !important", height: "1px"}} />

          <Stack component="div" direction={{ md: 'row', xs: 'column' }} sx={{ display: 'flex', justifyContent: 'space-between', rowGap: '20px' }}>
            {footerBottomLinks.map((item) => (
              <NavItem {...item} key={item.key} />
            ))}
          </Stack>

        </Stack>

      </Container>
    </Box>
  );
}

function NavItem({ href, external, title }) {
  return (
      <Link
        {...(href ? (external ? { component: 'a', href, target: '_blank' } : { component: RouterLink, href }) : {})}
        sx={{ transition: "color 0.3s ease", "&:hover": { color: "#fff", textDecoration: "none" } }}
        color="#a1a1b9"
        variant="subtitle2"
      >
        {title}
      </Link>
  );
}
