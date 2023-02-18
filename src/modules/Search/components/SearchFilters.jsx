import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  HStack,
  Select,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Show,
  StackDivider,
  Collapse,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CgOptions } from "react-icons/cg";
import { useDispatch } from "react-redux";
import {
  fetchFilterOptions,
  fetchLocationIds,
} from "redux/slices/candidateSlice";

export default function SearchFilters({
  filterOptions,
  changeFilterOptions,
  filterList,
  updateFilterList,
  locationIds,
  setLocationIds,
}) {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const getLocationIds = async (payload) => {
    const ids = await dispatch(fetchLocationIds(payload)).unwrap();

    setLocationIds(ids);
  };

  useEffect(() => {
    changeFilterOptions({
      // senatorial_district: undefined,
      // federal_constituency: undefined,
      // state_constituency: undefined,
      lga: undefined,
      ward: undefined,
      polling_unit: undefined,
    });
    if (!selectedFilters.state) {
      setLocationIds([]);
      return;
    }
    const fetchStateFilterDependants = async () => {
      const lgas = await dispatch(
        fetchFilterOptions({ state: selectedFilters.state, filter: "lga" })
      ).unwrap();

      await getLocationIds({ state: selectedFilters.state });
      changeFilterOptions(lgas);
    };
    fetchStateFilterDependants();
  }, [selectedFilters.state]);

  useEffect(() => {
    changeFilterOptions({ ward: undefined, polling_unit: undefined });
    if (!selectedFilters.lga) return;
    const fetchWards = async () => {
      const wards = await dispatch(
        fetchFilterOptions({ lga: selectedFilters.lga, filter: "ward" })
      ).unwrap();

      await getLocationIds({ lga: selectedFilters.lga });
      changeFilterOptions(wards);
    };
    fetchWards();
  }, [selectedFilters.lga]);

  useEffect(() => {
    changeFilterOptions({ polling_unit: undefined });
    if (!selectedFilters.ward) return;
    const fetchUnits = async () => {
      const units = await dispatch(
        fetchFilterOptions({
          ward: selectedFilters.ward,
          filter: "polling_unit",
        })
      ).unwrap();

      await getLocationIds({ ward: selectedFilters.ward });
      changeFilterOptions(units);
    };
    fetchUnits();
  }, [selectedFilters.ward]);

  useEffect(() => {
    if (!selectedFilters.polling_unit) return;
    getLocationIds({ polling_unit: selectedFilters.polling_unit });
  }, [selectedFilters.polling_unit]);

  const changeFilterValue = (updates) => {
    if (Object.keys(updates)[0] === "age_bracket") {
      updates["min_age"] = updates.age_bracket?.split(" - ")?.[0];
      updates["max_age"] = updates.age_bracket?.split(" - ")?.[1];
    }

    setSelectedFilters((prev) => ({ ...prev, ...updates }));
  };

  const modalDisclosure = useDisclosure();
  const collapsibleDisclosure = useDisclosure();

  const confirmFilters = () => {
    updateFilterList(selectedFilters);

    modalDisclosure.onClose();
    collapsibleDisclosure.onClose();
  };

  const resetFilters = () => {
    updateFilterList({});
    setSelectedFilters({});
    setLocationIds([]);
    modalDisclosure.onClose();
    collapsibleDisclosure.onClose();
  };

  const toggleShowAllFilters = () => {
    if (showAllFilters) {
      setSelectedFilters((prev) => ({
        ...prev,
        qualifications: undefined,
        state: undefined,
        lga: undefined,
        ward: undefined,
        polling_unit: undefined,
        polling_unit_code: undefined,
      }));
    }
    setShowAllFilters(!showAllFilters);
  };

  const noAppliedFilters = !Object.values(filterList).filter(Boolean).length;

  return (
    <Stack spacing={4} w="full">
      {/* <HStack justify="space-between">
        <HStack>
          <Show ssr above="lg">
            <Button
              onClick={collapsibleDisclosure.onToggle}
              variant={noAppliedFilters ? "outline" : "solid"}
              rightIcon={<CgOptions />}
            >
              Use Filters
            </Button>
          </Show>

          <Show ssr below="lg">
            <Button
              onClick={modalDisclosure.onOpen}
              variant={noAppliedFilters ? "outline" : "solid"}
              rightIcon={<CgOptions />}
            >
              Use Filters
            </Button>
          </Show>
        </HStack>
        {collapsibleDisclosure.isOpen && (
          <Show ssr above="lg">
            <CloseButton onClick={collapsibleDisclosure.onClose} />
          </Show>
        )}
      </HStack> */}

      <Show ssr below="lg">
        {/* <Drawer
        placement="bottom"
        onClose={modalDisclosure.onClose}
        isOpen={modalDisclosure.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent height="90vh" borderTopRadius={12}>
          <DrawerCloseButton />
          <DrawerHeader py={3} borderBottomWidth="1px">
            <HStack justify="space-between">
              <Text>Filters</Text>

              <HStack spacing={6} pr={8}>
                <Button
                  onClick={confirmFilters}
                  size="sm"
                  colorScheme="primary"
                  variant="link"
                >
                  Get Candidates
                </Button>

                <Button onClick={resetFilters} size="sm" variant="link">
                  Reset
                </Button>
              </HStack>
            </HStack>
          </DrawerHeader>
          <DrawerBody overflowY="auto" overflowX="hidden" px={4}> */}
        <Stack divider={<StackDivider />} spacing={0}>
          {Object.keys(filterOptions)
            .slice(0, showAllFilters ? 20 : 4)
            .map((filterKey) => (
              <Select
                key={filterKey}
                h={51}
                variant="flushed"
                placeholder={filterKey.split("_").join(" ").toUpperCase()}
                value={selectedFilters[filterKey] || ""}
                onChange={(event) =>
                  changeFilterValue({
                    [filterKey]: event.target.value || undefined,
                  })
                }
              >
                {filterOptions[filterKey]?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            ))}

          <Input
            h={51}
            variant="flushed"
            placeholder="Polling unit code"
            type="number"
            value={selectedFilters["polling_unit_code"] || ""}
            onChange={(event) =>
              changeFilterValue({
                polling_unit_code: event.target.value || undefined,
              })
            }
          />
          <Stack pt={8}>
            <Button
              leftIcon={
                showAllFilters ? <ChevronUpIcon /> : <ChevronDownIcon />
              }
              textDecor="underline"
              onClick={toggleShowAllFilters}
              minW={173}
              colorScheme="primary"
              size="lg"
              variant="link"
            >
              {showAllFilters ? "Simple" : "Advanced"} Search
            </Button>
          </Stack>
        </Stack>
        {/* </DrawerBody>
        </DrawerContent>
      </Drawer> */}
      </Show>

      {/* <Collapse in={collapsibleDisclosure.isOpen} animateOpacity> */}
      <Show ssr above="lg">
        <Stack spacing={4} bg="gray.50" p={6} rounded={8}>
          <Wrap spacingX={8} spacingY={5}>
            {Object.keys(filterOptions)
              .slice(0, showAllFilters ? 20 : 4)
              .map((filterKey) => (
                <WrapItem key={filterKey}>
                  <Stack>
                    <Text
                      textTransform="capitalize"
                      fontWeight={500}
                      as="label"
                    >
                      {filterKey.split("_").join(" ")}
                    </Text>
                    <Select
                      variant="outline"
                      placeholder="Select"
                      size="lg"
                      w="full"
                      value={selectedFilters[filterKey] || ""}
                      onChange={(event) =>
                        changeFilterValue({
                          [filterKey]: event.target.value || undefined,
                        })
                      }
                      minW={173}
                    >
                      {filterOptions[filterKey]?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </Stack>
                </WrapItem>
              ))}

            {!showAllFilters && (
              <WrapItem alignItems="center">
                <Stack>
                  <Text textTransform="capitalize" fontWeight={500} as="label">
                    OR
                  </Text>
                </Stack>
              </WrapItem>
            )}

            <WrapItem>
              <Stack>
                <Text textTransform="capitalize" fontWeight={500} as="label">
                  PVC Code
                </Text>
                <Input
                  variant="outline"
                  placeholder="Enter code"
                  size="lg"
                  value={selectedFilters["polling_unit_code"] || ""}
                  onChange={(event) =>
                    changeFilterValue({
                      polling_unit_code: event.target.value || undefined,
                    })
                  }
                  minW={173}
                />
              </Stack>
            </WrapItem>

            <WrapItem alignItems="center">
              <Button
                leftIcon={
                  showAllFilters ? <ChevronUpIcon /> : <ChevronDownIcon />
                }
                textDecor="underline"
                onClick={toggleShowAllFilters}
                minW={173}
                colorScheme="primary"
                size="lg"
                variant="link"
              >
                {showAllFilters ? "Simple" : "Advanced"} Search
              </Button>
            </WrapItem>
          </Wrap>
        </Stack>
      </Show>
      {/* </Collapse> */}
      <HStack spacing={4}>
        <Button
          onClick={confirmFilters}
          w="full"
          maxW={173}
          colorScheme="primary"
          size="lg"
        >
          Get Candidates
        </Button>
        <Button
          size="lg"
          color="gray.700"
          onClick={resetFilters}
          variant="outline"
        >
          Reset Filters
        </Button>
      </HStack>
    </Stack>
  );
}
