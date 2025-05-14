import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlusIcon, SearchIcon, WrenchIcon, ClipboardListIcon, ClockIcon, EuroIcon } from 'lucide-react';
// Sample service data
const sampleServices = [{
  id: 1,
  name: 'Lavage Extérieur',
  description: "Nettoyage complet de l'extérieur du véhicule",
  duration: 30,
  prices: {
    citadine: 15,
    berline: 20,
    suv: 25
  }
}, {
  id: 2,
  name: 'Lavage Intérieur',
  description: "Nettoyage complet de l'intérieur du véhicule",
  duration: 45,
  prices: {
    citadine: 25,
    berline: 30,
    suv: 35
  }
}, {
  id: 3,
  name: 'Lavage Complet',
  description: 'Nettoyage complet intérieur et extérieur',
  duration: 75,
  prices: {
    citadine: 35,
    berline: 45,
    suv: 55
  }
}, {
  id: 4,
  name: 'Cire Protectrice',
  description: "Application d'une cire protectrice pour la carrosserie",
  duration: 45,
  prices: {
    citadine: 30,
    berline: 35,
    suv: 40
  }
}, {
  id: 5,
  name: 'Nettoyage Jantes',
  description: 'Nettoyage approfondi des jantes et pneus',
  duration: 20,
  prices: {
    citadine: 10,
    berline: 12,
    suv: 15
  }
}];
// Sample packages data
const samplePackages = [{
  id: 1,
  name: 'Pack Essentiel',
  description: 'Lavage extérieur + nettoyage jantes',
  services: ['Lavage Extérieur', 'Nettoyage Jantes'],
  prices: {
    citadine: 22,
    berline: 29,
    suv: 36
  },
  reduction: '15%'
}, {
  id: 2,
  name: 'Pack Premium',
  description: 'Lavage complet + cire protectrice',
  services: ['Lavage Complet', 'Cire Protectrice'],
  prices: {
    citadine: 58,
    berline: 72,
    suv: 86
  },
  reduction: '10%'
}, {
  id: 3,
  name: 'Pack Intégral',
  description: 'Tous les services inclus',
  services: ['Lavage Extérieur', 'Lavage Intérieur', 'Cire Protectrice', 'Nettoyage Jantes'],
  prices: {
    citadine: 68,
    berline: 85,
    suv: 99
  },
  reduction: '20%'
}];
export function ServicesPage() {
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<number | null>(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddPackageModal, setShowAddPackageModal] = useState(false);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des services
          </h1>
          <p className="text-gray-500">
            Gérez les services et forfaits proposés
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowAddPackageModal(true)}>
            Nouveau forfait
          </Button>
          <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowAddServiceModal(true)}>
            Nouveau service
          </Button>
        </div>
      </div>
      {/* Services list */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Services individuels</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? [...Array(6)].map((_, i) => <Card key={i} className="h-64">
                  <div className="animate-pulse h-full p-4 flex flex-col space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="flex-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                </Card>) : sampleServices.map(service => <Card key={service.id} className="flex flex-col h-full">
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-blue-100 mr-3">
                          <WrenchIcon className="h-5 w-5 text-blue-700" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {service.name}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-600 text-sm">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center">
                      <ClockIcon className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {service.duration} minutes
                      </span>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Prix par catégorie:
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Citadine</span>
                          <span className="font-medium">
                            {service.prices.citadine} €
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Berline</span>
                          <span className="font-medium">
                            {service.prices.berline} €
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">SUV</span>
                          <span className="font-medium">
                            {service.prices.suv} €
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingService(service.id)}>
                        Modifier
                      </Button>
                    </div>
                  </div>
                </Card>)}
        </div>
      </div>
      {/* Packages list */}
      <div>
        <h2 className="text-lg font-medium mb-4">Forfaits</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {loading ? [...Array(3)].map((_, i) => <Card key={i} className="h-80">
                  <div className="animate-pulse h-full p-4 flex flex-col space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                </Card>) : samplePackages.map(pkg => <Card key={pkg.id} className="flex flex-col h-full border-t-4 border-blue-500">
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {pkg.name}
                        </h3>
                        <p className="mt-1 text-gray-600">{pkg.description}</p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        -{pkg.reduction}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Services inclus:
                      </h4>
                      <ul className="space-y-1">
                        {pkg.services.map((service, i) => <li key={i} className="flex items-center text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                            <span>{service}</span>
                          </li>)}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Prix par catégorie:
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Citadine</span>
                          <span className="font-medium">
                            {pkg.prices.citadine} €
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Berline</span>
                          <span className="font-medium">
                            {pkg.prices.berline} €
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">SUV</span>
                          <span className="font-medium">
                            {pkg.prices.suv} €
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </div>
                  </div>
                </Card>)}
        </div>
      </div>
    </div>;
}