import { ChakraProvider } from "@chakra-ui/react";
import { PersistDarkMode } from "components/PersistDarkMode";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "redux/store";
import theme from "../theme";
import { useRouter } from "next/router";
import * as ga from "../utils/ga";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div>
      <Head>
        <title>Know your Candidate</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <PersistDarkMode />
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </div>
  );
}

export default MyApp;
