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
    "Click on the burger bar button with id \"react-burger-menu-btn\"",
    "Click on the logout button with id \"logout_sidebar_link\""
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
          "stepNumber": 1,
          "action": "goto",
          "url": "https://www.saucedemo.com/",
          "timeout": 10000,
          "retries": 3,
          "errorMessage": "Navigation to saucedemo failed after multiple retries."
        },
        {
          "stepNumber": 2,
          "action": "fill",
          "selector": "#user-name",
          "selectorType": "id",
          "value": "standard_user",
          "timeout": 5000,
          "retries": 2,
          "errorMessage": "Failed to fill username field after multiple retries."
        },
        {
          "stepNumber": 3,
          "action": "fill",
          "selector": "#password",
          "selectorType": "id",
          "value": "secret_sauce",
          "timeout": 5000,
          "retries": 2,
          "errorMessage": "Failed to fill password field after multiple retries."
        },
        {
          "stepNumber": 4,
          "action": "click",
          "selector": "#login-button",
          "selectorType": "id",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click login button after multiple retries."
        },
        {
          "stepNumber": 5,
          "action": "click",
          "selector": ".product_sort_container",
          "selectorType": "class",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click product sort container after multiple retries."
        },
        {
          "stepNumber": 6,
          "action": "click",
          "selector": "option[value='za']",
          "selectorType": "css",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to select Name (Z to A) after multiple retries."
        },
        {
          "stepNumber": 7,
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "selectorType": "id",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click add to cart button for Sauce Labs Backpack after multiple retries."
        },
        {
          "stepNumber": 8,
          "action": "click",
          "selector": ".shopping_cart_link",
          "selectorType": "class",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click shopping cart link after multiple retries."
        },
        {
          "stepNumber": 9,
          "action": "isVisible",
          "selector": "div.cart_item div.inventory_item_name:has-text('Sauce Labs Backpack')",
          "selectorType": "css",
          "timeout": 5000,
          "retries": 2,
          "errorMessage": "Sauce Labs Backpack is not present in the cart."
        },
        {
          "stepNumber": 10,
          "action": "click",
          "selector": "#checkout",
          "selectorType": "id",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click checkout button after multiple retries."
        },
        {
          "stepNumber": 11,
          "action": "fill",
          "selector": "#first-name",
          "selectorType": "id",
          "value": "chaitanya",
          "timeout": 5000,
          "retries": 2,
          "errorMessage": "Failed to fill first name field after multiple retries."
        },
        {
          "stepNumber": 12,
          "action": "fill",
          "selector": "#last-name",
          "selectorType": "id",
          "value": "Kompella",
          "timeout": 5000,
          "retries": 2,
          "errorMessage": "Failed to fill last name field after multiple retries."
        },
        {
          "stepNumber": 13,
          "action": "fill",
          "selector": "#postal-code",
          "selectorType": "id",
          "value": "62567352",
          "timeout": 5000,
          "retries": 2,
          "errorMessage": "Failed to fill postal code field after multiple retries."
        },
        {
          "stepNumber": 14,
          "action": "click",
          "selector": "#continue",
          "selectorType": "id",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click continue button after multiple retries."
        },
        {
          "stepNumber": 15,
          "action": "click",
          "selector": "#finish",
          "selectorType": "id",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click finish button after multiple retries."
        },
        {
          "stepNumber": 16,
          "action": "isVisible",
          "selector": "text=Thank you for your order!",
          "selectorType": "text",
          "timeout": 5000,
          "retries": 2,
          "errorMessage": "Thank you message is not present."
        },
        {
          "stepNumber": 17,
          "action": "click",
          "selector": "#back-to-products",
          "selectorType": "id",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click back to home button after multiple retries."
        },
        {
          "stepNumber": 18,
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "selectorType": "id",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click burger bar button after multiple retries."
        },
        {
          "stepNumber": 19,
          "action": "click",
          "selector": "#logout_sidebar_link",
          "selectorType": "id",
          "timeout": 5000,
          "retries": 3,
          "errorMessage": "Failed to click logout button after multiple retries."
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
                await page.goto(stepData.url);
                stepDetails = `Navigated to ${stepData.url}`;
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
                  stepStatus = 'error';
                }
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute step ${stepData.stepNumber}: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(originalUserSteps[stepData.stepNumber - 1]);
          executionResults.push({
            step: originalUserSteps[stepData.stepNumber - 1],
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
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});