import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Show,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { navLinks } from "utils/constants";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { TiUserOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import MenuDrawer from "./MenuDrawer";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userDetails } = useSelector((state) => state.user);

  return (
    <Box>
      <Flex minH="100vh" align="stretch">
        <Show above="lg">
          <Stack
            shadow="0px 4px 30px rgba(0, 0, 0, 0.05)"
            pos="fixed"
            left={0}
            h="full"
            pt={4}
            w={232}
            spacing={88}
          >
            <Logo pl={4} maxW={100} />
            <Stack spacing={4}>
              {navLinks.map(({ name, icon, href }) => {
                const isSelected = router.asPath.includes(href);
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
                    >
                      <Icon as={icon} />
                      <Text>{name}</Text>
                    </HStack>
                  </Link>
                );
              })}
            </Stack>
          </Stack>
        </Show>

        <Stack ml={[0, 0, 0, 232]} w="full" bg="#fdfdfd">
          <HStack
            bg="white"
            shadow="sm"
            justify="space-between"
            px={["5%", "5%", "5%", 10]}
            py={3}
          >
            <Box>
              <Show below="lg">
                <HStack>
                  <IconButton
                    onClick={onOpen}
                    variant="ghost"
                    color="gray.600"
                    fontSize={22}
                    icon={<GiHamburgerMenu />}
                  />
                  <MenuDrawer isOpen={isOpen} onClose={onClose} />
                  <Logo maxW={90} />
                </HStack>
              </Show>
            </Box>

            <HStack spacing={4}>
              <Avatar
                w={9}
                h={9}
                cursor="pointer"
                bg="gray.50"
                rounded={8}
                icon={<IoMdNotificationsOutline fontSize={20} />}
              >
                <AvatarBadge
                  top={-2}
                  border="0"
                  boxSize={4}
                  color="white"
                  fontSize="xs"
                  bg="red.400"
                >
                  1
                </AvatarBadge>
              </Avatar>

              <Menu placement="bottom-end">
                <MenuButton textAlign="left">
                  <HStack>
                    <Avatar
                      name={userDetails?.name?.split(" ")?.[0]}
                      width={8}
                      height={8}
                    />
                  </HStack>
                </MenuButton>
                <MenuList px={1} py={2} color="blue.800">
                  <MenuItem
                    fontWeight={500}
                    as={Button}
                    variant="ghost"
                    bg="transparent"
                    justifyContent="flex-start"
                    onClick={() => Router.push("/admin/accounts")}
                    leftIcon={<TiUserOutline />}
                    iconSpacing={10}
                    color="primary.500"
                  >
                    Account
                  </MenuItem>
                  <MenuDivider m={0} />
                  <MenuItem
                    as={Button}
                    variant="ghost"
                    bg="transparent"
                    justifyContent="flex-start"
                    leftIcon={<BiLogOut />}
                    iconSpacing={10}
                    onClick={() => Router.push("/admin/login")}
                    fontWeight={500}
                    color="gray.500"
                  >
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>

          {children}
        </Stack>
      </Flex>
    </Box>
  );
}
