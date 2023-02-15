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
  Show,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import Router from "next/router";
import React from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { BarLoader } from "react-spinners";
import theme from "theme";
import AspirantCard from "./components/AspirantCard";
import AspirantDetails from "./components/AspirantDetails";
import SearchFilters from "./components/SearchFilters";
import useSearchHook from "./useSearch";

export default function Search({ urlQuery }) {
  const {
    query,
    setQuery,
    debouncedOnChange,
    candidates,
    isLoading,
    filterOptions,
    changeFilterOptions,
    locationIds,
    setLocationIds,
    filterList,
    updateFilterList,
    selectedAspirant,
    setSelectedAspirant,
    backToSearchResults,
    page,
    setPage,
    handlePageClick,
  } = useSearchHook(urlQuery);

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
                onChange={(event) => {
                  setQuery(event.target.value);
                  debouncedOnChange(event.target.value);
                }}
                placeholder="Search for a candidate..."
                variant="unstyled"
                size="lg"
              />
              {/* <Show ssr above="sm">
                <Divider orientation="vertical" maxH={38} />
              </Show>
              <Show ssr above="sm">
                <Select variant="unstyled" size={["sm", "sm", "lg"]} maxW={180}>
                  <option value="Political parties">Political parties</option>
                </Select>
              </Show> */}
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
          {!!query.trim() && (
            <Heading fontSize={32} textAlign="center">
              Results for “{query}”
            </Heading>
          )}

          <SearchFilters
            filterList={filterList}
            filterOptions={filterOptions}
            changeFilterOptions={changeFilterOptions}
            updateFilterList={updateFilterList}
            locationIds={locationIds}
            setLocationIds={setLocationIds}
          />

          {!!query.trim() || !!Object.keys(filterList).length ? (
            <Stack>
              {candidates?.count !== undefined && (
                <Box w="full">
                  <Text w="full" textAlign="left" fontWeight="bold">
                    {candidates?.count} results found
                  </Text>
                </Box>
              )}

              <Grid
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(4, 1fr)",
                ]}
                columnGap={8}
                rowGap={12}
              >
                {candidates.results.map((aspirant) => (
                  <AspirantCard
                    aspirant={aspirant}
                    setSelectedAspirant={setSelectedAspirant}
                    key={aspirant.id}
                  />
                ))}
              </Grid>

              {isLoading && (
                <VStack spacing={3}>
                  <BarLoader
                    height={6}
                    width={250}
                    color={theme.colors.primary["500"]}
                    radius={8}
                  />
                  <Text color="gray.500">Loading candidates...</Text>
                </VStack>
              )}

              <br />
              <HStack justify="center">
                {!isLoading && candidates.count && (
                  <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    breakLabel="..."
                    breakClassName="break"
                    initialPage={page}
                    forcePage={page}
                    pageCount={Math.ceil(candidates.count / 25)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    disableInitialCallback
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                  />
                )}
              </HStack>
            </Stack>
          ) : (
            <Heading
              textAlign="center"
              fontWeight={["normal", "bold"]}
              fontSize={["md", "2xl"]}
            >
              Enter a search query or use the filters to get results
            </Heading>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
