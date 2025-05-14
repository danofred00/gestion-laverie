import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BadgePercentIcon, CheckIcon, PlusIcon, SearchIcon, FilterIcon, UserIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// Sample subscription plans
const subscriptionPlans = [{
  id: 1,
  name: 'Pack Essentiel',
  price: 29.9,
  period: 'mensuel',
  features: ['Lavages extérieurs illimités', '1 lavage intérieur par mois', 'Réduction de 10% sur les autres services'],
  color: 'blue'
}, {
  id: 2,
  name: 'Pack Premium',
  price: 49.9,
  period: 'mensuel',
  features: ['Lavages extérieurs illimités', '2 lavages intérieurs par mois', '1 cire protectrice par mois', 'Réduction de 15% sur les autres services'],
  color: 'indigo',
  popular: true
}, {
  id: 3,
  name: 'Pack Professionnel',
  price: 99.9,
  period: 'mensuel',
  features: ['Lavages extérieurs illimités', 'Lavages intérieurs illimités', 'Cire protectrice mensuelle', 'Réduction de 20% sur les autres services', 'Priorité sur les rendez-vous'],
  color: 'purple'
}];
// Sample subscriptions data
const sampleSubscriptions = [{
  id: 1,
  client: 'Martin Dupont',
  plan: 'Pack Premium',
  startDate: '01/01/2023',
  endDate: '31/12/2023',
  status: 'active',
  price: 49.9,
  lastPayment: '01/05/2023',
  nextPayment: '01/06/2023'
}, {
  id: 2,
  client: 'Sophie Laurent',
  plan: 'Pack Essentiel',
  startDate: '15/02/2023',
  endDate: '14/02/2024',
  status: 'active',
  price: 29.9,
  lastPayment: '15/05/2023',
  nextPayment: '15/06/2023'
}, {
  id: 3,
  client: 'Pierre Lefebvre',
  plan: 'Pack Professionnel',
  startDate: '10/03/2023',
  endDate: '09/03/2024',
  status: 'active',
  price: 99.9,
  lastPayment: '10/05/2023',
  nextPayment: '10/06/2023'
}, {
  id: 4,
  client: 'Marie Dubois',
  plan: 'Pack Premium',
  startDate: '01/04/2023',
  endDate: '31/03/2024',
  status: 'active',
  price: 49.9,
  lastPayment: '01/05/2023',
  nextPayment: '01/06/2023'
}, {
  id: 5,
  client: 'Jean Moreau',
  plan: 'Pack Essentiel',
  startDate: '15/12/2022',
  endDate: '14/12/2023',
  status: 'expired',
  price: 29.9,
  lastPayment: '15/04/2023',
  nextPayment: '15/05/2023'
}];
// Sample active promotions
const activePromotions = [{
  id: 1,
  name: 'Offre de bienvenue',
  description: 'Premier mois à -50% pour tout nouvel abonnement',
  validUntil: '30/06/2023',
  code: 'WELCOME50'
}, {
  id: 2,
  name: 'Offre été',
  description: '3 mois pour le prix de 2 sur tous les abonnements',
  validUntil: '31/08/2023',
  code: 'SUMMER23'
}];
export function SubscriptionsPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredSubscriptions, setFilteredSubscriptions] = useState(sampleSubscriptions);
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] = useState(false);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    let filtered = sampleSubscriptions;
    if (searchTerm) {
      filtered = filtered.filter(subscription => subscription.client.toLowerCase().includes(searchTerm.toLowerCase()) || subscription.plan.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter) {
      filtered = filtered.filter(subscription => subscription.status === statusFilter);
    }
    setFilteredSubscriptions(filtered);
  }, [searchTerm, statusFilter]);
  const handleSubscriptionClick = (id: number) => {
    setSelectedSubscription(id);
  };
  const closeSubscriptionDetail = () => {
    setSelectedSubscription(null);
  };
  const subscription = sampleSubscriptions.find(s => s.id === selectedSubscription);
  // Get color for a plan
  const getPlanColor = (planName: string) => {
    const plan = subscriptionPlans.find(p => p.name === planName);
    return plan ? plan.color : 'blue';
  };
  return <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Abonnements & Réductions
          </h1>
          <p className="text-gray-500">
            Gérez les formules d'abonnement et promotions
          </p>
        </div>
        <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowAddSubscriptionModal(true)}>
          Nouvel abonnement
        </Button>
      </div>
      {/* Subscription plans */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Formules d'abonnement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? [...Array(3)].map((_, i) => <Card key={i} className="h-96">
                  <div className="animate-pulse h-full p-4 flex flex-col space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                </Card>) : subscriptionPlans.map(plan => <Card key={plan.id} className={`flex flex-col h-full ${plan.popular ? 'border-t-4 border-indigo-500 shadow-md' : ''}`}>
                  {plan.popular && <div className="bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider py-1 text-center">
                      Recommandé
                    </div>}
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-extrabold">
                        {plan.price.toFixed(2)} €
                      </span>
                      <span className="ml-1 text-gray-500">/ mois</span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature, i) => <li key={i} className="flex items-start">
                          <div className={`flex-shrink-0 h-5 w-5 text-${plan.color}-500`}>
                            <CheckIcon className="h-5 w-5" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">
                            {feature}
                          </p>
                        </li>)}
                    </ul>
                  </div>
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <Button variant={plan.popular ? 'primary' : 'outline'} fullWidth>
                      Souscrire
                    </Button>
                  </div>
                </Card>)}
        </div>
      </div>
      {/* Active promotions */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Promotions actives</h2>
          <Button variant="outline" size="sm" icon={<PlusIcon className="h-4 w-4" />}>
            Nouvelle promotion
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? [...Array(2)].map((_, i) => <Card key={i}>
                  <div className="animate-pulse p-4 flex flex-col space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </Card>) : activePromotions.map(promo => <Card key={promo.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {promo.name}
                        </h3>
                        <p className="mt-1 text-gray-600">
                          {promo.description}
                        </p>
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full border border-blue-100 text-sm font-medium">
                        {promo.code}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Valable jusqu'au:</span>{' '}
                        {promo.validUntil}
                      </p>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </div>
                  </div>
                </Card>)}
        </div>
      </div>
      {/* Subscriptions list */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Abonnements clients</h2>
          <div className="flex gap-2">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Rechercher..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <Button variant="outline" icon={<FilterIcon className="h-4 w-4" />}>
              Filtres
            </Button>
          </div>
        </div>
        {selectedSubscription ? <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} transition={{
        duration: 0.3
      }}>
            <Card className="overflow-visible">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <button onClick={closeSubscriptionDetail} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Retour à la liste
                  </button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="danger" size="sm">
                      Résilier
                    </Button>
                  </div>
                </div>
              </div>
              {subscription && <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="bg-gray-100 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium mr-3">
                              {subscription.client.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 className="text-lg font-bold">
                              {subscription.client}
                            </h3>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {subscription.status === 'active' ? 'Actif' : 'Expiré'}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Formule</p>
                            <p className="font-medium">{subscription.plan}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Tarif mensuel
                            </p>
                            <p className="font-medium">
                              {subscription.price.toFixed(2)} €
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                Date de début
                              </p>
                              <p className="font-medium">
                                {subscription.startDate}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Date de fin
                              </p>
                              <p className="font-medium">
                                {subscription.endDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Historique des paiements
                        </h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Montant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Méthode
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Statut
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  01/05/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {subscription.price.toFixed(2)} €
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Carte bancaire
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Payé
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  01/04/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {subscription.price.toFixed(2)} €
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Carte bancaire
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Payé
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  01/03/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {subscription.price.toFixed(2)} €
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Carte bancaire
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Payé
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Prochain paiement
                          </h3>
                          <Card className="p-5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="p-2 rounded-full bg-blue-100 text-blue-700 mr-3">
                                  <CalendarIcon className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Date</p>
                                  <p className="font-medium">
                                    {subscription.nextPayment}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Montant</p>
                                <p className="font-medium text-right">
                                  {subscription.price.toFixed(2)} €
                                </p>
                              </div>
                            </div>
                          </Card>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-4">Actions</h3>
                          <div className="space-y-2">
                            <Button variant="outline" fullWidth>
                              Modifier la formule
                            </Button>
                            <Button variant="outline" fullWidth>
                              Changer le moyen de paiement
                            </Button>
                            <Button variant="outline" fullWidth>
                              Renouveler automatiquement
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </Card>
          </motion.div> : <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Formule
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Période
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prochain paiement
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
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
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/4"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-8 bg-gray-200 rounded w-20"></div>
                          </td>
                        </tr>) : filteredSubscriptions.map(sub => <tr key={sub.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleSubscriptionClick(sub.id)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                                {sub.client.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {sub.client}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getPlanColor(sub.plan)}-100 text-${getPlanColor(sub.plan)}-800`}>
                              {sub.plan}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {sub.startDate} - {sub.endDate}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {sub.nextPayment}
                            </div>
                            <div className="text-sm text-gray-500">
                              {sub.price.toFixed(2)} €
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {sub.status === 'active' ? 'Actif' : 'Expiré'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </td>
                        </tr>)}
                </tbody>
              </table>
            </div>
          </Card>}
      </div>
    </div>;
}