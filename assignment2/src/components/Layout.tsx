import { Stack, Text, Icon } from "@chakra-ui/react";
import { useContext } from "react";
import { FaShoppingCart, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../store/context";

type LayoutProps = {
  children: JSX.Element;
};

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const totalItemsInCart = Object.entries(cartItems).reduce((acc, curr) => {
    const [_, otherFields] = curr;
    return acc + otherFields.quantity;
  }, 0);

  return (
    <Stack padding={50} spacing={5}>
      <>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Icon as={FaHome} boxSize={10} onClick={() => navigate("/")} />
            <Text>MY STORE</Text>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Icon
              as={FaShoppingCart}
              boxSize={10}
              onClick={() => navigate("/cart")}
            />
            <Text as="b">[ {totalItemsInCart} ]</Text>
          </Stack>
        </Stack>

        {children}
      </>
    </Stack>
  );
}
