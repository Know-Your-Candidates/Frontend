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
  Text,
} from "@chakra-ui/react";
import { MdOutlineCloudUpload } from "react-icons/md";

export default function ImportCSV() {
  return (
    <Box pt={6} pb={12}>
      <Heading fontSize={19}>Import CSV</Heading>
      <Text mt={2} fontWeight={400}>
        You currently do not have any CSV uploaded
      </Text>
      <Divider mt={4} mb={4} />

      <Stack maxW={385} w="full" spacing={8}>
        <Stack>
          <HStack justify="space-between">
            <Text>Upload CSV</Text>
            <Button
              variant="link"
              color="primary.400"
              fontWeight="light"
              textDecor="underline"
            >
              See sample CSV
            </Button>
          </HStack>
          <Box pos="relative">
            <Box
              h={61}
              bg="gray.100"
              cursor="pointer"
              rounded={10}
              px={1.5}
              py={2}
            >
              <HStack
                py={2.5}
                color="gray.600"
                px={4}
                h="full"
                rounded={10}
                w="full"
                justify="space-between"
                border="1px solid lightgrey"
                borderStyle="dashed"
              >
                <Text>Upload CSV</Text>

                <Icon as={MdOutlineCloudUpload} />
              </HStack>
            </Box>
            <Input
              pos="absolute"
              top={0}
              w="full"
              cursor="pointer"
              h="full"
              opacity={0}
              type="file"
            />
          </Box>
        </Stack>

        <Stack>
          <Text>CSV year</Text>
          <Select h={61} placeholder="Select year" size="lg"></Select>
        </Stack>

        <HStack justify="flex-end">
          <Button w={183} h={61} size="lg" colorScheme="primary" rounded={8}>
            Confirm Upload
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
