import Head from 'next/head'
import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import { IPost } from '../../src/entities/Post'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'
import { FaSpinner } from 'react-icons/fa'

interface PostProps{
    post: IPost;
}

export default function PostPage({post}: PostProps) {
    const router = useRouter();

    if(router.isFallback){
        return <p className="mx-auto mt-10 h-60 flex items-center text-lg text-gray-500"><FaSpinner className="mr-3 animate-spin duration-1000"/> Loading Data...</p>
    }

    return (
        <>
            <Head>
                <title>Create Post | Next Blog</title>
            </Head>
            <article className="w-full max-w-4xl mx-auto flex flex-col items-center mt-10">
                <div className="relative w-full h-52">
                    <Image src={`http://localhost:3000/images/posts/${post.thumb}`} layout="fill" objectFit="cover" objectPosition="center center"/>
                </div>
                <header className="w-full my-8 flex flex-col items-center justify-center">
                    <h1 className="text-3xl">{post.title}</h1>
                    {post.subtitle && <h2 className="text-base text-gray-600">{post.subtitle}</h2>}
                    <p className="text-sm text-gray-400">By: {post.author.name}</p>
                </header>
                <p className="text-justify max-w-2xl">{post.content}</p>
            </article>
            <section className="w-full max-w-4xl mx-auto flex flex-col mt-7">
                {post.comments.map(comment => {
                    return <article>
                        <header>
                            {comment.user.name}
                        </header>
                        <p>{comment.content}</p>
                    </article>
                })}
            </section>
            
        </>
    )
}
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { postId: '1' } }
        ],
        fallback: true
    };
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    const prisma = new PrismaClient()

    const post = await prisma.post.findUnique({
        where: {
            id: Number(params.postId)
        },
        include: {
            author: true,
            comments: {
                include: {
                    user: true
                }
            }
        }
    })

    if(post){
        return {
            props: {
                post
            }
        }
    }else{
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}
  
