import App from 'next/app';
import Head from 'next/head';
import '../styles/app.css';

export default function MyApp({ Component, pageProps }) {
    
    const siteTitle = process.env.siteTitle
    const props = {
        ...pageProps
    }

    return (
        <>
        <Head>
            <title>{ siteTitle }</title>
            <meta name="viewport" content="maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=0" />
        </Head>
        <Component { ...props } />
        </>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    return {
        ...appProps
    }
}