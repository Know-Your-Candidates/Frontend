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

export default function AspirantCard({ aspirant, setSelectedAspirant }) {
  return (
    <GridItem cursor="pointer">
      <Stack
        align="flex-end"
        rounded={8}
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
        bgImage={aspirant.candidate_image}
        w="full"
        p={3}
        h={237}
      >
        <Image
          shadow="lg"
          objectFit="cover"
          boxSize={70}
          rounded={8}
          src={aspirant.party_image}
        />
      </Stack>
      <HStack pt={3} justify="space-between">
        <Text fontWeight="bold" textTransform="capitalize">
          {aspirant.name}
        </Text>

        <HStack>
          <Icon as={GrFlag} />
          <Text>{aspirant.party}</Text>
        </HStack>
      </HStack>
      <HStack mt={2} justify="space-between">
        <Text>{aspirant.gender}</Text>
      </HStack>

      <Button
        onClick={() => setSelectedAspirant(aspirant)}
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
