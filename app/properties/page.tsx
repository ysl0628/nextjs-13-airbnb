import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'

import PropertiesClient from './PropertiesClient'
import getListings from '../actions/getListings'
import getCurrentUser from '../actions/getCurrentUser'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

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

  const listings = await getListings({
    userId: currentUser.id
  })

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties yet."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default PropertiesPage
