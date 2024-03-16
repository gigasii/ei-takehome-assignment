import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  Stack,
  StackDivider,
  Box,
  Image,
  Button,
} from "@chakra-ui/react";
import { ProductItem } from "../types/product";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  product: ProductItem;
};

export function ProductCard({ product }: ProductCardProps) {
  const naviate = useNavigate();

  const seeDetailsHandler = (productId: number) => {
    naviate(`/product-details?productId=${productId}`);
  };

  return (
    <Card direction="row">
      <CardHeader width="300px">
        <Image src={product.image} alt={product.image} boxSize="100px" />
        <Heading size="md" pt={2}>
          {product.title}
        </Heading>
        <Stack direction="row">
          {new Array(Math.ceil(product.rating.rate)).fill("").map(() => (
            <Text>⭐</Text>
          ))}
        </Stack>
        <Text>Reviewd by {product.rating.count} people</Text>
        <Button
          colorScheme="blue"
          mt={5}
          onClick={() => seeDetailsHandler(product.id)}
        >
          See details
        </Button>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Price
            </Heading>
            <Text pt="2" fontSize="sm">
              $ {product.price}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Text pt="2" fontSize="sm">
              {product.description}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Category
            </Heading>
            <Text pt="2" fontSize="sm">
              {product.category}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
