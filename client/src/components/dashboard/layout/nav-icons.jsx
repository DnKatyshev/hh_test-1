import { Gear as GearIcon } from '@phosphor-icons/react/dist/ssr/Gear';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { Kanban as KanbanIcon } from '@phosphor-icons/react/dist/ssr/Kanban';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

import { ChartLineUp, MoneyWavy, Money, Swap, BellRinging, Backspace, UserFocus, CreditCard, CurrencyEth, Bank, Invoice, RocketLaunch, Ticket, ShareFat, ChartScatter, ChartPolar } from '@phosphor-icons/react/dist/ssr';


export const icons = {
  analytics: ChartLineUp,
  statistics: ChartScatter,
  conversion: ChartPolar,

  moneyFirst: MoneyWavy,
  moneySecond: Money,
  exchanges: Swap,
  notifications: BellRinging,
  chargeback: Backspace,
  customerBlacklist: UserFocus,
  transactions: CreditCard,

  users: UsersIcon,
  projects: CurrencyEth,
  accounts: Bank,
  certificates: Invoice,

  tickets: Ticket,
  feedback: RocketLaunch,
  sending: ShareFat,

  gear: GearIcon,
  kanban: KanbanIcon,
};
