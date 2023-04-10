'use client'

import React, { useCallback } from 'react'

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CounterProps {
  title: string
  subtitle: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange
}) => {
  const onIncrement = useCallback(() => onChange(value + 1), [value, onChange])

  const onDecrement = useCallback(() => {
    if (value === 1) {
      return value
    }
    onChange(value - 1)
  }, [onChange, value])

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        {/* 減少數量的按鈕 */}
        <div
          onClick={onDecrement}
          className={` w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
            ${value === 1 && 'opacity-50 cursor-not-allowed'}
            `}
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          onClick={onIncrement}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  )
}

export default Counter
