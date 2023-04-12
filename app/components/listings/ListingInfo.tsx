'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { IconType } from 'react-icons'

import { SafeUser } from '@/app/types'
import useCountries from '@/app/hooks/useCountries'

import Avatar from '../Avatar'
import ListingCategory from './ListingCategory'

const Map = dynamic(() => import('../Map'), { ssr: false })

interface ListingInfoProps {
  user: SafeUser
  description: string
  price: number
  bedCount: number
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
  category:
    | {
        label: string
        description: string
        icon: IconType
      }
    | undefined
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  bedCount,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  category
}) => {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bedCount} beds</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg text-neutral-500 font-light">{description}</div>
      <hr />
      <Map pointer={coordinates} />
    </div>
  )
}

export default ListingInfo
