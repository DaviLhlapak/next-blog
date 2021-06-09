import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "GET"){
        const posts = await prisma.post.findMany({
            include:{
                author: true,
                comments: true
            }
        })

        res.json({items: posts})
    } else if (req.method === "POST"){
        const { title, subtitle, content, authorId, thumb } = req.body

        if(title === "" || content === ""){
            res.status(400).json({error: 'Content cannot be empty'})
        }else{
            const post = await prisma.post.create({
                data: {
                    title: title,
                    subtitle: subtitle,
                    content: content,
                    authorId: authorId,
                    thumb: thumb
                }
            })
    
            res.json(post)
        }
    } else if (req.method === "PUT"){
        const { title, subtitle, content, authorId, thumb } = req.body
        const { postId } = req.headers

        if(title === "" || content === ""){
            res.status(400).json({error: 'Content cannot be empty'})
        }else{
            const post = await prisma.post.update({
                data: {
                    title: title,
                    subtitle: subtitle,
                    content: content,
                    authorId: authorId,
                    thumb: thumb
                },
                where: {
                    id: Number(postId)
                }
            })
    
            res.status(201).json(post)
        }
    }else if (req.method === "DELETE"){
        const { postId } = req.headers

        const post = await prisma.post.delete({
            where: {
                id: Number(postId)
            }
        })

        res.json(post)
    }
    
    res.end()
}