import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" into the username field with id user-name",
    "Enter \"secret_sauce\" into the password field with id password",
    "Click the Login button with id login-button",
    "Click on the product sort filter dropdown with class product_sort_container",
    "Select Name (Z to A) from the product sort filter dropdown",
    "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for the product Sauce Labs Backpack",
    "Click on the cart icon with class shopping_cart_link",
    "Verify that the product Sauce Labs Backpack is present in the cart",
    "Click on the Checkout button with id checkout",
    "Enter \"chaitanya\" into the first name field with id first-name",
    "Enter \"Kompella\" into the last name field with id last-name",
    "Enter \"62567352\" into the postal code field with id postal-code",
    "Click on the Continue button with id continue",
    "Click on the Finish button with id finish",
    "Verify the presence of the text “Thank you for your order!”",
    "Click on the Back to home button with id back-to-products",
    "Click on the burger menu button with id react-burger-menu-btn",
    "Click on the logout button with id logout_sidebar_link"
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  try {
    try {
      browser = await chromium.launch({
        headless: false,
        slowMo: 1000,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ]
      });
      const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
      page = await context.newPage();
      page.setDefaultTimeout(30000);
    } catch (setupErr) {
      setupError = true;
      executionResults.push({
        step: "Browser Setup",
        status: "error",
        details: `Failed to setup browser: ${setupErr.message}`,
        timestamp: Date.now(),
        duration_ms: 0
      });
    }

    if (!setupError && page) {
      if (originalUserSteps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        for (let i = 0; i < originalUserSteps.length; i++) {
          const stepDescription = originalUserSteps[i];
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            switch (i) {
              case 0:
                await page.goto("https://www.saucedemo.com/");
                stepDetails = "Navigated to https://www.saucedemo.com/";
                break;
              case 1:
                await page.locator("#user-name").fill("standard_user");
                stepDetails = "Filled #user-name";
                break;
              case 2:
                await page.locator("#password").fill("secret_sauce");
                stepDetails = "Filled #password";
                break;
              case 3:
                await page.locator("#login-button").click();
                stepDetails = "Clicked #login-button";
                break;
              case 4:
                await page.locator(".product_sort_container").click();
                stepDetails = "Clicked .product_sort_container";
                break;
              case 5:
                await page.locator(".product_sort_container").selectOption("Name (Z to A)");
                stepDetails = "Selected Name (Z to A) from .product_sort_container";
                break;
              case 6:
                await page.locator("#add-to-cart-sauce-labs-backpack").click();
                stepDetails = "Clicked #add-to-cart-sauce-labs-backpack";
                break;
              case 7:
                await page.locator(".shopping_cart_link").click();
                stepDetails = "Clicked .shopping_cart_link";
                break;
              case 8:
                try {
                  await page.locator("text=Sauce Labs Backpack").waitFor({ timeout: 5000 });
                  stepDetails = "Element text=Sauce Labs Backpack is visible";
                } catch (e) {
                  stepStatus = "error";
                  stepDetails = `Element text=Sauce Labs Backpack is not visible. Error: ${e.message}`;
                }
                break;
              case 9:
                await page.locator("#checkout").click();
                stepDetails = "Clicked #checkout";
                break;
              case 10:
                await page.locator("#first-name").fill("chaitanya");
                stepDetails = "Filled #first-name";
                break;
              case 11:
                await page.locator("#last-name").fill("Kompella");
                stepDetails = "Filled #last-name";
                break;
              case 12:
                await page.locator("#postal-code").fill("62567352");
                stepDetails = "Filled #postal-code";
                break;
              case 13:
                await page.locator("#continue").click();
                stepDetails = "Clicked #continue";
                break;
              case 14:
                await page.locator("#finish").click();
                stepDetails = "Clicked #finish";
                break;
              case 15:
                try {
                  await page.locator("text=Thank you for your order!").waitFor({ timeout: 5000 });
                  stepDetails = "Element text=Thank you for your order! is visible";
                } catch (e) {
                  stepStatus = "error";
                  stepDetails = `Element text=Thank you for your order! is not visible. Error: ${e.message}`;
                }
                break;
              case 16:
                await page.locator("#back-to-products").click();
                stepDetails = "Clicked #back-to-products";
                break;
              case 17:
                await page.locator("#react-burger-menu-btn").click();
                stepDetails = "Clicked #react-burger-menu-btn";
                break;
              case 18:
                await page.locator("#logout_sidebar_link").click();
                stepDetails = "Clicked #logout_sidebar_link";
                break;
              default:
                stepStatus = "error";
                stepDetails = "Unknown step";
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepDescription}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(stepDescription);
          executionResults.push({
            step: stepDescription,
            status: stepStatus,
            details: stepDetails,
            timestamp: startTime,
            duration_ms: endTime - startTime
          });
        }
      }
    }
  } catch (unexpectedError) {
    if (executionResults.length === 0) {
      executionResults.push({
        step: "Unexpected Error",
        status: "error",
        details: `Unexpected error occurred: ${unexpectedError.message}`,
        timestamp: Date.now(),
        duration_ms: 0
      });
    }
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error(`Failed to close browser: ${closeError.message}`);
      }
    }

    if (executionResults.length === 0) {
      executionResults.push({
        step: "No Execution",
        status: "error",
        details: "Test failed to execute any steps",
        timestamp: Date.now(),
        duration_ms: 0
      });
    }

    const totalDuration = executionResults.reduce((sum, r) => sum + r.duration_ms, 0);
    const passedCount = executionResults.filter(r => r.status === 'success').length;
    const failedCount = executionResults.filter(r => r.status === 'error').length;

    const result = {
      user_test_steps: originalUserSteps,
      executed_test_steps: executedSteps,
      execution_results: executionResults,
      summary: {
        total_steps: executionResults.length,
        passed: passedCount,
        failed: failedCount,
        duration_ms: totalDuration
      }
    };

    try {
      fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    return result;
  }
});