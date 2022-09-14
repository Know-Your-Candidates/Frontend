import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Select,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import Router from "next/router";
import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { CgOptions } from "react-icons/cg";
import { GrFlag } from "react-icons/gr";

export default function AspirantDetails({
  selectedAspirant,
  backToSearchResults,
}) {
  useEffect(() => {
    window.scrollTo(0, 0); //Always start at the top when a page changes
  }, []);

  return (
    <Box bg="blackAlpha.100">
      <Stack direction="row" w="full" justify="center" pt={8} px="6%">
        <Stack spacing={12} align="center" w="full" maxW="6xl">
          <Flex w="full">
            <Logo w={150} />
          </Flex>

          <Stack w="full" maxW={1070} spacing={9}>
            <Flex>
              <Button
                onClick={backToSearchResults}
                variant="link"
                leftIcon={<BsArrowLeft />}
              >
                Back to search results
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        w="full"
        justify="center"
        pt={[9, 12, 12]}
        roundedTop={20}
        bg="white"
        mt={8}
        pb={[9, 10, 40]}
        px="6%"
      >
        <Stack
          spacing={8}
          align="center"
          rounded={12}
          bg="blackAlpha.50"
          w="full"
          maxW="7xl"
          p={6}
          pb={10}
        >
          <Stack divider={<StackDivider />} spacing={[4, 8]} w="full">
            <Stack spacing={2}>
              <Stack align="flex-end" direction="row" spacing={3}>
                <Image
                  objectFit="cover"
                  maxW={[160, 250, 300, 465]}
                  src="/images/obi.png"
                />
                <Image
                  maxW={[81, 140, 160, "full"]}
                  objectFit="cover"
                  src="/images/labour-party.png"
                />
              </Stack>
              <Box>
                <Text fontWeight="bold" fontSize={[16, 20, 24]}>
                  Labour Party Presidential Aspirant 🇳🇬
                </Text>
                <Text>67 years old</Text>
              </Box>
            </Stack>
            <Stack fontSize={[14, 16]} spacing={[3, 6, 7]}>
              <Text fontSize={18} fontWeight="bold">
                Other information
              </Text>
              <HStack spacing={[8, 16]}>
                <Text color="gray.500" w="full" maxW={[100, 140]}>
                  Name:
                </Text>
                <Text fontWeight="semibold">Peter Gregory Obi</Text>
              </HStack>

              <HStack spacing={[8, 16]}>
                <Text color="gray.500" w="full" maxW={[100, 140]}>
                  Gender:
                </Text>
                <Text fontWeight="semibold">Male</Text>
              </HStack>

              <HStack spacing={[8, 16]}>
                <Text color="gray.500" w="full" maxW={[100, 140]}>
                  Years contested:
                </Text>
                <Text fontWeight="semibold">2012, 2016, 2020</Text>
              </HStack>

              <HStack spacing={[8, 16]}>
                <Text color="gray.500" w="full" maxW={[100, 140]}>
                  Position contested:
                </Text>
                <Text fontWeight="semibold">President</Text>
              </HStack>

              <HStack spacing={[8, 16]}>
                <Text color="gray.500" w="full" maxW={[100, 140]}>
                  Party:
                </Text>
                <Text fontWeight="semibold">Labour Party</Text>
              </HStack>

              <HStack spacing={[8, 16]}>
                <Text color="gray.500" w="full" maxW={[100, 140]}>
                  Qualification:
                </Text>
                <Text fontWeight="semibold">Masters Degree</Text>
              </HStack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
