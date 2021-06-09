import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Davi Lhlapak',
        }
    })

    const post = await prisma.post.create({
        data: {
            title: 'How to work with Next.Js',
            content: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sed volutpat ligula. Etiam tincidunt vulputate sem non lacinia. ',
            authorId: user.id,
            thumb: 'conhecendo-o-next-js.png'
        },
    })

    await prisma.comment.create({
        data: {
            content: 'I loved the post, great content!',
            postId: post.id,
            userId: user.id
        }
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })