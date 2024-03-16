import { Stack } from "@chakra-ui/react";
import { CartBreakdown } from "../components/CartBreakdown";

export function CartPage() {
  return (
    <Stack pt={10}>
      <CartBreakdown />
    </Stack>
  );
}
