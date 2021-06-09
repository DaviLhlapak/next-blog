import Image from 'next/image'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { IPost } from '../src/entities/Post'
import { api } from '../src/services/api'
import { FaNewspaper } from 'react-icons/fa'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

interface HomeProps {
    posts: IPost[]
}

export default function HomePage({ posts }: HomeProps) {
    return (
        <>
            <Head>
                <title>Next Blog</title>
            </Head>
            <article className="h-[50rem] flex items-center justify-center">
                <header className="w-80 mr-40 flex">
                    <h1 className="text-4xl font-bold">The latest news from the world of technology</h1>
                </header>
                <div className="relative w-96 h-96 transform -translate-y-6">
                    <Image src="/technology.svg" layout="fill" />
                </div>
            </article>
            <section className="grid grid-cols-3 gap-4">
                <header className="col-span-3 mb-4 flex items-center justify-center">
                    <h2 className="text-3xl text-purple-400">Latest News</h2>
                </header>
                {posts?.map(post => (
                    <Link  key={post.id} href={{ pathname: '/post/[postId]', query: { postId: post.id } }}>
                        <article className="shadow rounded flex flex-wrap items-center border border-purple-200 cursor-pointer transition-colors duration-300 hover:bg-purple-100">
                            <div className="w-full h-32 relative rounded-t">
                                {post.thumb ? (<Image className="rounded-t" src={`http://localhost:3000/images/posts/${post.thumb}`} layout="fill" objectFit="cover" objectPosition="center center" />)
                                    : (<div className="bg-gray-400 w-full h-full" />)
                                }
                            </div>
                            <div className="w-1/12 pl-6 py-4">
                                <FaNewspaper className="text-2xl text-purple-600" />
                            </div>
                            <header className="w-11/12 flex flex-col pl-8 pr-6 py-4">
                                <h3 className="text-lg">{post.title}</h3>
                                <p className="text-sm text-gray-500">By: {post.author.name}</p>
                            </header>
                        </article>
                    </Link>
                ))}
            </section>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prisma = new PrismaClient()

    const posts = await prisma.post.findMany({
        include: {
            author: true,
            comments: true
        }
    })

    return {
        props: {
            posts: posts
        }
    }
}