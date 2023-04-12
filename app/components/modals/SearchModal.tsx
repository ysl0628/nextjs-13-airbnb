'use client'

import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { formatISO } from 'date-fns'
import queryString from 'query-string'
import { Range } from 'react-date-range'
import { useRouter, useSearchParams } from 'next/navigation'

import useSearchModal from '@/app/hooks/useSearchModal'

import Modal from './Modal'
import CountrySelector, { CountrySelectValue } from '../inputs/CountrySelector'
import Heading from '../Heading'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'

enum STEP {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEP.LOCATION)
  const [location, setLocation] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false
      }),
    [location]
  )

  const onNext = useCallback(() => {
    setStep((step) => step + 1)
  }, [])

  const onBack = useCallback(() => {
    setStep((step) => step - 1)
  }, [])

  const onSubmit = useCallback(() => {
    if (step !== STEP.INFO) {
      onNext()
      return
    }

    let currentQuery = {}

    if (params) {
      currentQuery = queryString.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      {
        skipNull: true
      }
    )

    setStep(STEP.LOCATION)
    searchModal.onClose()

    router.push(url)
  }, [
    bathroomCount,
    dateRange,
    guestCount,
    location,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step
  ])

  const actionLabel = useMemo(() => {
    if (step === STEP.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEP.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where are you going?"
        subtitle="Enter a city, address, or landmark"
      />
      <CountrySelector
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map pointer={location?.latlng} />
    </div>
  )

  if (step === STEP.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }

  if (step === STEP.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information?"
          subtitle="Find the perfect place for your trip"
        />
        <Counter
          title="Guests"
          subtitle="How many people are you bringing?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      title="Filters"
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={STEP.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default SearchModal
