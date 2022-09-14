import { Box } from "@chakra-ui/react";
import ForgotPassword from "modules/Password/ForgotPassword/ForgotPassword";
import Head from "next/head";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <Box>
      <Head>
        <title>Forgot Password - Know your Candidate</title>
      </Head>
      <ForgotPassword />
    </Box>
  );
}
