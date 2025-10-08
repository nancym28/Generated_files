import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" in the username field with id \"user-name\"",
    "Enter \"secret_sauce\" in the password field with id \"password\"",
    "Click the Login button with id \"login-button\"",
    "Click on the product sort filter dropdown with class \"product_sort_container\"",
    "Select Name (Z to A) from the product sort filter dropdown",
    "Click the Add to Cart button for the product \"Sauce Labs Backpack\" with id \"add-to-cart-sauce-labs-backpack\"",
    "Click on the cart icon with class \"shopping_cart_link\"",
    "Verify that the product \"Sauce Labs Backpack\" is present in the cart",
    "Click on the checkout button with id \"checkout\"",
    "Enter \"chaitanya\" in the first name field with id \"first-name\"",
    "Enter \"Kompella\" in the last name field with id \"last-name\"",
    "Enter \"62567352\" in the postal code field with id \"postal-code\"",
    "Click on continue button with id \"continue\"",
    "Click on finish button with id \"finish\"",
    "Verify the presence of the message “Thank you for your order!”",
    "Click on back to home button with id \"back-to-products\"",
    "Click on the burger bar with id \"react-burger-menu-btn\"",
    "Click on logout with id \"logout_sidebar_link\""
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
          "step": 1,
          "action": "goto",
          "selector": "/",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 10000,
          "error": "Navigation to homepage failed.",
          "description": "Navigate to the home page"
        },
        {
          "step": 2,
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTime": 500,
          "retries": 2,
          "timeout": 5000,
          "error": "Could not enter username.",
          "description": "Enter username",
          "isVisible": true
        },
        {
          "step": 3,
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTime": 500,
          "retries": 2,
          "timeout": 5000,
          "error": "Could not enter password.",
          "description": "Enter password",
          "isVisible": true
        },
        {
          "step": 4,
          "action": "click",
          "selector": "#login-button",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not click login button.",
          "description": "Click login button",
          "isVisible": true
        },
        {
          "step": 5,
          "action": "click",
          "selector": ".product_sort_container",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not click product sort container.",
          "description": "Click product sort filter",
          "isVisible": true
        },
        {
          "step": 6,
          "action": "click",
          "selector": ".product_sort_container > option[value=\"za\"]",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not select Name (Z to A).",
          "description": "Select Name (Z to A)",
          "isVisible": true
        },
        {
          "step": 7,
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not add item to cart.",
          "description": "Add item to cart",
          "isVisible": true
        },
        {
          "step": 8,
          "action": "click",
          "selector": ".shopping_cart_link",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not click cart icon.",
          "description": "Click cart icon",
          "isVisible": true
        },
        {
          "step": 9,
          "action": "isVisible",
          "selector": ".cart_item:has-text(\"Sauce Labs Backpack\")",
          "value": null,
          "waitTime": 2000,
          "retries": 3,
          "timeout": 5000,
          "error": "Product not found in cart.",
          "description": "Verify product in cart"
        },
        {
          "step": 10,
          "action": "click",
          "selector": "#checkout",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not click checkout button.",
          "description": "Click checkout",
          "isVisible": true
        },
        {
          "step": 11,
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "waitTime": 500,
          "retries": 2,
          "timeout": 5000,
          "error": "Could not enter first name.",
          "description": "Enter first name",
          "isVisible": true
        },
        {
          "step": 12,
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "waitTime": 500,
          "retries": 2,
          "timeout": 5000,
          "error": "Could not enter last name.",
          "description": "Enter last name",
          "isVisible": true
        },
        {
          "step": 13,
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "waitTime": 500,
          "retries": 2,
          "timeout": 5000,
          "error": "Could not enter postal code.",
          "description": "Enter postal code",
          "isVisible": true
        },
        {
          "step": 14,
          "action": "click",
          "selector": "#continue",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not click continue button.",
          "description": "Click continue",
          "isVisible": true
        },
        {
          "step": 15,
          "action": "click",
          "selector": "#finish",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not click finish button.",
          "description": "Click finish",
          "isVisible": true
        },
        {
          "step": 16,
          "action": "isVisible",
          "selector": ".complete-header:has-text(\"Thank you for your order!\")",
          "value": null,
          "waitTime": 2000,
          "retries": 3,
          "timeout": 5000,
          "error": "Order confirmation message not found.",
          "description": "Verify order confirmation message"
        },
        {
          "step": 17,
          "action": "click",
          "selector": "#back-to-products",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not click back to home button.",
          "description": "Click back to home",
          "isVisible": true
        },
        {
          "step": 18,
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not click burger bar.",
          "description": "Click burger bar",
          "isVisible": true
        },
        {
          "step": 19,
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTime": 1000,
          "retries": 3,
          "timeout": 5000,
          "error": "Could not click logout.",
          "description": "Click logout",
          "isVisible": true
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
                await page.goto(`https://www.saucedemo.com${stepData.selector}`);
                stepDetails = `Navigated to https://www.saucedemo.com${stepData.selector}`;
                break;
              case "fill":
                await page.locator(stepData.selector).fill(stepData.value);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
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
            stepDetails = `Failed to execute: ${stepData.description}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(stepData.description);
          executionResults.push({
            step: stepData.description,
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