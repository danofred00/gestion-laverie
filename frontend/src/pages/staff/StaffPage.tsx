import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlusIcon, SearchIcon, FilterIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClipboardListIcon, MailIcon, PhoneIcon, KeyIcon } from 'lucide-react';
// Sample staff data
const sampleStaff = [{
  id: 1,
  name: 'Marc Dubois',
  email: 'marc.dubois@autowashpro.fr',
  phone: '06 12 34 56 78',
  role: 'agent',
  startDate: '10/01/2020',
  schedule: 'Lun-Ven, 8h-16h',
  servicesCompleted: 578,
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
}, {
  id: 2,
  name: 'Julie Martin',
  email: 'julie.martin@autowashpro.fr',
  phone: '06 23 45 67 89',
  role: 'receptionniste',
  startDate: '15/03/2021',
  schedule: 'Lun-Sam, 9h-17h',
  servicesCompleted: 0,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
}, {
  id: 3,
  name: 'Thomas Leclerc',
  email: 'thomas.leclerc@autowashpro.fr',
  phone: '06 34 56 78 90',
  role: 'agent',
  startDate: '05/05/2019',
  schedule: 'Mar-Sam, 10h-18h',
  servicesCompleted: 892,
  avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
}, {
  id: 4,
  name: 'Sophie Durand',
  email: 'sophie.durand@autowashpro.fr',
  phone: '06 45 67 89 01',
  role: 'admin',
  startDate: '01/01/2018',
  schedule: 'Lun-Ven, 9h-17h',
  servicesCompleted: 0,
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
}, {
  id: 5,
  name: 'Pierre Moreau',
  email: 'pierre.moreau@autowashpro.fr',
  phone: '06 56 78 90 12',
  role: 'agent',
  startDate: '12/07/2022',
  schedule: 'Lun-Ven, 8h-16h',
  servicesCompleted: 143,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
}];
// Role mapping for display
const roleMap = {
  agent: {
    label: 'Agent de lavage',
    color: 'bg-blue-100 text-blue-800'
  },
  receptionniste: {
    label: 'Réceptionniste',
    color: 'bg-green-100 text-green-800'
  },
  admin: {
    label: 'Administrateur',
    color: 'bg-purple-100 text-purple-800'
  }
};
export function StaffPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [filteredStaff, setFilteredStaff] = useState(sampleStaff);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    let filtered = sampleStaff;
    if (searchTerm) {
      filtered = filtered.filter(staff => staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || staff.email.toLowerCase().includes(searchTerm.toLowerCase()) || staff.phone.includes(searchTerm));
    }
    if (roleFilter) {
      filtered = filtered.filter(staff => staff.role === roleFilter);
    }
    setFilteredStaff(filtered);
  }, [searchTerm, roleFilter]);
  const handleStaffClick = (id: number) => {
    setSelectedStaff(id);
  };
  const closeStaffDetail = () => {
    setSelectedStaff(null);
  };
  const staff = sampleStaff.find(s => s.id === selectedStaff);
  return <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion du personnel
          </h1>
          <p className="text-gray-500">
            Gérez les employés et leurs informations
          </p>
        </div>
        <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowAddStaffModal(true)}>
          Ajouter un employé
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
              <input type="text" placeholder="Rechercher un employé..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" icon={<FilterIcon className="h-4 w-4" />}>
                Filtres
              </Button>
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                <option value="">Tous les rôles</option>
                <option value="agent">Agent de lavage</option>
                <option value="receptionniste">Réceptionniste</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
      {/* Staff list or detail */}
      <div className="mb-6">
        {selectedStaff ? <motion.div initial={{
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
                  <button onClick={closeStaffDetail} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Retour à la liste
                  </button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="danger" size="sm">
                      Désactiver
                    </Button>
                  </div>
                </div>
              </div>
              {staff && <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
                        <img src={staff.avatar} alt={staff.name} className="h-24 w-24 rounded-full object-cover mb-4" />
                        <h3 className="text-lg font-bold">{staff.name}</h3>
                        <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${roleMap[staff.role as keyof typeof roleMap].color}`}>
                          {roleMap[staff.role as keyof typeof roleMap].label}
                        </span>
                        <div className="mt-6 w-full">
                          <h4 className="text-sm font-medium mb-2">
                            Informations de contact
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <MailIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{staff.email}</span>
                            </div>
                            <div className="flex items-center">
                              <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{staff.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{staff.schedule}</span>
                            </div>
                            <div className="flex items-center">
                              <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <span>Employé depuis {staff.startDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      {staff.role === 'agent' && <div className="mb-6">
                          <h3 className="text-lg font-medium mb-4">
                            Performance
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="p-5">
                              <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500">
                                  Services réalisés
                                </p>
                                <p className="text-3xl font-bold mt-1">
                                  {staff.servicesCompleted}
                                </p>
                              </div>
                            </Card>
                            <Card className="p-5">
                              <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500">
                                  Moyenne par jour
                                </p>
                                <p className="text-3xl font-bold mt-1">8.2</p>
                              </div>
                            </Card>
                            <Card className="p-5">
                              <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500">
                                  Note client
                                </p>
                                <p className="text-3xl font-bold mt-1">4.8/5</p>
                              </div>
                            </Card>
                          </div>
                        </div>}
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Planning de la semaine
                        </h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Jour
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Horaires
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Tâches
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day, i) => <tr key={i}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {day}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    8h00 - 16h00
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {staff.role === 'agent' ? 'Services de lavage' : staff.role === 'receptionniste' ? 'Accueil clients' : 'Administration'}
                                  </td>
                                </tr>)}
                              {staff.schedule.includes('Sam') && <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Samedi
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    9h00 - 17h00
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {staff.role === 'agent' ? 'Services de lavage' : staff.role === 'receptionniste' ? 'Accueil clients' : 'Administration'}
                                  </td>
                                </tr>}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Permissions
                          </h3>
                          <Card className="p-5">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <KeyIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm">
                                    Accès au système
                                  </span>
                                </div>
                                <div className="h-5 w-10 bg-blue-600 rounded-full flex items-center justify-end p-1">
                                  <div className="h-4 w-4 bg-white rounded-full"></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm">
                                    Gestion des clients
                                  </span>
                                </div>
                                <div className="h-5 w-10 bg-blue-600 rounded-full flex items-center justify-end p-1">
                                  <div className="h-4 w-4 bg-white rounded-full"></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <ClipboardListIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm">
                                    Gestion des commandes
                                  </span>
                                </div>
                                <div className="h-5 w-10 bg-blue-600 rounded-full flex items-center justify-end p-1">
                                  <div className="h-4 w-4 bg-white rounded-full"></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm">
                                    Gestion du personnel
                                  </span>
                                </div>
                                <div className={`h-5 w-10 ${staff.role === 'admin' ? 'bg-blue-600' : 'bg-gray-300'} rounded-full flex items-center ${staff.role === 'admin' ? 'justify-end' : 'justify-start'} p-1`}>
                                  <div className="h-4 w-4 bg-white rounded-full"></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <SettingsIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm">
                                    Paramètres système
                                  </span>
                                </div>
                                <div className={`h-5 w-10 ${staff.role === 'admin' ? 'bg-blue-600' : 'bg-gray-300'} rounded-full flex items-center ${staff.role === 'admin' ? 'justify-end' : 'justify-start'} p-1`}>
                                  <div className="h-4 w-4 bg-white rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-4">Actions</h3>
                          <div className="space-y-2">
                            <Button variant="outline" fullWidth>
                              Modifier le planning
                            </Button>
                            <Button variant="outline" fullWidth>
                              Gérer les permissions
                            </Button>
                            <Button variant="outline" fullWidth>
                              Réinitialiser le mot de passe
                            </Button>
                            <Button variant="danger" fullWidth>
                              Désactiver le compte
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
                      Employé
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Planning
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? [...Array(5)].map((_, i) => <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse flex items-center">
                              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="animate-pulse h-8 bg-gray-200 rounded w-20"></div>
                          </td>
                        </tr>) : filteredStaff.map(staff => <tr key={staff.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleStaffClick(staff.id)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={staff.avatar} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {staff.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Depuis {staff.startDate}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {staff.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {staff.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${roleMap[staff.role as keyof typeof roleMap].color}`}>
                              {roleMap[staff.role as keyof typeof roleMap].label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {staff.schedule}
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