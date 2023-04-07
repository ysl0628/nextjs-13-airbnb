'use client'

import React from 'react'
import Image from 'next/image'

const Avatar = () => {
  return (
    <Image
      alt="avatar"
      className="rounded-full"
      height={30}
      width={30}
      src="/images/placeholder.jpg"
    />
  )
}

export default Avatar
