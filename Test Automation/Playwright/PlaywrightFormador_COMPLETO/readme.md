# Playwright Automation - Pet Store Website

This project automates the main flows of the Pet Store website (https://petstore.octoperf.com) using Playwright with JavaScript and the Page Object Model (POM) pattern.

## Objective

Automate the following scenarios:

- User registration
- Login
- Product search
- Add product to cart
- Complete checkout

The code has been refactored to use Page Objects, separating test logic from element selectors and page interactions.

## Project Structure

- `pom/` - Page Object classes for each page
  - `HomePage.js`
  - `LoginPage.js`
  - `RegisterPage.js`
  - `ProductSearchPage.js`
  - `ProductDetailPage.js`
  - `CartPage.js`
  - `CheckoutPage.js`
- `tests/` - Playwright test cases
  - `petstore-register.spec.js`
  - `petstore-login.spec.js`
  - `petstore-search.spec.js`
  - `petstore-add-to-cart.spec.js`
  - `petstore-checkout.spec.js`
- `playwright.config.js` - Playwright configuration
- `package.json` - project dependencies

## Requirements

- Node.js 18+ recommended
- Playwright dependencies installed

## Installation

From the project root, run:

```bash
npm install
```

If Playwright is not installed yet, run:

```bash
npx playwright install
```

## How to run the tests

To run all tests:

```bash
npx playwright test
```

To run a specific test, for example `petstore-login.spec.js`:

```bash
npx playwright test tests/petstore-login.spec.js
```

## Test descriptions

### `petstore-register.spec.js`
Automates the user registration flow, filling out the form and verifying redirection back to the catalog.

### `petstore-login.spec.js`
Automates login for a valid user and verifies navigation to the catalog page.

### `petstore-search.spec.js`
Logs in, navigates to the `Fish` category, opens product `FI-SW-01`, and validates the product details.

### `petstore-add-to-cart.spec.js`
Logs in, finds a product, adds it to the cart, and validates that the item appears in the cart.

### `petstore-checkout.spec.js`
Logs in, adds a product to the cart, proceeds to checkout, fills payment information, and validates the order confirmation.

## Page Object Model (POM)

Each page is represented by a class in the `pom/` directory. These classes include:

- page element selectors
- methods to interact with the page
- page-specific validation logic

This makes the tests more readable, maintainable, and reusable.

## Notes

- The project uses `@playwright/test` as the test framework.
- `playwright.config.js` is configured to run with `chromium` and generate an HTML report.
- To view reports after execution, use:

```bash
npx playwright show-report
```
