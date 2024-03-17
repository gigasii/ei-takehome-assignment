# Technical decisions and assumptions

Assume that this cart checkout is a small project which doesnt require added functionality in the future at the moment. Libraries choosen picked for simply to complete the tasks at hand.

- chakra-ui/react: Light-weight UI library goes with suitable components out of the box to help design the frontend compared to libraries such as material UI which is a heavier library that the other components not needed

- react-icons: Help to render icons required by the frontend

- react-query: Use to manage the call state to determine the operation of APIs called

- state-management: Used React's build in context API to maange global state as compared to a library like Redux to manage state as we simply need to manage the cart for the time being which context API is more suited for smaller states

# How to navigate the app

Home page is the list of all products

- Click on the home icon in header - Go back to home
- Click on the cart icon in header - Go to cart
- Click on 'see details' - Go to product details

## How to build and run the code

1. npm install
2. npm start

## How to run the tests

1. npm test

# Bonus

- [✔️] Write meaningful test cases only on cart page using jest and react-testing-library.
- [✔️] Persist data of shopping cart even when browser is closed and reopen.
- [x] Beautify the UI using tailwindcss framework
