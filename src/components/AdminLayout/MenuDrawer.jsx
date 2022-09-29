import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  HStack,
  Icon,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import Link from "next/link";
import { navLinks } from "utils/constants";
import Router from "next/router";
import { BiLogOut } from "react-icons/bi";

export default function MenuDrawer({ isOpen, onOpen, onClose }) {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Logo />
        </DrawerHeader>
        <DrawerCloseButton top={5} />

        <DrawerBody px={0} pt={8}>
          <Stack h="full" justify="space-between">
            <Stack spacing={4}>
              {navLinks.map(({ name, icon, href }) => {
                const isSelected = Router.asPath.includes(href);
                return (
                  <Link href={href} key={href}>
                    <HStack
                      cursor="pointer"
                      h={43}
                      boxShadow={isSelected ? "md" : "none"}
                      color={isSelected ? "primary.500" : "black"}
                      borderLeft="2px solid"
                      borderColor={isSelected ? "primary.500" : "transparent"}
                      pl={5}
                      spacing={4}
                    >
                      <Icon as={icon} />
                      <Text>{name}</Text>
                    </HStack>
                  </Link>
                );
              })}
            </Stack>

            <Flex px={3}>
              <Button
                variant="ghost"
                bg="transparent"
                justifyContent="flex-start"
                leftIcon={<BiLogOut />}
                iconSpacing={4}
                onClick={() => Router.push("/admin/login")}
                fontWeight={500}
                color="red.500"
              >
                Sign out
              </Button>
            </Flex>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
