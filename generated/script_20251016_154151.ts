import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

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
    "Enter \"62567352\" in the postal code field with id postal-code",
    "Click on continue button with id continue",
    "Click on finish button with id finish",
    "You should see a message “Thank you for your order!”",
    "Then click on back to home button with id back-to-products",
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
              const value = parts[0].substring("Enter ".length).slice(1, -1);
              const selectorPart = parts[1].split(" field with id ");
              const fieldType = selectorPart[0];
              const selector = `#${selectorPart[1]}`;
              await page.locator(selector).fill(value);
              stepDetails = `Filled ${selector} with ${value}`;
            } else if (step.startsWith("Click the")) {
              const parts = step.split(" button with id ");
              const buttonType = parts[0].substring("Click the ".length);
              const selector = `#${parts[1]}`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Click on the product sort filter dropdown with class")) {
              const selector = ".product_sort_container";
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Locate the product")) {
              const parts = step.split(" and click the Add to Cart button with id ");
              const productName = parts[0].substring("Locate the product ".length).slice(1, -1);
              const selector = `#${parts[1]}`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Click on the cart icon with class")) {
              const selector = ".shopping_cart_link";
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Ensure that the product")) {
              const productName = step.substring("Ensure that the product ".length, step.length - " is present in the cart".length).slice(1, -1);
              const selector = `div.cart_item_label:has-text("${productName}")`;
              try {
                await page.locator(selector).waitFor({ timeout: 5000 });
                stepDetails = `Element ${selector} is visible`;
              } catch (e) {
                stepStatus = "error";
                stepDetails = `Element ${selector} is not visible`;
              }
            } else if (step.startsWith("Click on the checkout button with id")) {
              const selector = "#checkout";
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Click on continue button with id")) {
              const selector = "#continue";
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Click on finish button with id")) {
              const selector = "#finish";
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("You should see a message")) {
              const message = step.substring("You should see a message ".length).slice(1, -1);
              const selector = `text=${message}`;
              try {
                await page.locator(selector).waitFor({ timeout: 5000 });
                stepDetails = `Element ${selector} is visible`;
              } catch (e) {
                stepStatus = "error";
                stepDetails = `Element ${selector} is not visible`;
              }
            } else if (step.startsWith("Then click on back to home button with id")) {
              const selector = "#back-to-products";
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Click on the burger bar with id")) {
              const selector = "#react-burger-menu-btn";
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (step.startsWith("Click on logout with id")) {
              const selector = "#logout_sidebar_link";
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
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
    const result = {
      user_test_steps: originalUserSteps,
      executed_test_steps: executedSteps,
      execution_results: executionResults,
      summary: {
        total_steps: executionResults.length,
        passed: executionResults.filter(r => r.status === 'success').length,
        failed: executionResults.filter(r => r.status === 'error').length,
        duration_ms: totalDuration
      }
    };

    try {
      fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
    }

    return result;
  }
});