'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const route = useRouter()

  return (
    <Image
      onClick={() => route.push('/')}
      alt="logo"
      src="/images/logo.png"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
    />
  )
}

export default Logo
