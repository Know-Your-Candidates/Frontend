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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CgOptions } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { fetchFilterOptions } from "redux/slices/candidateSlice";

export default function SearchFilters({
  filterOptions,
  changeFilterOptions,
  filterList,
  updateFilterList,
}) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    changeFilterOptions({
      senatorial_district: undefined,
      federal_constituency: undefined,
      state_constituency: undefined,
      lga: undefined,
      ward: undefined,
      polling_unit: undefined,
    });
    if (!selectedFilters.state) return;
    const fetchStateFilterDependants = async () => {
      const stateDependants = await Promise.all(
        [
          "senatorial_district",
          "federal_constituency",
          "state_constituency",
          "lga",
        ].map((key) => {
          return dispatch(
            fetchFilterOptions({ state: selectedFilters.state, filter: key })
          ).unwrap();
        })
      );

      changeFilterOptions(Object.assign({}, ...stateDependants));
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
      changeFilterOptions(units);
    };
    fetchUnits();
  }, [selectedFilters.ward]);

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
    modalDisclosure.onClose();
    collapsibleDisclosure.onClose();
  };

  const noAppliedFilters = !Object.values(filterList).filter(Boolean).length;

  return (
    <Stack spacing={4} w="full">
      <HStack justify="space-between">
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

          <Show ssr above="lg">
            <Button onClick={resetFilters} variant="outline">
              Reset Filters
            </Button>
          </Show>
        </HStack>
        {collapsibleDisclosure.isOpen && (
          <Show ssr above="lg">
            <CloseButton onClick={collapsibleDisclosure.onClose} />
          </Show>
        )}
      </HStack>

      <Drawer
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
                  Apply Filters
                </Button>

                <Button onClick={resetFilters} size="sm" variant="link">
                  Reset
                </Button>
              </HStack>
            </HStack>
          </DrawerHeader>
          <DrawerBody overflowY="auto" overflowX="hidden" px={4}>
            <Stack divider={<StackDivider />} spacing={0}>
              {Object.keys(filterOptions).map((filterKey) => (
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
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Collapse in={collapsibleDisclosure.isOpen} animateOpacity>
        <HStack bg="gray.50" p={6} rounded={8}>
          <Wrap spacingX={8} spacingY={5}>
            {Object.keys(filterOptions).map((filterKey) => (
              <WrapItem key={filterKey}>
                <Stack>
                  <Text textTransform="capitalize" fontWeight={500} as="label">
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
            <WrapItem alignItems="flex-end">
              <Button
                onClick={confirmFilters}
                minW={173}
                colorScheme="primary"
                size="lg"
              >
                Apply
              </Button>
            </WrapItem>
          </Wrap>
        </HStack>
      </Collapse>
    </Stack>
  );
}
