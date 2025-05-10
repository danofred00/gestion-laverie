import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlusIcon, SearchIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon, FilterIcon } from 'lucide-react';
// Sample client data
const sampleClients = [{
  id: 1,
  name: 'Martin Dupont',
  email: 'martin.dupont@example.com',
  phone: '06 12 34 56 78',
  vehicles: 2,
  lastVisit: '12/05/2023'
}, {
  id: 2,
  name: 'Sophie Laurent',
  email: 'sophie.laurent@example.com',
  phone: '06 23 45 67 89',
  vehicles: 1,
  lastVisit: '18/05/2023'
}, {
  id: 3,
  name: 'Pierre Lefebvre',
  email: 'pierre.lefebvre@example.com',
  phone: '06 34 56 78 90',
  vehicles: 3,
  lastVisit: '05/05/2023'
}, {
  id: 4,
  name: 'Marie Dubois',
  email: 'marie.dubois@example.com',
  phone: '06 45 67 89 01',
  vehicles: 1,
  lastVisit: '22/05/2023'
}, {
  id: 5,
  name: 'Jean Moreau',
  email: 'jean.moreau@example.com',
  phone: '06 56 78 90 12',
  vehicles: 2,
  lastVisit: '10/05/2023'
}, {
  id: 6,
  name: 'Isabelle Petit',
  email: 'isabelle.petit@example.com',
  phone: '06 67 89 01 23',
  vehicles: 1,
  lastVisit: '15/05/2023'
}, {
  id: 7,
  name: 'Thomas Bernard',
  email: 'thomas.bernard@example.com',
  phone: '06 78 90 12 34',
  vehicles: 4,
  lastVisit: '08/05/2023'
}, {
  id: 8,
  name: 'Claire Robert',
  email: 'claire.robert@example.com',
  phone: '06 89 01 23 45',
  vehicles: 2,
  lastVisit: '20/05/2023'
}];
export function ClientsPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(sampleClients);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (searchTerm) {
      setFilteredClients(sampleClients.filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.email.toLowerCase().includes(searchTerm.toLowerCase()) || client.phone.includes(searchTerm)));
    } else {
      setFilteredClients(sampleClients);
    }
  }, [searchTerm]);
  const handleClientClick = (id: number) => {
    setSelectedClient(id);
  };
  const closeClientDetail = () => {
    setSelectedClient(null);
  };
  const client = sampleClients.find(c => c.id === selectedClient);
  return <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des clients
          </h1>
          <p className="text-gray-500">
            Gérez votre base clients et leurs informations
          </p>
        </div>
        <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowAddClientModal(true)}>
          Ajouter un client
        </Button>
      </div>
      {/* Search and filters */}
      <div className="mb-6">
        <Card className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Rechercher un client..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" icon={<FilterIcon className="h-4 w-4" />}>
                Filtres
              </Button>
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Trier par</option>
                <option value="name">Nom</option>
                <option value="date">Date de visite</option>
                <option value="vehicles">Nombre de véhicules</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
      {/* Client list or detail */}
      <div className="mb-6">
        {selectedClient ? <motion.div initial={{
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
                  <button onClick={closeClientDetail} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Retour à la liste
                  </button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="danger" size="sm">
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
              {client && <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
                        <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="text-lg font-bold">{client.name}</h3>
                        <p className="text-gray-500 text-sm">
                          Client depuis Janvier 2023
                        </p>
                        <div className="mt-6 w-full">
                          <h4 className="text-sm font-medium mb-2">
                            Informations de contact
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium">Email:</span>{' '}
                              {client.email}
                            </p>
                            <p>
                              <span className="font-medium">Téléphone:</span>{' '}
                              {client.phone}
                            </p>
                            <p>
                              <span className="font-medium">Adresse:</span> 123
                              Rue de Paris, 75001 Paris
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Véhicules ({client.vehicles})
                        </h3>
                        <div className="space-y-4">
                          {[...Array(client.vehicles)].map((_, i) => <div key={i} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-full mr-3">
                                  {/* <CarIcon className="h-6 w-6 text-blue-700" /> */}
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {i === 0 ? 'Peugeot 308' : i === 1 ? 'Renault Clio' : 'Citroën C3'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {i === 0 ? 'AB-123-CD' : i === 1 ? 'EF-456-GH' : 'IJ-789-KL'}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
                            </div>)}
                          <Button variant="outline" size="sm" icon={<PlusIcon className="h-4 w-4" />} fullWidth>
                            Ajouter un véhicule
                          </Button>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Historique des commandes
                        </h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Service
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Véhicule
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Montant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Statut
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  12/05/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Lavage complet
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Peugeot 308
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  45,00 €
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Terminé
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  28/04/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Lavage extérieur
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Peugeot 308
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  25,00 €
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Terminé
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-4">Abonnement</h3>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Formule Premium</p>
                              <p className="text-sm text-gray-500">
                                Lavages illimités + 20% sur tous les services
                              </p>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              Actif
                            </span>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                Date de début
                              </span>
                              <span>01/01/2023</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                              <span className="text-gray-500">Date de fin</span>
                              <span>31/12/2023</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                              <span className="text-gray-500">
                                Montant mensuel
                              </span>
                              <span className="font-medium">59,90 €</span>
                            </div>
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
                      Nom
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Véhicules
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dernière visite
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
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/4"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-8 bg-gray-200 rounded w-20"></div>
                          </td>
                        </tr>) : filteredClients.map(client => <tr key={client.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleClientClick(client.id)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                                {client.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {client.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {client.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.vehicles} véhicule
                              {client.vehicles > 1 ? 's' : ''}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.lastVisit}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </td>
                        </tr>)}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button variant="outline" size="sm">
                  Précédent
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Affichage de <span className="font-medium">1</span> à{' '}
                    <span className="font-medium">8</span> sur{' '}
                    <span className="font-medium">20</span> résultats
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Précédent</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-50">
                      2
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Suivant</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </Card>}
      </div>
    </div>;
}