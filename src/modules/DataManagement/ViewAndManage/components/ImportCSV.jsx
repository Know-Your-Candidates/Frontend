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
  Text,
} from "@chakra-ui/react";
import { MdOutlineCloudUpload } from "react-icons/md";

export default function ImportCSV({
  csvs,
  year,
  setYear,
  fileToUpload,
  fileType,
  setFileType,
  handleUploadCSV,
  handleSubmitCSV,
  isUploadingCSV,
}) {
  const lastTenYears = Array.from(
    { length: 17 },
    (_, i) => new Date().getFullYear() + 1 - i
  );

  const isYearAlreadyUploaded = (year) => {
    return csvs.results.some((csv) => csv.year == year);
  };

  return (
    <Box pt={6} pb={12}>
      <Heading fontSize={19}>Import CSV</Heading>
      <Text mt={2} fontWeight={400}>
        You currently do not have any CSV uploaded
      </Text>
      <Divider mt={4} mb={4} />

      <Stack
        as="form"
        onSubmit={handleSubmitCSV}
        maxW={385}
        w="full"
        spacing={8}
      >
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
                <Text>{fileToUpload?.name || "Upload CSV"}</Text>

                <Icon as={MdOutlineCloudUpload} />
              </HStack>
            </Box>
            <Input
              pos="absolute"
              top={0}
              isRequired
              w="full"
              cursor="pointer"
              h="full"
              opacity={0}
              type="file"
              onChange={handleUploadCSV}
              accept=".xlsx, .xls, .csv"
            />
          </Box>
        </Stack>

        <Stack>
          <Text>CSV Type</Text>
          <Select
            value={fileType}
            onChange={(event) => setFileType(event.target.value)}
            h={61}
            isRequired
            placeholder="Select CSV type"
            size="lg"
          >
            <option value="CandidateData">Candidate Data</option>
            <option value="LocationData">Location Data</option>
          </Select>
        </Stack>

        <Stack>
          <Text>CSV year</Text>
          <Select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            h={61}
            isRequired
            placeholder="Select year"
            size="lg"
          >
            {lastTenYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Stack>

        <HStack justify="flex-end">
          <Button
            type="submit"
            w={183}
            h={61}
            size="lg"
            isLoading={isUploadingCSV}
            loadingText="Uploading..."
            colorScheme="primary"
            rounded={8}
          >
            Confirm Upload
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
