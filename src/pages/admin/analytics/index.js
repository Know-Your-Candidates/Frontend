import React from "react";
import { Box } from "@chakra-ui/react";
import DataAnalytics from "modules/DataAnalytics/DataAnalytics";
import Head from "next/head";

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
