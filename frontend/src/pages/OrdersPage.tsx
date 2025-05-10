import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PlusIcon, SearchIcon, FilterIcon, ClipboardListIcon, ClockIcon, CheckIcon, XIcon, AlertCircleIcon } from 'lucide-react';
// Sample orders data
const sampleOrders = [{
  id: 1,
  client: 'Martin Dupont',
  vehicle: 'Peugeot 308 (AB-123-CD)',
  service: 'Lavage Complet',
  date: '25/05/2023',
  time: '10:30',
  status: 'en_cours',
  employee: 'Marc Dubois',
  price: 45
}, {
  id: 2,
  client: 'Sophie Laurent',
  vehicle: 'Renault Clio (EF-456-GH)',
  service: 'Lavage Extérieur',
  date: '25/05/2023',
  time: '11:00',
  status: 'en_attente',
  employee: '',
  price: 20
}, {
  id: 3,
  client: 'Pierre Lefebvre',
  vehicle: 'Citroën C3 (IJ-789-KL)',
  service: 'Lavage Intérieur',
  date: '25/05/2023',
  time: '09:15',
  status: 'termine',
  employee: 'Julie Martin',
  price: 30
}, {
  id: 4,
  client: 'Marie Dubois',
  vehicle: 'BMW X3 (MN-012-OP)',
  service: 'Cire Protectrice',
  date: '24/05/2023',
  time: '16:45',
  status: 'termine',
  employee: 'Thomas Leclerc',
  price: 40
}, {
  id: 5,
  client: 'Jean Moreau',
  vehicle: 'Audi A4 (QR-345-ST)',
  service: 'Lavage Complet + Cire',
  date: '24/05/2023',
  time: '14:30',
  status: 'annule',
  employee: '',
  price: 75
}, {
  id: 6,
  client: 'Isabelle Petit',
  vehicle: 'Mercedes GLA (UV-678-WX)',
  service: 'Lavage Extérieur',
  date: '26/05/2023',
  time: '10:00',
  status: 'en_attente',
  employee: '',
  price: 25
}];
// Status mapping for display
const statusMap = {
  en_attente: {
    label: 'En attente',
    color: 'bg-amber-100 text-amber-800'
  },
  en_cours: {
    label: 'En cours',
    color: 'bg-blue-100 text-blue-800'
  },
  termine: {
    label: 'Terminé',
    color: 'bg-green-100 text-green-800'
  },
  annule: {
    label: 'Annulé',
    color: 'bg-red-100 text-red-800'
  }
};
export function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    let filtered = sampleOrders;
    if (searchTerm) {
      filtered = filtered.filter(order => order.client.toLowerCase().includes(searchTerm.toLowerCase()) || order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) || order.service.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter]);
  const handleOrderClick = (id: number) => {
    setSelectedOrder(id);
  };
  const closeOrderDetail = () => {
    setSelectedOrder(null);
  };
  const order = sampleOrders.find(o => o.id === selectedOrder);
  // Count orders by status
  const orderCounts = {
    en_attente: sampleOrders.filter(o => o.status === 'en_attente').length,
    en_cours: sampleOrders.filter(o => o.status === 'en_cours').length,
    termine: sampleOrders.filter(o => o.status === 'termine').length,
    annule: sampleOrders.filter(o => o.status === 'annule').length
  };
  return <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des commandes
          </h1>
          <p className="text-gray-500">Gérez les lavages et services</p>
        </div>
        <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowAddOrderModal(true)}>
          Nouvelle commande
        </Button>
      </div>
      {/* Status summary */}
      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(orderCounts).map(([status, count]) => {
          // @ts-ignore
          const {
            label,
            color
          } = statusMap[status];
          return <Card key={status} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter(status === statusFilter ? '' : status)}>
                <div className={`flex items-center justify-between ${statusFilter === status ? 'font-bold' : ''}`}>
                  <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="text-2xl font-semibold">{count}</p>
                  </div>
                  <div className={`p-2 rounded-full ${color.split(' ')[0]}`}>
                    {status === 'en_attente' && <ClockIcon className="h-5 w-5" />}
                    {status === 'en_cours' && <ClipboardListIcon className="h-5 w-5" />}
                    {status === 'termine' && <CheckIcon className="h-5 w-5" />}
                    {status === 'annule' && <XIcon className="h-5 w-5" />}
                  </div>
                </div>
              </Card>;
        })}
        </div>
      </div>
      {/* Search and filters */}
      <div className="mb-6">
        <Card className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Rechercher une commande..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" icon={<FilterIcon className="h-4 w-4" />}>
                Filtres
              </Button>
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">Tous les statuts</option>
                <option value="en_attente">En attente</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
                <option value="annule">Annulé</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
      {/* Orders list */}
      <div className="mb-6">
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date / Heure
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client / Véhicule
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? [...Array(5)].map((_, i) => <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="animate-pulse h-4 bg-gray-200 rounded w-1/3"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="animate-pulse h-4 bg-gray-200 rounded w-1/4"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="animate-pulse h-8 bg-gray-200 rounded w-20"></div>
                        </td>
                      </tr>) : filteredOrders.map(order => {
                // @ts-ignore
                const {
                  label,
                  color
                } = statusMap[order.status];
                return <tr key={order.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleOrderClick(order.id)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {order.date}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {order.client}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.vehicle}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {order.service}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.employee ? `Par: ${order.employee}` : ''}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
                              {label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.price},00 €
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
                            </div>
                          </td>
                        </tr>;
              })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>;
}