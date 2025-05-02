'use client'
import { handleLogin } from '@/api'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/features/users/userSlice'
import Link from 'next/link'

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
                console.log("login response: ", response.data)
                router.push('/')

            }).catch((error) => {
                console.error('Login failed:', error)
                // Handle login failure (e.g., show error message)
            })
    }
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20">
                <h1 className="text-3xl font-bold text-center text-white mb-6">STREAMIFY</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-semibold text-white text-center">Welcome Back</h2>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-white/20 text-gray-200 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-white/20 text-gray-200 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-white/20 text-gray-200 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity"
                    >
                        Login
                    </button>
                    <p className="text-center text-gray-400">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="text-blue-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
