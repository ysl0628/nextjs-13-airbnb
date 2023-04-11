'use client'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Range } from 'react-date-range'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { SafeListings, SafeReservation, SafeUser } from '@/app/types'

import useLoginModal from '@/app/hooks/useLoginModal'
import Container from '@/app/components/Container'
import { categories } from '@/app/components/navbar/Categories'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps {
  reservations?: SafeReservation[]
  listing: SafeListings & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = []
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  // 過濾掉已經預約的日期
  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const [totalPrice, setTotalPrice] = useState(listing.price)

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen()
      return
    }

    setIsLoading(true)

    try {
      await axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })

      toast.success('預約成功')
      setDateRange(initialDateRange)

      // 跳轉到 /trip
      router.push('/trips')
    } catch (error) {
      toast.error('預約失敗')
    } finally {
      setIsLoading(false)
    }
  }, [currentUser, dateRange, listing?.id, loginModal, router, totalPrice])

  useEffect(() => {
    // 如果有選擇日期，則計算總價格
    if (dateRange.startDate && dateRange.endDate) {
      // 計算日期差
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              price={listing.price}
            />
            <div className="md:col-span-3 order-first mb-10 md:order-last">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient