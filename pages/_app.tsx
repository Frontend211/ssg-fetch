import '@/styles/globals.sass';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import pages from './pages.json';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <header><Nav /></header>
    <main>
      <Component {...pageProps} />
    </main>
    <Toaster position="top-right" />
  </>;
}


function Nav() {
  const router = useRouter();
  return <nav>
    <ul>
      {pages.map(({ name, src }) => 
        <li key={name} className={router.pathname === src ? 'active' : ''}><Link href={src}>{name}</Link></li>)}
    </ul>
  </nav>;

}