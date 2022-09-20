import React from "react";
import { Box } from "@chakra-ui/react";
import AccountManagement from "modules/AccountManagement/AccountManagement";
import Head from "next/head";

export default function AccountManagementPage() {
  return (
    <Box>
      <Head>
        <title>Account Management - Know your Candidate</title>
      </Head>
      <AccountManagement />
    </Box>
  );
}
