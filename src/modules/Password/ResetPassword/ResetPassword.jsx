import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import React from "react";
import Link from "next/link";
import useResetPasswordHook from "./useResetPasswordHook";

export default function ResetPassword() {
  const {
    resetPasswordDetails,
    handleSubmit,
    isLoading,
    handleChange,
    showPassword,
    setShowPassword,
  } = useResetPasswordHook();

  const { password, confirmPassword } = resetPasswordDetails;

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
              <Heading fontSize={32}>Hey, Tamara</Heading>
              <Text fontSize="md" color="gray.500">
                You can set your new password here
              </Text>
            </Stack>

            <Stack px={6} pt={4} spacing={6}>
              <Stack spacing={1}>
                <Text>Enter new password</Text>
                <InputGroup size="lg">
                  <Input
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    isRequired
                    minLength={8}
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

              <Stack spacing={1}>
                <Text>Confirm Password</Text>
                <InputGroup size="lg">
                  <Input
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    isRequired
                    minLength={8}
                    value={confirmPassword}
                    placeholder="Confirm password"
                    name="confirmPassword"
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

              <Box w="full" pt={4}>
                <Button
                  type="submit"
                  width="full"
                  size="lg"
                  isLoading={isLoading}
                  loadingText="Saving..."
                  variant="solid"
                  colorScheme="primary"
                >
                  Save
                </Button>
              </Box>
            </Stack>
          </Stack>
        </VStack>
      </VStack>
    </Center>
  );
}
