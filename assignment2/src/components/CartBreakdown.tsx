import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { CartContext } from "../store/context";

export function CartBreakdown() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const totalCost = Object.entries(cartItems).reduce((acc, curr) => {
    const [_, otherFields] = curr;
    return acc + otherFields.quantity * otherFields.price;
  }, 0);

  const ammendQuantity = (productId: number, isAdd: boolean) => {
    const quantityChangeAmount = isAdd ? 1 : -1;

    setCartItems((previousCartItems) => {
      const isQuantityZero =
        previousCartItems[productId].quantity + quantityChangeAmount === 0;

      // If quanity is zero, remove product
      if (isQuantityZero) {
        const { [productId]: id, ...restOfTheProducts } = previousCartItems;
        return restOfTheProducts;
      }

      return {
        ...previousCartItems,
        [productId]: {
          ...previousCartItems[productId],
          quantity:
            previousCartItems[productId].quantity + quantityChangeAmount,
        },
      };
    });
  };

  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <TableCaption>
          Total cost: <b>${parseFloat(totalCost.toString()).toFixed(2)}</b>
        </TableCaption>
        <Thead>
          <Tr>
            <Th width="fit-content">Name of product</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Adjust quantity </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(cartItems).map(([productId, productFields]) =>
            productFields.quantity !== 0 ? (
              <Tr>
                <Td>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Image
                      src={productFields.image}
                      alt={productFields.image}
                      boxSize="50px"
                    />
                    <Text>{productFields.title}</Text>
                  </Stack>
                </Td>
                <Td>$ {productFields.price}</Td>
                <Td>{productFields.quantity}</Td>
                <Td>
                  <Stack direction="row" spacing={3}>
                    <IconButton
                      icon={<FaPlus />}
                      variant="outline"
                      colorScheme="teal"
                      aria-label="plus"
                      fontSize="20px"
                      onClick={() => ammendQuantity(Number(productId), true)}
                    />
                    <IconButton
                      icon={<FaMinus />}
                      variant="outline"
                      colorScheme="teal"
                      aria-label="minus"
                      fontSize="20px"
                      onClick={() => ammendQuantity(Number(productId), false)}
                    />
                  </Stack>
                </Td>
              </Tr>
            ) : (
              <></>
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
