import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <Image
      alt="logo"
      src="/images/logo.png"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
    />
  )
}

export default Logo
