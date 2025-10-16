import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" in the username field",
    "Enter \"secret_sauce\" in the password field",
    "Click the Login button",
    "Click on the product sort filter dropdown",
    "Click on Name (Z to A) option",
    "Locate the product \"Sauce Labs Backpack\" and click its Add to Cart button",
    "Click on the cart icon",
    "Ensure that the product \"Sauce Labs Backpack\" is present in the cart",
    "Click on the checkout button",
    "Enter the first name as \"chaitanya\" in the first name field",
    "Enter the last name as \"Kompella\" in the last name field",
    "Enter the postal code as \"62567352\" in postal code field",
    "Click on continue button",
    "Click on finish button",
    "Verify the presence of the message \"Thank you for your order!\"",
    "Click on back to home button",
    "Click on the burger bar",
    "Click on logout"
  ]; // from input
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
        "waitTimeoutMs": 10000,
        "retry": 3,
        "fallbacks": ["scrollIntoView"],
        "errorMessage": "Failed to enter username",
        "stepDescription": "Enter \"standard_user\" in the username field"
      },
      {
        "action": "fill",
        "selector": "#password",
        "value": "secret_sauce",
        "waitTimeoutMs": 10000,
        "retry": 3,
        "fallbacks": ["scrollIntoView"],
        "errorMessage": "Failed to enter password",
        "stepDescription": "Enter \"secret_sauce\" in the password field"
      },
      {
        "action": "click",
        "selector": "#login-button",
        "value": null,
        "waitTimeoutMs": 10000,
        "retry": 3,
        "fallbacks": ["scrollIntoView", "waitForLoadState"],
        "errorMessage": "Failed to click login button",
        "stepDescription": "Click the Login button"
      },
      {
        "description": "Click on the product sort filter dropdown",
        "action": "click",
        "selector": "[data-test=\"product_sort_container\"]",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["waitForLoadState"],
        "errorMessage": "Failed to click product sort filter dropdown",
        "stepDescription": "Click on the product sort filter dropdown"
      },
      {
        "description": "Click on Name (Z to A) option",
        "action": "click",
        "selector": "option[value=\"za\"]",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["waitForLoadState"],
        "errorMessage": "Failed to click Name (Z to A) option",
        "stepDescription": "Click on Name (Z to A) option"
      },
      {
        "description": "Locate the product \"Sauce Labs Backpack\" and click its Add to Cart button",
        "action": "click",
        "selector": "[data-test=\"add-to-cart-sauce-labs-backpack\"]",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["scrollIntoView", "waitForLoadState"],
        "errorMessage": "Failed to click Add to Cart button for Sauce Labs Backpack",
        "stepDescription": "Locate the product \"Sauce Labs Backpack\" and click its Add to Cart button"
      },
      {
        "description": "Click on the cart icon",
        "action": "click",
        "selector": ".shopping_cart_link",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["waitForLoadState"],
        "errorMessage": "Failed to click cart icon",
        "stepDescription": "Click on the cart icon"
      },
      {
        "description": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart",
        "action": "isVisible",
        "selector": ".inventory_item_name:has-text('Sauce Labs Backpack')",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["scrollIntoView"],
        "errorMessage": "Sauce Labs Backpack is not visible in the cart",
        "stepDescription": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart"
      },
      {
        "description": "Click on the checkout button",
        "action": "click",
        "selector": "[data-test=\"checkout\"]",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["waitForLoadState"],
        "errorMessage": "Failed to click checkout button",
        "stepDescription": "Click on the checkout button"
      },
      {
        "description": "Enter the first name as \"chaitanya\" in the first name field",
        "action": "fill",
        "selector": "[data-test=\"firstName\"]",
        "value": "chaitanya",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["scrollIntoView"],
        "errorMessage": "Failed to enter first name",
        "stepDescription": "Enter the first name as \"chaitanya\" in the first name field"
      },
      {
        "description": "Enter the last name as \"Kompella\" in the last name field",
        "action": "fill",
        "selector": "[data-test=\"lastName\"]",
        "value": "Kompella",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["scrollIntoView"],
        "errorMessage": "Failed to enter last name",
        "stepDescription": "Enter the last name as \"Kompella\" in the last name field"
      },
      {
        "description": "Enter the postal code as \"62567352\" in postal code field",
        "action": "fill",
        "selector": "[data-test=\"postalCode\"]",
        "value": "62567352",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["scrollIntoView"],
        "errorMessage": "Failed to enter postal code",
        "stepDescription": "Enter the postal code as \"62567352\" in postal code field"
      },
      {
        "description": "Click on continue button",
        "action": "click",
        "selector": "[data-test=\"continue\"]",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["waitForLoadState"],
        "errorMessage": "Failed to click continue button",
        "stepDescription": "Click on continue button"
      },
      {
        "description": "Click on finish button",
        "action": "click",
        "selector": "[data-test=\"finish\"]",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["waitForLoadState"],
        "errorMessage": "Failed to click finish button",
        "stepDescription": "Click on finish button"
      },
      {
        "description": "Verify the presence of the message \"Thank you for your order!\"",
        "action": "isVisible",
        "selector": ".complete-header:has-text('Thank you for your order!')",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["scrollIntoView"],
        "errorMessage": "Thank you for your order! message is not visible",
        "stepDescription": "Verify the presence of the message \"Thank you for your order!\""
      },
      {
        "description": "Click on back to home button",
        "action": "click",
        "selector": "[data-test=\"back-to-products\"]",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["waitForLoadState"],
        "errorMessage": "Failed to click back to home button",
        "stepDescription": "Click on back to home button"
      },
      {
        "description": "Click on the burger bar",
        "action": "click",
        "selector": "#react-burger-menu-btn",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["waitForLoadState"],
        "errorMessage": "Failed to click burger bar",
        "stepDescription": "Click on the burger bar"
      },
      {
        "description": "Click on logout",
        "action": "click",
        "selector": "#logout_sidebar_link",
        "waitTimeoutMs": 5000,
        "retry": 3,
        "fallbacks": ["waitForLoadState"],
        "errorMessage": "Failed to click logout",
        "stepDescription": "Click on logout"
      }
    ];

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
            if (stepData.action === "goto") {
              await page.goto(stepData.value);
              stepDetails = `Navigated to ${stepData.value}`;
            } else if (stepData.action === "fill") {
              await page.locator(stepData.selector).fill(stepData.value);
              stepDetails = `Filled ${stepData.selector}`;
            } else if (stepData.action === "click") {
              await page.locator(stepData.selector).click();
              stepDetails = `Clicked ${stepData.selector}`;
            } else if (stepData.action === "check") {
              await page.locator(stepData.selector).check();
              stepDetails = `Checked ${stepData.selector}`;
            } else if (stepData.action === "uncheck") {
              await page.locator(stepData.selector).uncheck();
              stepDetails = `Unchecked ${stepData.selector}`;
            } else if (stepData.action === "hover") {
              await page.locator(stepData.selector).hover();
              stepDetails = `Hovered ${stepData.selector}`;
            } else if (stepData.action === "waitFor") {
              await page.locator(stepData.selector).waitFor();
              stepDetails = `Waited for ${stepData.selector}`;
            } else if (stepData.action === "isVisible") {
              const isVisible = await page.locator(stepData.selector).isVisible();
              stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
              if (!isVisible) {
                stepStatus = "error";
              }
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
      // File write failed but we still return results
    }

    // GUARANTEED RETURN - This must ALWAYS execute
    return result;
  }
});