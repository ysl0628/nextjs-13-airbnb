'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

interface LabelInputProps {
  id: string
  label: string
  placeholder?: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const LabelInput: React.FC<LabelInputProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  disabled,
  formatPrice,
  register,
  required,
  errors
}) => {
  // 使用 peer 來達到 placeholder 及 label 的轉換效果
  return (
    <div className="w-full flex flex-col gap-1 relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <label
        className={`
          text-md
          ${formatPrice ? 'left-9' : 'left-4'}
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder || ' '}
        type={type}
        className={`
          w-full
          h-12
          p-4
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
    </div>
  )
}

export default LabelInput
