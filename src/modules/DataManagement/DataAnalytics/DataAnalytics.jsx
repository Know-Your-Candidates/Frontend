import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import React from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import ImportCSV from "./components/ImportCSV";
import ManageCSV from "./components/ManageCSV";

export default function DataAnalytics() {
  return (
    <AdminLayout>
      <Box pt={16} pl={16} pr={12}>
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
              <ImportCSV />
            </TabPanel>
            <TabPanel>
              <ManageCSV />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </AdminLayout>
  );
}
