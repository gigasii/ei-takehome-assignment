import {
  Text,
  Heading,
  Stack,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";

export function ProductDetailPage() {
  const toast = useToast();
  const addToCartHandler = () => {
    toast({
      title: "Added to cart",
      description: "Item has been added to cart successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

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

const product = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};
