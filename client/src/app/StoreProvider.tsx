'use client'
import { useRef, useEffect, use } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { login } from '../lib/features/users/userSlice'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {

    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('user')
      if (storedState) {
        const parsedState = JSON.parse(storedState)
        storeRef.current?.dispatch(login(parsedState))
      }
    }
  }
  , [])

  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}