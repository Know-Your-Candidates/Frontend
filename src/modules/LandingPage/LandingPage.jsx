import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Stack,
  Link as ChakraLink,
  Heading,
  Image,
  Text,
  Icon,
  Input,
  Divider,
  Select,
  Button,
  Flex,
  Wrap,
  WrapItem,
  Show,
} from "@chakra-ui/react";
import Link from "next/link";
import { Logo } from "components/Logo/Logo";
import React, { useState } from "react";
import Router from "next/router";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmitQuery = (event) => {
    event.preventDefault();
    Router.push(`/search?query=${searchQuery}`);
  };

  return (
    <Box>
      <Stack
        direction="row"
        w="full"
        bgImage="/images/hero-bg.png"
        bgPos="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        justify="center"
        pt={8}
        pb={[9, 10, 40]}
        px="6%"
      >
        <Stack spacing={94} w="full" maxW="6xl">
          <HStack w="full" h="fit-content" justify="space-between">
            <Logo w={["100px", "100px", "140px"]} />
            <HStack spacing={[6, 6, 12]}>
              <Link href="/">
                <ChakraLink color="primary.500" fontWeight={500}>
                  Home
                </ChakraLink>
              </Link>

              {/* <Link href="/about">
                <ChakraLink fontWeight={500}>About</ChakraLink>
              </Link> */}

              <Link href="/search">
                <ChakraLink fontWeight={500}>Search</ChakraLink>
              </Link>
            </HStack>
          </HStack>

          <Stack
            align="center"
            direction={["column", "column", "column", "row"]}
          >
            <Stack spacing={6} w="full">
              <Box>
                <Heading
                  fontSize={[40, 52, 52, 52, 64]}
                  fontWeight="900"
                  color="gray.700"
                >
                  Know everything about the people to vote for
                </Heading>
                <Image
                  maxW={[36, 40, 40, 40, "full"]}
                  src="/illustrations/text-stroke.svg"
                />
              </Box>
              <HStack w="full" maxW={454} bg="gray.100" p={4} rounded={8}>
                <Text>🔍 Search anyone you want</Text>
              </HStack>

              <HStack w="full" maxW={454} bg="gray.100" p={4} rounded={8}>
                <Text>🔥 Add filters to know more</Text>
              </HStack>

              <HStack
                align="center"
                h={[70, 70, 88]}
                w="full"
                maxW={718}
                bg="white"
                shadow="lg"
                spacing={[1, 4]}
                rounded={12}
                borderBottom="4px solid"
                borderColor="primary.200"
                onSubmit={handleSubmitQuery}
                px={[4, 8]}
                as="form"
              >
                <Icon as={Search2Icon} boxSize={15} />
                <Input
                  isRequired
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  variant="unstyled"
                  size="lg"
                />
                <Divider orientation="vertical" maxH={38} />
                <Select variant="unstyled" size={["sm", "sm", "lg"]} maxW={170}>
                  <option value="Political parties">Political parties</option>
                </Select>
              </HStack>
            </Stack>
            <Show ssr={false} above="lg">
              <Image src="/images/hero-image.png" />
            </Show>
          </Stack>
        </Stack>
      </Stack>

      <HStack justify="center" py={[16, 100]} px="6%">
        <Stack
          w="full"
          direction={["column", "column", "column", "row"]}
          maxW="6xl"
          rounded={24}
          bg="gray.100"
          px={[4, 8]}
          pt={[8]}
          align="flex-end"
          spacing={10}
          pb={12}
        >
          <Stack
            borderRadius={16}
            shadow="md"
            spacing={0}
            maxW={[542, 542, "full", 542]}
            w="full"
          >
            <Image borderTopRadius={16} src="/images/biography.png" />
            <Stack borderBottomRadius={16} py={6} px={8} bg="white">
              <Image borderBottomRadius={16} src="/images/bio-lines.png" />
            </Stack>
          </Stack>
          <Stack spacing={1} w="full">
            <Text fontSize="xs" color="primary.500" letterSpacing={1.26}>
              CANDIDATE PAGE DETAILS
            </Text>
            <Heading
              fontWeight="900"
              fontSize={[28, 36, 40, 48, 52]}
              lineHeight={["auto", "auto", "auto", "auto", "80px"]}
            >
              We elevate your understanding of the candidates
            </Heading>
            <Stack spacing={4} pt={3}>
              <Text>✅ You will see age information</Text>
              <Text>✅ Party they belong to</Text>
              <Text>✅ How many times they have contested for a position</Text>
            </Stack>
            <Flex pt={7}>
              <Button colorScheme="primary" rounded={12}>
                Search now
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </HStack>

      <HStack mb={[50, 50, 150]} justify="center" bg="green.50" py={14} px="6%">
        <Stack
          w="full"
          direction={["column", "column", "column", "row"]}
          maxW="6xl"
          rounded={24}
          pt={[0, 0, 8]}
          align="center"
          spacing={[10, 16, 118]}
          pb={12}
        >
          <Image w={["full", "full", 300, "full"]} src="/images/parties.png" />
          <Stack w="full">
            <Stack spacing={1} w="full">
              <Heading
                fontWeight="900"
                fontSize={[28, 36, 40, 48, 50]}
                lineHeight={["auto", "auto", "auto", "auto", "80px"]}
              >
                You can know about any party & election in Nigerian history
              </Heading>
              <Stack spacing={4} pt={3}>
                <Text fontWeight={200}>
                  You no longer need to be ignorant about election events that
                  happened in the past. <br /> We'll always have the records at
                  the snap of your finger💪🏽
                </Text>
              </Stack>
              <Flex pt={7}>
                <Button colorScheme="primary" rounded={12}>
                  Search now
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      </HStack>
    </Box>
  );
}
