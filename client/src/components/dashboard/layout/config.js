import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
    {
      key: 'core',
      title: 'Дашборд',
      items: [
        { id: 'analytics', title: 'Аналитика', href: '/dashboard/analytics', icon: 'analytics' },
        { id: 'statistics', title: 'Статистика', href: '/dashboard/statistics', icon: 'statistics' },
      ],
    },
    {
      key: 'operations',
      title: 'Операции',
      items: [
        {
          id: 'moneyFirst',
          title: 'Платежи',
          icon: 'moneyFirst',
          href: '/dashboard/payments',
          onePageHref: '/dashboard/payment/:id',
        },
        {
          id: 'moneyFirst',
          title: 'Выплаты',
          icon: 'moneyFirst',
          href: '/dashboard/payouts',
          onePageHref: '/dashboard/payout/:id',
        },
        {
          id: 'exchanges',
          title: 'Обмены',
          icon: 'exchanges',
          href: '/dashboard/exchanges',
          onePageHref: '/dashboard/exchange/:id',
        },
        {
          id: 'conversion',
          title: 'Конверсия',
          icon: 'conversion',
          href: '/dashboard/conversion',
        },
        {
          id: 'notifications',
          title: 'Уведомления',
          icon: 'notifications',
          href: '/dashboard/notifications',
        },
        {
          id: 'chargeback',
          title: 'Chargeback',
          icon: 'chargeback',
          href: '/dashboard/chargeback',
        },
        {
          id: 'customerBlacklist',
          title: 'Customer Blacklist',
          icon: 'customerBlacklist',
          href: '/dashboard/customer-blacklist',
        },
        {
          id: 'transactions',
          title: 'Транзакции',
          icon: 'transactions',
          href: '/dashboard/transactions',
        },
      ],
    },
    {
      key: 'clients',
      title: 'Клиенты',
      items: [
        { 
          id: 'users', 
          title: 'Пользователи',
          icon: 'users', 
          href: paths.pricing
        },
        { 
          id: 'projects', 
          title: 'Проекты',
          icon: 'projects', 
          href: paths.pricing
        },
        { 
          id: 'accounts', 
          title: 'Счета', 
          icon: 'accounts',
          href: paths.pricing
        },
        { 
          id: 'certificates', 
          title: 'Сертификаты', 
          icon: 'certificates',
          href: paths.pricing
        },
      ],
    },
    {
      key: 'support',
      title: 'Связь и поддержка',
      items: [
        { id: 'tickets', title: 'Тикеты', icon: 'tickets', href: paths.pricing },
        { id: 'feedback', title: 'Обратная связь', icon: 'feedback', href: paths.pricing },
        { id: 'sending', title: 'Рассылки', icon: 'sending', href: paths.pricing },
      ],
    },
    // {
    //   key: 'settings',
    //   title: 'Настройки',
    //   items: [
    //     { key: 'project', title: 'Категории проектов', icon: 'gear', href: paths.pricing },
    //     { key: 'keys', title: 'Тарифы', icon: 'canban', href: paths.pricing },
    //     { key: 'safety', title: 'Роутинг платежей', icon: 'moneyFirst', href: paths.pricing },
    //     { key: 'notifications', title: 'Роутинг выводов', icon: 'moneyFirst', href: paths.pricing },
    //     { key: 'redirects', title: 'Платёжные методы', icon: 'moneyFirst', href: paths.pricing },
    //     { key: 'redirects', title: 'Платежи каскад', icon: 'moneyFirst', href: paths.pricing },
    //     { key: 'redirects', title: 'Выплаты каскад', icon: 'moneyFirst', href: paths.pricing },
    //   ],
    // },
  ],
};
