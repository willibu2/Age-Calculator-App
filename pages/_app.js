import '@/styles/globals.css';
import AgeContextProvider from '@/store/context-provider';

export default function App({ Component, pageProps }) {
  return (
    <AgeContextProvider>
      <Component {...pageProps} />
    </AgeContextProvider>
  );
}
