'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface props {
  children: ReactNode
}

const ProtectedRoutes = ({ children }: props) => {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    const storeUser = typeof window !== 'undefined' && localStorage.getItem('user')
    try {
      const user = storeUser ? JSON.parse(storeUser) : null
      if (user?.accessToken) {
        setIsAllowed(true)
      } else {
        setIsAllowed(false)
        router.push('/auth/login')
      }
    } catch (error) {
      setIsAllowed(false)
      router.push('/auth/login')
    }
    const user = localStorage.getItem('user')
    if (!user || !JSON.parse(user)) {
      router.push('/auth/login')
    }

  }, [router])
  if(isAllowed === null) return null

  if(!isAllowed) return null
  return <>{children}</>
}

export default ProtectedRoutes
