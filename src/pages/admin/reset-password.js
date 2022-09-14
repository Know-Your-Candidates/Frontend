import { Box } from "@chakra-ui/react";
import ResetPassword from "modules/Password/ResetPassword/ResetPassword";
import Head from "next/head";
import React from "react";

export default function ResetPasswordPage() {
  return (
    <Box>
      <Head>
        <title>Set new Password - Know your Candidate</title>
      </Head>
      <ResetPassword />
    </Box>
  );
}
