'use client'

import { useMemo, useState } from 'react'
import { SafeReservation } from '@/app/types'
import useDetailModal from '@/app/hooks/useDetailModal'
import Modal from './Modal'
import Heading from '../Heading'
import Link from 'next/link'
import Image from 'next/image'
import { differenceInBusinessDays, format } from 'date-fns'

import { HiArrowNarrowRight } from 'react-icons/hi'

interface DetailModalProps {
  deletingId?: string
  reservation?: SafeReservation
  onAction?: ((id: string) => void) | undefined
}

const DetailModal: React.FC<DetailModalProps> = ({
  deletingId,
  reservation,
  onAction
}) => {
  const detailModal = useDetailModal()

  const date = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    const formattedStart = format(start, 'yyyy-MM-dd')
    const formattedEnd = format(end, 'yyyy-MM-dd')
    const diff = differenceInBusinessDays(end, start)

    return [formattedStart, formattedEnd, diff]
  }, [reservation])

  const onCancel = () => {
    if (!reservation) return null
    onAction?.(reservation?.id || '')
    detailModal.onClose()
  }

  const bodyContent = (
    <div className="flex flex-col max-h-[70vh] overflow-y-auto pr-2">
      <div className="flex flex-col gap-3">
        <Heading title="訂房資訊" />
        <div className="flex gap-3 items-center justify-between">
          <Link
            href={`/listings/${reservation?.listingId}`}
            className="text-xl font-semibold text-rose-600 underline underline-offset-4"
          >
            {reservation?.listing?.title}
          </Link>
          <Image
            alt="listing image"
            src={reservation?.listing?.imageSrc || './images/placeholder.png'}
            className="object-cover rounded-md"
            width={70}
            height={47}
          />
        </div>
        <hr />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <div className="font-semibold">訂房日期</div>

            <div className="flex justify-between items-center">
              <div className=" text-neutral-500 text-base ">入住</div>
              <div className=" text-neutral-500 text-base ">退房</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="font-light text-neutral-500 text-xl ">
                {date?.[0] || ''}
              </div>
              <div className="font-light text-neutral-500 text-xl ">
                <HiArrowNarrowRight />
              </div>
              <div className="font-light text-neutral-500 text-xl ">
                {date?.[1] || ''}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="font-semibold text-neutral-500 text-base ">
                {date?.[2]} 晚
              </div>
            </div>

            <div className="font-semibold text-rose-500 text-lg self-end">
              總金額：{reservation?.totalPrice} 元
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-3">
          <div className="font-semibold">房型資訊</div>
          <div className="flex gap-3">
            <div className="font-light text-neutral-500 text-base ">
              {reservation?.listing?.guestCount} 人
            </div>
            <div className="font-light text-neutral-500 text-base ">
              {reservation?.listing?.bedCount} 張床
            </div>
            <div className="font-light text-neutral-500 text-base ">
              {reservation?.listing?.roomCount} 間房間
            </div>
            <div className="font-light text-neutral-500 text-base ">
              {reservation?.listing?.bathroomCount} 間浴室
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-3">
          <div className="font-semibold">訂房人資訊</div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className=" text-base ">姓名:</div>
              <div className="font-light text-neutral-500 text-base ">
                {reservation?.userName}
              </div>
            </div>
            <div className="flex gap-3">
              <div className=" text-base ">Email:</div>
              <div className="font-light text-neutral-500 text-base ">
                {reservation?.email}
              </div>
            </div>
            <div className="flex gap-3">
              <div className=" text-base ">電話:</div>
              <div className="font-light text-neutral-500 text-base ">
                {reservation?.phone}
              </div>
            </div>
            <div className="flex gap-3">
              <div className=" text-base ">抵達時間:</div>
              <div className="font-light text-neutral-500 text-base ">
                {reservation?.arrivalTime}
              </div>
            </div>
            <div className="flex gap-3">
              <div className=" text-base ">是否為主要入住者:</div>
              <div className="font-light text-neutral-500 text-base ">
                {reservation?.isMainGuest ? '是' : '否'}
              </div>
            </div>
            <div className="flex gap-3">
              <div className=" text-base ">主要入住者:</div>
              <div className="font-light text-neutral-500 text-base ">
                {reservation?.mainGuestName || reservation?.userName}
              </div>
            </div>
            <div className="flex gap-3">
              <div className=" text-base ">備註:</div>
              <div className="font-light text-neutral-500 text-base ">
                {reservation?.message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      onClose={detailModal.onClose}
      isOpen={detailModal.isOpen}
      title="訂單明細"
      onSubmit={onCancel}
      actionLabel="取消客戶預約"
      body={bodyContent}
      disabled={deletingId === reservation?.id}
    />
  )
}

export default DetailModal
