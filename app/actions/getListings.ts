import prisma from '@/app/libs/prismadb'

export interface IListingParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category
    } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (category) {
      query.category = category
    }

    if (guestCount) {
      query.guestCount = {
        // gte 是 greater than or equal to 的意思，也就是大於等於
        // 使用 gte 的原因是，如果 guestCount 是 2，那麼 2 人以上的房間都可以
        // +guestCount 是把 guestCount 轉成數字
        gte: +guestCount
      }
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue
    }

    if (startDate && endDate) {
      // 以下的邏輯為，如果有 startDate 和 endDate，那麼就要檢查該房間的預約日期是否有與 startDate 和 endDate 有重疊
      // 重疊的條件為，startDate 在預約的日期範圍內，或是 endDate 在預約的日期範圍內
      // 例如，startDate 是 2021-01-01，endDate 是 2021-01-10，那麼只要預約的日期有在這個範圍內，就會被排除
      // 使用 NOT 是因為，如果有重疊的話，就不會顯示在列表中
      // 使用 some 是因為，有可能一個房間會有多個預約，所以要用 some 來檢查
      // 使用 OR 是因為，有可能 startDate 在預約的日期範圍內，或是 endDate 在預約的日期範圍內，所以要用 OR 來檢查
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: {
                  gte: startDate
                },
                startDate: {
                  lte: endDate
                }
              },
              {
                startDate: {
                  lte: endDate
                },
                endDate: {
                  gte: startDate
                }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))

    return safeListings
  } catch (error: any) {
    throw new Error(error)
  }
}
