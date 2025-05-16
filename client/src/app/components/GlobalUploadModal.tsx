'use client'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeModal } from '@/lib/features/globalModalslice';
import Image from 'next/image';
import { getCloudinarySignatureApi, handleUploadVideoApi } from '@/api/videoApi';
import { X } from 'lucide-react';
import { Errors } from '../types/errors';
import { allVideos, updateVideoListAfterUpload } from '@/lib/features/video/videoSlice';
import uploadToCloudinary from '@/util/uploadToCloudinary';

const GlobalModal = () => {
    const { isOpen } = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch();
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const thumbnailRef = useRef<HTMLInputElement | null>(null);
    const [isUploadProcessing, setIsUploadProcessing] = useState(false)
    const [errors, setErrors] = useState<Errors>({})
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const handleVideoChange = (e: any) => {
        if (e.target.files?.[0]) {
            setSelectedVideo(e.target.files[0])
            const videoElement = document.createElement("video");
            videoElement.preload = "metadata";
            videoElement.onloadedmetadata = () => {
                window.URL.revokeObjectURL(videoElement.src); // Free memory
                const duration = videoElement.duration; // Get duration in seconds
                setVideoDuration(duration); // Save duration in state
            };
            videoElement.src = URL.createObjectURL(e.target.files?.[0]);
        }
    }

    const validateFields = (): boolean => {
        const newErrors: Errors = {}
        if (!title.trim()) newErrors.title = 'Title is required.'
        if (!description.trim()) newErrors.description = 'Description is required.'
        if (!selectedVideo) newErrors.selectedVideo = 'Video is required.'
        if (!selectedThumbnail) newErrors.thumbnail = 'Thumbnail is required.'
        setErrors(newErrors)
        return Object.keys(newErrors).length == 0
    }

    const resetFormData = () => {
        setTitle("")
        setDescription("")
        setTags("")
        setVideoDuration(null)
        setSelectedThumbnail(null)
        setSelectedVideo(null)
        setErrors({})
    }

    const handleSubmit = () => {
        if (!validateFields()) return;

        let videoUrl;
        let thumbnailUrl


        setIsUploadProcessing(true)
        getCloudinarySignatureApi()
            .then(async (res: any) => {
                videoUrl = await uploadToCloudinary(selectedVideo, 'video', 'video', res?.data?.data.videoSign, setUploadProgress)
                thumbnailUrl = await uploadToCloudinary(selectedThumbnail, 'thumbnail', 'image', res?.data?.data.thumbnailSign, setUploadProgress)

                const form = {
                    videoFile: videoUrl,
                    thumbnail: thumbnailUrl,
                    tags,
                    duration: videoDuration,
                    description,
                    title
                }

                handleUploadVideoApi(form)
                    .then((response: any) => {
                        setIsUploadProcessing(true)
                        resetFormData();
                        dispatch(closeModal())
                        dispatch(updateVideoListAfterUpload(response?.data?.[0]))
                    })
                    .catch(err => {
                        console.log(err)
                        setIsUploadProcessing(false)
                    })
                    .finally(() => setIsUploadProcessing(false))
            })
            .catch(err => console.log("cloudinary video upload: ", err))




        // const form = new FormData();
        // // form.append('videoFile', selectedVideo!);
        // form.append('videoFile', videoUrl!)
        // form.append('duration', videoDuration !== null ? videoDuration.toString() : '');
        // if (title !== null) form.append("title", title);
        // if (description !== null) form.append("description", description);
        // if (tags !== null) form.append("tags", tags);
        // form.append('thumbnail', thumbnailUrl!)
        // // form.append('thumbnail', selectedThumbnail!); 


    }

    return (
        isOpen && (
            <div className='fixed h-screen w-full 
                            top-0 left-0 z-100 
                            flex justify-center items-center
                            '
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className='h-130 w-220 bg-white border border-gray-500 
                                 rounded-lg flex flex-col'>
                    <div className='border-b-1 border-gray-300
                                    p-2 flex justify-between'>
                        <p>Upload Video</p>
                        <button className='cursor-pointer outline-none'
                            onClick={() => {
                                dispatch(closeModal())
                                setSelectedThumbnail(null)
                                setSelectedVideo(null)
                            }}>
                            X
                        </button>
                    </div>

                    <div className='flex h-full'>
                        <div className='flex flex-col items-center justify-center
                                        w-[50%]'>
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
                                        selectedVideo ? "Remove File" : "Upload"
                                    }
                                </label>
                                <input type="file" name="upload" id="upload"
                                    className='hidden' ref={fileRef}
                                    accept='video/*' onChange={(e) => handleVideoChange(e)} />
                            </div>

                            {
                                selectedVideo && (
                                    <div className='flex gap-2 justify-center items-center'>
                                        <div className='mr-5'>{selectedVideo.name}</div>
                                        <button className='cursor-pointer outline-none bg-[#85193C]
                                    p-2 text-white'
                                            onClick={() => {
                                                setSelectedVideo(null)
                                                if (fileRef.current) {
                                                    (fileRef.current as HTMLInputElement).value = '';
                                                }
                                            }}>
                                            X
                                        </button>
                                    </div>
                                )
                            }

                            <p className={`text-[#CB356B] mt-1 text-xs w-[90%] min-h-4 break-normal} `}>{errors?.selectedVideo}</p>
                        </div>

                        <div className='w-full'>
                            <div className="center-container flex flex-col
                                            justify-center items-center
                                            h-full">

                                <div className="mb-4 w-[70%]">
                                    <input type="text" id="title"
                                        name="title" required className="shadow 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none "
                                        placeholder='Title'
                                        value={title || ""}
                                        onChange={(e) => setTitle(e.target.value)} />
                                    <p className={`text-[#CB356B] text-xs w-[90%] min-h-4 break-normal} `}>{errors?.title}</p>
                                </div>
                                <div className="mb-4 w-[70%]">
                                    <input type="text" id="tags"
                                        name="tags" required className="shadow 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none "
                                        placeholder='tags'
                                        value={tags || ""}
                                        onChange={(e) => setTags(e.target.value)} />

                                </div>
                                <div className="mb-2 w-[70%]">
                                    <textarea id="description"
                                        name="description" required className="shadow 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none resize-none"
                                        rows={5}
                                        placeholder='description'
                                        value={description || ""}
                                        onChange={(e) => setDescription(e.target.value)} />
                                    <p className={`text-[#CB356B] text-xs w-[90%] min-h-4 break-normal} `}>{errors?.description}</p>
                                </div>

                                <div className="mb-4 flex flex-col mr-3 flex justify-center items-center ">
                                    <button className='cursor-pointer outline-none 
                                                 p-2 shadow'
                                        onClick={() => thumbnailRef.current?.click()}
                                    >
                                        {selectedThumbnail ? selectedThumbnail.name : "Upload Thumbnail"}
                                    </button>
                                    <input type="file" id="thumbnail" className='hidden'
                                        placeholder='Thumbnail' required
                                        ref={thumbnailRef}
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setSelectedThumbnail(e.target.files?.[0])
                                            }
                                        }} />
                                    {
                                        selectedThumbnail && (
                                            <div className='cursor-pointer' onClick={() => {
                                                setSelectedThumbnail(null)
                                                if (thumbnailRef.current) {
                                                    (thumbnailRef.current as HTMLInputElement).value = '';
                                                }
                                            }}><X /></div>
                                        )
                                    }
                                    <p className={`text-[#CB356B] mt-1 text-xs w-[90%] min-h-4 break-normal} `}>{errors?.thumbnail}</p>
                                </div>

                                <button className='bg-indigo-500 text-white rounded-xl 
                                                    p-2 flex'
                                    onClick={() => handleSubmit()}
                                    disabled={isUploadProcessing}
                                >
                                    {
                                        isUploadProcessing ? (
                                            <>
                                                {/* <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24">
                                                    <path
                                                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path
                                                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-gray-900">
                                                    </path>
                                                </svg> */}
                                                <p className='ml-2'>{uploadProgress < 100 ? `uploading ${uploadProgress}` : 'Please wait...'}</p></>
                                        ) : (
                                            <p>Upload</p>
                                        )
                                    }

                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default GlobalModal
