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
import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export function CartBreakdown() {
  const [totalCost, setTotalCost] = useState(0);

  const calculateTotal = () => {
    let cost = 0;
    items.map((item) => {
      cost += item.price * item.quantity;
    });
    setTotalCost(cost);
  };

  const plusQuantity = (itemId: number) => {
    console.log(`plus clicked on item: ${itemId}`);
  };

  const minusQuantity = (itemId: number) => {
    console.log(`minus clicked on item: ${itemId}`);
  };

  useEffect(() => {
    calculateTotal();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <TableCaption>
          Total cost: <b>${parseFloat(totalCost.toString()).toFixed(2)}</b>
        </TableCaption>
        <Thead>
          <Tr>
            <Th width="fit-content">Name of product</Th>
            <Th>Quantity</Th>
            <Th>Adjust quantity </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr>
              <Td>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Image src={item.image} alt={item.image} boxSize="50px" />
                  <Text>{item.title}</Text>
                </Stack>
              </Td>
              <Td>{item.quantity}</Td>
              <Td>
                <Stack direction="row" spacing={3}>
                  <IconButton
                    icon={<FaPlus />}
                    variant="outline"
                    colorScheme="teal"
                    aria-label="plus"
                    fontSize="20px"
                    onClick={() => plusQuantity(item.id)}
                  />
                  <IconButton
                    icon={<FaMinus />}
                    variant="outline"
                    colorScheme="teal"
                    aria-label="minus"
                    fontSize="20px"
                    onClick={() => minusQuantity(item.id)}
                  />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

const items = [
  {
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 100,
    quantity: 2,
  },
  {
    id: 2,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    title: "Mens Cotton Jacket",
    price: 22.3,
    quantity: 3,
  },
];
