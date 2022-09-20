import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useDisclosure,
  Text,
  Input,
} from "@chakra-ui/react";
import React from "react";

export default function AddAdmin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="primary" size="lg" w={183} h={59}>
        Add new admin
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6}>
              <Stack>
                <Text as="label">Admin name</Text>
                <Input placeholder="Enter Admin name" size="lg" />
              </Stack>

              <Stack>
                <Text as="label">Admin email</Text>
                <Input type="email" placeholder="Enter Admin email" size="lg" />
              </Stack>

              <Stack>
                <Text as="label">Admin password</Text>
                <Input
                  type="password"
                  placeholder="Enter Admin password"
                  size="lg"
                />
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter pt={8}>
            <Button h="60px" w="full" colorScheme="primary">
              Create admin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
