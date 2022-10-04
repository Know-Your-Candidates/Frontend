import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
  VStack,
} from "@chakra-ui/react";
import check from "check-types";
import { IoEyeOutline, IoOptionsOutline } from "react-icons/io5";
import AdminLayout from "components/AdminLayout/AdminLayout";
import React from "react";
import { BarLoader } from "react-spinners";
import theme from "theme";
import AnalyticsCard from "./components/AnalyticsCard";
import KeywordFilterTable from "./components/KeywordFilterTable";
import useDataAnalyticsHook from "./useDataAnalyticsHook";

export default function DataAnalytics() {
  const { analytics, periodOptions, period, setPeriod, cardPeriodText } =
    useDataAnalyticsHook();

  return (
    <AdminLayout>
      <Box pt={[8, 8, 16]} pl={["6%", "6%", 16]} pr={["6%", "6%", 12]}>
        <Heading fontSize={[28, 32]}>Data Analytics</Heading>

        <Divider mt={4} mb={12} />

        <HStack mb={4} justify="flex-end">
          <Select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            w="fit-content"
            bg="white"
          >
            {periodOptions.map((period) => (
              <option key={period.value} value={period.value}>
                {period.name}
              </option>
            ))}
          </Select>
        </HStack>

        {!analytics && (
          <VStack pt={7} spacing={3}>
            <BarLoader
              height={6}
              width={250}
              color={theme.colors.primary["500"]}
              radius={8}
            />
            <Text color="gray.500">Loading analytics...</Text>
          </VStack>
        )}

        {analytics && (
          <AnalyticsCard
            analytics={analytics}
            cardPeriodText={cardPeriodText}
          />
        )}

        {analytics && <KeywordFilterTable analytics={analytics} />}
      </Box>
    </AdminLayout>
  );
}
