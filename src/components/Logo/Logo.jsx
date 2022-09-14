import { Image } from "@chakra-ui/image";
import Router from "next/router";

export const Logo = ({ white, notLinked, ...rest }) => {
  return (
    <Image
      cursor={notLinked ? "default" : "pointer"}
      onClick={() => !notLinked && Router.push(`/`)}
      src="/logo.svg"
      {...rest}
    />
  );
};
