import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Input,
  Link as ChakraLink,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import Link from "next/link";
import useForgotPasswordHook from "./useForgotPasswordHook";

export default function ForgotPassword() {
  const { forgotPasswordDetails, handleSubmit, isLoading, handleChange } =
    useForgotPasswordHook();

  const { email } = forgotPasswordDetails;

  return (
    <Center minH="100vh" py={[16, 20]}>
      <VStack w="full" spacing={16}>
        <VStack w="full" spacing={8}>
          <Image maxW={150} src="/illustrations/lock.svg" />

          <Stack
            w="full"
            maxW={["full", 380]}
            as="form"
            onSubmit={handleSubmit}
            spacing={6}
            pb={6}
          >
            <Stack pl={6}>
              <Heading fontSize={32}>Forgot Password?</Heading>

              <Text fontSize="md" color="gray.500">
                No worries. We will send you reset instructions
              </Text>
            </Stack>

            <Stack px={6} pt={4} spacing={6}>
              <Stack spacing={1}>
                <Text>Email</Text>
                <Input
                  size="lg"
                  placeholder="Enter your email address"
                  type="email"
                  isRequired
                  value={email}
                  name="email"
                  onChange={handleChange}
                />
              </Stack>

              <Box w="full" pt={9}>
                <Button
                  type="submit"
                  width="full"
                  size="lg"
                  isLoading={isLoading}
                  loadingText="Sending..."
                  variant="solid"
                  colorScheme="primary"
                >
                  Reset password
                </Button>
              </Box>
              <HStack justify="center">
                <Link href="/admin/login">
                  <ChakraLink color="gray.600">Back to Login</ChakraLink>
                </Link>
              </HStack>
            </Stack>
          </Stack>
        </VStack>
      </VStack>
    </Center>
  );
}
