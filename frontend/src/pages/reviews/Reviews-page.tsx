import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MessageSquareIcon, AlertTriangleIcon, StarIcon, SearchIcon, FilterIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon, ClockIcon, XIcon, UserIcon, CalendarIcon, PhoneIcon, ClipboardListIcon } from 'lucide-react';
// Sample reviews data
const sampleReviews = [{
  id: 1,
  client: 'Martin Dupont',
  date: '22/05/2023',
  rating: 4,
  comment: 'Service rapide et efficace. Très satisfait du résultat sur ma voiture.',
  service: 'Lavage Complet',
  employee: 'Marc Dubois',
  status: 'published'
}, {
  id: 2,
  client: 'Sophie Laurent',
  date: '20/05/2023',
  rating: 5,
  comment: 'Excellent service, ma voiture est comme neuve ! Je recommande vivement.',
  service: 'Lavage Extérieur + Cire',
  employee: 'Thomas Leclerc',
  status: 'published'
}, {
  id: 3,
  client: 'Pierre Lefebvre',
  date: '18/05/2023',
  rating: 3,
  comment: "Service correct mais un peu d'attente.",
  service: 'Lavage Intérieur',
  employee: 'Julie Martin',
  status: 'published'
}, {
  id: 4,
  client: 'Marie Dubois',
  date: '15/05/2023',
  rating: 5,
  comment: 'Prestation impeccable, personnel très professionnel.',
  service: 'Lavage Complet',
  employee: 'Marc Dubois',
  status: 'published'
}, {
  id: 5,
  client: 'Jean Moreau',
  date: '12/05/2023',
  rating: 2,
  comment: 'Déçu du résultat, des traces restent visibles sur la carrosserie.',
  service: 'Lavage Extérieur',
  employee: 'Thomas Leclerc',
  status: 'pending'
}];
// Sample complaints data
const sampleComplaints = [{
  id: 1,
  client: 'Jean Moreau',
  date: '12/05/2023',
  subject: 'Traces sur la carrosserie',
  description: "Après le lavage, j'ai constaté des traces sur la carrosserie qui n'ont pas été enlevées.",
  service: 'Lavage Extérieur',
  status: 'pending',
  priority: 'medium'
}, {
  id: 2,
  client: 'Isabelle Petit',
  date: '10/05/2023',
  subject: 'Retard important',
  description: "J'ai attendu plus de 30 minutes alorsque j'avais un rendez-vous.",
  service: 'Lavage Complet',
  status: 'in_progress',
  priority: 'low'
}, {
  id: 3,
  client: 'Thomas Bernard',
  date: '05/05/2023',
  subject: 'Dommage intérieur',
  description: "J'ai constaté une tache sur mon siège qui n'était pas présente avant le lavage intérieur.",
  service: 'Lavage Intérieur',
  status: 'resolved',
  priority: 'high'
}];
// Status mapping
const statusMap = {
  published: {
    label: 'Publié',
    color: 'bg-green-100 text-green-800'
  },
  pending: {
    label: 'En attente',
    color: 'bg-amber-100 text-amber-800'
  },
  rejected: {
    label: 'Rejeté',
    color: 'bg-red-100 text-red-800'
  },
  in_progress: {
    label: 'En cours',
    color: 'bg-blue-100 text-blue-800'
  },
  resolved: {
    label: 'Résolu',
    color: 'bg-green-100 text-green-800'
  }
};
// Priority mapping
const priorityMap = {
  low: {
    label: 'Faible',
    color: 'bg-gray-100 text-gray-800'
  },
  medium: {
    label: 'Moyenne',
    color: 'bg-amber-100 text-amber-800'
  },
  high: {
    label: 'Élevée',
    color: 'bg-red-100 text-red-800'
  }
};
export function ReviewsPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'reviews' | 'complaints'>('reviews');
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [filteredReviews, setFilteredReviews] = useState(sampleReviews);
  const [filteredComplaints, setFilteredComplaints] = useState(sampleComplaints);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<number | null>(null);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    let filtered = sampleReviews;
    if (searchTerm) {
      filtered = filtered.filter(review => review.client.toLowerCase().includes(searchTerm.toLowerCase()) || review.comment.toLowerCase().includes(searchTerm.toLowerCase()) || review.service.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (ratingFilter) {
      filtered = filtered.filter(review => review.rating === parseInt(ratingFilter));
    }
    if (statusFilter) {
      filtered = filtered.filter(review => review.status === statusFilter);
    }
    setFilteredReviews(filtered);
  }, [searchTerm, ratingFilter, statusFilter]);
  useEffect(() => {
    let filtered = sampleComplaints;
    if (searchTerm) {
      filtered = filtered.filter(complaint => complaint.client.toLowerCase().includes(searchTerm.toLowerCase()) || complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) || complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) || complaint.service.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter) {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }
    if (priorityFilter) {
      filtered = filtered.filter(complaint => complaint.priority === priorityFilter);
    }
    setFilteredComplaints(filtered);
  }, [searchTerm, statusFilter, priorityFilter]);
  const handleReviewClick = (id: number) => {
    setSelectedReview(id);
  };
  const handleComplaintClick = (id: number) => {
    setSelectedComplaint(id);
  };
  const closeReviewDetail = () => {
    setSelectedReview(null);
  };
  const closeComplaintDetail = () => {
    setSelectedComplaint(null);
  };
  const review = sampleReviews.find(r => r.id === selectedReview);
  const complaint = sampleComplaints.find(c => c.id === selectedComplaint);
  // Calculate average rating
  const averageRating = sampleReviews.reduce((sum, review) => sum + review.rating, 0) / sampleReviews.length;
  // Count reviews by rating
  const ratingCounts = {
    5: sampleReviews.filter(r => r.rating === 5).length,
    4: sampleReviews.filter(r => r.rating === 4).length,
    3: sampleReviews.filter(r => r.rating === 3).length,
    2: sampleReviews.filter(r => r.rating === 2).length,
    1: sampleReviews.filter(r => r.rating === 1).length
  };
  // Count pending items
  const pendingReviews = sampleReviews.filter(r => r.status === 'pending').length;
  const pendingComplaints = sampleComplaints.filter(c => c.status === 'pending').length;
  // Render stars for a rating
  const renderStars = (rating: number) => {
    return <div className="flex">
        {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < rating ? 'currentColor' : 'none'} />)}
      </div>;
  };
  return <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-black font-bold text-gray-900">
            Avis & Réclamations
          </h1>
          <p className="text-gray-500">Gérez les retours clients</p>
        </div>
      </div>
      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-700 mr-4">
              <StarIcon className="h-6 w-6" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Note moyenne</p>
              <div className="flex items-baseline">
                <p className="text-2xl text-black  font-semibold">
                  {averageRating.toFixed(1)}
                </p>
                <div className="ml-2">
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-700 mr-4">
              <ClockIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                En attente de modération
              </p>
              <p className="text-2xl text-black font-semibold">{pendingReviews} avis</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-700 mr-4">
              <AlertTriangleIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Réclamations à traiter
              </p>
              <p className="text-2xl text-black font-semibold">
                {pendingComplaints} réclamations
              </p>
            </div>
          </div>
        </Card>
      </div>
      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('reviews')}>
              Avis clients
              {pendingReviews > 0 && <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-amber-100 text-amber-800">
                  {pendingReviews}
                </span>}
            </button>
            <button className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'complaints' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('complaints')}>
              Réclamations
              {pendingComplaints > 0 && <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-amber-100 text-amber-800">
                  {pendingComplaints}
                </span>}
            </button>
          </nav>
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
              <input type="text" placeholder={`Rechercher ${activeTab === 'reviews' ? 'un avis' : 'une  réclamation'}...`} className="pl-10 pr-4 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" icon={<FilterIcon className="h-4 w-4" />}>
                Filtres
              </Button>
              {activeTab === 'reviews' && <select className="border text-black border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={ratingFilter} onChange={e => setRatingFilter(e.target.value)}>
                  <option value="">Toutes les notes</option>
                  <option value="5">5 étoiles</option>
                  <option value="4">4 étoiles</option>
                  <option value="3">3 étoiles</option>
                  <option value="2">2 étoiles</option>
                  <option value="1">1 étoile</option>
                </select>}
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">Tous les statuts</option>
                {activeTab === 'reviews' ? <>
                    <option value="published">Publié</option>
                    <option value="pending">En attente</option>
                    <option value="rejected">Rejeté</option>
                  </> : <>
                    <option value="pending">En attente</option>
                    <option value="in_progress">En cours</option>
                    <option value="resolved">Résolu</option>
                  </>}
              </select>
              {activeTab === 'complaints' && <select className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
                  <option value="">Toutes les priorités</option>
                  <option value="high">Élevée</option>
                  <option value="medium">Moyenne</option>
                  <option value="low">Faible</option>
                </select>}
            </div>
          </div>
        </Card>
      </div>
      {/* Content based on active tab */}
      <div className="mb-6">
        {activeTab === 'reviews' ? selectedReview ? <motion.div initial={{
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
                    <button onClick={closeReviewDetail} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <ChevronLeftIcon className="h-4 w-4 mr-1" />
                      Retour aux avis
                    </button>
                    <div className="flex gap-2">
                      {review?.status === 'pending' && <>
                          <Button variant="success" size="sm" icon={<CheckIcon className="h-4 w-4" />}>
                            Approuver
                          </Button>
                          <Button variant="danger" size="sm" icon={<XIcon className="h-4 w-4" />}>
                            Rejeter
                          </Button>
                        </>}
                      <Button variant="outline" size="sm">
                        Répondre
                      </Button>
                    </div>
                  </div>
                </div>
                {review && <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/3">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-lg font-medium">
                              {review.client}
                            </h3>
                            <div className="mt-1 flex items-center">
                              {renderStars(review.rating)}
                              <span className="ml-2 text-sm text-gray-500">
                                {review.rating}/5
                              </span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[review.status as keyof typeof statusMap].color}`}>
                            {statusMap[review.status as keyof typeof statusMap].label}
                          </span>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg mb-6">
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">
                              Publié le {review.date}
                            </span>
                          </div>
                          <div className="flex items-center">
                            {/* <WrenchIcon className="h-4 w-4 text-gray-400 mr-2" /> */}
                            <span className="text-sm text-gray-600">
                              Service: {review.service}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">
                              Employé: {review.employee}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/3">
                        <h3 className="text-lg font-medium mb-4">Réponse</h3>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                          <textarea className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={6} placeholder="Rédigez une réponse à cet avis..."></textarea>
                          <div className="mt-4 flex justify-end">
                            <Button variant="primary">
                              Publier la réponse
                            </Button>
                          </div>
                        </div>
                        <h3 className="text-lg font-medium mb-4">
                          Historique du client
                        </h3>
                        <Card className="p-5">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <div>
                                <div className="flex">{renderStars(4)}</div>
                                <p className="text-sm text-gray-500">
                                  15/03/2023
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <div>
                                <div className="flex">{renderStars(5)}</div>
                                <p className="text-sm text-gray-500">
                                  10/01/2023
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>}
              </Card>
            </motion.div> : <div className="space-y-4">
              {loading ? [...Array(3)].map((_, i) => <Card key={i}>
                      <div className="animate-pulse p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                            <div>
                              <div className="h-4 bg-gray-200 rounded w-36 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-24"></div>
                            </div>
                          </div>
                          <div className="h-6 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="h-16 bg-gray-200 rounded w-full"></div>
                      </div>
                    </Card>) : filteredReviews.map(review => <Card key={review.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleReviewClick(review.id)}>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium mr-3">
                              {review.client.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="font-medium">{review.client}</h3>
                              <div className="mt-1 flex items-center">
                                {renderStars(review.rating)}
                                <span className="ml-2 text-xs text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[review.status as keyof typeof statusMap].color}`}>
                            {statusMap[review.status as keyof typeof statusMap].label}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                          {review.comment}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          Service: {review.service} | Employé: {review.employee}
                        </div>
                      </div>
                    </Card>)}
              {!loading && filteredReviews.length === 0 && <Card className="p-8 text-center">
                  <div className="flex flex-col items-center">
                    <MessageSquareIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Aucun avis trouvé
                    </h3>
                    <p className="text-gray-500">
                      Aucun avis ne correspond à vos critères de recherche.
                    </p>
                  </div>
                </Card>}
            </div> : selectedComplaint ? <motion.div initial={{
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
                  <button onClick={closeComplaintDetail} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Retour aux réclamations
                  </button>
                  <div className="flex gap-2">
                    {complaint?.status === 'pending' && <Button variant="primary" size="sm">
                        Prendre en charge
                      </Button>}
                    {complaint?.status === 'in_progress' && <Button variant="success" size="sm" icon={<CheckIcon className="h-4 w-4" />}>
                        Marquer comme résolu
                      </Button>}
                  </div>
                </div>
              </div>
              {complaint && <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-medium">
                            {complaint.subject}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Par {complaint.client} | {complaint.date}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[complaint.status as keyof typeof statusMap].color}`}>
                            {statusMap[complaint.status as keyof typeof statusMap].label}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityMap[complaint.priority as keyof typeof priorityMap].color}`}>
                            Priorité{' '}
                            {priorityMap[complaint.priority as keyof typeof priorityMap].label}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <p className="text-gray-700">{complaint.description}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">
                            Reçue le {complaint.date}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {/* <WrenchIcon className="h-4 w-4 text-gray-400 mr-2" /> */}
                          <span className="text-sm text-gray-600">
                            Service concerné: {complaint.service}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          Historique des actions
                        </h3>
                        <div className="space-y-4">
                          {complaint.status === 'resolved' && <div className="flex items-start">
                              <div className="p-2 rounded-full bg-green-100 text-green-700 mr-3">
                                <CheckIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Réclamation résolue
                                </p>
                                <p className="text-sm text-gray-500">
                                  07/05/2023 à 14:30 par Sophie Durand
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  Le client a été contacté et un geste
                                  commercial a été accordé.
                                </p>
                              </div>
                            </div>}
                          {(complaint.status === 'in_progress' || complaint.status === 'resolved') && <div className="flex items-start">
                              <div className="p-2 rounded-full bg-blue-100 text-blue-700 mr-3">
                                <UserIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">Prise en charge</p>
                                <p className="text-sm text-gray-500">
                                  06/05/2023 à 09:15 par Sophie Durand
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  La réclamation a été assignée et est en cours
                                  de traitement.
                                </p>
                              </div>
                            </div>}
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-amber-100 text-amber-700 mr-3">
                              <AlertTriangleIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">Réclamation reçue</p>
                              <p className="text-sm text-gray-500">
                                {complaint.date} à 11:45
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                La réclamation a été enregistrée dans le
                                système.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium mb-4">Actions</h3>
                      <div className="space-y-3">
                        <Button variant="outline" fullWidth icon={<PhoneIcon className="h-4 w-4" />}>
                          Contacter le client
                        </Button>
                        <Button variant="outline" fullWidth icon={<UserIcon className="h-4 w-4" />}>
                          Assigner à un employé
                        </Button>
                        <Button variant="outline" fullWidth icon={<ClipboardListIcon className="h-4 w-4" />}>
                          Proposer un geste commercial
                        </Button>
                        {complaint.status === 'in_progress' && <Button variant="success" fullWidth icon={<CheckIcon className="h-4 w-4" />}>
                            Marquer comme résolu
                          </Button>}
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          Ajouter une note
                        </h3>
                        <textarea className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3" rows={4} placeholder="Ajoutez une note à cette réclamation..."></textarea>
                        <Button variant="primary" fullWidth>
                          Enregistrer la note
                        </Button>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          Informations client
                        </h3>
                        <Card className="p-5">
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium mr-3">
                                {complaint.client.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {complaint.client}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Client depuis Janvier 2022
                                </p>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-sm font-medium">
                                Historique des commandes
                              </p>
                              <p className="text-sm text-gray-500">
                                15 commandes au total
                              </p>
                            </div>
                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-sm font-medium">
                                Note moyenne
                              </p>
                              <div className="flex items-center">
                                {renderStars(4)}
                                <span className="ml-1 text-sm text-gray-500">
                                  4.0/5
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>}
            </Card>
          </motion.div> : <div className="space-y-4">
            {loading ? [...Array(3)].map((_, i) => <Card key={i}>
                    <div className="animate-pulse p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                          <div>
                            <div className="h-4 bg-gray-200 rounded w-36 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                          </div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="h-16 bg-gray-200 rounded w-full"></div>
                    </div>
                  </Card>) : filteredComplaints.map(complaint => <Card key={complaint.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleComplaintClick(complaint.id)}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-medium mr-3">
                            <AlertTriangleIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{complaint.subject}</h3>
                            <p className="text-sm text-gray-500">
                              Par {complaint.client} | {complaint.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[complaint.status as keyof typeof statusMap].color}`}>
                            {statusMap[complaint.status as keyof typeof statusMap].label}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityMap[complaint.priority as keyof typeof priorityMap].color}`}>
                            Priorité{' '}
                            {priorityMap[complaint.priority as keyof typeof priorityMap].label}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                        {complaint.description}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        Service concerné: {complaint.service}
                      </div>
                    </div>
                  </Card>)}
            {!loading && filteredComplaints.length === 0 && <Card className="p-8 text-center">
                <div className="flex flex-col items-center">
                  <AlertTriangleIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Aucune réclamation trouvée
                  </h3>
                  <p className="text-gray-500">
                    Aucune réclamation ne correspond à vos critères de
                    recherche.
                  </p>
                </div>
              </Card>}
          </div>}
      </div>
    </div>;
}