import React from 'react';
import { Link, useLocation } from 'react-router';
import { HomeIcon, UsersIcon, CarIcon, WrenchIcon, ClipboardListIcon, CreditCardIcon, BadgePercentIcon, UserIcon, CalendarIcon, PackageIcon, MessageSquareIcon, XIcon } from 'lucide-react';
interface SidebarProps {
  mobile?: boolean;
  closeSidebar?: () => void;
}
export function Sidebar({
  mobile,
  closeSidebar
}: SidebarProps) {
  const location = useLocation();
  const navigation = [{
    name: 'Tableau de bord',
    href: '/dashboard',
    icon: HomeIcon
  }, {
    name: 'Clients',
    href: '/clients',
    icon: UsersIcon
  }, {
    name: 'Véhicules',
    href: '/vehicles',
    icon: CarIcon
  }, {
    name: 'Services',
    href: '/services',
    icon: WrenchIcon
  }, {
    name: 'Commandes',
    href: '/orders',
    icon: ClipboardListIcon
  }, {
    name: 'Paiements',
    href: '/payments',
    icon: CreditCardIcon
  }, {
    name: 'Abonnements',
    href: '/subscriptions',
    icon: BadgePercentIcon
  }, {
    name: 'Personnel',
    href: '/staff',
    icon: UserIcon
  }, {
    name: 'Réservations',
    href: '/reservations',
    icon: CalendarIcon
  }, {
    name: 'Inventaire',
    href: '/inventory',
    icon: PackageIcon
  }, {
    name: 'Avis & Réclamations',
    href: '/reviews',
    icon: MessageSquareIcon
  }];
  const isActive = (path: string) => location.pathname === path;
  return <div className="h-full flex flex-col border-r border-gray-200 bg-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center justify-between flex-shrink-0 px-4">
          <div className="flex items-center">
            <img className="h-8 w-auto" src="https://cdn-icons-png.flaticon.com/512/2830/2830289.png" alt="Car Wash Logo" />
            <h1 className="ml-3 text-xl font-bold text-blue-900">
              Auto Wash Pro
            </h1>
          </div>
          {mobile && <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" onClick={closeSidebar}>
              <span className="sr-only">Fermer le menu</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>}
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map(item => {
          const active = isActive(item.href);
          return <Link key={item.name} to={item.href} className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`}>
                <item.icon className={`${active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'} mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200`} aria-hidden="true" />
                {item.name}
              </Link>;
        })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img className="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" />
            </div>
            <div className="ml-3">
              <p className="text-base font-medium text-gray-700">
                Meli Eric
              </p>
              <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                Administrateur
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}