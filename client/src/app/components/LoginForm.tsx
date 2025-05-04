'use client'
import { handleLogin } from '@/api'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/features/users/userSlice'
import Link from 'next/link'
import Image from 'next/image'

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
        <div className=' shadow p-5 rounded-lg flex flex-col items-center'>
            <form onClick={e => handleSubmit(e)}
                className='max-w-[350px] w-[300px] rounded-lg flex flex-col items-center'>
                <div className='text-2xl mb-7'>Welcome Back</div>
                <div className='mb-5 w-full'>
                    <label htmlFor="email" className="block text-gray-700 text-xs">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id='email'
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className='p-2 outline-none shadow mb-1 w-full'
                        placeholder='Email or Username'
                    />
                    <p className='text-[#CB356B] text-xs w-[90%] break-normal   '>Incorrect username or email</p>
                </div>
                <div className='mb-5 w-full'>
                    <label htmlFor="password" className="block text-gray-700 text-xs">
                        pasword<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id='password'
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        className='p-2 outline-none shadow mb-2 w-full'
                        placeholder='Password'
                    />
                    <p className='text-[#CB356B] text-xs w-[90%] break-normal '>Incorrect Password</p>
                </div>
                <div className=' w-[60%] rounded-2xl border bg-linear-to-r from-[#CB356B] to-[#93291E] 
                        text-center p-1 text-[#bbbbbb]'>
                    Login
                </div>
            </form>

            <p className='my-3'>or</p>

            <div className='rounded-2xl p-1 px-2 border border-gray-300 flex gap-2 mb-4'>
                <Image
                    src={'/google-icon.svg'}
                    height={10}
                    width={10}
                    alt={"Google logo"}
                    className='h-full w-[18px]'
                />
                Continue with Google
            </div>

            <div>
                Don't have an account? {' '}
                <Link href="/auth/signup" className="text-blue-400 hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default LoginForm
