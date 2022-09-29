import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Select,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { IoGrid } from "react-icons/io5";
import { MdFormatListBulleted } from "react-icons/md";
import AddAdmin from "./AddAdmin";

export default function Filters({ data }) {
  const {
    view,
    setView,
    status,
    setStatus,
    adminType,
    setAdminType,
    query,
    setQuery,
    debouncedOnChange,
  } = data;

  return (
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
            color={view !== "list" && "gray.400"}
            onClick={() => setView("list")}
            icon={<MdFormatListBulleted />}
            fontSize="2xl"
            variant="ghost"
          />
          <IconButton
            color={view !== "grid" && "gray.400"}
            onClick={() => setView("grid")}
            icon={<IoGrid />}
            fontSize="2xl"
            variant="ghost"
          />
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
                <CheckboxGroup colorScheme="primary" size="sm">
                  <Stack>
                    {["active", "pending", "deleted"].map((option) => (
                      <Checkbox
                        textTransform="capitalize"
                        isChecked={status === option}
                        onChange={() => setStatus(option)}
                      >
                        {option}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </MenuGroup>
              <MenuGroup pt={3} title="Admin type">
                <Stack>
                  <Select
                    value={adminType}
                    onChange={(event) => setAdminType(event.target.value)}
                    size="sm"
                    variant="outline"
                    placeholder="Select"
                    bg="blackAlpha.50"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
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
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                debouncedOnChange(event.target.value);
              }}
              type="search"
              placeholder="Search"
            />
          </InputGroup>
        </HStack>
      </Stack>
      <AddAdmin />
    </Stack>
  );
}
