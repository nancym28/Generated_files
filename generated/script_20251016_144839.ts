import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" in the username field with id user-name",
    "Enter \"secret_sauce\" in the password field with id password",
    "Click the Login button with id login-button",
    "Click on the product sort filter dropdown with class product_sort_container",
    "Locate the product \"Sauce Labs Backpack\" and click the Add to Cart button with id add-to-cart-sauce-labs-backpack",
    "Click on the cart icon with class shopping_cart_link",
    "Ensure that the product \"Sauce Labs Backpack\" is present in the cart",
    "Click on the checkout button with id checkout",
    "Enter \"chaitanya\" in the first name field with id first-name",
    "Enter \"Kompella\" in the last name field with id last-name",
    "Enter \"62567352\" in postal code field with id postal-code",
    "Click on continue button with id continue",
    "Click on finish button with id finish",
    "Assert that the text 'Thank you for your order!' is present",
    "Click on back to home button with id back-to-products",
    "Click on the burger bar with id react-burger-menu-btn",
    "Click on logout with id logout_sidebar_link",
    "Keep the browser open after the test execution is complete"
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
          const step = originalUserSteps[i];
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            if (step.startsWith("Navigate to")) {
              const url = step.substring("Navigate to".length).trim();
              await page.goto(url);
              stepDetails = `Navigated to ${url}`;
            } else if (step.startsWith("Enter")) {
              const parts = step.split(" in the ");
              const value = parts[0].substring("Enter ".length).trim().slice(1, -1);
              const selectorPart = parts[1].split(" field with id ");
              const fieldType = selectorPart[0].trim();
              const selector = `#${selectorPart[1].trim()}`;
              await page.locator(selector).fill(value);
              stepDetails = `Filled ${selector} with ${value}`;
            } else if (step.startsWith("Click")) {
              const parts = step.split(" with id ");
              const selectorPart = parts.length > 1 ? parts[1] : parts[0].split(" with class ")[1];
              const selectorType = parts.length > 1 ? "id" : "class";
              const selector = selectorType === "id" ? `#${selectorPart.trim()}` : `.${selectorPart.trim()}`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Locate the product")) {
              const parts = step.split(" and click the Add to Cart button with id ");
              const selector = `#${parts[1].trim()}`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Ensure that the product")) {
              const parts = step.split(" is present in the cart");
              const productName = parts[0].substring("Ensure that the product ".length).trim().slice(1, -1);
              const selector = `div.cart_item_label div:has-text("${productName}")`;
              const isVisible = await page.locator(selector).isVisible();
              stepDetails = `Element ${selector} is ${isVisible ? 'visible' : 'not visible'}`;
              stepStatus = isVisible ? "success" : "error";
            } else if (step.startsWith("Assert that the text")) {
              const parts = step.split(" is present");
              const text = parts[0].substring("Assert that the text '".length).slice(0, -1);
              const selector = `text=${text}`;
              const isVisible = await page.locator(selector).isVisible();
              stepDetails = `Element ${selector} is ${isVisible ? 'visible' : 'not visible'}`;
              stepStatus = isVisible ? "success" : "error";
            } else if (step.startsWith("Click on the product sort filter dropdown")) {
              const parts = step.split(" with class ");
              const selector = `.${parts[1].trim()}`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Enter")) {
              const parts = step.split(" in the ");
              const value = parts[0].substring("Enter ".length).trim().slice(1, -1);
              const selectorPart = parts[1].split(" field with id ");
              const fieldType = selectorPart[0].trim();
              const selector = `#${selectorPart[1].trim()}`;
              await page.locator(selector).fill(value);
              stepDetails = `Filled ${selector} with ${value}`;
            } else if (step.startsWith("Keep the browser open")) {
              stepDetails = "Keeping browser open";
            } else {
              stepStatus = "error";
              stepDetails = `Unknown step: ${step}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${step}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(step);
          executionResults.push({
            step: step,
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
        console.error("Error closing browser:", closeError);
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
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});