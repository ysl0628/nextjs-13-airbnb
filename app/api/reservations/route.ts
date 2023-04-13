import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await req.json()

  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
    userName,
    phone,
    email,
    address,
    arrivalTime,
    isMainGuest,
    mainGuestName,
    message
  } = body
  if (
    !listingId ||
    !startDate ||
    !endDate ||
    !totalPrice ||
    !userName ||
    !email ||
    !arrivalTime
  ) {
    return NextResponse.error()
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        // create a new reservation
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
          userName,
          phone,
          email,
          address,
          arrivalTime,
          isMainGuest,
          mainGuestName,
          message
        }
      }
    }
  })

  return NextResponse.json(listingAndReservation)
}
