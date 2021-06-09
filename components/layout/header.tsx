import Link from 'next/link'

import { FaNewspaper } from 'react-icons/fa'

export default function HeaderComponent() {
    return (
        <header className="w-full max-w-7xl h-20 mx-auto flex items-center justify-between">
            <Link href="/" passHref={true}>
                <a className="font-bold flex items-center text-xl">
                    <FaNewspaper className="mr-4 text-purple-600 text-2xl" /> Next Blog 
                </a>
            </Link>
            <nav>
                <ul className="flex items-center space-x-8">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/post">Create Post</Link>
                    </li>
                    <li>
                        <Link href="/">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}