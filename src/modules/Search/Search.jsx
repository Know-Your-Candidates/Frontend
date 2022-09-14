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
import Router from "next/router";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { CgOptions } from "react-icons/cg";
import { GrFlag } from "react-icons/gr";
import AspirantCard from "./components/AspirantCard";
import AspirantDetails from "./components/AspirantDetails";
import SearchFilters from "./components/SearchFilters";
import useSearch from "./useSearch";

export default function Search() {
  const {
    query,
    setQuery,
    selectedAspirant,
    setSelectedAspirant,
    backToSearchResults,
  } = useSearch();

  if (selectedAspirant) {
    return (
      <AspirantDetails
        selectedAspirant={selectedAspirant}
        backToSearchResults={backToSearchResults}
      />
    );
  }

  return (
    <Box bg="blackAlpha.100">
      <Stack direction="row" w="full" justify="center" pt={8} px="6%">
        <Stack spacing={12} align="center" w="full" maxW="6xl">
          <Flex w="full">
            <Logo w={150} />
          </Flex>

          <Stack w="full" maxW={1070} spacing={9}>
            <Flex>
              <Button
                onClick={() => Router.push("/")}
                variant="link"
                leftIcon={<BsArrowLeft />}
              >
                Back to home
              </Button>
            </Flex>

            <HStack
              align="center"
              h={[70, 70, 88]}
              w="full"
              bg="white"
              shadow="lg"
              spacing={[1, 4]}
              rounded={12}
              borderBottom="4px solid"
              borderColor="primary.200"
              px={[4, 8]}
            >
              <Icon as={Search2Icon} boxSize={15} />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for a candidate..."
                variant="unstyled"
                size="lg"
              />
              <Divider orientation="vertical" maxH={38} />
              <Select variant="unstyled" size={["sm", "sm", "lg"]} maxW={180}>
                <option value="Political parties">Political parties</option>
              </Select>
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        w="full"
        justify="center"
        pt={24}
        roundedTop={20}
        bg="white"
        mt={-12}
        pb={[9, 10, 40]}
        px="6%"
      >
        <Stack spacing={8} align="center" w="full" maxW="7xl">
          {query && (
            <Heading fontSize={32} textAlign="center">
              Results for “{query}”
            </Heading>
          )}

          <SearchFilters />

          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
            columnGap={3}
            rowGap={12}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
              <AspirantCard
                setSelectedAspirant={setSelectedAspirant}
                key={index}
              />
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
