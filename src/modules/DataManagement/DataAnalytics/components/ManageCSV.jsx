import React from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Router from "next/router";

export default function ManageCSV() {
  return (
    <Box pt={8} pb={12}>
      <Heading fontSize={19}>Manage CSV</Heading>
      <Stack direction="row" justify="space-between" align="center">
        <Text mt={4} fontWeight={400}>
          Manage list of all uploaded CSV
        </Text>

        <HStack>
          <Menu placement="bottom-end">
            <MenuButton
              as={Button}
              variant="outline"
              width={250}
              fontWeight="light"
              rightIcon={<ChevronDownIcon />}
            >
              Manage list
            </MenuButton>
            <MenuList p={4}>
              <Stack>
                <Checkbox size="lg">State</Checkbox>
                <Checkbox size="lg">S-Code</Checkbox>
                <Checkbox size="lg">SD</Checkbox>
                <Checkbox size="lg">SD - Code</Checkbox>
              </Stack>
            </MenuList>
          </Menu>
          <Select>
            <option value="imported">Imported CSV</option>
            <option value="deleted">Deleted CSV</option>
          </Select>
        </HStack>
      </Stack>

      <TableContainer
        border="1px solid"
        rounded={16}
        mt={8}
        borderColor="gray.100"
        p={2}
      >
        <Table overflowX="auto" size="lg" variant="simple">
          <Thead>
            <Tr>
              <Th bg="gray.200" borderLeftRadius={16}>
                State
              </Th>
              <Th bg="gray.200">S-Code</Th>
              <Th bg="gray.200" borderRightRadius={16}>
                SD
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr cursor="pointer" onClick={() => Router.push("/admin/data/12")}>
              <Td>Kwara</Td>
              <Td>34-KD</Td>
              <Td>IL west</Td>
            </Tr>
            <Tr cursor="pointer" onClick={() => Router.push("/admin/data/12")}>
              <Td>Abuja</Td>
              <Td>34-KD</Td>
              <Td>IL west</Td>
            </Tr>
            <Tr cursor="pointer" onClick={() => Router.push("/admin/data/12")}>
              <Td>Lagos</Td>
              <Td>34-KD</Td>
              <Td>IL west</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
