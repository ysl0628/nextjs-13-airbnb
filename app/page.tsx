import { Inter } from 'next/font/google'

import getListings, { IListingParams } from './actions/getListings'
import getCurrentUser from './actions/getCurrentUser'

import Container from './components/Container'
import ClientOnly from './components/ClientOnly'
import EmptyState from './components/EmptyState'
import ListingCard from './components/listings/ListingCard'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  searchParams: IListingParams
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
