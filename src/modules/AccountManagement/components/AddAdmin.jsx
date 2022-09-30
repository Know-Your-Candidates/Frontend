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

const initialAdminDetails = {
  name: "",
  email: "",
  password: "",
  account_type: "",
};

export default function AddAdmin({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    data.setAdminToAdd(initialAdminDetails);
    data.setHasAddedAdmin(false);
    onClose();
  };

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="primary" size="lg" w={183} h={59}>
        Add new admin
      </Button>

      <Modal
        scrollBehavior="inside"
        isCentered
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        {data.hasAddedAdmin ? (
          <ConfirmationSuccessView data={data} />
        ) : (
          <AdminForm data={data} />
        )}
      </Modal>
    </Box>
  );
}

const AdminForm = ({
  data: { isAddingAdmin, adminToAdd, setAdminToAdd, handleAddAdmin },
}) => {
  const handleDetailsChange = (event) => {
    setAdminToAdd((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <ModalContent onSubmit={handleAddAdmin} as="form">
      <ModalHeader>Add new admin</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={6}>
          <Stack>
            <Text as="label">Admin type</Text>
            <Select
              name="account_type"
              value={adminToAdd.account_type}
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
              value={adminToAdd.name}
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
              value={adminToAdd.email}
              onChange={handleDetailsChange}
              type="email"
              isRequired
              placeholder="Enter Admin email"
              size="lg"
            />
          </Stack>

          <Stack>
            <Text as="label">Admin password</Text>
            <Input
              name="password"
              value={adminToAdd.password}
              onChange={handleDetailsChange}
              type="password"
              isRequired
              placeholder="Enter Admin password"
              size="lg"
            />
          </Stack>
        </Stack>
      </ModalBody>

      <ModalFooter pt={8}>
        <Button
          isLoading={isAddingAdmin}
          loadingText="Creating..."
          type="submit"
          h="60px"
          w="full"
          colorScheme="primary"
        >
          Create admin
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

const ConfirmationSuccessView = ({ data: { adminToAdd } }) => {
  const { onCopy } = useClipboard(
    `Email address: ${adminToAdd.email} \n\n Password: ${adminToAdd.password}`
  );
  const sendCredentials = () => {
    window.open(
      `mailto:${adminToAdd.email}?subject=Your new credentials&body=Dear ${adminToAdd.name}, Here are your new login credentials: \n\n Email address: ${adminToAdd.email} \n\n Password: ${adminToAdd.password}`
    );
  };

  return (
    <ModalContent as="form">
      <ModalHeader>New admin created successfully</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack align="center" spacing={8}>
          <Image src="/illustrations/success.svg" />

          <VStack w="full">
            <Text textAlign="center">See created credentials</Text>

            <Stack rounded={12} spacing={6} bg="blackAlpha.100" p={4} w="full">
              <Stack>
                <HStack justify="space-between" align="flex-end">
                  <Text fontSize="xs" color="gray.500">
                    Email
                  </Text>

                  <IconButton
                    onClick={onCopy}
                    bg="gray.300"
                    size="sm"
                    rounded="full"
                    icon={<IoIosCopy />}
                  />
                </HStack>
                <Text>{adminToAdd.email}</Text>
              </Stack>

              <Stack>
                <Text fontSize="xs" color="gray.500">
                  Password
                </Text>
                <Text>{adminToAdd.password}</Text>
              </Stack>
            </Stack>
          </VStack>
        </Stack>
      </ModalBody>

      <ModalFooter pt={8}>
        <Button
          onClick={sendCredentials}
          h="60px"
          w="full"
          colorScheme="primary"
        >
          Send credentials to mail
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
