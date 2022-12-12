import React from "react";
import { Box } from "@chakra-ui/react";
import Search from "modules/Search/Search";
import Footer from "components/Footer/Footer";

export default function SearchPage({ urlQuery }) {
  return (
    <Box>
      <Search urlQuery={urlQuery} />
      <Footer />
    </Box>
  );
}

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      urlQuery: query?.query || null,
    },
  };
};
