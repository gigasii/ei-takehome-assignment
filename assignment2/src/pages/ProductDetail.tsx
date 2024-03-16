import {
  Text,
  Heading,
  Stack,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ProductItem } from "../types/product";
import { GET_PRODUCT_KEY, getProduct } from "../queries/product";
import { PageLoadingSpinner } from "../components/Spinner";
import { useState } from "react";

export function ProductDetailPage() {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState<ProductItem | undefined>(undefined);

  const { status } = useQuery<ProductItem>(
    [GET_PRODUCT_KEY],
    async () => getProduct(Number(productId)),
    {
      enabled: !!productId,
      onSuccess: (data) => setProduct(data),
    }
  );

  console.log(status);

  const addToCartHandler = () => {
    toast({
      title: "Added to cart",
      description: "Item has been added to cart successfully",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  if (status === "error" || status === "idle") {
    return <Text>Error, please try again later</Text>;
  }

  if (!product) {
    return <PageLoadingSpinner />;
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={5}
    >
      <Image src={product.image} alt={product.image} boxSize="300px" />
      <Text as="b" fontSize="5xl">
        $ {product.price}
      </Text>
      <Heading size="md" pt={2}>
        {product.title}
      </Heading>
      <Stack direction="row">
        {new Array(Math.ceil(product.rating.rate)).fill("").map(() => (
          <Text>⭐</Text>
        ))}
      </Stack>
      <Text>Reviewd by {product.rating.count} people</Text>
      <Stack alignItems="flex-start" justifyContent="flex-start" spacing={3}>
        <Text as="b">Description:</Text>
        <Text>{product.description} people</Text>
        <Text as="b">Category:</Text>
        <Text>{product.category} people</Text>
      </Stack>
      <Button colorScheme="red" size="lg" onClick={addToCartHandler}>
        Add to cart
      </Button>
    </Stack>
  );
}
