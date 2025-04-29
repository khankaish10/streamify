'use client'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { openModal, closeModal } from '@/lib/features/globalModalslice';
import Image from 'next/image';
import { handleUploadVideoApi } from '@/api';

const GlobalModal = () => {
    const { isOpen } = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch();
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleUploadVideo = async () => {
        if (fileRef.current && fileRef.current.files && fileRef.current.files[0]) {
            const videoFile = fileRef.current.files[0];
            setSelectedFile(videoFile)
            const formData = new FormData();
            formData.append('videoFile', videoFile);

            handleUploadVideoApi(formData);
        }
    }

    return (
        isOpen && (
            <div className='fixed h-screen w-full 
                            top-0 left-0 z-100 
                            flex justify-center items-center
                            '
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className='h-100 w-200 bg-white border border-gray-500 
                                 rounded-lg flex flex-col'>
                    <div className='border-b-1 border-gray-300
                                    p-2 flex justify-between'>
                        <p>Upload Video</p>
                        <button className='cursor-pointer outline-none'
                            onClick={() => dispatch(closeModal())}>
                            X
                        </button>
                    </div>

                    <div className='flex flex-col flex-1 items-center justify-center'>
                        <div className='overflow-hidden h-30 w-30
                                        rounded-full flex bg-gray-100
                                        justify-center items-center
                                        cursor-pointer'
                            onClick={() => fileRef.current?.click()}>
                            <Image
                                src={"./upload-video.svg"}
                                height={20}
                                width={10}
                                alt="upload icon"
                                className="h-full w-full cover p-2"
                            />
                        </div>
                        <div className='mt-5 p-2 rounded-3xl 
                                        bg-[#27548A] text-white '>
                            <label htmlFor="upload" className='cursor-pointer'>
                                {
                                    selectedFile ? "Remove File": "Upload"
                                }
                            </label>
                            <input type="file" name="upload" id="upload"
                                className='hidden' ref={fileRef}
                                accept='video/*' onChange={() => handleUploadVideo()} />
                        </div>

                        {
                            selectedFile && (
                                <div className='flex gap-2 justify-center items-center'>
                                    <div className='mr-5'>{selectedFile.name}</div>
                                    <button className='cursor-pointer outline-none bg-[#85193C]
                                    p-2 text-white'
                                        onClick={() => {
                                            setSelectedFile(null)
                                            if (fileRef.current) {
                                                (fileRef.current as HTMLInputElement).value = '';
                                            }
                                        }}>
                                        X
                                    </button>
                                </div>
                            )
                        }



                    </div>

                </div>
                {/* <div className='text-white' onClick={() => dispatch(closeModal())}>close</div> */}
            </div>
        )
    )
}

export default GlobalModal
