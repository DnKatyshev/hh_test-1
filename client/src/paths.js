export const paths = {
  home: '/',
  dashboard: {
    overview: '/dashboard',

    payments: {
      list: '/dashboard/payments',
      details: (paymentId) => `/dashboard/payment/${paymentId}`,
    },
    payouts: {
      list: '/dashboard/payouts',
      details: (payoutId) => `/dashboard/payout/${payoutId}`,
    },
    exchanges: {
      list: '/dashboard/exchanges',
      details: (exchangeId) => `/dashboard/exchange/${exchangeId}`,
      create: '/dashboard/exchange/create',
    },
    accounts: {
      list: '/dashboard/accounts',
      one: (accountId) => `/dashboard/account/${accountId}`,
      edit: (accountId) => `/dashboard/account/edit/${accountId}`,
    },
    transactions: {
      one: (accountId) => `/dashboard/transaction/${accountId}`,
    },

    
    settings: {
      account: '/dashboard/settings/account',
      billing: '/dashboard/settings/billing',
      integrations: '/dashboard/settings/integrations',
      notifications: '/dashboard/settings/notifications',
      security: '/dashboard/settings/security',
      team: '/dashboard/settings/team',
    },
    analytics: '/dashboard/analytics',
    blank: '/dashboard/blank',
    blog: {
      list: '/dashboard/blog',
      details: (postId) => `/dashboard/blog/${postId}`,
      create: '/dashboard/blog/create',
    },
    calendar: '/dashboard/calendar',
    chat: {
      base: '/dashboard/chat',
      compose: '/dashboard/chat/compose',
      thread: (threadType, threadId) => `/dashboard/chat/${threadType}/${threadId}`,
    },
    crypto: '/dashboard/crypto',
    
    customers: {
      list: '/dashboard/customers',
      create: '/dashboard/customers/create',
      details: (customerId) => `/dashboard/customers/${customerId}`,
    },
    eCommerce: '/dashboard/e-commerce',
    fileStorage: '/dashboard/file-storage',
    i18n: '/dashboard/i18n',
    invoices: {
      list: '/dashboard/invoices',
      create: '/dashboard/invoices/create',
      details: (invoiceId) => `/dashboard/invoices/${invoiceId}`,
    },
    jobs: {
      browse: '/dashboard/jobs',
      create: '/dashboard/jobs/create',
      companies: {
        overview: (companyId) => `/dashboard/jobs/companies/${companyId}`,
        reviews: (companyId) => `/dashboard/jobs/companies/${companyId}/reviews`,
        activity: (companyId) => `/dashboard/jobs/companies/${companyId}/activity`,
        team: (companyId) => `/dashboard/jobs/companies/${companyId}/team`,
        assets: (companyId) => `/dashboard/jobs/companies/${companyId}/assets`,
      },
    },
    logistics: { metrics: '/dashboard/logistics', fleet: '/dashboard/logistics/fleet' },
    mail: {
      list: (label) => `/dashboard/mail/${label}`,
      details: (label, emailId) => `/dashboard/mail/${label}/${emailId}`,
    },
    orders: {
      list: '/dashboard/orders',
      create: '/dashboard/orders/create',
      preview: (orderId) => `/dashboard/orders?previewId=${orderId}`,
      details: (orderId) => `/dashboard/orders/${orderId}`,
    },
    products: {
      list: '/dashboard/products',
      create: '/dashboard/products/create',
      preview: (productId) => `/dashboard/products?previewId=${productId}`,
      details: (productId) => `/dashboard/products/${productId}`,
    },
    social: {
      profile: { timeline: '/dashboard/social/profile', connections: '/dashboard/social/profile/connections' },
      feed: '/dashboard/social/feed',
    },
    tasks: '/dashboard/tasks',
  },
  pdf: { invoice: (invoiceId) => `/pdf/invoices/${invoiceId}` },
  components: {
    index: '/components',
    buttons: '/components/buttons',
    charts: '/components/charts',
    colors: '/components/colors',
    detailLists: '/components/detail-lists',
    forms: '/components/forms',
    gridLists: '/components/grid-lists',
    groupedLists: '/components/grouped-lists',
    inputs: '/components/inputs',
    modals: '/components/modals',
    quickStats: '/components/quick-stats',
    tables: '/components/tables',
    typography: '/components/typography',
  },
  notAuthorized: '/errors/not-authorized',
  notFound: '/errors/not-found',
  internalServerError: '/errors/internal-server-error',
  docs: 'https://material-kit-pro-react-docs.devias.io',
  purchase: 'https://mui.com/store/items/devias-kit-pro',
};
