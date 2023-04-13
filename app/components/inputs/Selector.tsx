import { FieldErrors } from 'react-hook-form'
import Select from 'react-select'

export interface OptionType {
  value: string | boolean | number
  label: string
}

interface SelectorProps {
  id: string
  label: string
  required?: boolean
  errors: FieldErrors
  value?: OptionType
  options: OptionType[]
  placeholder?: string
  onChange: (value: OptionType) => void
}

const Selector: React.FC<SelectorProps> = ({
  id,
  label,
  required,
  errors,
  value,
  options,
  placeholder,
  onChange
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={`
          text-md
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <Select
        isClearable
        value={value}
        options={options}
        placeholder={placeholder || ''}
        onChange={(value) => onChange(value as OptionType)}
        classNames={{
          container: () => 'h-12',
          control: () => 'px-2 border-2 h-full',
          input: () => 'text-lg h-8 py-0',
          valueContainer: () => 'h-10',
          option: () => 'text-lg',
          menuList: () => 'z-50'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}

export default Selector
