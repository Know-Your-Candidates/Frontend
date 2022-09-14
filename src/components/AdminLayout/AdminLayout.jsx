import {
  Avatar,
  AvatarBadge,
  Box,
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
} from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { navLinks } from "utils/constants";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

export default function AdminLayout({ children }) {
  const router = useRouter();

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
                const isSelected = router.asPath === href;
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
                    variant="ghost"
                    color="gray.600"
                    fontSize={22}
                    icon={<GiHamburgerMenu />}
                  />
                  <Logo maxW={90} />
                </HStack>
              </Show>
            </Box>

            <HStack spacing={4}>
              <Avatar
                w={9}
                h={9}
                cursor="pointer"
                bg="gray.100"
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
                    <Avatar name="AK" width={8} height={8} />
                  </HStack>
                </MenuButton>
                <MenuList color="blue.800">
                  <MenuItem
                    onClick={() => Router.push("/login")}
                    fontWeight={500}
                    color="red.400"
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
