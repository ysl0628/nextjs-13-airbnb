import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'

import FavoritesClient from './FavoritesClient'

import Heading from '../components/Heading'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser()
  const favoriteListings = await getFavoriteListings()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="You must be signed in to view this page"
        />
      </ClientOnly>
    )
  }

  if (favoriteListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites"
          subtitle="You have no favorited listings"
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <FavoritesClient favorites={favoriteListings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavoritesPage
