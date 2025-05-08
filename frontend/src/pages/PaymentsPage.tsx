import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SearchIcon, FilterIcon, CreditCardIcon, DownloadIcon, EuroIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// Sample payments data
const samplePayments = [{
  id: 1,
  client: 'Martin Dupont',
  amount: 45.0,
  date: '25/05/2023',
  time: '11:15',
  method: 'carte',
  status: 'complete',
  invoice: 'INV-2023-001'
}, {
  id: 2,
  client: 'Sophie Laurent',
  amount: 20.0,
  date: '25/05/2023',
  time: '11:45',
  method: 'especes',
  status: 'complete',
  invoice: 'INV-2023-002'
}, {
  id: 3,
  client: 'Pierre Lefebvre',
  amount: 30.0,
  date: '25/05/2023',
  time: '09:30',
  method: 'carte',
  status: 'complete',
  invoice: 'INV-2023-003'
}, {
  id: 4,
  client: 'Marie Dubois',
  amount: 40.0,
  date: '24/05/2023',
  time: '17:00',
  method: 'carte',
  status: 'complete',
  invoice: 'INV-2023-004'
}, {
  id: 5,
  client: 'Jean Moreau',
  amount: 75.0,
  date: '26/05/2023',
  time: '14:30',
  method: 'en_attente',
  status: 'pending',
  invoice: 'INV-2023-005'
}, {
  id: 6,
  client: 'Isabelle Petit',
  amount: 25.0,
  date: '26/05/2023',
  time: '10:45',
  method: 'en_attente',
  status: 'pending',
  invoice: 'INV-2023-006'
}];
// Payment method mapping
const methodMap = {
  carte: 'Carte bancaire',
  especes: 'Espèces',
  cheque: 'Chèque',
  en_attente: 'En attente'
};
export function PaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredPayments, setFilteredPayments] = useState(samplePayments);
  const [showInvoice, setShowInvoice] = useState<number | null>(null);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    let filtered = samplePayments;
    if (searchTerm) {
      filtered = filtered.filter(payment => payment.client.toLowerCase().includes(searchTerm.toLowerCase()) || payment.invoice.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter) {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }
    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter]);
  const handleShowInvoice = (id: number) => {
    setShowInvoice(id);
  };
  const closeInvoice = () => {
    setShowInvoice(null);
  };
  const payment = samplePayments.find(p => p.id === showInvoice);
  // Calculate totals
  const totalPaid = samplePayments.filter(p => p.status === 'complete').reduce((sum, payment) => sum + payment.amount, 0);
  const totalPending = samplePayments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0);
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Paiements & Factures
        </h1>
        <p className="text-gray-500">
          Gérez les paiements et facturations clients
        </p>
      </div>
      {/* Payment summary */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-700 mr-4">
              <CheckCircleIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total encaissé
              </p>
              <p className="text-2xl font-semibold">{totalPaid.toFixed(2)} €</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-700 mr-4">
              {/* <ClockIcon className="h-6 w-6" /> */}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">En attente</p>
              <p className="text-2xl font-semibold">
                {totalPending.toFixed(2)} €
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-700 mr-4">
              <EuroIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total du jour</p>
              <p className="text-2xl font-semibold">
                {(totalPaid + totalPending).toFixed(2)} €
              </p>
            </div>
          </div>
        </Card>
      </div>
      {/* Search and filters */}
      <div className="mb-6">
        <Card className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Rechercher un paiement..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" icon={<FilterIcon className="h-4 w-4" />}>
                Filtres
              </Button>
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">Tous les statuts</option>
                <option value="complete">Payé</option>
                <option value="pending">En attente</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
      {/* Payments list or invoice detail */}
      <div className="mb-6">
        {showInvoice ? <Card>
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <button onClick={closeInvoice} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Retour aux paiements
                </button>
                <Button variant="outline" size="sm" icon={<DownloadIcon className="h-4 w-4" />}>
                  Télécharger PDF
                </Button>
              </div>
            </div>
            {payment && <div className="p-6">
                <div className="max-w-3xl mx-auto">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        FACTURE
                      </h2>
                      <p className="text-gray-600 mt-1">{payment.invoice}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <img className="h-10 w-auto" src="https://cdn-icons-png.flaticon.com/512/2830/2830289.png" alt="Car Wash Logo" />
                        <h1 className="ml-2 text-xl font-bold text-blue-900">
                          Auto Wash Pro
                        </h1>
                      </div>
                      <p className="text-gray-600 mt-1">123 Rue de Douala</p>
                      <p className="text-gray-600">75002 Ndongbong</p>
                      <p className="text-gray-600">contact@autowashpro.cm</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div>
                      <h3 className="font-medium text-gray-500 mb-2">
                        Facturé à:
                      </h3>
                      <p className="font-medium">{payment.client}</p>
                      <p className="text-gray-600">123 Rue du Client</p>
                      <p className="text-gray-600">75002 Ndongbong</p>
                      <p className="text-gray-600">melieric@gmail.com</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 mb-2">
                        Détails du paiement:
                      </h3>
                      <p>
                        <span className="text-gray-600">Date:</span>{' '}
                        {payment.date}
                      </p>
                      <p>
                        <span className="text-gray-600">Heure:</span>{' '}
                        {payment.time}
                      </p>
                      <p>
                        <span className="text-gray-600">Méthode:</span>{' '}
                        {methodMap[payment.method as keyof typeof methodMap]}
                      </p>
                      <p>
                        <span className="text-gray-600">Statut:</span>{' '}
                        {payment.status === 'complete' ? 'Payé' : 'En attente'}
                      </p>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200 mb-10">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantité
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix unitaire
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Lavage Complet - Berline
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {payment.amount.toFixed(2)} €
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {payment.amount.toFixed(2)} €
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={2}></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          Sous-total:
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          {payment.amount.toFixed(2)} €
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          TVA (20%):
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          {(payment.amount * 0.2).toFixed(2)} €
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                          Total:
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                          {(payment.amount * 1.2).toFixed(2)} €
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Remarque:</span> Ce document
                      est une facture officielle. Merci pour votre confiance.
                    </p>
                  </div>
                </div>
              </div>}
          </Card> : <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      N° Facture
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Méthode
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
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/3"></div>
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
                        </tr>) : filteredPayments.map(payment => <tr key={payment.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {payment.invoice}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {payment.client}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {payment.date}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payment.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.amount.toFixed(2)} €
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {methodMap[payment.method as keyof typeof methodMap]}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                              {payment.status === 'complete' ? 'Payé' : 'En attente'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" icon={<DownloadIcon className="h-4 w-4" />} onClick={() => handleShowInvoice(payment.id)}>
                                Facture
                              </Button>
                              {payment.status === 'pending' && <Button variant="primary" size="sm" icon={<CreditCardIcon className="h-4 w-4" />}>
                                  Payer
                                </Button>}
                            </div>
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
                    <span className="font-medium">
                      {filteredPayments.length}
                    </span>{' '}
                    sur{' '}
                    <span className="font-medium">{samplePayments.length}</span>{' '}
                    résultats
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Précédent</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-50">
                      1
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