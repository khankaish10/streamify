
'use server'
import { cookies } from 'next/headers'
 
export default async function getCookie() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('accessToken')
  return theme
}