import { Box } from "@chakra-ui/react";
import DataManagement from "modules/DataManagement/ViewAndManage/ViewAndManage";
import Head from "next/head";
import React from "react";

export default function DataManagementPage() {
  return (
    <Box>
      <Head>
        <title>Data Management - Know your Candidate</title>
      </Head>
      <DataManagement />
    </Box>
  );
}
