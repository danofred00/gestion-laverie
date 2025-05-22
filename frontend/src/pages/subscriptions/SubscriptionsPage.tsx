import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckIcon, PlusIcon, SearchIcon, FilterIcon, CalendarIcon, ChevronLeftIcon } from 'lucide-react';

import axios from '@/lib/axios';
import { DatePickerWithRange } from "@/components/DatePickerWithRange"
import { DatePicker } from "@/components/DatePicker"
import { addDays } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"


const plans = ['Pack Essentiel', 'Pack Premium', 'Pack Pro'];
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

// Sample payment methods
const methodMap = {
  carte: 'Carte bancaire',
  especes: 'Espèces',
  cheque: 'Chèque',
  en_attente: 'En attente'
};
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
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);


  // Récupération des souscriptions
  const fetchSubscriptions = () => {
    axios.get('/api/subscriptions')
      .then(res => {
        const raw = res.data.data;

        if (!Array.isArray(raw)) {
          console.error('⚠️ Données invalides:', raw);
          return;
        }
        console.log('Données brutes des souscriptions:', raw);
        const formatted = raw.map((sub) => {
          const today = new Date();
          const start = new Date(sub.dateDebut);
          const end = new Date(sub.dateFin);

          // 1. Status
          const status = end < today ? 'expired' : 'active';

          // 2. Last & next payment: basé sur la dernière date "mensuelle" atteinte
          const monthsSinceStart = Math.floor(
            (today.getFullYear() - start.getFullYear()) * 12 +
            today.getMonth() - start.getMonth()
          );

          const lastPaymentDate = new Date(start);
          lastPaymentDate.setMonth(start.getMonth() + monthsSinceStart);

          const nextPaymentDate = new Date(lastPaymentDate);
          nextPaymentDate.setMonth(lastPaymentDate.getMonth() + 1);

          const formatDate = (date) =>
            date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

          return {
            id: sub.id,
            client: sub.client.nom + " " + sub.client.prenom,
            plan: sub.type,
            startDate: formatDate(start),
            endDate: formatDate(end),
            status,
            method: sub.methode,
            payments : sub.payments,
            price: sub.tarif,
            lastPayment: formatDate(lastPaymentDate),
            nextPayment: formatDate(nextPaymentDate)
          };
        });
        console.log('Souscriptions formatées:', formatted);
        setSubscriptions(formatted);
      })
      .catch(err => console.error('Erreur chargement des souscriptions :', err));
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const [formData, setFormData] = useState({
    client: '',
    plan: 'Pack Essentiel',
    startDate: '',
    endDate: '',
    methode: '',
    price: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const [clients, setClients] = useState([]);
  // Récupération des clients
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/clients");
      const formatted = response.data.data.map((client) => ({
        id: client.id,
        name: `${client.prenom} ${client.nom}`, // ou `${client.nom} ${client.prenom}` selon ton besoin
        email: client.email,
      }));  // on garde la liste complète
      setClients(formatted);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients :", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.price || !formData.client || !formData.plan || !formData.startDate || !formData.endDate) {
      toast("Veuillez remplir tous les champs")
    } else {
      const payload = {
        client: {
          id: parseInt(formData.client)
        },
        type: formData.plan,
        methode: formData.methode,
        dateDebut: formData.startDate,
        dateFin: formData.endDate,
        tarif: parseFloat(formData.price)
      };
      console.log('Payload:', payload);

      try {
        setLoading(true);
        await axios.post('/api/subscriptions', payload);
        alert('Souscription enregistrée avec succès !');
        // Re-fetch subscriptions to update the list
        await fetchSubscriptions();

        setFormData({
          client: '',
          plan: '',
          methode: '',
          startDate: '',
          endDate: '',
          price: '',
        });

        toast("Client creer avec success !", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert('Erreur lors de l’envoi');
        toast("Erreur lors de l'ajout du client", {
          description: "Duplication de l'email ou du telephone",
        })
        setLoading(false);
      }
    }
  };


  const [filteredSubscriptions, setFilteredSubscriptions] = useState(subscriptions);
  useEffect(() => {
    let filtered = subscriptions;
    if (searchTerm) {
      filtered = filtered.filter(subscription => subscription.client.toLowerCase().includes(searchTerm.toLowerCase()) || subscription.plan.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter) {
      filtered = filtered.filter(subscription => subscription.status === statusFilter);
    }
    setFilteredSubscriptions(filtered);
  }, [searchTerm, statusFilter, subscriptions]);

  const handleSubscriptionClick = (id: number) => {
    setSelectedSubscription(id);
  };
  const closeSubscriptionDetail = () => {
    setSelectedSubscription(null);
  };
  const subscription = subscriptions.find(sub => sub.id === selectedSubscription);
  console.log('Subscription:', subscription);

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

      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="primary" >
            <PlusIcon className="h-4 w-4" /> Nouvel abonnement
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Creation de une Souscription</AlertDialogTitle>
            <AlertDialogDescription>
              Remplir les informations demander pour la creation de la soucription
            </AlertDialogDescription>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <select
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option disabled value="">-- Sélectionner un client --</option>
                  {clients.map((client, idx) => (
                    <option key={idx} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>

              {/* Plan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {plans.map((plan, idx) => (
                    <option key={idx} value={plan}>{plan}</option>
                  ))}
                </select>
              </div>

              {/* Methode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Methode</label>
                <select
                  name='methode'
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={formData.methode}
                  onChange={handleChange}>
                  <option disabled value="">Choisir une méthode</option>
                   {Object.entries(methodMap).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                </select>
              </div>

              {/* Date de début */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Date de fin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Prix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix (frcs)</label>
                <input
                  type="number"
                  name="price"
                  step="500"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
              >
                Enregistrer
              </button>
            </form>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="absolute cursor-pointer top-1 right-1">X</AlertDialogCancel>
            {/* <AlertDialogAction type="button" onClick={handleSubmit} >Enregistrer</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                        {subscription.payments.map((payment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(payment.updatedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {payment.montant.toFixed(2)} FRCS
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {payment.method}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === "Payé"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                  }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        
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
              </tr>) : filteredSubscriptions.map(sub =>
                <tr key={sub.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleSubscriptionClick(sub.id)}>
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