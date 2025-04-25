'use client'
import React, { useState } from 'react'
import { handleSignup } from '@/api/index';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { signUp } from '../../lib/features/users/userSlice'
import Link from 'next/link';

type FormData = {
    userName: string;
    email: string;
    password: string;
    fullName: string;
}


const SignupForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
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
        setIsLoading(true);

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

                // wait 2 seconds and redirect to home page
                // setTimeout(() => {
                //     router.push('/')
                // }, 1000)
                router.push('/')
            })
            .catch((err) => {
                console.error("Signup error:", err);
            })


    }

    return (
        isLoading ? <div className="flex justify-center items-center h-screen"><div className="loader">Loading...</div></div> : (
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            name="email" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input type="text" id="userName" value={formData.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                            name="userName" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            name="password" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="fullname" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                        <input type="text" id="fullName" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            name="fullName" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    {/* avatar */}
                    <div className="mb-4">
                        <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">Avatar</label>
                        <input type="file" id="avatar" onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
                            name="avatar" accept="image/*" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    {/* coverimaghe */}
                    <div className="mb-4">
                        <label htmlFor="coverimage" className="block text-gray-700 text-sm font-bold mb-2">Cover Image</label>
                        <input type="file" id="coverimage" onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
                            name="coverImage" accept="image/*" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
                    <p className='mt-4'>Already have an account? <Link href="/auth/login" className='text-blue-500'>Log In</Link></p>
                </form>
            </div>)
    )
}

export default SignupForm
