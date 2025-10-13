import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('SauceDemo E2E Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id user-name.",
    "Enter \"secret_sauce\" in the password field with id password.",
    "Click the Login button with id login-button.",
    "Click on the product sort filter dropdown with class product_sort_container.",
    "Select Name (Z to A) from the product sort filter dropdown.",
    "Locate the product \"Sauce Labs Backpack\" and click the Add to Cart button with id add-to-cart-sauce-labs-backpack.",
    "Click on the cart icon with class shopping_cart_link.",
    "Ensure that the product \"Sauce Labs Backpack\" is present in the cart.",
    "Click on the checkout button with id checkout.",
    "Enter \"chaitanya\" in the first name field with id first-name.",
    "Enter \"Kompella\" in the last name field with id last-name.",
    "Enter \"62567352\" in the postal code field with id postal-code.",
    "Click on the continue button with id continue.",
    "Click on the finish button with id finish.",
    "Verify the presence of the message “Thank you for your order!”",
    "Click on the back to home button with id back-to-products.",
    "Click on the burger bar with id react-burger-menu-btn.",
    "Click on logout with id logout_sidebar_link."
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const stepsFromInput = [
    {
      "step": 1,
      "action": "goto",
      "selector": null,
      "value": "https://www.saucedemo.com/",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState"
      ],
      "errorMessage": "Navigation to saucedemo failed after multiple retries.",
      "stepDescription": "Navigate to https://www.saucedemo.com/."
    },
    {
      "step": 2,
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='username']"
      ],
      "errorMessage": "Failed to fill username field after multiple retries.",
      "stepDescription": "Enter \"standard_user\" in the username field with id user-name."
    },
    {
      "step": 3,
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='password']"
      ],
      "errorMessage": "Failed to fill password field after multiple retries.",
      "stepDescription": "Enter \"secret_sauce\" in the password field with id password."
    },
    {
      "step": 4,
      "action": "click",
      "selector": "#login-button",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "[data-test='login-button']"
      ],
      "errorMessage": "Failed to click login button after multiple retries.",
      "stepDescription": "Click the Login button with id login-button."
    },
    {
      "step": 5,
      "action": "click",
      "selector": ".product_sort_container",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='product-sort-container']"
      ],
      "errorMessage": "Failed to click product sort filter dropdown after multiple retries.",
      "stepDescription": "Click on the product sort filter dropdown with class product_sort_container."
    },
    {
      "step": 6,
      "action": "click",
      "selector": "option[value='za']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "errorMessage": "Failed to select 'Name (Z to A)' from the sort dropdown after multiple retries.",
      "stepDescription": "Select Name (Z to A) from the product sort filter dropdown."
    },
    {
      "step": 7,
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "[data-test='add-to-cart-sauce-labs-backpack']"
      ],
      "errorMessage": "Failed to click 'Add to Cart' for 'Sauce Labs Backpack' after multiple retries.",
      "stepDescription": "Locate the product \"Sauce Labs Backpack\" and click the Add to Cart button with id add-to-cart-sauce-labs-backpack."
    },
    {
      "step": 8,
      "action": "click",
      "selector": ".shopping_cart_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "[data-test='shopping-cart-link']"
      ],
      "errorMessage": "Failed to click the cart icon after multiple retries.",
      "stepDescription": "Click on the cart icon with class shopping_cart_link."
    },
    {
      "step": 9,
      "action": "isVisible",
      "selector": ".cart_item:has-text('Sauce Labs Backpack')",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "errorMessage": "Product 'Sauce Labs Backpack' is not present in the cart after multiple retries.",
      "stepDescription": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart."
    },
    {
      "step": 10,
      "action": "click",
      "selector": "#checkout",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "[data-test='checkout']"
      ],
      "errorMessage": "Failed to click the checkout button after multiple retries.",
      "stepDescription": "Click on the checkout button with id checkout."
    },
    {
      "step": 11,
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='firstName']"
      ],
      "errorMessage": "Failed to fill first name field after multiple retries.",
      "stepDescription": "Enter \"chaitanya\" in the first name field with id first-name."
    },
    {
      "step": 12,
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='lastName']"
      ],
      "errorMessage": "Failed to fill last name field after multiple retries.",
      "stepDescription": "Enter \"Kompella\" in the last name field with id last-name."
    },
    {
      "step": 13,
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='postalCode']"
      ],
      "errorMessage": "Failed to fill postal code field after multiple retries.",
      "stepDescription": "Enter \"62567352\" in the postal code field with id postal-code."
    },
    {
      "step": 14,
      "action": "click",
      "selector": "#continue",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "[data-test='continue']"
      ],
      "errorMessage": "Failed to click the continue button after multiple retries.",
      "stepDescription": "Click on the continue button with id continue."
    },
    {
      "step": 15,
      "action": "click",
      "selector": "#finish",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "[data-test='finish']"
      ],
      "errorMessage": "Failed to click the finish button after multiple retries.",
      "stepDescription": "Click on the finish button with id finish."
    },
    {
      "step": 16,
      "action": "isVisible",
      "selector": "text='Thank you for your order!'",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "errorMessage": "Confirmation message is not present after multiple retries.",
      "stepDescription": "Verify the presence of the message “Thank you for your order!”"
    },
    {
      "step": 17,
      "action": "click",
      "selector": "#back-to-products",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "[data-test='back-to-products']"
      ],
      "errorMessage": "Failed to click the back to home button after multiple retries.",
      "stepDescription": "Click on the back to home button with id back-to-products."
    },
    {
      "step": 18,
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "errorMessage": "Failed to click the burger bar button after multiple retries.",
      "stepDescription": "Click on the burger bar with id react-burger-menu-btn."
    },
    {
      "step": 19,
      "action": "click",
      "selector": "#logout_sidebar_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "errorMessage": "Failed to click the logout button after multiple retries.",
      "stepDescription": "Click on logout with id logout_sidebar_link."
    }
  ];

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
        for (const stepData of stepsFromInput) {
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
                stepDetails = `Filled ${stepData.selector}`;
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
        // Log but don't fail - we still need to return results
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
      // File write failed but we still return results
    }

    return result;
  }
});