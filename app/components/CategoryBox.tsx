'use client'

import React from 'react'
import { IconType } from 'react-icons'
import queryString from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation'

interface CategoryBoxProps {
  label: string
  icon: IconType
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected
}) => {
  const router = useRouter()
  const param = useSearchParams()

  const handleClick = () => {
    // 建立 currentQuery 空物件
    let currentQuery = {}
    // 如果 param 存在，就把 param 轉成字串，再用 queryString.parse 轉成物件
    if (param) {
      currentQuery = queryString.parse(param.toString())
    }

    // 把 currentQuery 跟新的 category query 合併
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    // 如果 param 存在，且 param.category 等於 label，就把 category 從 updatedQuery 刪除
    // 這樣就可以達到點擊同一個 category，就會把 category 從 url 刪除的效果
    if (param?.get('category') === label) {
      delete updatedQuery.category
    }

    // 把 updatedQuery 轉成字串，再用 queryString.stringifyUrl 轉成 url
    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    )

    // 用 router.push 跳轉到 url
    router.push(url)
  }

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
