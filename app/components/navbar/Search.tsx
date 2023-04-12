'use client'

import React, { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

import useSearchModal from '@/app/hooks/useSearchModal'

import { BiSearch } from 'react-icons/bi'
import useCountries from '@/app/hooks/useCountries'
import { differenceInDays } from 'date-fns'

const Search = () => {
  const params = useSearchParams()
  const searchModal = useSearchModal()
  const { getByValue } = useCountries()

  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')

  const locationLabel = useMemo(() => {
    if (!locationValue) return 'Anywhere'
    return getByValue(locationValue as string)?.label || 'Anywhere'
  }, [getByValue, locationValue])

  const durationLabel = useMemo(() => {
    if (!startDate || !endDate) return 'Any Week'

    const start = new Date(startDate)
    const end = new Date(endDate)
    let diff = differenceInDays(end, start)

    return `${diff} Days`
  }, [endDate, startDate])

  const guestLabel = useMemo(() => {
    if (!guestCount) return 'Add Guests'

    return `${guestCount} Guests`
  }, [guestCount])

  return (
    // 最外層的圓弧邊框
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {/* 圓弧邊框內的內容 */}
      <div
        className="
      flex
      items-center
      justify-between
      "
      >
        <div
          className="
        text-sm
        font-semibold
        px-6
        "
        >
          {locationLabel}
        </div>
        {/* 使用 border-x-[1px] 為了顯示左右分隔線 */}
        <div
          className="
        hidden
        sm:block
        text-sm
        font-semibold
        px-6
        border-x-[1px]
        flex-1
        text-center
        "
        >
          {durationLabel}
        </div>

        <div
          className="
        text-sm
        pl-6
        pr-2
        text-gray-600
        flex
        items-center
        gap-3
        "
        >
          <div
            className="
            hidden
            sm:block
            "
          >
            {guestLabel}
          </div>
          <div
            className="
            p-2
            rounded-full
            bg-rose-500
            text-white
          "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
