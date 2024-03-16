import { Stack, Text, Icon } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type LayoutProps = {
  children: any;
};

export function Layout({ children }: LayoutProps) {
  const naviate = useNavigate();

  return (
    <Stack padding={50} spacing={5}>
      <>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text onClick={() => naviate("/")}>MY STORE</Text>
          <Stack direction="row" alignItems="center">
            <Icon as={FaShoppingCart} boxSize={10}></Icon>
            <Text as="b">( 1 )</Text>
          </Stack>
        </Stack>

        {children}
      </>
    </Stack>
  );
}
