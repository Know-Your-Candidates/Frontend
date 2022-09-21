import {
  Button,
  CloseButton,
  Flex,
  HStack,
  Select,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Show,
  StackDivider,
  Collapse,
} from "@chakra-ui/react";
import React from "react";
import { CgOptions } from "react-icons/cg";
import { filterOptions } from "utils/constants";

export default function SearchFilters({ changeFilterValue }) {
  const modalDisclosure = useDisclosure();
  const collapsibleDisclosure = useDisclosure();

  return (
    <Stack spacing={4} w="full">
      <HStack justify="space-between">
        <HStack>
          <Show ssr above="lg">
            <Button
              onClick={collapsibleDisclosure.onToggle}
              variant="outline"
              rightIcon={<CgOptions />}
            >
              Use Filters
            </Button>
          </Show>

          <Show ssr below="lg">
            <Button
              onClick={modalDisclosure.onOpen}
              variant="outline"
              rightIcon={<CgOptions />}
            >
              Use Filters
            </Button>
          </Show>

          <Show ssr above="lg">
            <Button variant="outline">Reset Filters</Button>
          </Show>
        </HStack>
        {collapsibleDisclosure.isOpen && (
          <Show ssr above="lg">
            <CloseButton onClick={collapsibleDisclosure.onClose} />
          </Show>
        )}
      </HStack>

      <Drawer
        placement="bottom"
        size="full"
        onClose={modalDisclosure.onClose}
        isOpen={modalDisclosure.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius={12}>
          <DrawerCloseButton />
          <DrawerHeader py={3} borderBottomWidth="1px">
            <HStack justify="space-between">
              <Text>Filters</Text>

              <HStack spacing={6} pr={8}>
                <Button size="sm" colorScheme="primary" variant="link">
                  Apply Filters
                </Button>

                <Button size="sm" variant="link">
                  Reset
                </Button>
              </HStack>
            </HStack>
          </DrawerHeader>
          <DrawerBody px={4}>
            <Stack divider={<StackDivider />} spacing={0}>
              {filterOptions.map(({ name, options }) => (
                <Select h={51} variant="flushed" placeholder={name}></Select>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Collapse in={collapsibleDisclosure.isOpen} animateOpacity>
        <HStack bg="gray.50" p={6} rounded={8}>
          <Wrap spacingX={8} spacingY={5}>
            {filterOptions.map(({ name, options }) => (
              <WrapItem>
                <Stack>
                  <Text fontWeight={500} as="label">
                    {name}
                  </Text>
                  <Select
                    variant="outline"
                    placeholder="Select"
                    size="lg"
                    w="full"
                    minW={173}
                  ></Select>
                </Stack>
              </WrapItem>
            ))}
            <WrapItem alignItems="flex-end">
              <Button minW={173} colorScheme="primary" size="lg">
                Apply
              </Button>
            </WrapItem>
          </Wrap>
        </HStack>
      </Collapse>
    </Stack>
  );
}
