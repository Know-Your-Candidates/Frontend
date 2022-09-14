import { Box } from "@chakra-ui/react";
import EditCSV from "modules/DataManagement/EditCSV/EditCSV";
import Head from "next/head";
import React from "react";

export default function EditCSVPage() {
  return (
    <Box>
      <Head>
        <title>Edit CSV - Know your Candidate</title>
      </Head>
      <EditCSV />
    </Box>
  );
}
