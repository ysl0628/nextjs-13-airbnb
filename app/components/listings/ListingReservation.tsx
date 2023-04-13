'use client'

import React, { useMemo } from 'react'
import { Range } from 'react-date-range'
import Calendar from '../inputs/Calendar'
import Button from '../Button'
import useReservationModal from '@/app/hooks/useReservationModal'
import ReservationModal from '../modals/ReservationModal'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { SafeListings } from '@/app/types'
import { OptionType } from '../inputs/Selector'
import { toast } from 'react-hot-toast'

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
  setFormValue: (
    id: string,
    value: string | boolean | number | OptionType
  ) => void
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

  const isTodayDisabled = useMemo(() => {
    const today = new Date()
    const isDisabled = disabledDates?.some((disabledDate) => {
      return today.getDate() === disabledDate.getDate()
    })

    const isStartDisabled = disabledDates?.some((disabledDate) => {
      return dateRange.startDate?.getDate() === disabledDate.getDate()
    })

    const isEndDisabled = disabledDates?.some((disabledDate) => {
      return dateRange.endDate?.getDate() === disabledDate.getDate()
    })

    return (isDisabled && isStartDisabled) || (isDisabled && isEndDisabled)
  }, [disabledDates, dateRange])

  const onNext = () => {
    if (isTodayDisabled) {
      toast.error('選擇的日期不可預訂')
      return
    }

    reservationModal.onOpen()
  }

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
        <Button label="下一步" disabled={disabled} onClick={onNext} />
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
