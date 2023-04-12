'use client'

import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import { SafeListings, SafeUser } from '../types'

interface FavoritesClientProps {
  favorites: SafeListings[]
  currentUser: SafeUser
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favorites,
  currentUser
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="Here you can find your favorite listings"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {favorites.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
