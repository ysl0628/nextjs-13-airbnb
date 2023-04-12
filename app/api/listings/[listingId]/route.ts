import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface IParams {
  listingId?: string
}

// 必須加入 req，否則會報錯
export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  const listing = await prisma.listing.deleteMany({
    // 尋找符合條件的資料
    // 條件為該房源的擁有者為目前登入的使用者
    where: {
      id: listingId,
      userId: currentUser.id
    }
  })

  return NextResponse.json(listing)
}
