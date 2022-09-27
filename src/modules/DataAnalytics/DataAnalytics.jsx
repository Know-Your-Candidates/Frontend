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
import AdminLayout from "components/AdminLayout/AdminLayout";
import React from "react";
import { IoEyeOutline, IoOptionsOutline } from "react-icons/io5";
import { BarLoader } from "react-spinners";
import theme from "theme";
import useDataAnalyticsHook from "./useDataAnalyticsHook";

export default function DataAnalytics() {
  const { analytics, range, setRange } = useDataAnalyticsHook();

  if (!analytics) {
    return (
      <VStack spacing={3}>
        <BarLoader
          height={6}
          width={250}
          color={theme.colors.primary["500"]}
          radius={8}
        />
        <Text color="gray.500">Loading analytics...</Text>
      </VStack>
    );
  }

  return (
    <AdminLayout>
      <Box pt={[8, 8, 16]} pl={["6%", "6%", 16]} pr={["6%", "6%", 12]}>
        <Heading fontSize={32}>Data Analytics</Heading>

        <Divider mt={4} mb={12} />

        <HStack mb={4} justify="flex-end">
          <Select
            value={range}
            onChange={(event) => setRange(event.target.value)}
            w="fit-content"
            bg="white"
          >
            <option value="day">Per day</option>
            <option value="week">Per week</option>
            <option value="month">Per month</option>
            <option value="year">Per year</option>
            <option value="lifetime">Lifetime</option>
          </Select>
        </HStack>

        <Stack spacing={6} direction={["column", "column", "row", "row"]}>
          {[0, 1, 2].map((index) => (
            <Stack
              key={index}
              w="full"
              maxW={["full", "full", 347]}
              rounded={16}
              bg="white"
              borderBottom="5px solid #E4E4E4"
              shadow="0px 4px 35px rgba(0, 0, 0, 0.05)"
              bgImage="/illustrations/analytics-card-bg.svg"
              p={4}
              h={164}
              justify="space-between"
              bgRepeat="no-repeat"
              bgPos="center right"
            >
              <HStack justify="space-between" align="flex-start">
                <Stack>
                  <Heading>205</Heading>
                  <Text>Number of site visitors</Text>
                </Stack>

                <Center
                  rounded="full"
                  boxSize={59}
                  border="5px solid #E8ECFF"
                  shadow="inset 0px 4px 2px rgba(0, 0, 0, 0.1)"
                >
                  <Text fontWeight="bold" fontSize="xs">
                    +34%
                  </Text>
                </Center>
              </HStack>
              <Text fontSize={12} color="gray.400">
                Analytics for today
              </Text>
            </Stack>
          ))}
        </Stack>

        <Tabs my={12} variant="enclosed">
          <TabList>
            <Tab roundedTop={8} _selected={{ bg: "green.600", color: "white" }}>
              Top 10 keyword
            </Tab>
            <Tab roundedTop={8} _selected={{ bg: "green.600", color: "white" }}>
              Top 10 filter combo
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th bg="blackAlpha.200" roundedLeft={8}>
                        <Search2Icon />
                        &nbsp; Keyword
                      </Th>
                      <Th bg="blackAlpha.200">
                        <HStack>
                          <Icon color="blackAlpha.900" as={IoEyeOutline} />
                          <Text>Search strength</Text>
                        </HStack>
                      </Th>
                      <Th bg="blackAlpha.200" roundedRight={8}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>President</Td>
                      <Td>1200</Td>
                      <Td w="full">
                        <Box
                          w="full"
                          h={2}
                          rounded="full"
                          bg="green.300"
                          opacity={1}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Governor</Td>
                      <Td>900</Td>
                      <Td>
                        <Box
                          w="80%"
                          h={2}
                          rounded="full"
                          bg="green.300"
                          opacity={0.5}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Peter Obi</Td>
                      <Td>400</Td>
                      <Td>
                        <Box
                          w="50%"
                          h={2}
                          rounded="full"
                          bg="green.300"
                          opacity={0.5}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel px={0}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th bg="blackAlpha.100" roundedLeft={8}>
                        <HStack>
                          <Icon color="blackAlpha.900" as={IoOptionsOutline} />
                          <Text>Filter combination</Text>
                        </HStack>
                      </Th>

                      <Th bg="blackAlpha.100" roundedRight={8}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>President + SC + Ward</Td>
                      <Td w="full">
                        <Box
                          w="full"
                          h={2}
                          rounded="full"
                          bg="green.300"
                          opacity={1}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </AdminLayout>
  );
}
