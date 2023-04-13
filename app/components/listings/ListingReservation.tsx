'use client'

import React from 'react'
import { Range } from 'react-date-range'
import Calendar from '../inputs/Calendar'
import Button from '../Button'
import useReservationModal from '@/app/hooks/useReservationModal'
import ReservationModal from '../modals/ReservationModal'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { SafeListings } from '@/app/types'

interface ListingReservationProps {
  price: number
  listing: SafeListings
  dateRange: Range
  totalPrice: number
  onChangeDate: (range: Range) => void
  onSubmit: () => void
  disabled: boolean
  disabledDates: Date[]
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  formValue: FieldValues
  setFormValue: (id: string, value: string | boolean | number) => void
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  listing,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  register,
  errors,
  formValue,
  setFormValue
}) => {
  const reservationModal = useReservationModal()
  return (
    <div className="bg-white rounded-xl border-xl border-[1px] border-neutral-200 overflow-hidden">
      <div
        className="
            flex items-center gap-1 p-4
        "
      >
        <div className="text-2xl font-semibold">${price}</div>
        <div className="font-light text-neutral-600">/ night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          label="預約"
          disabled={disabled}
          onClick={reservationModal.onOpen}
        />
        <ReservationModal
          listing={listing}
          totalPrice={totalPrice}
          dateRange={dateRange}
          onSubmit={onSubmit}
          errors={errors}
          disabled={disabled}
          register={register}
          formValue={formValue}
          setFormValue={setFormValue}
        />
      </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  )
}

export default ListingReservation
