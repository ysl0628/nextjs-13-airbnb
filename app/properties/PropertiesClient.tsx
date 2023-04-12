'use client'

import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { SafeListings, SafeUser } from '../types'

import Heading from '../components/Heading'
import Container from '../components/Container'
import ListingCard from '../components/listings/ListingCard'

interface TripsClientProps {
  listings: SafeListings[]
  currentUser: SafeUser
}
const TripsClient: React.FC<TripsClientProps> = ({ listings, currentUser }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string>('')

  const onDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await axios.delete(`/api/listings/${id}`)
      toast.success('已刪除房源')
      router.refresh()
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Something went wrong')
    } finally {
      setDeletingId('')
    }
  }

  return (
    <Container>
      <Heading title="Properties" subtitle="Manage your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="刪除房源"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
