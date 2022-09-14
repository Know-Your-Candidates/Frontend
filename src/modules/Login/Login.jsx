import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Show,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import React from "react";
import Link from "next/link";
import useLoginHook from "./useLoginHook";
import { Logo } from "components/Logo/Logo";

export default function Login({ previousRoute }) {
  const {
    loginDetails,
    handleSubmit,
    isLoading,
    handleChange,
    showPassword,
    setShowPassword,
  } = useLoginHook(previousRoute);

  const { email, password } = loginDetails;

  return (
    <Center minH="100vh">
      <Stack w="full" direction="row" align="center" spacing={0}>
        <VStack h="full" justify="center" align="center" w="full" spacing={8}>
          <Stack
            w="full"
            maxW={["full", 380]}
            px={["7%", 0]}
            as="form"
            onSubmit={handleSubmit}
            spacing={10}
            py={10}
          >
            <Logo maxW={155} notLinked />

            <Box>
              <Heading fontWeight={500} fontSize="3xl">
                Welcome back
              </Heading>
              <Text color="gray.400">Please enter your details</Text>
            </Box>

            <Stack spacing={6}>
              <Stack spacing={1}>
                <Text>Email Address</Text>
                <Input
                  size="lg"
                  placeholder="Enter email address"
                  type="email"
                  isRequired
                  value={email}
                  name="email"
                  onChange={handleChange}
                />
              </Stack>
              <Stack spacing={1}>
                <Text>Password</Text>
                <InputGroup size="lg">
                  <Input
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    isRequired
                    value={password}
                    placeholder="Enter password"
                    name="password"
                    onChange={handleChange}
                  />

                  <InputRightElement width="4.5rem">
                    <IconButton
                      h="1.75rem"
                      color="gray.400"
                      bg="transparent"
                      icon={showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                      onClick={() => setShowPassword(!showPassword)}
                      fontSize="xl"
                    />
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Flex justify="flex-end">
                <Link href="/admin/forgot-password">
                  <ChakraLink fontSize="sm" color="primary.400">
                    Reset password
                  </ChakraLink>
                </Link>
              </Flex>
              <Box w="full" pt={4}>
                <Button
                  type="submit"
                  width="full"
                  size="lg"
                  rounded={10}
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  variant="solid"
                  colorScheme="primary"
                >
                  Sign in
                </Button>
              </Box>
            </Stack>
          </Stack>
        </VStack>
        <Show ssr above="lg">
          <Box
            bgImage="/images/login-bg.png"
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
            w="full"
            pos="relative"
            borderLeftRadius={40}
            objectFit="cover"
            h="100vh"
          >
            <Stack
              spacing="12%"
              pb={8}
              px={10}
              color="white"
              pos="absolute"
              bottom={0}
              w="full"
            >
              <Text fontSize={32}>
                “Where there is no opportunity for one man one vote, there will
                be no accountability and no responsibility.”
              </Text>
              <Flex justify="flex-end">
                <Stack spacing={4}>
                  <Text fontSize={24}>Goodluck Jonathan</Text>
                  <Text>Former Nigerian President</Text>
                </Stack>
              </Flex>
            </Stack>
          </Box>
        </Show>
      </Stack>
    </Center>
  );
}
