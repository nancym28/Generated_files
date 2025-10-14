import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('SauceDemo End-to-End Test', async () => {
  test.setTimeout(120000);

  const originalUserSteps = [
    "Navigate to the Saucedemo website",
    "Enter username",
    "Enter password",
    "Click login button",
    "Click product sort filter dropdown",
    "Select 'Name (Z to A)' from the dropdown",
    "Add Sauce Labs Backpack to cart",
    "Navigate to the shopping cart",
    "Verify Sauce Labs Backpack is in the cart",
    "Click the checkout button",
    "Enter first name",
    "Enter last name",
    "Enter postal code",
    "Click the continue button",
    "Click the finish button",
    "Verify success message",
    "Click back to products button",
    "Open the burger menu",
    "Click the logout button"
  ];

  const stepsFromInput = [
    {
      "step": 1,
      "action": "goto",
      "selector": "https://www.saucedemo.com/",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Navigation to saucedemo failed after multiple retries.",
      "stepDescription": "Navigate to the Saucedemo website"
    },
    {
      "step": 2,
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "waitTimeoutMs": 1000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Could not enter username after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Enter username"
    },
    {
      "step": 3,
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "waitTimeoutMs": 1000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Could not enter password after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Enter password"
    },
    {
      "step": 4,
      "action": "click",
      "selector": "#login-button",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Login button click failed after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Click login button"
    },
    {
      "step": 5,
      "action": "click",
      "selector": "[data-test='product-sort-container']",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not click the sort dropdown after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Click product sort filter dropdown"
    },
    {
      "step": 6,
      "action": "click",
      "selector": "[data-test='product-sort-container'] option[value='za']",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not select 'Name (Z to A)' after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Select 'Name (Z to A)' from the dropdown"
    },
    {
      "step": 7,
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not add item to cart after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Add Sauce Labs Backpack to cart"
    },
    {
      "step": 8,
      "action": "click",
      "selector": "[data-test='shopping-cart-link']",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not navigate to cart after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Navigate to the shopping cart"
    },
    {
      "step": 9,
      "action": "isVisible",
      "selector": "[data-test='inventory-item']:has-text('Sauce Labs Backpack')",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Verification of item in cart failed after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Verify Sauce Labs Backpack is in the cart"
    },
    {
      "step": 10,
      "action": "click",
      "selector": "[data-test='checkout']",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not click checkout button after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Click the checkout button"
    },
    {
      "step": 11,
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "waitTimeoutMs": 1000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Could not enter first name after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Enter first name"
    },
    {
      "step": 12,
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "waitTimeoutMs": 1000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Could not enter last name after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Enter last name"
    },
    {
      "step": 13,
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "waitTimeoutMs": 1000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Could not enter postal code after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Enter postal code"
    },
    {
      "step": 14,
      "action": "click",
      "selector": "[data-test='continue']",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not click continue button after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Click the continue button"
    },
    {
      "step": 15,
      "action": "click",
      "selector": "[data-test='finish']",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not click finish button after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Click the finish button"
    },
    {
      "step": 16,
      "action": "isVisible",
      "selector": ".complete-header:has-text('Thank you for your order!')",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Verification of success message failed after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Verify success message"
    },
    {
      "step": 17,
      "action": "click",
      "selector": "[data-test='back-to-products']",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not click back to products button after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Click back to products button"
    },
    {
      "step": 18,
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not open burger menu after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Open the burger menu"
    },
    {
      "step": 19,
      "action": "click",
      "selector": "#logout_sidebar_link",
      "value": null,
      "waitTimeoutMs": 2000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Could not click logout button after multiple retries. Check if the element is present and enabled.",
      "stepDescription": "Click the logout button"
    }
  ];

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
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
      if (stepsFromInput.length === 0) {
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
                await page.goto(stepData.selector);
                stepDetails = `Navigated to ${stepData.selector}`;
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
                if (!isVisible) {
                  stepStatus = "error";
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
      require('fs').writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    return result;
  }
});