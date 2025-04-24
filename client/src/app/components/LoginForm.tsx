'use client'
import { handleLogin} from '@/api'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/features/users/userSlice'

const LoginForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
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
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email"
                        required className='border-1 border-gray-300'
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password"
                        className='border-1 border-gray-300' required
                        value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className='border-1 border-gray-500 p-2 outline-none
                cursor-pointer' >Login</button>

            </form>
        </div>
    )
}

export default LoginForm
