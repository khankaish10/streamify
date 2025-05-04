'use client'
import { handleLogin } from '@/api'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/features/users/userSlice'
import Link from 'next/link'
import Image from 'next/image'
import { loginValidationSchema } from '@/lib/formValidation/form_validation'
import { error } from 'console'

const LoginForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [userName, setuserName] = React.useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string[]; userName?: string[]; password?: string[] } | undefined>();
    const dispatch = useAppDispatch()
    const router = useRouter()
    console.log("error: ", errors)
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const validatedFields = loginValidationSchema.safeParse({
            email, password, userName
        })
        if (!validatedFields.success) {
            setErrors(validatedFields.error.flatten().fieldErrors)
            setTimeout(() => (
                setErrors({})
            ), 2000)
            console.log("validation: ", validatedFields.error.flatten().fieldErrors)
        } else {
            setIsLoading(true);
            handleLogin({ email, password })
                .then((response) => {
                    dispatch(login(response.data))
                    console.log("login response: ", response.data)
                    router.push('/')
                    setIsLoading(false)

                }).catch((error) => {
                    setErrors(error.response.data.err)
                    setIsLoading(false)
                    setTimeout(() => (
                        setErrors({})
                    ), 2000)
                })

        }
    }

    return (
        <div className=' shadow p-5 rounded-lg flex flex-col items-center'>
            <form onSubmit={e => handleSubmit(e)}
                className='max-w-[350px] w-[300px] rounded-lg flex flex-col items-center'>
                <div className='text-2xl mb-7'>Welcome Back</div>
                <div className='mb-5 w-full'>
                    <label htmlFor="email" className="block text-gray-700 text-xs">
                        Email or Username<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id='email'
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className='p-2 outline-none shadow mb-1 w-full'
                        placeholder='Email or Username'
                    />
                    {
                        errors?.email &&
                        <p className='text-[#CB356B] text-xs w-[90%] break-normal   '>{errors?.email}</p>
                    }
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
                    {
                        errors?.password &&
                        <p className='text-[#CB356B] text-xs w-[90%] break-normal '>{errors?.password}</p>
                    }
                </div>
                <button className=' w-[60%] rounded-2xl border bg-linear-to-r from-[#CB356B] to-[#93291E] 
                        text-center p-1 text-[#bbbbbb]' disabled={isLoading}>
                    {
                        isLoading ? (
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-[#93291E]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        ) : "Login"
                    }
                </button>
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
