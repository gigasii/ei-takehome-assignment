import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { CartPage } from "../pages/CartPage";
import { CartContext } from "../store/context";
import { CartContextType } from "../store/context";

afterEach(cleanup);

describe("Cart page should", () => {
  test("render cart breakdown in cart page", () => {
    // Given
    const contextValues = {
      cartItems: {},
      setCartItems: () => {},
    };

    // When
    customRender(<CartPage />, { ...contextValues });

    const breakdownTable = screen.getByRole("table");

    // Then
    expect(breakdownTable).toBeInTheDocument();
  });

  test("render the products in the cart breakdown if cart is not empty", () => {
    // Given
    const FIRST_PRODUCT_ID = 1;
    const SECOND_PRODUCT_ID = 2;

    const contextValues = {
      cartItems: {
        [FIRST_PRODUCT_ID]: {
          image: "http://testing-url-1",
          title: "product1",
          price: 10.5,
          quantity: 1,
        },
        [SECOND_PRODUCT_ID]: {
          image: "http://testing-url-1",
          title: "product2",
          price: 50.1,
          quantity: 3,
        },
      },
      setCartItems: () => {},
    };

    // When
    customRender(<CartPage />, { ...contextValues });

    const table = screen.getByRole("table");
    const rowsRendered = screen.getAllByRole("row");

    // Test total amount & number of products
    expect(table.children[0]).toHaveTextContent("Total cost: $160.80");
    expect(rowsRendered.length).toBe(3);

    // Test first product values
    expect(rowsRendered[FIRST_PRODUCT_ID].children[0]).toHaveTextContent(
      "product1"
    );
    expect(rowsRendered[FIRST_PRODUCT_ID].children[1]).toHaveTextContent(
      "$ 10.5"
    );
    expect(rowsRendered[FIRST_PRODUCT_ID].children[2]).toHaveTextContent("1");

    // Test second product values
    expect(rowsRendered[SECOND_PRODUCT_ID].children[0]).toHaveTextContent(
      "product2"
    );
    expect(rowsRendered[SECOND_PRODUCT_ID].children[1]).toHaveTextContent(
      "$ 50.1"
    );
    expect(rowsRendered[SECOND_PRODUCT_ID].children[2]).toHaveTextContent("3");
  });

  test("render the products quantity correctly when add", () => {
    // Given
    const FIRST_PRODUCT_ID = 1;
    const PRICE = 10.5;

    const { rerender } = customRender(<CartPage />, {
      ...ammendQuantityMock({ quantity: 1, price: PRICE }),
    });

    const table = screen.getByRole("table");
    const plusButton = screen.getAllByLabelText("plus")[0];
    const rowsRendered = screen.getAllByRole("row");

    // Test before table correctness and total amount
    expect(rowsRendered[FIRST_PRODUCT_ID].children[0]).toHaveTextContent(
      "product1"
    );
    expect(rowsRendered[FIRST_PRODUCT_ID].children[1]).toHaveTextContent(
      "$ 10.5"
    );
    expect(rowsRendered[FIRST_PRODUCT_ID].children[2]).toHaveTextContent("1");

    expect(table.children[0]).toHaveTextContent("Total cost: $10.50");

    // Increment quantity when plus button click for product
    fireEvent.click(plusButton);
    rerender(
      <>
        <CartContext.Provider
          value={{ ...ammendQuantityMock({ quantity: 2, price: PRICE }) }}
        >
          <CartPage />
        </CartContext.Provider>
      </>
    );

    // Test after
    expect(rowsRendered[FIRST_PRODUCT_ID].children[0]).toHaveTextContent(
      "product1"
    );
    expect(rowsRendered[FIRST_PRODUCT_ID].children[1]).toHaveTextContent(
      "$ 10.5"
    );
    expect(rowsRendered[FIRST_PRODUCT_ID].children[2]).toHaveTextContent("2");

    expect(table.children[0]).toHaveTextContent("Total cost: $21.00");
  });

  test("render the products quantity correctly when minus", () => {
    // Given
    const FIRST_PRODUCT_ID = 1;
    const PRICE = 10.5;

    const { rerender } = customRender(<CartPage />, {
      ...ammendQuantityMock({ quantity: 1, price: PRICE }),
    });

    const table = screen.getByRole("table");
    const minusButton = screen.getAllByLabelText("minus")[0];
    const rowsRendered = screen.getAllByRole("row");

    // Test before table correctness and total amount
    expect(rowsRendered[FIRST_PRODUCT_ID].children[0]).toHaveTextContent(
      "product1"
    );
    expect(rowsRendered[FIRST_PRODUCT_ID].children[1]).toHaveTextContent(
      "$ 10.5"
    );
    expect(rowsRendered[FIRST_PRODUCT_ID].children[2]).toHaveTextContent("1");

    expect(table.children[0]).toHaveTextContent("Total cost: $10.50");

    // Decrement quantity when plus button click for product
    fireEvent.click(minusButton);
    rerender(
      <>
        <CartContext.Provider
          value={{ ...ammendQuantityMock({ quantity: 0, price: PRICE }) }}
        >
          <CartPage />
        </CartContext.Provider>
      </>
    );

    // Test after
    expect(rowsRendered[FIRST_PRODUCT_ID].children[0]).toHaveTextContent(
      "product1"
    );
    expect(rowsRendered[FIRST_PRODUCT_ID].children[1]).toHaveTextContent(
      "$ 10.5"
    );

    expect(table.children[0]).toHaveTextContent("Total cost: $0.00");
  });
});

// Helper methods
const customRender = (
  ui: JSX.Element,
  providerProps: CartContextType,
  renderOptions?: any
) => {
  return render(
    <CartContext.Provider value={providerProps}>{ui}</CartContext.Provider>,
    renderOptions
  );
};

const ammendQuantityMock = ({
  quantity,
  price,
}: {
  quantity: number;
  price: number;
}) => {
  return {
    cartItems: {
      1: {
        image: "http://testing-url-1",
        title: "product1",
        price,
        quantity,
      },
    },
    setCartItems: () => {},
  };
};
