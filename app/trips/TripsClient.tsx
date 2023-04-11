'use client'

import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { SafeReservation, SafeUser } from '../types'

import Heading from '../components/Heading'
import Container from '../components/Container'
import ListingCard from '../components/listings/ListingCard'

interface TripsClientProps {
  reservations: SafeReservation[]
  currentUser: SafeUser
}
const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string>('')

  const onCancel = async (reservationId: string) => {
    setDeletingId(reservationId)
    try {
      await axios.delete(`/api/reservations/${reservationId}`)
      toast.success('Reservation cancelled')
      router.refresh()
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Something went wrong')
    } finally {
      setDeletingId('')
    }
  }

  return (
    <Container>
      <Heading
        title="Your Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="取消預約"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
