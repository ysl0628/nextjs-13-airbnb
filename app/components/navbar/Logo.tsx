'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const route = useRouter()

  // https://github.com/vercel/next.js/issues/40762

  return (
    <Image
      onClick={() => route.push('/')}
      alt="logo"
      src="/images/logo.png"
      className="hidden md:block object-cover cursor-pointer"
      height={31}
      width={100}
      priority
    />
  )
}

export default Logo
