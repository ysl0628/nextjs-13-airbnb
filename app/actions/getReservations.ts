import prisma from '@/app/libs/prismadb'

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}

    // 下面这个条件是为了获取某个房源的所有预约
    if (listingId) query.listingId = listingId
    // 下面这个条件是为了获取某个用户的所有预约
    if (userId) query.userId = userId
    // 下面这个条件是为了获取某个房东的所有预约
    if (authorId) query.listing = { userId: authorId }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString()
      }
    }))

    return safeReservations
  } catch (error: any) {
    throw new Error(error)
  }
}
