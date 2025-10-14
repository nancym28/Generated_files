import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter 'standard_user' into the username field",
    "Enter 'secret_sauce' into the password field",
    "Click the Login button",
    "Click the product sort filter dropdown",
    "Select 'Name (Z to A)' from the sort dropdown",
    "Locate the product 'Sauce Labs Backpack'",
    "Click the 'Add to Cart' button for 'Sauce Labs Backpack'",
    "Click the cart icon",
    "Verify the product 'Sauce Labs Backpack' is present in the cart",
    "Click the 'Checkout' button",
    "Enter 'chaitanya' into the first name field",
    "Enter 'Kompella' into the last name field",
    "Enter '62567352' into the postal code field",
    "Click the 'Continue' button",
    "Click the 'Finish' button",
    "Verify the message 'Thank you for your order!' is displayed",
    "Click the 'Back to Home' button",
    "Click the burger menu button",
    "Click the 'Logout' button",
    "Keep the browser open"
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
          "fallbacks": [],
          "errorMessage": "Failed to navigate to saucedemo.com",
          "stepDescription": "Navigate to https://www.saucedemo.com/"
        },
        {
          "action": "fill",
          "selector": "[data-testid='username']",
          "value": "standard_user",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to enter username",
          "stepDescription": "Enter 'standard_user' into the username field"
        },
        {
          "action": "fill",
          "selector": "[data-testid='password']",
          "value": "secret_sauce",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to enter password",
          "stepDescription": "Enter 'secret_sauce' into the password field"
        },
        {
          "action": "click",
          "selector": "[data-testid='login-button']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click login button",
          "stepDescription": "Click the Login button"
        },
        {
          "action": "click",
          "selector": "[data-testid='product_sort_container']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click product sort filter dropdown",
          "stepDescription": "Click the product sort filter dropdown"
        },
        {
          "action": "click",
          "selector": "select[data-test='product_sort_container'] option[value='za']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to select 'Name (Z to A)' from the sort dropdown",
          "stepDescription": "Select 'Name (Z to A)' from the sort dropdown"
        },
        {
          "action": "waitFor",
          "selector": "[data-testid='item_4_title_link']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to locate the product 'Sauce Labs Backpack'",
          "stepDescription": "Locate the product 'Sauce Labs Backpack'"
        },
        {
          "action": "click",
          "selector": "[data-testid='add-to-cart-sauce-labs-backpack']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the 'Add to Cart' button for 'Sauce Labs Backpack'",
          "stepDescription": "Click the 'Add to Cart' button for 'Sauce Labs Backpack'"
        },
        {
          "action": "click",
          "selector": "[data-testid='shopping_cart_container']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the cart icon",
          "stepDescription": "Click the cart icon"
        },
        {
          "action": "waitFor",
          "selector": "[data-testid='item_4_title_link']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to verify the product 'Sauce Labs Backpack' is present in the cart",
          "stepDescription": "Verify the product 'Sauce Labs Backpack' is present in the cart"
        },
        {
          "action": "click",
          "selector": "[data-testid='checkout']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the 'Checkout' button",
          "stepDescription": "Click the 'Checkout' button"
        },
        {
          "action": "fill",
          "selector": "[data-testid='firstName']",
          "value": "chaitanya",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to enter 'chaitanya' into the first name field",
          "stepDescription": "Enter 'chaitanya' into the first name field"
        },
        {
          "action": "fill",
          "selector": "[data-testid='lastName']",
          "value": "Kompella",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to enter 'Kompella' into the last name field",
          "stepDescription": "Enter 'Kompella' into the last name field"
        },
        {
          "action": "fill",
          "selector": "[data-testid='postalCode']",
          "value": "62567352",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to enter '62567352' into the postal code field",
          "stepDescription": "Enter '62567352' into the postal code field"
        },
        {
          "action": "click",
          "selector": "[data-testid='continue']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the 'Continue' button",
          "stepDescription": "Click the 'Continue' button"
        },
        {
          "action": "click",
          "selector": "[data-testid='finish']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the 'Finish' button",
          "stepDescription": "Click the 'Finish' button"
        },
        {
          "action": "waitFor",
          "selector": "[data-testid='checkout_complete_container'] h2",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to verify the message 'Thank you for your order!' is displayed",
          "stepDescription": "Verify the message 'Thank you for your order!' is displayed"
        },
        {
          "action": "click",
          "selector": "[data-testid='back-to-products']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the 'Back to Home' button",
          "stepDescription": "Click the 'Back to Home' button"
        },
        {
          "action": "click",
          "selector": "[data-testid='react-burger-menu-btn']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the burger menu button",
          "stepDescription": "Click the burger menu button"
        },
        {
          "action": "click",
          "selector": "[data-testid='logout']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the 'Logout' button",
          "stepDescription": "Click the 'Logout' button"
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
              case "fill":
                await page.locator(stepData.selector).fill(stepData.value);
                stepDetails = `Filled ${stepData.selector}`;
                break;
              case "click":
                await page.locator(stepData.selector).click();
                stepDetails = `Clicked ${stepData.selector}`;
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
      console.error("Error writing test_result.json:", writeError);
    }

    return result;
  }
});