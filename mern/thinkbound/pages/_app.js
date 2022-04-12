import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client";
import CursorProvider from '../providers/CursorProvider';
import LinkPropsProvider from '../providers/LinkPropsProvider';
import MobileNavButtonProvider from '../providers/MobileNavButtonProvider';
import TransitionProvider from '../providers/TransitionProvider';
import '../styles/fonts/stylesheet.css';
import '../styles/globals.css';
import '../styles/sass/style.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CursorProvider>
        <TransitionProvider>
          <LinkPropsProvider>
            <MobileNavButtonProvider>
              <Component {...pageProps} />
            </MobileNavButtonProvider>
          </LinkPropsProvider>
        </TransitionProvider>
      </CursorProvider>
    </ApolloProvider>
  )
}

export default MyApp
