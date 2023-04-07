'use client'

import React, { useEffect, useState } from 'react'

// 此檔案是為了解決 Unhandled Runtime Error: Text content did not match server-rendered HTML 的問題
// 這是 react hydrate 的問題
// https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html

interface Props {
  children: React.ReactNode
}

const ClientOnly: React.FC<Props> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])

  if (!hasMounted) return null

  return <div>{children}</div>
}

export default ClientOnly
