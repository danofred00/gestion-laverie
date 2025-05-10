import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BarChart3Icon, UsersIcon, CarIcon, ClipboardListIcon, TrendingUpIcon, AlertTriangleIcon, CalendarIcon, CreditCardIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// Sample data for charts
const weeklyWashData = [{
  name: 'Lun',
  lavages: 12
}, {
  name: 'Mar',
  lavages: 19
}, {
  name: 'Mer',
  lavages: 15
}, {
  name: 'Jeu',
  lavages: 22
}, {
  name: 'Ven',
  lavages: 28
}, {
  name: 'Sam',
  lavages: 35
}, {
  name: 'Dim',
  lavages: 24
}];
const serviceDistribution = [{
  name: 'Lavage Ext.',
  value: 45
}, {
  name: 'Lavage Int.',
  value: 30
}, {
  name: 'Lavage Complet',
  value: 15
}, {
  name: 'Cire',
  value: 10
}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  const statCards = [{
    title: "Lavages aujourd'hui",
    value: '28',
    change: '+12%',
    positive: true,
    icon: <ClipboardListIcon className="h-6 w-6" />,
    color: 'bg-blue-500'
  }, {
    title: 'Nouveaux clients',
    value: '5',
    change: '+2',
    positive: true,
    icon: <UsersIcon className="h-6 w-6" />,
    color: 'bg-green-500'
  }, {
    title: 'Paiements',
    value: '1 245 €',
    change: '+8%',
    positive: true,
    icon: <CreditCardIcon className="h-6 w-6" />,
    color: 'bg-indigo-500'
  }, {
    title: 'Véhicules traités',
    value: '32',
    change: '-3',
    positive: false,
    icon: <CarIcon className="h-6 w-6" />,
    color: 'bg-amber-500'
  }];
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500">
          Bienvenue sur votre tableau de bord Auto Wash Pro
        </p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {statCards.map((stat, index) => <motion.div key={stat.title} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1,
        duration: 0.5
      }}>
            <Card className="h-full">
              {loading ? <div className="animate-pulse flex space-x-4 p-5">
                  <div className={`rounded-full ${stat.color} h-12 w-12 opacity-50`}></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div> : <div className="flex items-center p-5">
                  <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                      <p className={`ml-2 flex items-baseline text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                </div>}
            </Card>
          </motion.div>)}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4,
        duration: 0.5
      }}>
          <Card title="Lavages par jour" subtitle="7 derniers jours" icon={<BarChart3Icon className="h-5 w-5" />} loading={loading} className="h-full">
            {!loading && <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyWashData} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="lavages" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>}
          </Card>
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5,
        duration: 0.5
      }}>
          <Card title="Distribution des services" subtitle="Répartition actuelle" icon={<TrendingUpIcon className="h-5 w-5" />} loading={loading} className="h-full">
            {!loading && <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={serviceDistribution} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                  name,
                  percent
                }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {serviceDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>}
          </Card>
        </motion.div>
      </div>
      {/* Alerts and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-1" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6,
        duration: 0.5
      }}>
          <Card title="Alertes" icon={<AlertTriangleIcon className="h-5 w-5" />} loading={loading} className="h-full">
            {!loading && <div className="space-y-4">
                <div className="flex items-center py-2 border-b border-gray-100">
                  <div className="p-2 bg-red-100 rounded-full mr-3">
                    <AlertTriangleIcon className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stock de cire faible</p>
                    <p className="text-xs text-gray-500">Reste 2 unités</p>
                  </div>
                </div>
                <div className="flex items-center py-2 border-b border-gray-100">
                  <div className="p-2 bg-amber-100 rounded-full mr-3">
                    <AlertTriangleIcon className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Maintenance prévue</p>
                    <p className="text-xs text-gray-500">Machine 2, demain</p>
                  </div>
                </div>
                <div className="flex items-center py-2">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <AlertTriangleIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Réclamation client</p>
                    <p className="text-xs text-gray-500">
                      M. Dupont, à traiter
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" fullWidth>
                  Voir toutes les alertes
                </Button>
              </div>}
          </Card>
        </motion.div>
        <motion.div className="lg:col-span-2" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.7,
        duration: 0.5
      }}>
          <Card title="Réservations à venir" icon={<CalendarIcon className="h-5 w-5" />} loading={loading} className="h-full">
            {!loading && <div className="space-y-4">
                {[{
              time: '10:00',
              client: 'Jean Martin',
              service: 'Lavage complet',
              vehicle: 'Peugeot 308'
            }, {
              time: '11:30',
              client: 'Marie Dupont',
              service: 'Lavage extérieur',
              vehicle: 'Renault Clio'
            }, {
              time: '14:15',
              client: 'Pierre Lefebvre',
              service: 'Lavage intérieur',
              vehicle: 'Citroën C3'
            }, {
              time: '16:45',
              client: 'Sophie Laurent',
              service: 'Cire protectrice',
              vehicle: 'BMW X3'
            }].map((appointment, i) => <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <p className="text-xs font-semibold text-blue-800">
                          {appointment.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {appointment.client}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appointment.service} - {appointment.vehicle}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Détails
                      </Button>
                    </div>
                  </div>)}
                <Button variant="outline" size="sm" fullWidth>
                  Voir toutes les réservations
                </Button>
              </div>}
          </Card>
        </motion.div>
      </div>
    </div>;
}