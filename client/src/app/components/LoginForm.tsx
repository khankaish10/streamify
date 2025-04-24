'use client'
import { handleLogin } from '@/api'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/features/users/userSlice'

const LoginForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [userName, setuserName] = React.useState('')
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        handleLogin({ email, password })
            .then((response) => {
                dispatch(login(response.data))
                router.push('/')

            }).catch((error) => {
                console.error('Login failed:', error)
                // Handle login failure (e.g., show error message)
            })
    }
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}
                        name="email" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input type="username" id="username" value={userName} onChange={e => setuserName(e.target.value)}
                        name="username" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}
                        name="password" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <button type="submit" className='border-1 border-gray-500 p-2 outline-none
                cursor-pointer' >Login</button>

            </form>
        </div>
    )
}

export default LoginForm
