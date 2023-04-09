'use client'

import React, { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { categories } from '../navbar/Categories'
import useRentModal from '@/app/hooks/useRentModal'

import Modal from './Modal'
import Heading from '../Heading'
import CategoryInput from '../inputs/CategoryInput'
import CountrySelector from '../inputs/CountrySelector'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)

  const onNext = () => {
    setStep((step) => step + 1)
  }

  const onBack = () => {
    setStep((step) => step - 1)
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: '',
      title: '',
      description: '',
      price: 1,
      imagesSrc: '',
      guestCount: 1,
      bedroomCount: 1,
      bathroomCount: 1
    }
  })

  const category = watch('category')
  const location = watch('location')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Continue'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(categoryLabel) =>
                setCustomValue('category', categoryLabel)
              }
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Enter a location"
        />
        <CountrySelector
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
      </div>
    )
  }

  return (
    <Modal
      title="Airbnb your home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default RentModal
