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
import { MdOutlineCloudUpload, MdOutlineDeleteOutline } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Router from "next/router";
import Moment from "react-moment";
import "moment-timezone";
import ConfirmDeleteCSV from "./ConfirmDeleteCSV";

export default function ManageCSV({
  csvs,
  csvToDelete,
  setCsvToDelete,
  handleConfirmCSVDelete,
  isDeletingCSV,
}) {
  return (
    <Box pt={8} pb={12}>
      <Heading fontSize={19}>Manage CSV</Heading>
      <Stack direction="row" justify="space-between" align="center">
        <Text mt={4} fontWeight={400}>
          Manage list of all uploaded CSV
        </Text>

        {/* <HStack>
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
        </HStack> */}
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
                Year
              </Th>
              <Th bg="gray.200">Status</Th>
              <Th bg="gray.200">Uploaded at</Th>
              <Th bg="gray.200" borderRightRadius={16}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {csvs.results.map((csv) => (
              <Tr key={csv.id}>
                <Td>{csv.year}</Td>
                <Td
                  color={
                    csv.status
                      ? csv.status === "Success"
                        ? "green.500"
                        : "red.500"
                      : "yellow.600"
                  }
                >
                  {csv.status || "Pending"}
                </Td>
                <Td>
                  <Moment format="Do MMMM, YYYY hh:mm a">
                    {csv.uploaded_at}
                  </Moment>
                </Td>
                <Td>
                  <Button
                    variant="link"
                    isDisabled={isDeletingCSV}
                    onClick={() => setCsvToDelete(csv)}
                    colorScheme="red"
                    leftIcon={<MdOutlineDeleteOutline />}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ConfirmDeleteCSV
        csv={csvToDelete}
        isOpen={!!csvToDelete}
        onClose={() => setCsvToDelete(null)}
        handleConfirmDelete={handleConfirmCSVDelete}
        isDeleting={isDeletingCSV}
      />
    </Box>
  );
}
