'use client'

import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { SafeReservation, SafeUser } from '../types'

import Heading from '../components/Heading'
import Container from '../components/Container'
import ListingCard from '../components/listings/ListingCard'

interface ReservationClientProps {
  reservations: SafeReservation[]
  currentUser: SafeUser
}

const ReservationClient: React.FC<ReservationClientProps> = ({
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
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="取消客戶的預約"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationClient