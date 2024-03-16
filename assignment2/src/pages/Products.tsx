import { Stack, Text } from "@chakra-ui/react";
import { ProductCard } from "../components/ProductCard";
import { useQuery } from "react-query";
import { GET_ALL_PRODUCTS_KEY, getAllProducts } from "../queries/product";
import { ProductItem } from "../types/product";
import { PageLoadingSpinner } from "../components/Spinner";

export function ProductsPage() {
  const { data: products, status } = useQuery<ProductItem[]>(
    GET_ALL_PRODUCTS_KEY,
    getAllProducts
  );

  if (status === "loading") {
    return <PageLoadingSpinner />;
  }

  if (status === "error" || !products) {
    return <Text>Error, please try again later</Text>;
  }

  return (
    <Stack direction="column" spacing={5}>
      <Text as="b">Click on the product to see more details</Text>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </Stack>
  );
}
