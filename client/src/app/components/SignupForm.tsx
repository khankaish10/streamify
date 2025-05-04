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
            console.log("validation: ", validatedFields.error.flatten().fieldErrors)
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

            handleSignup(data)
                .then((res) => {
                    dispatch(signUp(res.data))
                    router.push('/')
                })
                .catch((err) => {
                    console.error("Signup error:", err);
                })

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
                        text-center p-1 text-[#bbbbbb]'>
                    Sign up
                </button>
                {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button> */}
                <p className='mt-2'>Already have an account? <Link href="/auth/login" className='text-blue-500'>Log In</Link></p>
            </form>
        </div>
    )
}

export default SignupForm
