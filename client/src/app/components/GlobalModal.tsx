'use client'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeModal } from '@/lib/features/globalModalslice';
import Image from 'next/image';
import { handleUploadVideoApi } from '@/api';
import { X } from 'lucide-react';


const GlobalModal = () => {
    const { isOpen } = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch();
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [tags, setTags] = useState<string | null>(null);
    const thumbnailRef = useRef<HTMLInputElement | null>(null);
    const [formData, setFormData] = useState<FormData | null>(null)

    const handleUpload = async () => {
        if (fileRef.current && fileRef.current.files && fileRef.current.files[0] ||
            thumbnailRef.current && thumbnailRef.current.files && thumbnailRef.current.files[0]
        ) {
            const videoFile = fileRef.current?.files?.[0];
            const thumbnailFile = thumbnailRef?.current?.files?.[0]
            const form = new FormData();

            if (videoFile) {

                const videoElement = document.createElement("video");
                videoElement.preload = "metadata";

                videoElement.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(videoElement.src); // Free memory
                    const duration = videoElement.duration; // Get duration in seconds
                    setVideoDuration(duration); // Save duration in state
                };
                videoElement.src = URL.createObjectURL(videoFile);

                setSelectedVideo(videoFile);
                form.append('videoFile', videoFile);
                form.append('duration', videoDuration !== null ? videoDuration.toString() : '');
            }

            if (thumbnailFile) {
                setSelectedThumbnail(thumbnailFile)
                form.append('thumbnail', thumbnailFile);
            }

            console.log("title: ", title)
            if (title !== null) form.append("title", "title");
            if (description !== null) form.append("description", "description");
            if (tags !== null) form.append("tags", "tags");



            setFormData(form)


        }
    }


    const handleSubmit = () => {
        if (formData) {
            
            console.log("Files:", formData); // Logs uploaded files
            console.log("Title:", title); // Logs title
            console.log("Description:", description); // Logs description
            console.log("Tags:", tags); // Logs tags

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
                            onClick={() => {
                                dispatch(closeModal())
                                setSelectedThumbnail(null)
                                setSelectedVideo(null)
                            }}>
                            X
                        </button>
                    </div>

                    <div className='flex border border-red-500 h-full'>
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
                                    accept='video/*' onChange={() => handleUpload()} />
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



                        </div>

                        <div className='border border-red-500 w-full'>
                            <div className="center-container flex flex-col
                                            justify-center items-center
                                            border border-red-500 h-full">

                                <div className="mb-4 w-[70%]">
                                    <input type="text" id="title"
                                        name="title" required className="shadow 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none "
                                        placeholder='Title'
                                        value={title || ""}
                                        onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-4 w-[70%]">
                                    <input type="text" id="tags"
                                        name="tags" required className="shadow 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none "
                                        placeholder='tags'
                                        value={tags || ""}
                                        onChange={(e) => setTags(e.target.value)}  />
                                </div>
                                <div className="mb-4 border w-[70%]">
                                    <textarea id="description"
                                        name="description" required className="shadow 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none resize-none"
                                        rows={5}
                                        placeholder='description' 
                                        value={description || ""}
                                        onChange={(e) => setDescription(e.target.value)} />
                                </div>

                                <div className="mb-4 flex mr-3 flex justify-center items-center">
                                    <button className='cursor-pointer outline-none 
                                                bg-[#85193C] p-2 text-white'
                                        onClick={() => thumbnailRef.current?.click()}
                                    >
                                        {selectedThumbnail ? selectedThumbnail.name : "Upload Thumbnail"}
                                    </button>
                                    <input type="file" id="thumbnail" className='hidden'
                                        placeholder='Thumbnail' required
                                        ref={thumbnailRef}
                                        onChange={() => handleUpload()} />
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
                                </div>

                                <div className='bg-black text-white rounded-xl p-2 cursor-pointer'
                                    onClick={() => handleSubmit()}>Finish</div>

                            </div>
                        </div>
                    </div>


                </div>
                {/* <div className='text-white' onClick={() => dispatch(closeModal())}>close</div> */}
            </div>
        )
    )
}

export default GlobalModal
