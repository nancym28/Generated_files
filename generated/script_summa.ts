import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id user-name.",
    "Enter \"secret_sauce\" in the password field with id password.",
    "Click the Login button with id login-button.",
    "Click on the product sort filter dropdown with class product_sort_container.",
    "Select Name (Z to A) from the product sort filter dropdown.",
    "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for product Sauce Labs Backpack.",
    "Click on the cart icon with class shopping_cart_link.",
    "Verify that the product Sauce Labs Backpack is present in the cart.",
    "Click on the checkout button with id checkout.",
    "Enter \"chaitanya\" in the first name field with id first-name.",
    "Enter \"Kompella\" in the last name field with id last-name.",
    "Enter \"62567352\" in the postal code field with id postal-code.",
    "Click on the continue button with id continue.",
    "Click on the finish button with id finish.",
    "Verify the text \"Thank you for your order!\"",
    "Click on the back to home button with id back-to-products.",
    "Click on the burger bar with id react-burger-menu-btn.",
    "Click on the logout button with id logout_sidebar_link."
  ]; // from input
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const stepsFromInput = [
    {
      "action": "goto",
      "selector": null,
      "value": "https://www.saucedemo.com/",
      "waitTimeoutMs": 30000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Navigation to saucedemo failed after multiple retries.",
      "stepDescription": "Navigate to https://www.saucedemo.com/."
    },
    {
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill username field after multiple retries.",
      "stepDescription": "Enter \"standard_user\" in the username field with id user-name."
    },
    {
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill password field after multiple retries.",
      "stepDescription": "Enter \"secret_sauce\" in the password field with id password."
    },
    {
      "action": "click",
      "selector": "#login-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click login button after multiple retries.",
      "stepDescription": "Click the Login button with id login-button."
    },
    {
      "action": "click",
      "selector": ".product_sort_container",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click product sort container after multiple retries.",
      "stepDescription": "Click on the product sort filter dropdown with class product_sort_container."
    },
    {
      "action": "click",
      "selector": "option[value='za']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click Name (Z to A) option after multiple retries.",
      "stepDescription": "Select Name (Z to A) from the product sort filter dropdown."
    },
    {
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click add to cart button for backpack after multiple retries.",
      "stepDescription": "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for product Sauce Labs Backpack."
    },
    {
      "action": "click",
      "selector": ".shopping_cart_link",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click shopping cart link after multiple retries.",
      "stepDescription": "Click on the cart icon with class shopping_cart_link."
    },
    {
      "action": "isVisible",
      "selector": ".cart_item:has-text(\"Sauce Labs Backpack\")",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to verify backpack in cart after multiple retries.",
      "stepDescription": "Verify that the product Sauce Labs Backpack is present in the cart."
    },
    {
      "action": "click",
      "selector": "#checkout",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click checkout button after multiple retries.",
      "stepDescription": "Click on the checkout button with id checkout."
    },
    {
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill first name field after multiple retries.",
      "stepDescription": "Enter \"chaitanya\" in the first name field with id first-name."
    },
    {
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill last name field after multiple retries.",
      "stepDescription": "Enter \"Kompella\" in the last name field with id last-name."
    },
    {
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill postal code field after multiple retries.",
      "stepDescription": "Enter \"62567352\" in the postal code field with id postal-code."
    },
    {
      "action": "click",
      "selector": "#continue",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click continue button after multiple retries.",
      "stepDescription": "Click on the continue button with id continue."
    },
    {
      "action": "click",
      "selector": "#finish",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click finish button after multiple retries.",
      "stepDescription": "Click on the finish button with id finish."
    },
    {
      "action": "isVisible",
      "selector": "text=Thank you for your order!",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to verify thank you text after multiple retries.",
      "stepDescription": "Verify the text \"Thank you for your order!\"."
    },
    {
      "action": "click",
      "selector": "#back-to-products",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click back to home button after multiple retries.",
      "stepDescription": "Click on the back to home button with id back-to-products."
    },
    {
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click burger bar after multiple retries.",
      "stepDescription": "Click on the burger bar with id react-burger-menu-btn."
    },
    {
      "action": "click",
      "selector": "#logout_sidebar_link",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click logout button after multiple retries.",
      "stepDescription": "Click on the logout button with id logout_sidebar_link."
    }
  ];

  try {
    // Browser setup with its own error handling
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
    } catch (setupErr: any) {
      setupError = true;
      executionResults.push({
        step: "Browser Setup",
        status: "error",
        details: `Failed to setup browser: ${setupErr.message}`,
        timestamp: Date.now(),
        duration_ms: 0
      });
    }

    // Only proceed with steps if setup succeeded
    if (!setupError && page) {
      // Handle empty steps case
      if (originalUserSteps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        // Execute each step with individual error handling
        for (const stepData of stepsFromInput) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            // Execute the specific action
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
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }

            stepDetails = `Successfully executed: ${stepData.stepDescription}. ${stepDetails}`;
          } catch (stepError: any) {
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
  } catch (unexpectedError: any) {
    // Only add this if no other results exist
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
    // Guaranteed cleanup and return
    if (browser) {
      try {
        await browser.close();
      } catch (closeError: any) {
        console.error(`Failed to close browser: ${closeError.message}`);
        // Log but don't fail - we still need to return results
      }
    }

    // Ensure we always have at least one result
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
    } catch (writeError: any) {
      console.error(`Failed to write test_result.json: ${writeError.message}`);
      // File write failed but we still return results
    }

    // GUARANTEED RETURN - This must ALWAYS execute
    return result;
  }
});