'use client'

import React, { useCallback, MouseEvent, useMemo } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

import { SafeListings, SafeReservation, SafeUser } from '@/app/types'
import useCountries from '@/app/hooks/useCountries'
import Button from '../Button'
import HeartButton from '../HeartButton'

interface ListingCardProps {
  data: SafeListings
  reservation?: SafeReservation
  onAction?: (id: string) => void
  onSecondaryAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  secondaryActionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  onSecondaryAction,
  disabled,
  actionLabel,
  secondaryActionLabel,
  actionId = '',
  currentUser
}) => {
  const { getByValue } = useCountries()
  const router = useRouter()
  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [actionId, disabled, onAction]
  )

  const handleSecondaryAction = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }
      onSecondaryAction?.(actionId)
    },
    [actionId, disabled, onSecondaryAction]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [data, reservation])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            alt="Listing"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(min-width: 1024px) 100%, 100%"
            src={data.imageSrc}
            className="group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 justify-between ">
          {onSecondaryAction && secondaryActionLabel && (
            <Button
              disabled={disabled}
              outline
              small
              label={secondaryActionLabel}
              onClick={handleSecondaryAction}
            />
          )}
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ListingCard
