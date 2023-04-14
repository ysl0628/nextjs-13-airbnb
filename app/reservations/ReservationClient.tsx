'use client'

import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { SafeReservation, SafeUser } from '../types'
import useDetailModal from '../hooks/useDetailModal'

import Heading from '../components/Heading'
import Container from '../components/Container'
import ListingCard from '../components/listings/ListingCard'
import DetailModal from '../components/modals/DetailModal'

interface ReservationClientProps {
  reservations: SafeReservation[]
  currentUser: SafeUser
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const detailModal = useDetailModal()
  const [deletingId, setDeletingId] = useState<string>('')
  const [selectedReservation, setSelectedReservation] =
    useState<SafeReservation>()

  const onDetailOpen = (reservation: SafeReservation) => {
    setSelectedReservation(reservation)
    detailModal.onOpen()
  }

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
            actionLabel="取消客戶預約"
            currentUser={currentUser}
            secondaryActionLabel="訂單明細"
            onSecondaryAction={() => onDetailOpen(reservation)}
          />
        ))}
        <DetailModal
          reservation={selectedReservation}
          onAction={onCancel}
          deletingId={deletingId}
        />
      </div>
    </Container>
  )
}

export default ReservationClient
