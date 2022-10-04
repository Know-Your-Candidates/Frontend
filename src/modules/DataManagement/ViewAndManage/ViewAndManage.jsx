import {
  Box,
  Divider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import React from "react";
import ImportCSV from "./components/ImportCSV";
import ManageCSV from "./components/ManageCSV";
import useViewAndManageHook from "./useViewAndManageHook";

export default function DataManagement() {
  const data = useViewAndManageHook();

  return (
    <AdminLayout>
      <Box pt={[8, 8, 16]} pl={["6%", "6%", 16]} pr={["6%", "6%", 12]}>
        <Heading fontSize={32}>Data Management</Heading>

        <Divider mt={4} mb={12} />

        <Tabs variant="enclosed">
          <TabList>
            <Tab
              roundedTop={8}
              _selected={{ bg: "green.100", color: "primary.500" }}
            >
              Import CSV
            </Tab>
            <Tab
              roundedTop={8}
              _selected={{ bg: "green.100", color: "primary.500" }}
            >
              Manage CSV
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ImportCSV {...data} />
            </TabPanel>
            <TabPanel>
              <ManageCSV {...data} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </AdminLayout>
  );
}
