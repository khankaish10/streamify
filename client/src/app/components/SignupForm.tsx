'use client'
import React, { useState } from 'react'
import { handleSignup } from '@/api/index';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { signUp } from '../../lib/features/users/userSlice'
import Link from 'next/link';
import { signupValidationSchema } from '@/lib/formValidation/form_validation';

type FormData = {
    userName: string;
    email: string;
    password: string;
    fullName: string;
}


const SignupForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        userName: '' as string,
        email: '' as string,
        password: '' as string,
        fullName: '' as string,
    });
    const [avatar, setAvatar] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const validatedFields = signupValidationSchema.safeParse(formData)
        if (!validatedFields.success) {
            setErrors(validatedFields.error.flatten().fieldErrors)
            setTimeout(() => (
                setErrors({})
            ), 2000)
        } else {

            const data = new FormData();
            data.append("userName", formData.userName);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("fullName", formData.fullName);
            if (avatar) {
                data.append("avatar", avatar);
            }
            if (coverImage) {
                data.append("coverImage", coverImage);
            }

            if (!avatar) {
                setErrors({ avatar: ["Profile pic is required."] })
                setTimeout(() => (
                    setErrors({})
                ), 2000)
            }
            setIsLoading(true);
            handleSignup(data)
                .then((res) => {
                    dispatch(signUp(res.data))
                    router.push('/')
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.error("Signup error:", err?.response?.data?.err);
                    setErrors(err?.response?.data?.err)
                    setIsLoading(false)
                    setTimeout(() => (
                        setErrors({})
                    ), 2000)
                })
                .finally(() => setIsLoading(false))

        }

    }

    return (
        <div className=' shadow p-4  rounded-lg flex flex-col items-center'>
            <form onSubmit={(e) => handleSubmit(e)}
                className='max-w-[350px] w-[300px] rounded-lg flex flex-col items-center'>
                <div className='text-2xl mb-7'>Create your account</div>
                <div className='mb-1 w-full'>
                    <label htmlFor="email" className="block text-gray-700 text-xs">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id='email'
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='p-2 outline-none shadow mb-1 w-full'
                        placeholder='Email'
                    />

                    <p className={`text-[#CB356B] text-xs w-[90%] min-h-4 break-normal} `}>{errors?.email || ''}</p>

                </div>
                <div className='mb-1 w-full'>
                    <label htmlFor="userName" className="block text-gray-700 text-xs">
                        Username<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id='userName'
                        value={formData.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        className='p-2 outline-none shadow mb-1 w-full'
                        placeholder='Username'
                    />

                    <p className={`text-[#CB356B] text-xs w-[90%] min-h-4  break-normal `}>{errors?.userName || ''}</p>

                </div>
                <div className='mb-1 w-full'>
                    <label htmlFor="password" className="block text-gray-700 text-xs">
                        pasword<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className='p-2 outline-none shadow mb-1 w-full'
                        placeholder='Password'
                    />
                    <p className={`text-[#CB356B] text-xs w-[90%] min-h-4  break-normal`}>{errors?.password || ''}</p>
                </div>

                <div className='mb-2 w-full'>
                    <label htmlFor="fullName" className="block text-gray-700 text-xs">
                        Fullname<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className='p-2 outline-none shadow mb-1 w-full'
                        placeholder='Fullname'
                    />

                    <p className={`text-[#CB356B] text-xs w-[90%] min-h-4  break-normal `}>{errors?.fullName || ''}</p>

                </div>
                {/* avatar */}
                <div className="mb-4">
                    <label htmlFor="avatar" className="block text-gray-700 text-xs">
                        Profile pic<span className="text-red-500">*</span>
                    </label>
                    <input type="file" id="avatar" onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
                        name="avatar" accept="image/*" className="shadow appearance-none border rounded w-full py-0.5 px-0.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                    <p className={`text-[#CB356B] text-xs w-[90%] min-h-4 break-normal `}>{errors?.avatar || ''}</p>
                </div>
                {/* coverimaghe */}
                <div className="mb-4">
                    <label htmlFor="coverimage" className="block text-gray-700 text-xs">
                        cover image
                    </label>
                    <input type="file" id="coverimage" onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
                        name="coverImage" accept="image/*" className="shadow appearance-none border rounded w-full py-0.5 px-0.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button
                    className=' w-[60%] rounded-2xl border bg-linear-to-r from-[#CB356B] to-[#93291E] 
                        text-center p-1 text-[#bbbbbb] ' disabled={isLoading}>

                    {
                        isLoading ? (
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-[#93291E]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        ) : "Sign up"
                    }
                </button>
                {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button> */}
                <p className='mt-2'>Already have an account? <Link href="/auth/login" className='text-blue-500'>Log In</Link></p>
            </form>
        </div>
    )
}

export default SignupForm
