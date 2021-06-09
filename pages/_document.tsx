import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
                </Head>
                <body className="font-sans">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}