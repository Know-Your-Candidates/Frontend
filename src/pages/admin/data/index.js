import { Box } from "@chakra-ui/react";
import DataAnalytics from "modules/DataManagement/DataAnalytics/DataAnalytics";
import Head from "next/head";
import React from "react";

export default function DataAnalyticsPage() {
  return (
    <Box>
      <Head>
        <title>Data Analytics - Know your Candidate</title>
      </Head>
      <DataAnalytics />
    </Box>
  );
}
