import prisma from '@/app/libs/prismadb'

interface IParams {
  listingId: string
}

export default async function getListingById({ listingId }: IParams) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId
      },
      // include 是用來取得關聯資料的
      include: {
        user: true
      }
    })

    if (!listing) {
      return null
    }

    const safeListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null
      }
    }

    return safeListing
  } catch (error: any) {
    throw new Error(error)
  }
}
