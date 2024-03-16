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
import { useContext, useState } from "react";
import { CartContext } from "../store/context";
import { AddToCart, CartItem } from "../types/store";

export function ProductDetailPage() {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const { cartItems, setCartItems } = useContext(CartContext);

  const [product, setProduct] = useState<ProductItem | undefined>(undefined);

  const { status } = useQuery<ProductItem>(
    [GET_PRODUCT_KEY],
    async () => getProduct(Number(productId)),
    {
      enabled: !!productId,
      onSuccess: (data) => setProduct(data),
    }
  );

  const addToCartHandler = (fields: AddToCart) => {
    const { id, ...rest } = fields;

    const isAlreadyInCart = id in cartItems;

    setCartItems((existingCartItems) => {
      const newProduct: CartItem = {
        ...rest,
        // Check if cart already has this product
        quantity: isAlreadyInCart ? existingCartItems[id].quantity + 1 : 1,
      };
      return {
        ...existingCartItems,
        [id]: newProduct,
      };
    });

    toast({
      title: `${fields.title}`,
      description: "Item has been added to cart successfully",
      status: "success",
      duration: 2000,
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
      <Button
        colorScheme="red"
        size="lg"
        onClick={() =>
          addToCartHandler({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
          })
        }
      >
        Add to cart
      </Button>
    </Stack>
  );
}
