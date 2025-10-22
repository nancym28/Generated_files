import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "step": 1,
      "description": "Navigate to the Saucedemo website",
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "options": {
        "timeout": 10000,
        "waitUntil": "load"
      },
      "errorHandling": "retry"
    },
    {
      "step": 2,
      "description": "Enter username",
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 3,
      "description": "Enter password",
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 4,
      "description": "Click Login button",
      "action": "click",
      "selector": "#login-button",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 5,
      "description": "Click on product sort filter dropdown",
      "action": "click",
      "selector": ".product_sort_container",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 6,
      "description": "Select Name (Z to A) from the product sort filter dropdown",
      "action": "click",
      "selector": ".product_sort_container [value='za']",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 7,
      "description": "Add Sauce Labs Backpack to cart",
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 8,
      "description": "Click on the cart icon",
      "action": "click",
      "selector": ".shopping_cart_link",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 9,
      "description": "Ensure that the product 'Sauce Labs Backpack' is present in the cart",
      "action": "isVisible",
      "selector": "//div[@class='inventory_item_name' and text()='Sauce Labs Backpack']",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 10,
      "description": "Click on the checkout button",
      "action": "click",
      "selector": "#checkout",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 11,
      "description": "Enter first name",
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 12,
      "description": "Enter last name",
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 13,
      "description": "Enter postal code",
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 14,
      "description": "Click on continue button",
      "action": "click",
      "selector": "#continue",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 15,
      "description": "Click on finish button",
      "action": "click",
      "selector": "#finish",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 16,
      "description": "Assert that the text 'Thank you for your order!' is present",
      "action": "isVisible",
      "selector": "//h2[text()='Thank you for your order!']",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 17,
      "description": "Click on back to home button",
      "action": "click",
      "selector": "#back-to-products",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 18,
      "description": "Click on the burger bar",
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    },
    {
      "step": 19,
      "description": "Click on logout",
      "action": "click",
      "selector": "#logout_sidebar_link",
      "options": {
        "timeout": 5000
      },
      "errorHandling": "retry"
    }
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
        for (const stepData of originalUserSteps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            switch (stepData.action) {
              case "goto":
                await page.goto(stepData.url, stepData.options);
                stepDetails = `Navigated to ${stepData.url}`;
                break;
              case "click":
                await page.locator(stepData.selector).click(stepData.options);
                stepDetails = `Clicked ${stepData.selector}`;
                break;
              case "fill":
                await page.locator(stepData.selector).fill(stepData.value, stepData.options);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                break;
              case "check":
                await page.locator(stepData.selector).check(stepData.options);
                stepDetails = `Checked ${stepData.selector}`;
                break;
              case "uncheck":
                await page.locator(stepData.selector).uncheck(stepData.options);
                stepDetails = `Unchecked ${stepData.selector}`;
                break;
              case "hover":
                await page.locator(stepData.selector).hover(stepData.options);
                stepDetails = `Hovered ${stepData.selector}`;
                break;
              case "waitFor":
                await page.locator(stepData.selector).waitFor(stepData.options);
                stepDetails = `Waited for ${stepData.selector}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selector).isVisible(stepData.options);
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
      user_test_steps: originalUserSteps.map(step => step.description),
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