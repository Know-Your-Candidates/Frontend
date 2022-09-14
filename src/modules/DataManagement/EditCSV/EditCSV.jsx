import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Select,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import React from "react";

export default function EditCSV() {
  return (
    <AdminLayout>
      <Box
        pt={["5%", 16]}
        pl={["5%", "5%", "5%", 16]}
        pr={["5%", "5%", "5%", 12]}
      >
        <Heading fontSize={32}>Edit CSV</Heading>

        <Divider mt={4} mb={8} />

        <HStack justify="space-between">
          <Text fontSize={14}>Edit information</Text>

          <Button colorScheme="primary" w={183} h={55} rounded={8}>
            Save
          </Button>
        </HStack>
        <Divider mt={6} mb={8} />

        <Wrap spacingY={8} spacingX={6}>
          <WrapItem w="full" maxW={470}>
            <Stack w="full">
              <Text>State</Text>
              <Select w="full" placeholder="Choose state" size="lg"></Select>
            </Stack>
          </WrapItem>

          <WrapItem w="full" maxW={470}>
            <Stack w="full">
              <Text>State</Text>
              <Select w="full" placeholder="Choose state" size="lg"></Select>
            </Stack>
          </WrapItem>

          <WrapItem w="full" maxW={470}>
            <Stack w="full">
              <Text>State</Text>
              <Select w="full" placeholder="Choose state" size="lg"></Select>
            </Stack>
          </WrapItem>
        </Wrap>
      </Box>
    </AdminLayout>
  );
}
