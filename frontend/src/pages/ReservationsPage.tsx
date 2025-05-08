import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon, UserIcon, CarIcon, CheckIcon, XIcon } from 'lucide-react';
// Sample reservation data
const sampleReservations = [{
  id: 1,
  client: 'Martin Dupont',
  vehicle: 'Peugeot 308 (AB-123-CD)',
  service: 'Lavage Complet',
  date: '25/05/2023',
  time: '10:30',
  status: 'confirmed',
  notes: 'Client prioritaire'
}, {
  id: 2,
  client: 'Sophie Laurent',
  vehicle: 'Renault Clio (EF-456-GH)',
  service: 'Lavage Extérieur',
  date: '25/05/2023',
  time: '11:00',
  status: 'confirmed',
  notes: ''
}, {
  id: 3,
  client: 'Pierre Lefebvre',
  vehicle: 'Citroën C3 (IJ-789-KL)',
  service: 'Lavage Intérieur',
  date: '25/05/2023',
  time: '14:15',
  status: 'pending',
  notes: 'Demande de produits écologiques'
}, {
  id: 4,
  client: 'Marie Dubois',
  vehicle: 'BMW X3 (MN-012-OP)',
  service: 'Cire Protectrice',
  date: '26/05/2023',
  time: '16:45',
  status: 'confirmed',
  notes: ''
}, {
  id: 5,
  client: 'Jean Moreau',
  vehicle: 'Audi A4 (QR-345-ST)',
  service: 'Lavage Complet + Cire',
  date: '27/05/2023',
  time: '09:30',
  status: 'confirmed',
  notes: ''
}];
// Generate time slots for the calendar
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 18; hour++) {
    for (let minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};
const timeSlots = generateTimeSlots();
// Calendar days
const days = [{
  date: '22/05/2023',
  day: 'Lun'
}, {
  date: '23/05/2023',
  day: 'Mar'
}, {
  date: '24/05/2023',
  day: 'Mer'
}, {
  date: '25/05/2023',
  day: 'Jeu'
}, {
  date: '26/05/2023',
  day: 'Ven'
}, {
  date: '27/05/2023',
  day: 'Sam'
}, {
  date: '28/05/2023',
  day: 'Dim'
}];
export function ReservationsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('25/05/2023');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<number | null>(null);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };
  const handleTimeSlotClick = (time: string) => {
    setSelectedTimeSlot(time);
    // Check if there's a reservation at this time slot
    const reservation = sampleReservations.find(r => r.date === selectedDate && r.time === time);
    if (reservation) {
      setSelectedReservation(reservation.id);
    } else {
      setShowReservationModal(true);
    }
  };
  const closeReservationDetail = () => {
    setSelectedReservation(null);
    setSelectedTimeSlot(null);
  };
  const closeReservationModal = () => {
    setShowReservationModal(false);
    setSelectedTimeSlot(null);
  };
  // Get reservations for the selected date
  const reservationsForDate = sampleReservations.filter(reservation => reservation.date === selectedDate);
  // Get reservation for selected time slot
  const reservation = sampleReservations.find(r => r.id === selectedReservation);
  // Check if a time slot has a reservation
  const hasReservation = (time: string) => {
    return reservationsForDate.some(r => r.time === time);
  };
  // Get reservation status for a time slot
  const getSlotStatus = (time: string) => {
    const reservation = reservationsForDate.find(r => r.time === time);
    return reservation ? reservation.status : 'available';
  };
  // Get class for time slot based on status
  const getSlotClass = (time: string) => {
    const status = getSlotStatus(time);
    const isSelected = selectedTimeSlot === time;
    if (isSelected) {
      return 'bg-blue-600 text-white';
    }
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };
  return <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Réservations</h1>
          <p className="text-gray-500">Gérez les rendez-vous et le planning</p>
        </div>
        <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowReservationModal(true)}>
          Nouvelle réservation
        </Button>
      </div>
      {/* Calendar navigation */}
      <div className="mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" icon={<ChevronLeftIcon className="h-4 w-4" />}>
              Semaine précédente
            </Button>
            <h2 className="text-lg font-medium">22 - 28 Mai 2023</h2>
            <Button variant="outline" size="sm" icon={<ChevronRightIcon className="h-4 w-4" />}>
              Semaine suivante
            </Button>
          </div>
        </Card>
      </div>
      {/* Calendar */}
      <div className="mb-6">
        <Card>
          {/* Days header */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 text-center font-medium text-gray-500 border-r border-gray-200">
              Horaires
            </div>
            {days.map(day => <div key={day.date} className={`p-4 text-center font-medium ${selectedDate === day.date ? 'bg-blue-50 text-blue-700' : 'text-gray-700'} cursor-pointer hover:bg-blue-50`} onClick={() => handleDateChange(day.date)}>
                <div>{day.day}</div>
                <div>{day.date.split('/')[0]}</div>
              </div>)}
          </div>
          {/* Time slots */}
          <div className="divide-y divide-gray-200">
            {loading ? <div className="p-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div> : timeSlots.map(time => <div key={time} className="grid grid-cols-8">
                  <div className="p-4 text-center text-sm font-medium text-gray-500 border-r border-gray-200">
                    {time}
                  </div>
                  {days.map(day => {
              const isAvailable = !hasReservation(time) || day.date !== selectedDate;
              return <div key={`${day.date}-${time}`} className={`p-4 text-center text-sm border-r border-gray-200 last:border-r-0 cursor-pointer transition-colors ${day.date === selectedDate ? getSlotClass(time) : 'bg-gray-50'}`} onClick={() => day.date === selectedDate && handleTimeSlotClick(time)}>
                        {day.date === selectedDate && hasReservation(time) && <div className="font-medium">Réservé</div>}
                      </div>;
            })}
                </div>)}
          </div>
        </Card>
      </div>
      {/* Reservation details or list */}
      <div className="mb-6">
        {selectedReservation ? <motion.div initial={{
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
            <Card>
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <button onClick={closeReservationDetail} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Retour au planning
                  </button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="danger" size="sm">
                      Annuler
                    </Button>
                  </div>
                </div>
              </div>
              {reservation && <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <h3 className="text-lg font-medium mb-4">
                        Détails de la réservation
                      </h3>
                      <div className="bg-gray-100 p-6 rounded-lg">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-700 mt-1 mr-3">
                              <CalendarIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Date et heure
                              </p>
                              <p className="font-medium">
                                {reservation.date} à {reservation.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-700 mt-1 mr-3">
                              <UserIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Client</p>
                              <p className="font-medium">
                                {reservation.client}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-700 mt-1 mr-3">
                              <CarIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Véhicule</p>
                              <p className="font-medium">
                                {reservation.vehicle}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-700 mt-1 mr-3">
                              {/* <WrenchIcon className="h-5 w-5" /> */}
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Service</p>
                              <p className="font-medium">
                                {reservation.service}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-700 mt-1 mr-3">
                              {/* <ClipboardListIcon className="h-5 w-5" /> */}
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Statut</p>
                              <p className="font-medium">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                  {reservation.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                                </span>
                              </p>
                            </div>
                          </div>
                          {reservation.notes && <div className="flex items-start">
                              <div className="p-2 rounded-full bg-blue-100 text-blue-700 mt-1 mr-3">
                                {/* <MessageSquareIcon className="h-5 w-5" /> */}
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Notes</p>
                                <p className="font-medium">
                                  {reservation.notes}
                                </p>
                              </div>
                            </div>}
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-lg font-medium mb-4">Actions</h3>
                      <div className="space-y-3">
                        <Button variant="outline" fullWidth icon={<ChevronRightIcon className="h-4 w-4" />}>
                          Créer une commande
                        </Button>
                        <Button variant="outline" fullWidth icon={<ChevronRightIcon className="h-4 w-4" />}>
                          Contacter le client
                        </Button>
                        <Button variant="outline" fullWidth icon={<ClockIcon className="h-4 w-4" />}>
                          Reprogrammer
                        </Button>
                        <Button variant={reservation.status === 'confirmed' ? 'outline' : 'success'} fullWidth icon={<CheckIcon className="h-4 w-4" />} disabled={reservation.status === 'confirmed'}>
                          {reservation.status === 'confirmed' ? 'Réservation confirmée' : 'Confirmer la réservation'}
                        </Button>
                        <Button variant="danger" fullWidth icon={<XIcon className="h-4 w-4" />}>
                          Annuler la réservation
                        </Button>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          Historique du client
                        </h3>
                        <Card className="p-5">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <div>
                                <p className="font-medium">Lavage Extérieur</p>
                                <p className="text-sm text-gray-500">
                                  15/05/2023
                                </p>
                              </div>
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Terminé
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <div>
                                <p className="font-medium">Lavage Complet</p>
                                <p className="text-sm text-gray-500">
                                  01/05/2023
                                </p>
                              </div>
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Terminé
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Cire Protectrice</p>
                                <p className="text-sm text-gray-500">
                                  15/04/2023
                                </p>
                              </div>
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Terminé
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>}
            </Card>
          </motion.div> : <div>
            <h2 className="text-lg font-medium mb-4">
              Réservations du jour ({reservationsForDate.length})
            </h2>
            {loading ? <div className="space-y-4">
                {[...Array(3)].map((_, i) => <Card key={i}>
                    <div className="animate-pulse p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-36"></div>
                          <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                    </div>
                  </Card>)}
              </div> : <div className="space-y-4">
                {reservationsForDate.length > 0 ? reservationsForDate.map(reservation => <Card key={reservation.id} className="hover:shadow-md transition-shadow">
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-blue-100 text-blue-700 mr-4">
                            <ClockIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {reservation.time} - {reservation.client}
                            </p>
                            <p className="text-sm text-gray-500">
                              {reservation.service} | {reservation.vehicle}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {reservation.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </span>
                          <Button variant="outline" size="sm" onClick={() => setSelectedReservation(reservation.id)}>
                            Détails
                          </Button>
                        </div>
                      </div>
                    </Card>) : <Card className="p-8 text-center">
                    <div className="flex flex-col items-center">
                      <CalendarIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        Aucune réservation
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Il n'y a pas de réservations pour cette date.
                      </p>
                      <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setShowReservationModal(true)}>
                        Nouvelle réservation
                      </Button>
                    </div>
                  </Card>}
              </div>}
          </div>}
      </div>
    </div>;
}