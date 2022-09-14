import { Box } from "@chakra-ui/react";
import Login from "modules/Login/Login";
import Head from "next/head";
import React from "react";

export default function LoginPage({ previousRoute }) {
  return (
    <Box>
      <Head>
        <title>Admin Login - Know your Candidate</title>
      </Head>
      <Login previousRoute={previousRoute} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  return { props: { previousRoute: context.req.headers.referer || null } };
}
