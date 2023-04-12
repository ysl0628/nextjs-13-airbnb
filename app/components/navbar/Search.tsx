'use client'

import React from 'react'

import useSearchModal from '@/app/hooks/useSearchModal'

import { BiSearch } from 'react-icons/bi'

const Search = () => {
  const searchModal = useSearchModal()

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
          Anywhere
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
          Any Week
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
            Add Guests
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
