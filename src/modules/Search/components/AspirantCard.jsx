import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { CgOptions } from "react-icons/cg";
import { GrFlag } from "react-icons/gr";

export default function AspirantCard({ setSelectedAspirant }) {
  return (
    <GridItem cursor="pointer">
      <Image src="/images/aspirant.png" />
      <HStack justify="space-between">
        <Text>Peter Obi</Text>

        <HStack>
          <Icon as={GrFlag} />
          <Text>LP</Text>
        </HStack>
      </HStack>
      <HStack mt={18} justify="space-between">
        <Text>Male</Text>
      </HStack>

      <Button
        onClick={() => setSelectedAspirant(1)}
        mt={19}
        rounded={12}
        colorScheme="black"
        variant="outline"
      >
        See details
      </Button>
    </GridItem>
  );
}
