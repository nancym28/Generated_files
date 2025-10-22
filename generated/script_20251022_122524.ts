import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id 'user-name'.",
    "Enter \"secret_sauce\" in the password field with id 'password'.",
    "Click the Login button with id 'login-button'.",
    "Click on the product sort filter dropdown with class 'product_sort_container'.",
    "Click the 'Add to cart' button for the product 'Sauce Labs Backpack' with id 'add-to-cart-sauce-labs-backpack'.",
    "Click on the cart icon with class 'shopping_cart_link'.",
    "Verify that the cart badge with class 'shopping_cart_badge' displays '1'.",
    "Click on the 'Checkout' button with id 'checkout'.",
    "Enter 'chaitanya' in the first name field with id 'first-name'.",
    "Enter 'Kompella' in the last name field with id 'last-name'.",
    "Enter '62567352' in the postal code field with id 'postal-code'.",
    "Click on the 'Continue' button with id 'continue'.",
    "Click on the 'Finish' button with id 'finish'.",
    "Verify the presence of the message 'Thank you for your order!' with class 'complete-header'.",
    "Click on the 'Back to home' button with id 'back-to-products'.",
    "Click on the burger menu button with id 'react-burger-menu-btn'.",
    "Click on the 'Logout' button with id 'logout_sidebar_link'."
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
      const steps = [
        {
          "action": "goto",
          "selector": null,
          "value": "https://www.saucedemo.com/",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to navigate to https://www.saucedemo.com/",
          "stepDescription": "Navigate to https://www.saucedemo.com/."
        },
        {
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForSelector"],
          "errorMessage": "Failed to enter username",
          "stepDescription": "Enter \"standard_user\" in the username field with id 'user-name'."
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForSelector"],
          "errorMessage": "Failed to enter password",
          "stepDescription": "Enter \"secret_sauce\" in the password field with id 'password'."
        },
        {
          "action": "click",
          "selector": "#login-button",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:enabled"],
          "errorMessage": "Failed to click the Login button",
          "stepDescription": "Click the Login button with id 'login-button'."
        },
        {
          "action": "click",
          "selector": ".product_sort_container",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:visible"],
          "errorMessage": "Failed to click the product sort filter dropdown",
          "stepDescription": "Click on the product sort filter dropdown with class 'product_sort_container'."
        },
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:enabled"],
          "errorMessage": "Failed to click the 'Add to cart' button for the product 'Sauce Labs Backpack'",
          "stepDescription": "Click the 'Add to cart' button for the product 'Sauce Labs Backpack' with id 'add-to-cart-sauce-labs-backpack'."
        },
        {
          "action": "click",
          "selector": ".shopping_cart_link",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:visible"],
          "errorMessage": "Failed to click the cart icon",
          "stepDescription": "Click on the cart icon with class 'shopping_cart_link'."
        },
        {
          "action": "isVisible",
          "selector": ".shopping_cart_badge",
          "value": "1",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Cart badge does not display '1'",
          "stepDescription": "Verify that the cart badge with class 'shopping_cart_badge' displays '1'."
        },
        {
          "action": "click",
          "selector": "#checkout",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:enabled"],
          "errorMessage": "Failed to click the 'Checkout' button",
          "stepDescription": "Click on the 'Checkout' button with id 'checkout'."
        },
        {
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForSelector"],
          "errorMessage": "Failed to enter first name",
          "stepDescription": "Enter 'chaitanya' in the first name field with id 'first-name'."
        },
        {
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForSelector"],
          "errorMessage": "Failed to enter last name",
          "stepDescription": "Enter 'Kompella' in the last name field with id 'last-name'."
        },
        {
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForSelector"],
          "errorMessage": "Failed to enter postal code",
          "stepDescription": "Enter '62567352' in the postal code field with id 'postal-code'."
        },
        {
          "action": "click",
          "selector": "#continue",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:enabled"],
          "errorMessage": "Failed to click the 'Continue' button",
          "stepDescription": "Click on the 'Continue' button with id 'continue'."
        },
        {
          "action": "click",
          "selector": "#finish",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:enabled"],
          "errorMessage": "Failed to click the 'Finish' button",
          "stepDescription": "Click on the 'Finish' button with id 'finish'."
        },
        {
          "action": "isVisible",
          "selector": ".complete-header",
          "value": "Thank you for your order!",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Message 'Thank you for your order!' is not present",
          "stepDescription": "Verify the presence of the message 'Thank you for your order!' with class 'complete-header'."
        },
        {
          "action": "click",
          "selector": "#back-to-products",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:enabled"],
          "errorMessage": "Failed to click the 'Back to home' button",
          "stepDescription": "Click on the 'Back to home' button with id 'back-to-products'."
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:visible"],
          "errorMessage": "Failed to click the burger menu button",
          "stepDescription": "Click on the burger menu button with id 'react-burger-menu-btn'."
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementState:enabled"],
          "errorMessage": "Failed to click the 'Logout' button",
          "stepDescription": "Click on the 'Logout' button with id 'logout_sidebar_link'."
        }
      ];

      if (steps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        for (const stepData of steps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            switch (stepData.action) {
              case "goto":
                await page.goto(stepData.value);
                stepDetails = `Navigated to ${stepData.value}`;
                break;
              case "click":
                await page.locator(stepData.selector).click();
                stepDetails = `Clicked ${stepData.selector}`;
                break;
              case "fill":
                await page.locator(stepData.selector).fill(stepData.value);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                break;
              case "check":
                await page.locator(stepData.selector).check();
                stepDetails = `Checked ${stepData.selector}`;
                break;
              case "uncheck":
                await page.locator(stepData.selector).uncheck();
                stepDetails = `Unchecked ${stepData.selector}`;
                break;
              case "hover":
                await page.locator(stepData.selector).hover();
                stepDetails = `Hovered ${stepData.selector}`;
                break;
              case "waitFor":
                await page.locator(stepData.selector).waitFor();
                stepDetails = `Waited for ${stepData.selector}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selector).isVisible();
                stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
                if (stepData.value) {
                  const elementText = await page.locator(stepData.selector).innerText();
                  if (elementText === stepData.value) {
                    stepDetails += ` and contains text "${stepData.value}"`;
                  } else {
                    stepStatus = "error";
                    stepDetails = `Element ${stepData.selector} is visible but does not contain expected text. Expected "${stepData.value}", got "${elementText}"`;
                  }
                }
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepData.stepDescription}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(stepData.stepDescription);
          executionResults.push({
            step: stepData.stepDescription,
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