import React from "react";
import { Box } from "@chakra-ui/react";
import AccountManagement from "modules/AccountManagement/AccountManagement";
import Head from "next/head";
import { withAuth } from "utils/withAuth";

function AccountManagementPage() {
  return (
    <Box>
      <Head>
        <title>Account Management - Know your Candidate</title>
      </Head>
      <AccountManagement />
    </Box>
  );
}

export default withAuth(AccountManagementPage);
