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

export default function ConfirmDeleteCSV({
  csv,
  isOpen,
  onClose,
  handleConfirmDelete,
  isDeleting,
}) {
  return (
    <Modal size="sm" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent rounded={20}>
        <ModalHeader textAlign="center">Delete this CSV data?</ModalHeader>
        <ModalCloseButton isDisabled={isDeleting} />
        <ModalBody>
          <VStack>
            <Text color="gray.500" textAlign="center">
              Deleting this CSV will remove all data that has been uploaded to
              the database from this CSV. Are you sure you want to continue?
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
