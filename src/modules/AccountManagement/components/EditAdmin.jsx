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
  Select,
  Image,
  VStack,
  HStack,
  IconButton,
  useClipboard,
} from "@chakra-ui/react";
import React from "react";
import { IoIosCopy } from "react-icons/io";

export default function EditAdmin({ data, isOpen, onClose }) {
  const handleDetailsChange = (event) => {
    data.setAdminToEdit((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const { adminToEdit } = data;

  return (
    <Modal scrollBehavior="inside" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent onSubmit={data.handleEditAdmin} as="form">
        <ModalHeader>Edit admin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={6}>
            <Stack>
              <Text as="label">Admin type</Text>
              <Select
                name="account_type"
                value={adminToEdit?.account_type}
                onChange={handleDetailsChange}
                isRequired
                placeholder="Choose Admin type"
                size="lg"
              >
                <option value="admin">Admin</option>
                <option value="superuser">Super Admin</option>
              </Select>
            </Stack>
            <Stack>
              <Text as="label">Admin name</Text>
              <Input
                name="name"
                value={adminToEdit?.name}
                onChange={handleDetailsChange}
                isRequired
                placeholder="Enter Admin name"
                size="lg"
              />
            </Stack>

            <Stack>
              <Text as="label">Admin email</Text>
              <Input
                name="email"
                value={adminToEdit?.email}
                onChange={handleDetailsChange}
                type="email"
                isRequired
                placeholder="Enter Admin email"
                size="lg"
              />
            </Stack>

            {/* <Stack>
              <Text as="label">Admin password</Text>
              <Input
                name="password"
                value={adminToEdit?.password}
                onChange={handleDetailsChange}
                type="password"
                isRequired
                placeholder="Enter Admin password"
                size="lg"
              />
            </Stack> */}
          </Stack>
        </ModalBody>

        <ModalFooter pt={8}>
          <Button
            isLoading={data.isEditingAdmin}
            loadingText="Updating..."
            type="submit"
            h="60px"
            w="full"
            colorScheme="primary"
          >
            Update credentials
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
