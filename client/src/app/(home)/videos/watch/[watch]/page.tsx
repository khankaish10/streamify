'use client'
export const dynamic = 'force-dynamic'

import React, { useLayoutEffect, useEffect, useState } from 'react'
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createCommentApi, deleteCommentApi, handleGetAVideo } from "@/api/videoApi";
import { useParams } from 'next/navigation';
import IsSubscribedDetails from '@/app/components/IsSubscribedDetails';
import WatchVideoAnimation from '@/lib/ui-component/WatchVideoAnimation';
import Comment from '@/app/components/Comment'
import Link from 'next/link';
import { createComment } from '@/lib/features/commentSlice';
import formatDuration from '@/util/formatDuration';
import { User } from 'lucide-react';
import useAuthUser from '@/hooks/useAuthUse';

// interface VideoPlayerProps {
//   src: string;
//   autoPlay?: boolean;
//   controls?: boolean;
//   loop?: boolean;
//   muted?: boolean;
//   className?: string;
// }

function WatchVideo() {
  const [videoDetails, setVideoDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const videoId = useParams<any>();
  const user = useAppSelector((state: any) => state.user)
  const userId = useAuthUser();
  const dispatch = useAppDispatch()
  const [commentInput, setCommentInput] = useState("")
  // const comments = useAppSelector(state => state.comment)
  const [comments, setComments] = useState<any>([])

  console.log("userid: ", userId)
  useEffect(() => {
    handleGetAVideo(videoId?.watch, userId)
      .then((res) => {
        setVideoDetails(res?.data[0])
        setComments(res?.data[0]?.comments)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  console.log("video details: ", videoDetails)
  const handleCommentCreate = () => {
    console.log("comment: ",)

    createCommentApi({ comment: commentInput, videoId: videoDetails?._id })
      .then(res => {
        setComments([{
          comment: commentInput,
          commentowner: {
            avatar: user?.avatar,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
            userName: user?.userName,
            _id: user?._id
          },
          createdAt: res?.data?.createdAt,
          updatedAt: res?.data?.updatedAt,
          video: res?.data?.video,
          _id: res?.data?._id

        }, ...comments])
        setCommentInput("")
      })
  }

  const handleDeleteComment = (id: string) => {
    deleteCommentApi({ id, videoId: videoDetails?._id })
      .then(res => {
        const commentAfterDeletion = comments.filter((com: any) => com._id != id)
        setComments(commentAfterDeletion)
      })
  }


  return (
    <div className="w-full  p-1 ml-0 mt-12 
     sm:pl-[50px] lg:pl-[200px] lg:[w-90vw] xl:max-w-[1600px]">
      {
        isLoading ? <WatchVideoAnimation /> : (
          <div className='lg:w-[70%] h-full'>
            <div className='w-full max-h-[400px] h-[400px] overflow-hidden bg-black flex justify-center items-center overflow-hidden'>
              <video
                src={videoDetails?.videoFile}
                autoPlay={false}
                controls={true}
                // height={300}
                // width={600}
                poster={videoDetails?.thumbnail}
                className='z-5 object-contain h-full w-full'
                loop={false}
                muted={false}
              />
            </div>
            <h1 className='my-2 font-bold'>{videoDetails?.title}</h1>

            <div className='w-full pb-20 sm:pb-0 flex flex-col '>
              {/* ---------------------------------------------------------------------------------------------- */}
              <div className='w-full flex items-center flex-wrap mb-5 gap-2
                p-1'>
                {videoDetails && (
                  <IsSubscribedDetails
                    avatar={videoDetails?.owner?.avatar || ""}
                    userName={videoDetails?.owner?.userName || ""}
                    subsCount={videoDetails?.subscriberCount || 0}
                    ownerId={videoDetails?.owner?._id || ""}
                    isSubsd={videoDetails?.isSubscribed}
                    likeCount={videoDetails?.likes || []}
                  />
                )}

              </div>
              {/* ------------------------------------------------------------------------=------------------ */}

              <div className='bg-gray-200 w-full text-xs rounded-lg p-2'>
                {videoDetails?.description}
              </div>

              {/* ------------------------------------------------------------------------------------------ */}
              <div className='flex flex-col'>
                <h1 className='my-2 font-bold'>{`${comments?.length} comments`}</h1>


                <div className='flex gap-2 '>
                  <div className='h-10 flex justify-center items-center w-10 max-w-10 overflow-hidden rounded-full'>
                    {
                      user?._id !== "" ? (
                        <Image
                          src={user?.avatar}
                          height={50}
                          width={50}
                          alt='profile pic'
                          className='h-full w-full rounded-full object-cover'
                        />
                      ) : (
                        <Link
                          href={"/auth/login"}
                          className="flex justify-center items-center p-1 
                            cursor-pointer rounded-[50px]"
                        >
                          <User size={24} />
                        </Link>
                      )
                    }
                  </div>


                  <div className='w-full mb-5'>

                    <textarea
                      id='text'
                      disabled={user?._id !== "" ? false : true}
                      value={user?._id !== "" ? commentInput : "Login to add comment"}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className='p-2 outline-none w-full border-b-1 no scroll'
                      placeholder='Add a comment'
                    />
                    <div className=' flex justify-self-end hover:bg-gray-100 rounded-3xl'>
                      <button
                        disabled={user?._id !== "" ? false : true}
                        onClick={handleCommentCreate}
                        className={`rounded-3xl border p-1 ${user?._id !== "" && "cursor-pointer"}`}
                      >Comment</button>
                    </div>
                  </div>
                </div>
                {/* ----------------------------------------------------------------- */}

                <div className='comment-container flex flex-col gap-2 '>
                  {
                    comments?.map((comment: any) => (
                      <Comment
                        key={comment._id}
                        owner={comment?.commentowner?._id}
                        id={comment?._id}
                        videoId={videoDetails?._id}
                        avatar={comment?.commentowner?.avatar}
                        userName={comment?.commentowner?.userName}
                        createdAt={comment?.createdAt}
                        comment={comment?.comment}
                        onDeleteComment={handleDeleteComment}
                      />
                    ))
                  }
                </div>


              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default WatchVideo;