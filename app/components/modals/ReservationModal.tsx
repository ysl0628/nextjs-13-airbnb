'use client'

import React from 'react'
import { formatISO } from 'date-fns'
import { Range } from 'react-date-range'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import { SafeListings } from '@/app/types'
import useReservationModal from '@/app/hooks/useReservationModal'

import Modal from './Modal'
import Heading from '../Heading'
import Selector from '../inputs/Selector'
import LabelInput from '../inputs/LabelInput'

import {
  MdOutlineAccessTime,
  MdOutlineAttachMoney,
  MdOutlineBedroomParent
} from 'react-icons/md'

interface ReservationModalProps {
  listing: SafeListings
  totalPrice: number
  dateRange: Range
  formValue: FieldValues
  errors: FieldErrors<FieldValues>
  disabled: boolean
  register: UseFormRegister<FieldValues>
  onSubmit: () => void
  setFormValue: (id: string, value: string | boolean | number) => void
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  listing,
  totalPrice,
  dateRange,
  formValue,
  disabled,
  errors,
  register,
  onSubmit,
  setFormValue
}) => {
  const reservationModal = useReservationModal()
  const start = dateRange.startDate
    ? formatISO(dateRange.startDate, { representation: 'date' })
    : ''
  const end = dateRange.endDate
    ? formatISO(dateRange.endDate, { representation: 'date' })
    : ''

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Heading title="確認訂購資訊" />
        <div className="flex flex-col gap-3">
          <div className="text-lg flex items-center gap-1">
            <MdOutlineBedroomParent size={20} />
            <div>
              房型 : <span className="text-neutral-500">{listing.title}</span>
            </div>
          </div>
          <div className="text-lg flex items-center gap-1">
            <MdOutlineAccessTime size={20} />
            <div>
              時間 :{' '}
              <span className="text-neutral-500">
                {start} - {end}
              </span>
            </div>
          </div>
          <div className="text-lg flex items-center gap-1">
            <MdOutlineAttachMoney size={20} />
            <div>
              總金額 : <span className="text-neutral-500">{totalPrice} 元</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div
        className="flex flex-col gap-4 max-h-[50vh]
          overflow-y-auto"
      >
        <Heading title="填寫訂購資料" />
        <LabelInput
          id="userName"
          label="訂購人"
          register={register}
          errors={errors}
          disabled={disabled}
          required
        />
        <LabelInput
          id="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          disabled={disabled}
          required
        />
        <LabelInput
          id="phone"
          label="電話"
          register={register}
          errors={errors}
          disabled={disabled}
          required
        />
        <LabelInput
          id="address"
          label="地址"
          register={register}
          errors={errors}
          disabled={disabled}
          required
        />
        <Selector
          id="arrivalTime"
          required
          errors={errors}
          label="到達時間"
          options={[{ label: '3:00 PM ~ 4:00 PM', value: '1' }]}
          onChange={(value) => setFormValue('arrivalTime', value.label)}
        />
        <Selector
          id="isMainGuest"
          errors={errors}
          label="是否為主要入住者"
          options={[
            { label: '是', value: true },
            { label: '否', value: false }
          ]}
          onChange={(value) => setFormValue('isMainGuest', value.value)}
        />
        {!formValue.isMainGuest && (
          <LabelInput
            id="mainGuestName"
            label="主要入住者姓名"
            register={register}
            errors={errors}
            disabled={disabled}
          />
        )}
        <LabelInput
          type="textarea"
          id="message"
          label="備註"
          register={register}
          errors={errors}
          disabled={disabled}
        />
      </div>
    </div>
  )

  return (
    <Modal
      onClose={reservationModal.onClose}
      onSubmit={() => {}}
      actionLabel="確認預約"
      title="預約"
      isOpen={reservationModal.isOpen}
      body={bodyContent}
    />
  )
}

export default ReservationModal
