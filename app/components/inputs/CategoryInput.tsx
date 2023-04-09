'use client'

import React from 'react'
import { IconType } from 'react-icons'
import Input from './Input'

interface CategoryInputProps {
  onClick: (value: string) => void
  label: string
  icon: IconType
  selected: boolean
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  label,
  icon: Icon,
  selected
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  )
}

export default CategoryInput
