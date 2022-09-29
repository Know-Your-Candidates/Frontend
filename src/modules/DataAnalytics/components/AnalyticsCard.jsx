import { Center, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function AnalyticsCard({ analytics }) {
  const { total_filters, searches } = analytics;
  return (
    <Stack spacing={6} direction={["column", "column", "row", "row"]}>
      {/* <Stack
        w="full"
        maxW={["full", "full", 347]}
        rounded={16}
        bg="white"
        borderBottom="5px solid #E4E4E4"
        shadow="0px 4px 35px rgba(0, 0, 0, 0.05)"
        bgImage="/illustrations/analytics-card-bg-brown.svg"
        p={4}
        h={164}
        justify="space-between"
        bgRepeat="no-repeat"
        bgPos="center right"
      >
        <HStack justify="space-between" align="flex-start">
          <Stack>
            <Heading>205</Heading>
            <Text>Number of site visitors</Text>
          </Stack>

          <Center
            rounded="full"
            boxSize={59}
            border="5px solid #E8ECFF"
            shadow="inset 0px 4px 2px rgba(0, 0, 0, 0.1)"
          >
            <Text fontWeight="bold" fontSize="xs">
              +34%
            </Text>
          </Center>
        </HStack>
        <Text fontSize={12} color="gray.400">
          Analytics for today
        </Text>
      </Stack> */}

      <Stack
        w="full"
        maxW={["full", "full", 347]}
        rounded={16}
        bg="white"
        borderBottom="5px solid #E4E4E4"
        shadow="0px 4px 35px rgba(0, 0, 0, 0.05)"
        bgImage="/illustrations/analytics-card-bg-purple.svg"
        p={4}
        h={164}
        justify="space-between"
        bgRepeat="no-repeat"
        bgPos="center right"
      >
        <HStack justify="space-between" align="flex-start">
          <Stack>
            <Heading>{searches}</Heading>
            <Text>Number of searches</Text>
          </Stack>
        </HStack>
        <Text fontSize={12} color="gray.400">
          Analytics for today
        </Text>
      </Stack>

      <Stack
        w="full"
        maxW={["full", "full", 347]}
        rounded={16}
        bg="white"
        borderBottom="5px solid #E4E4E4"
        shadow="0px 4px 35px rgba(0, 0, 0, 0.05)"
        bgImage="/illustrations/analytics-card-bg-blue.svg"
        p={4}
        h={164}
        justify="space-between"
        bgRepeat="no-repeat"
        bgPos="center right"
      >
        <HStack justify="space-between" align="flex-start">
          <Stack>
            <Heading>{total_filters}</Heading>
            <Text>Number of filters applied</Text>
          </Stack>
        </HStack>
        <Text fontSize={12} color="gray.400">
          Analytics for today
        </Text>
      </Stack>
    </Stack>
  );
}
