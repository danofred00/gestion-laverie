import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlusIcon, SearchIcon, FilterIcon, PackageIcon, AlertTriangleIcon, ChevronLeftIcon, ChevronRightIcon, TrendingUpIcon, ShoppingCartIcon } from 'lucide-react';
// Sample inventory data
const sampleInventory = [{
  id: 1,
  name: 'Shampoing carrosserie',
  category: 'nettoyage',
  currentStock: 24,
  minStock: 10,
  unit: 'L',
  lastOrderDate: '10/05/2023',
  price: 8.5,
  supplier: 'CleanCar Pro'
}, {
  id: 2,
  name: 'Cire protectrice',
  category: 'finition',
  currentStock: 5,
  minStock: 8,
  unit: 'L',
  lastOrderDate: '20/04/2023',
  price: 15.75,
  supplier: 'AutoWax'
}, {
  id: 3,
  name: 'Nettoyant jantes',
  category: 'nettoyage',
  currentStock: 12,
  minStock: 5,
  unit: 'L',
  lastOrderDate: '05/05/2023',
  price: 9.9,
  supplier: 'CleanCar Pro'
}, {
  id: 4,
  name: 'Nettoyant vitres',
  category: 'nettoyage',
  currentStock: 18,
  minStock: 8,
  unit: 'L',
  lastOrderDate: '15/05/2023',
  price: 7.5,
  supplier: 'GlassClear'
}, {
  id: 5,
  name: 'Microfibre premium',
  category: 'accessoires',
  currentStock: 45,
  minStock: 20,
  unit: 'pcs',
  lastOrderDate: '01/05/2023',
  price: 3.25,
  supplier: 'CleanTools'
}, {
  id: 6,
  name: 'Dégraissant intérieur',
  category: 'nettoyage',
  currentStock: 3,
  minStock: 5,
  unit: 'L',
  lastOrderDate: '25/04/2023',
  price: 11.5,
  supplier: 'InteriorClean'
}, {
  id: 7,
  name: 'Parfum voiture',
  category: 'finition',
  currentStock: 30,
  minStock: 15,
  unit: 'pcs',
  lastOrderDate: '12/05/2023',
  price: 4.99,
  supplier: 'FreshAuto'
}, {
  id: 8,
  name: 'Brosse de nettoyage',
  category: 'accessoires',
  currentStock: 8,
  minStock: 5,
  unit: 'pcs',
  lastOrderDate: '18/04/2023',
  price: 12.75,
  supplier: 'CleanTools'
}];
// Category mapping
const categoryMap = {
  nettoyage: {
    label: 'Nettoyage',
    color: 'bg-blue-100 text-blue-800'
  },
  finition: {
    label: 'Finition',
    color: 'bg-green-100 text-green-800'
  },
  accessoires: {
    label: 'Accessoires',
    color: 'bg-purple-100 text-purple-800'
  }
};
export function InventoryPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(sampleInventory);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState<Record<number, number>>({});
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    let filtered = sampleInventory;
    if (searchTerm) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.supplier.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter]);
  const handleItemClick = (id: number) => {
    setSelectedItem(id);
  };
  const closeItemDetail = () => {
    setSelectedItem(null);
  };
  const item = sampleInventory.find(i => i.id === selectedItem);
  // Items that need reordering (below min stock)
  const lowStockItems = sampleInventory.filter(item => item.currentStock < item.minStock);
  const handleOrderQuantityChange = (id: number, quantity: number) => {
    setOrderQuantity({
      ...orderQuantity,
      [id]: quantity
    });
  };
  return <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des stocks
          </h1>
          <p className="text-gray-500">Gérez l'inventaire des produits</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<ShoppingCartIcon className="h-4 w-4" />} onClick={() => setShowOrderModal(true)}>
            Commander
          </Button>
          <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowAddItemModal(true)}>
            Ajouter un produit
          </Button>
        </div>
      </div>
      {/* Stock alerts */}
      {lowStockItems.length > 0 && <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Alertes de stock</h2>
          <Card className="bg-red-50 border-red-100">
            <div className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-red-100 text-red-700 mr-3">
                  <AlertTriangleIcon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-red-700">
                  {lowStockItems.length} produit
                  {lowStockItems.length > 1 ? 's' : ''} en stock faible
                </h3>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowStockItems.map(item => <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-red-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleItemClick(item.id)}>
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-red-100 text-red-700 mr-3">
                        <PackageIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Stock: {item.currentStock} {item.unit} (Min:{' '}
                          {item.minStock})
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={e => {
                e.stopPropagation();
                handleOrderQuantityChange(item.id, item.minStock * 2 - item.currentStock);
                setShowOrderModal(true);
              }}>
                      Commander
                    </Button>
                  </div>)}
              </div>
            </div>
          </Card>
        </div>}
      {/* Search and filters */}
      <div className="mb-6">
        <Card className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Rechercher un produit..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" icon={<FilterIcon className="h-4 w-4" />}>
                Filtres
              </Button>
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                <option value="">Toutes les catégories</option>
                <option value="nettoyage">Nettoyage</option>
                <option value="finition">Finition</option>
                <option value="accessoires">Accessoires</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
      {/* Inventory list or detail */}
      <div className="mb-6">
        {selectedItem ? <motion.div initial={{
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
                  <button onClick={closeItemDetail} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Retour à la liste
                  </button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="primary" size="sm" icon={<ShoppingCartIcon className="h-4 w-4" />} onClick={() => {
                  if (item) {
                    handleOrderQuantityChange(item.id, item.minStock * 2 - item.currentStock);
                    setShowOrderModal(true);
                  }
                }}>
                      Commander
                    </Button>
                  </div>
                </div>
              </div>
              {item && <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="bg-gray-100 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold">{item.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryMap[item.category as keyof typeof categoryMap].color}`}>
                            {categoryMap[item.category as keyof typeof categoryMap].label}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Stock actuel
                            </p>
                            <div className="flex items-center">
                              <p className="text-2xl font-bold">
                                {item.currentStock} {item.unit}
                              </p>
                              {item.currentStock < item.minStock && <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                                  Stock faible
                                </span>}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Stock minimum
                            </p>
                            <p className="font-medium">
                              {item.minStock} {item.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Prix unitaire
                            </p>
                            <p className="font-medium">
                              {item.price.toFixed(2)} €
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Fournisseur</p>
                            <p className="font-medium">{item.supplier}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Dernière commande
                            </p>
                            <p className="font-medium">{item.lastOrderDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Historique des mouvements
                        </h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Quantité
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Utilisateur
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  20/05/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Sortie
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  -2 {item.unit}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Marc Dubois
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  18/05/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Sortie
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  -1 {item.unit}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Thomas Leclerc
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {item.lastOrderDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Entrée
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  +20 {item.unit}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  Sophie Durand
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Consommation
                          </h3>
                          <Card className="p-5">
                            <div className="flex items-center">
                              <div className="p-3 rounded-full bg-blue-100 text-blue-700 mr-4">
                                <TrendingUpIcon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Consommation mensuelle moyenne
                                </p>
                                <p className="text-xl font-semibold">
                                  12 {item.unit}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600" style={{
                          width: `${item.currentStock / (item.minStock * 2) * 100}%`
                        }}></div>
                            </div>
                            <div className="mt-2 flex justify-between text-xs text-gray-500">
                              <span>0</span>
                              <span>
                                Stock actuel: {item.currentStock} {item.unit}
                              </span>
                              <span>
                                Stock optimal: {item.minStock * 2} {item.unit}
                              </span>
                            </div>
                          </Card>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-4">Actions</h3>
                          <div className="space-y-2">
                            <Button variant="outline" fullWidth onClick={() => {
                        handleOrderQuantityChange(item.id, item.minStock * 2 - item.currentStock);
                        setShowOrderModal(true);
                      }}>
                              Réapprovisionner
                            </Button>
                            <Button variant="outline" fullWidth>
                              Ajuster le stock
                            </Button>
                            <Button variant="outline" fullWidth>
                              Modifier les seuils
                            </Button>
                            <Button variant="outline" fullWidth>
                              Historique complet
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
                      Produit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix unitaire
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fournisseur
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
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/4"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/3"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-2/3"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-8 bg-gray-200 rounded w-20"></div>
                          </td>
                        </tr>) : filteredItems.map(item => <tr key={item.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleItemClick(item.id)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="p-2 rounded-full bg-gray-100 mr-3">
                                <PackageIcon className="h-5 w-5 text-gray-600" />
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryMap[item.category as keyof typeof categoryMap].color}`}>
                              {categoryMap[item.category as keyof typeof categoryMap].label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`text-sm ${item.currentStock < item.minStock ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                                {item.currentStock} {item.unit}
                              </span>
                              {item.currentStock < item.minStock && <div className="ml-2 p-1 rounded-full bg-red-100">
                                  <AlertTriangleIcon className="h-3 w-3 text-red-600" />
                                </div>}
                            </div>
                            <div className="text-xs text-gray-500">
                              Min: {item.minStock}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.price.toFixed(2)} €
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.supplier}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
                              {item.currentStock < item.minStock && <Button variant="primary" size="sm" icon={<ShoppingCartIcon className="h-4 w-4" />} onClick={e => {
                      e.stopPropagation();
                      handleOrderQuantityChange(item.id, item.minStock * 2 - item.currentStock);
                      setShowOrderModal(true);
                    }}>
                                  Commander
                                </Button>}
                            </div>
                          </td>
                        </tr>)}
                </tbody>
              </table>
            </div>
          </Card>}
      </div>
    </div>;
}