import { Button, GridItem, HStack, Icon, Stack, Text } from "@chakra-ui/react";
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
        bgImage={aspirant.party?.image}
        w="full"
        p={3}
        h={237}
      >
        {/* <Image
          shadow="lg"
          objectFit="cover"
          boxSize={70}
          rounded={8}
          src={aspirant.party?.image}
        /> */}
      </Stack>
      <HStack pt={3} justify="space-between">
        <Text fontWeight="bold" textTransform="capitalize">
          {aspirant.name}
        </Text>

        <HStack>
          <Icon as={GrFlag} />
          <Text textTransform="uppercase">{aspirant.party?.name}</Text>
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
