import {
  Box,
  HStack,
  Link as ChakraLink,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <HStack justify="center" bg="gray.50" px="6%">
      <Box
        w="full"
        maxW="6xl"
        rounded={24}
        pt={12}
        textAlign="left"
        pb={4}
        align="center"
        spacing={118}
      >
        <Wrap spacingX={20} spacingY={10} pb={71}>
          <WrapItem>
            <Stack>
              <Logo w={150} />
            </Stack>
          </WrapItem>
          <WrapItem w="full">
            <Wrap
              spacingX={20}
              spacingY={10}
              w="full"
              justify={["flex-start", "flex-start", "space-between"]}
            >
              <WrapItem minW={100}>
                <Stack spacing={6}>
                  <Text fontWeight="bold">Search</Text>
                  <Link href="#" passHref>
                    <ChakraLink color="gray.500">Politicians</ChakraLink>
                  </Link>
                  <Link href="#" passHref>
                    <ChakraLink color="gray.500">Parties</ChakraLink>
                  </Link>
                </Stack>
              </WrapItem>
              <WrapItem minW={100}>
                <Stack spacing={6}>
                  <Text fontWeight="bold">Navigation</Text>
                  <Link href="#" passHref>
                    <ChakraLink color="gray.500">Sitemap</ChakraLink>
                  </Link>
                  <Link href="#" passHref>
                    <ChakraLink color="gray.500">Privacy policy</ChakraLink>
                  </Link>
                </Stack>
              </WrapItem>

              <WrapItem minW={100}>
                <Stack spacing={6}>
                  <Text fontWeight="bold">Learn</Text>
                  <Link href="#" passHref>
                    <ChakraLink color="gray.500">FAQs</ChakraLink>
                  </Link>
                  <Link href="#" passHref>
                    <ChakraLink color="gray.500">Blogs</ChakraLink>
                  </Link>
                </Stack>
              </WrapItem>

              <WrapItem>
                <Stack spacing={6}>
                  <Text fontWeight="bold">Contact us</Text>
                  <ChakraLink
                    href="mailto:knowcandidates@election.org"
                    color="primary.500"
                    textDecor="underline"
                  >
                    knowcandidates@election.org
                  </ChakraLink>
                </Stack>
              </WrapItem>
            </Wrap>
          </WrapItem>
        </Wrap>

        <Text fontSize={12} color="gray.500" textAlign="center">
          Copyright 2022 - Know Your Candidate
        </Text>
      </Box>
    </HStack>
  );
}
