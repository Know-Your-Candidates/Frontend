import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Stack,
  StackDivider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  ButtonGroup,
  Checkbox,
  Select,
  Grid,
  GridItem,
  VStack,
  Avatar,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import React from "react";
import { IoGrid } from "react-icons/io5";
import { AiOutlineCaretDown } from "react-icons/ai";
import { MdFormatListBulleted } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddAdmin from "./components/AddAdmin";
import useAccountManagementHook from "./useAccountManagementHook";
import DeleteAdmin from "./components/DeleteAdmin";
import Filters from "./components/Filters";
import { BarLoader } from "react-spinners";
import theme from "theme";

export default function AccountManagement() {
  const data = useAccountManagementHook();

  return (
    <AdminLayout>
      <Box pb={20} pt={[8, 8, 16]} pl={["6%", "6%", 16]} pr={["6%", "6%", 12]}>
        <Heading fontSize={32}>Account Management</Heading>

        <Divider mt={4} mb={12} />

        <Filters data={data} />

        <Heading fontSize="2xl" my={8}>
          All Admins
        </Heading>

        {data.view === "grid" && (
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {data.admins.results.map((admin) => (
              <GridItem
                key={admin.id}
                rounded={12}
                bg="white"
                shadow="0px 4px 35px rgba(0, 0, 0, 0.06)"
                w="100%"
                px={3}
                py={6}
              >
                <VStack>
                  <Avatar
                    size="lg"
                    name={`${admin.first_name} ${admin.last_name}`}
                  />
                  <VStack spacing={0}>
                    <Text fontWeight={700}>
                      {admin.first_name} {admin.last_name}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {admin.email}
                    </Text>
                    <Text fontSize="xs" color="blue.500">
                      {admin.is_superuser ? "Super" : ""} Admin
                    </Text>
                  </VStack>
                  <HStack w="full" pt={4}>
                    <Button
                      onClick={() => data.setAdminToDelete(admin)}
                      w="full"
                      colorScheme="red"
                      size="lg"
                    >
                      Delete
                    </Button>
                    <Button w="full" size="lg">
                      Edit
                    </Button>
                  </HStack>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        )}

        {data.view === "list" && (
          <TableContainer mt={10}>
            <Table variant="simple">
              <Thead>
                <Tr bg="blackAlpha.50">
                  <Th textTransform="capitalize" color="gray.700" fontSize="sm">
                    Name
                  </Th>
                  <Th textTransform="capitalize" color="gray.700" fontSize="sm">
                    Type
                  </Th>
                  <Th textTransform="capitalize" color="gray.700" fontSize="sm">
                    Status
                  </Th>
                  <Th
                    textTransform="capitalize"
                    color="gray.700"
                    fontSize="sm"
                    isNumeric
                  >
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.admins.results.map((admin) => (
                  <Tr opacity={1} key={admin.id}>
                    <Td>
                      {admin.first_name} {admin.last_name}
                    </Td>
                    <Td>{admin.is_superuser ? "Super" : ""} Admin</Td>
                    <Td>
                      {admin.verified && admin.is_active ? (
                        <Badge
                          colorScheme="green"
                          variant="subtle"
                          textTransform="capitalize"
                          px={4}
                        >
                          Active
                        </Badge>
                      ) : !admin.verified && !admin.is_active ? (
                        <Badge
                          colorScheme="red"
                          variant="subtle"
                          textTransform="capitalize"
                          px={4}
                        >
                          Deleted
                        </Badge>
                      ) : (
                        <Badge
                          colorScheme="yellow"
                          variant="subtle"
                          textTransform="capitalize"
                          px={4}
                        >
                          Pending
                        </Badge>
                      )}
                    </Td>
                    <Td isNumeric>
                      <HStack spacing={1} justify="flex-end">
                        <IconButton
                          colorScheme="blue"
                          variant="ghost"
                          icon={<EditIcon />}
                        />
                        <IconButton
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => data.setAdminToDelete(admin)}
                          icon={<RiDeleteBin6Line />}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}

        {data.isLoading && (
          <VStack pt={7} spacing={3}>
            <BarLoader
              height={6}
              width={250}
              color={theme.colors.primary["500"]}
              radius={8}
            />
            <Text color="gray.500">Loading admins...</Text>
          </VStack>
        )}

        {!data.isLoading && !data.admins.results.length && (
          <Text textAlign="center">No data to show</Text>
        )}

        <DeleteAdmin
          isOpen={!!data.adminToDelete}
          onClose={() => data.setAdminToDelete(null)}
        />
      </Box>
    </AdminLayout>
  );
}
