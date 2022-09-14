import { ChakraProvider } from "@chakra-ui/react";
import { PersistDarkMode } from "components/PersistDarkMode";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "redux/store";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
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
