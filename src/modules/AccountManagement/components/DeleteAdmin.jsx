import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Avatar,
  Text,
} from "@chakra-ui/react";

export default function DeleteAdmin({
  admin,
  isOpen,
  onClose,
  handleConfirmDelete,
  isDeleting,
}) {
  return (
    <Modal size="sm" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent rounded={24}>
        <ModalHeader textAlign="center">Delete {admin?.name}?</ModalHeader>
        <ModalCloseButton />
        <ModalBody py={8}>
          <VStack spacing={8}>
            <Avatar name={admin?.name} size="xl" />
            <Text color="gray.500" textAlign="center">
              Deleting this admin user means they willl no longer be able to
              view their Dashboard. Are you sure you want to continue?
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack w="full" justify="space-between">
            <Button variant="ghost" isDisabled={isDeleting} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={isDeleting}
              loadingText="Deleting..."
              onClick={handleConfirmDelete}
              colorScheme="red"
              size="lg"
            >
              Confirm delete
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
