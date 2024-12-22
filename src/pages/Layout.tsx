import Header from '@/components/Header';
import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';
import styles from '@/styles/Layout.module.scss';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { store } from '../servises/store';

const AguDisplay = localFont({
  src: '../fonts/AguDisplay-Regular.ttf',
  variable: '--font-agu-display'
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>ToDo List</title>
        <meta name="ToDo List" content="Приложение для управления вашими задачами" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <div
          className={`${styles.page} ${geistSans.variable} ${geistMono.variable} ${AguDisplay.variable}`}
        >
          <Header />
          <main className={styles.main}>{children}</main>
        </div>
        {/* <Footer /> */}
      </Provider>
    </>
  );
}
