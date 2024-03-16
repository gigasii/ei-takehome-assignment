import { Spinner, Stack } from "@chakra-ui/react";

export function PageLoadingSpinner() {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Stack>
  );
}
