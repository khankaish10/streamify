import React from 'react'

const AuthLayout = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        {children}
    </div>
  )
}

export default AuthLayout
