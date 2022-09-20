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

export default function AccountManagement() {
  const { adminToDelete, setAdminToDelete } = useAccountManagementHook();

  return (
    <AdminLayout>
      <Box pb={20} pt={[8, 8, 16]} pl={["6%", "6%", 16]} pr={["6%", "6%", 12]}>
        <Heading fontSize={32}>Account Management</Heading>

        <Divider mt={4} mb={12} />

        <Stack
          direction="row"
          align="center"
          justify="space-between"
          bg="white"
          border="1px solid"
          borderColor="blackAlpha.100"
          py={2.5}
          px={4}
        >
          <Stack
            spacing={5}
            direction="row"
            divider={<StackDivider />}
            align="center"
          >
            <HStack>
              <IconButton
                color="gray.500"
                icon={<MdFormatListBulleted />}
                fontSize="2xl"
                variant="ghost"
              />
              <IconButton icon={<IoGrid />} fontSize="2xl" variant="ghost" />
            </HStack>
            <HStack spacing={4}>
              <Menu>
                <MenuButton as={HStack}>
                  <ButtonGroup
                    bg="blackAlpha.50"
                    color="gray.600"
                    fontWeight={400}
                    rounded={8}
                    isAttached
                    variant="outline"
                  >
                    <Button>Filter</Button>
                    <IconButton
                      aria-label="Apply Filters"
                      icon={<AiOutlineCaretDown />}
                    />
                  </ButtonGroup>
                </MenuButton>
                <MenuList px={4}>
                  <MenuGroup title="Status">
                    <Stack>
                      <Checkbox size="sm" colorScheme="primary">
                        Active
                      </Checkbox>
                      <Checkbox size="sm" colorScheme="primary">
                        Pending
                      </Checkbox>
                      <Checkbox size="sm" colorScheme="primary">
                        Deleted
                      </Checkbox>
                    </Stack>
                  </MenuGroup>
                  <MenuGroup pt={3} title="Admin type">
                    <Stack>
                      <Select
                        size="sm"
                        variant="outline"
                        placeholder="Select"
                        bg="blackAlpha.50"
                      >
                        <option value="super_admin">Super Admin</option>
                      </Select>
                    </Stack>
                  </MenuGroup>

                  <HStack spacing={7} pt={6}>
                    <MenuItem as={Button} w={20} size="sm" variant="outline">
                      Clear
                    </MenuItem>
                    <MenuItem
                      as={Button}
                      color="white"
                      _hover={{ bg: "primary.500" }}
                      w={20}
                      size="sm"
                      colorScheme="primary"
                    >
                      Filter
                    </MenuItem>
                  </HStack>
                </MenuList>
              </Menu>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.300" />}
                />
                <Input type="search" placeholder="Search" />
              </InputGroup>
            </HStack>
          </Stack>
          <AddAdmin />
        </Stack>

        <Heading fontSize="2xl" my={8}>
          All Admins
        </Heading>

        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <GridItem
              key={index}
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
                  name="Kola Tioluwani"
                  src="https://bit.ly/tioluwani-kolawole"
                />
                <VStack spacing={0}>
                  <Text fontWeight={700}>Mark Kon</Text>
                  <Text fontSize="xs" color="gray.400">
                    markkon@gmail.com
                  </Text>
                  <Text fontSize="xs" color="blue.500">
                    Admin
                  </Text>
                </VStack>
                <HStack w="full" pt={4}>
                  <Button
                    onClick={() => setAdminToDelete(12)}
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
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <Tr opacity={1} key={index}>
                  <Td>Carolyn Harvey</Td>
                  <Td>Super Admin</Td>
                  <Td>
                    <Badge
                      colorScheme="green"
                      variant="subtle"
                      textTransform="capitalize"
                      px={4}
                    >
                      Active
                    </Badge>
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
                        icon={<RiDeleteBin6Line />}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <DeleteAdmin
          isOpen={!!adminToDelete}
          onClose={() => setAdminToDelete(null)}
        />
      </Box>
    </AdminLayout>
  );
}
