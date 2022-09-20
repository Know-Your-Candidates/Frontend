import { Center } from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import React from "react";

export default function PageLoadingAnimation() {
  return (
    <Center minH="100vh" flexDirection="column">
      <Logo w={200} mb={4} />
    </Center>
  );
}
