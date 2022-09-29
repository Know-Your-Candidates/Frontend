import React from "react";
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

export default function KeywordFilterTable({ analytics }) {
  const highestFilterScore = Math.max(
    ...Object.values(analytics.filters).map(Number)
  );

  const highestKeywordScore = Math.max(
    ...Object.values(analytics.keywords).map(Number)
  );

  return (
    <Tabs my={12} variant="enclosed">
      <TabList>
        <Tab roundedTop={8} _selected={{ bg: "green.600", color: "white" }}>
          Top 10 keywords
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
                {Object.keys(analytics.keywords).map((keyword) => (
                  <Tr key={keyword}>
                    <Td>{keyword}</Td>
                    <Td>{analytics.keywords[keyword]}</Td>
                    <Td w="full">
                      <Box
                        w={`${
                          (Number(analytics.keywords[keyword]) /
                            highestKeywordScore) *
                          100
                        }%`}
                        h={2}
                        rounded="full"
                        bg="green.300"
                        opacity={1}
                      />
                    </Td>
                  </Tr>
                ))}
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
                {Object.keys(analytics.filters).map((filter) => (
                  <Tr key={filter}>
                    <Td>{filter}</Td>
                    <Td w="full">
                      <Box
                        w={`${
                          (Number(analytics.filters[filter]) /
                            highestFilterScore) *
                          100
                        }%`}
                        h={2}
                        rounded="full"
                        bg="green.300"
                        opacity={1}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
