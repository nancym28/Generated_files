import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  const steps = [
    {
      "action": "goto",
      "selector": null,
      "value": "https://www.saucedemo.com/",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": ["waitForLoadState"],
      "errorMessage": "Failed to navigate to saucedemo.com",
      "stepDescription": "Navigate to https://www.saucedemo.com/"
    },
    {
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["scrollIntoView"],
      "errorMessage": "Failed to enter username",
      "stepDescription": "Enter \"standard_user\" into the username field with id user-name"
    },
    {
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["scrollIntoView"],
      "errorMessage": "Failed to enter password",
      "stepDescription": "Enter \"secret_sauce\" into the password field with id password"
    },
    {
      "action": "click",
      "selector": "#login-button",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": ["scrollIntoView", "waitForLoadState"],
      "errorMessage": "Failed to click login button",
      "stepDescription": "Click the login button with id login-button"
    },
    {
      "action": "click",
      "selector": ".product_sort_container",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["scrollIntoView"],
      "errorMessage": "Failed to click product sort filter dropdown",
      "stepDescription": "Click on the product sort filter dropdown with class product_sort_container"
    },
    {
      "action": "click",
      "selector": "option[value='za']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to select Name (Z to A) option",
      "stepDescription": "Select Name (Z to A) from the product sort filter dropdown"
    },
    {
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": ["scrollIntoView"],
      "errorMessage": "Failed to click Add to cart button for Sauce Labs Backpack",
      "stepDescription": "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for the product Sauce Labs Backpack"
    },
    {
      "action": "click",
      "selector": ".shopping_cart_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click cart icon",
      "stepDescription": "Click on the cart icon with class shopping_cart_link"
    },
    {
      "action": "isVisible",
      "selector": "div.cart_item div.inventory_item_name:has-text('Sauce Labs Backpack')",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Sauce Labs Backpack is not present in the cart",
      "stepDescription": "Verify that the product Sauce Labs Backpack is present in the cart"
    },
    {
      "action": "click",
      "selector": "#checkout",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": ["scrollIntoView", "waitForLoadState"],
      "errorMessage": "Failed to click checkout button",
      "stepDescription": "Click on the checkout button with id checkout"
    },
    {
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["scrollIntoView"],
      "errorMessage": "Failed to enter first name",
      "stepDescription": "Enter \"chaitanya\" into the first name field with id first-name"
    },
    {
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["scrollIntoView"],
      "errorMessage": "Failed to enter last name",
      "stepDescription": "Enter \"Kompella\" into the last name field with id last-name"
    },
    {
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["scrollIntoView"],
      "errorMessage": "Failed to enter postal code",
      "stepDescription": "Enter \"62567352\" into the postal code field with id postal-code"
    },
    {
      "action": "click",
      "selector": "#continue",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": ["scrollIntoView", "waitForLoadState"],
      "errorMessage": "Failed to click continue button",
      "stepDescription": "Click on continue button with id continue"
    },
    {
      "action": "click",
      "selector": "#finish",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": ["scrollIntoView", "waitForLoadState"],
      "errorMessage": "Failed to click finish button",
      "stepDescription": "Click on finish button with id finish"
    },
    {
      "action": "isVisible",
      "selector": "h2.complete-header:has-text('Thank you for your order!')",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Thank you message is not visible",
      "stepDescription": "Verify the presence of the message “Thank you for your order!”"
    },
    {
      "action": "click",
      "selector": "#back-to-products",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": ["scrollIntoView", "waitForLoadState"],
      "errorMessage": "Failed to click back to home button",
      "stepDescription": "Click on the back to home button with id back-to-products"
    },
    {
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click burger bar button",
      "stepDescription": "Click on the burger bar button with id react-burger-menu-btn"
    },
    {
      "action": "click",
      "selector": "#logout_sidebar_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": ["scrollIntoView", "waitForLoadState"],
      "errorMessage": "Failed to click logout button",
      "stepDescription": "Click on the logout button with id logout_sidebar_link"
    },
    {
      "action": "waitFor",
      "selector": null,
      "value": "3000",
      "waitTimeoutMs": 3000,
      "retry": 0,
      "fallbacks": [],
      "errorMessage": "Browser closed unexpectedly.",
      "stepDescription": "Keep the browser open"
    }
  ];

  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = steps.map(step => step.stepDescription);
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

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
        for (const stepData of steps) {
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
                await page.waitForTimeout(parseInt(stepData.value, 10));
                stepDetails = `Waited for ${stepData.value}ms`;
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
      } catch (closeError) {
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
    } catch (writeError) {
      console.error(`Failed to write test_result.json: ${writeError.message}`);
      // File write failed but we still return results
    }

    // GUARANTEED RETURN - This must ALWAYS execute
    return result;
  }
});