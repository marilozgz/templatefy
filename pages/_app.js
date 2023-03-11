import '@/styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
