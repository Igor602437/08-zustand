import Link from 'next/link';
import css from './notFound.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Sorry, the page you are looking for does not exist',

  openGraph: {
    title: 'Page not found',
    description: 'Sorry, the page you are looking for does not exist',
    url: 'https://08-zustand-amber-six.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Sorry, the page you are looking for does not exist',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className={css.notFound}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
