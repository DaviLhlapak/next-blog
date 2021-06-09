import type { AppProps } from 'next/app'
import BaseComponent from '../components/layout/base'

import '../styles/globals.css'

export default function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <BaseComponent>
            <Component {...pageProps} />
        </BaseComponent>
    )
}