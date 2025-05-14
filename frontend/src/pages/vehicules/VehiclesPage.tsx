import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlusIcon, SearchIcon, CarIcon, FilterIcon, ChevronLeftIcon, ChevronRightIcon, EditIcon, TrashIcon, ClipboardListIcon } from 'lucide-react';
// Sample vehicle data
const sampleVehicles = [{
  id: 1,
  plate: 'AB-123-CD',
  brand: 'Peugeot',
  model: '308',
  category: 'Berline',
  owner: 'Martin Dupont',
  lastService: '12/05/2023'
}, {
  id: 2,
  plate: 'EF-456-GH',
  brand: 'Renault',
  model: 'Clio',
  category: 'Citadine',
  owner: 'Sophie Laurent',
  lastService: '18/05/2023'
}, {
  id: 3,
  plate: 'IJ-789-KL',
  brand: 'Citroën',
  model: 'C3',
  category: 'Citadine',
  owner: 'Pierre Lefebvre',
  lastService: '05/05/2023'
}, {
  id: 4,
  plate: 'MN-012-OP',
  brand: 'BMW',
  model: 'X3',
  category: 'SUV',
  owner: 'Marie Dubois',
  lastService: '22/05/2023'
}, {
  id: 5,
  plate: 'QR-345-ST',
  brand: 'Audi',
  model: 'A4',
  category: 'Berline',
  owner: 'Jean Moreau',
  lastService: '10/05/2023'
}, {
  id: 6,
  plate: 'UV-678-WX',
  brand: 'Mercedes',
  model: 'GLA',
  category: 'SUV',
  owner: 'Isabelle Petit',
  lastService: '15/05/2023'
}, {
  id: 7,
  plate: 'YZ-901-AB',
  brand: 'Volkswagen',
  model: 'Golf',
  category: 'Berline',
  owner: 'Thomas Bernard',
  lastService: '08/05/2023'
}, {
  id: 8,
  plate: 'CD-234-EF',
  brand: 'Toyota',
  model: 'Yaris',
  category: 'Citadine',
  owner: 'Claire Robert',
  lastService: '20/05/2023'
}];
export function VehiclesPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState(sampleVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (searchTerm) {
      setFilteredVehicles(sampleVehicles.filter(vehicle => vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredVehicles(sampleVehicles);
    }
  }, [searchTerm]);
  const handleVehicleClick = (id: number) => {
    setSelectedVehicle(id);
  };
  const closeVehicleDetail = () => {
    setSelectedVehicle(null);
  };
  const vehicle = sampleVehicles.find(v => v.id === selectedVehicle);
  // Get a vehicle image based on category
  const getVehicleImage = (category: string) => {
    switch (category.toLowerCase()) {
      case 'suv':
        return 'https://cdn-icons-png.flaticon.com/512/3774/3774278.png';
      case 'citadine':
        return 'https://cdn-icons-png.flaticon.com/512/3774/3774746.png';
      case 'berline':
      default:
        return 'https://cdn-icons-png.flaticon.com/512/3774/3774729.png';
    }
  };
  return <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des véhicules
          </h1>
          <p className="text-gray-500">Gérez les véhicules de vos clients</p>
        </div>
        <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowAddVehicleModal(true)}>
          Ajouter un véhicule
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
              <input type="text" placeholder="Rechercher un véhicule..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" icon={<FilterIcon className="h-4 w-4" />}>
                Filtres
              </Button>
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Catégorie</option>
                <option value="berline">Berline</option>
                <option value="citadine">Citadine</option>
                <option value="suv">SUV</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
      {/* Vehicle list or detail */}
      <div className="mb-6">
        {selectedVehicle ? <motion.div initial={{
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
                  <button onClick={closeVehicleDetail} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Retour à la liste
                  </button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" icon={<EditIcon className="h-4 w-4" />}>
                      Modifier
                    </Button>
                    <Button variant="danger" size="sm" icon={<TrashIcon className="h-4 w-4" />}>
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
              {vehicle && <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
                        <img src={getVehicleImage(vehicle.category)} alt={vehicle.category} className="h-32 w-32 mb-4" />
                        <h3 className="text-lg font-bold">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {vehicle.category}
                        </p>
                        <div className="mt-6 w-full">
                          <h4 className="text-sm font-medium mb-2">
                            Informations du véhicule
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium">
                                Immatriculation:
                              </span>{' '}
                              {vehicle.plate}
                            </p>
                            <p>
                              <span className="font-medium">Propriétaire:</span>{' '}
                              {vehicle.owner}
                            </p>
                            <p>
                              <span className="font-medium">
                                Dernière visite:
                              </span>{' '}
                              {vehicle.lastService}
                            </p>
                            <p>
                              <span className="font-medium">Année:</span> 2020
                            </p>
                            <p>
                              <span className="font-medium">Couleur:</span> Gris
                              métallisé
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Historique des services
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
                                  Technicien
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
                                  Marc Dupuis
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
                                  Julie Martin
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
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  15/03/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Cire protectrice
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Thomas Leclerc
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  30,00 €
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Notes techniques
                          </h3>
                          <div className="border border-gray-200 rounded-lg p-4 h-40">
                            <p className="text-sm text-gray-600">
                              Attention particulière à apporter aux jantes en
                              alliage qui sont sensibles aux produits acides.
                              Utiliser uniquement les produits neutres pour ce
                              véhicule.
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Prochains rendez-vous
                          </h3>
                          <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                              <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-full mr-3">
                                  <CalendarIcon className="h-4 w-4 text-blue-700" />
                                </div>
                                <div>
                                  <p className="font-medium">Lavage complet</p>
                                  <p className="text-xs text-gray-500">
                                    30/05/2023 à 14:00
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="primary" size="sm" fullWidth icon={<ClipboardListIcon className="h-4 w-4" />}>
                              Nouvelle commande
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
                      Véhicule
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Immatriculation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Propriétaire
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dernier service
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
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-8 bg-gray-200 rounded w-20"></div>
                          </td>
                        </tr>) : filteredVehicles.map(vehicle => <tr key={vehicle.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleVehicleClick(vehicle.id)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img src={getVehicleImage(vehicle.category)} alt={vehicle.category} className="h-10 w-10 mr-4" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {vehicle.brand} {vehicle.model}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {vehicle.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {vehicle.plate}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {vehicle.owner}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {vehicle.lastService}
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