// @ts-check
import { test, expect } from "@playwright/test";

test("GET / deve responder com status 200", async ({ request }) => {
  const response = await request.get("http://localhost:3000/");

  expect(response.status()).toBe(200);
});
