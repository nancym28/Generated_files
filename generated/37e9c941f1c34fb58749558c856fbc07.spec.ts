import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "step": 1,
      "action": "goto",
      "selector": null,
      "url": "https://www.saucedemo.com/",
      "timeout": 10000,
      "retries": 3,
      "onError": "captureScreenshot",
      "errorMessage": "Navigation to saucedemo failed.",
      "value": null
    },
    {
      "step": 2,
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "timeout": 5000,
      "retries": 2,
      "waitAfter": 500,
      "onError": "captureScreenshot",
      "errorMessage": "Could not enter username."
    },
    {
      "step": 3,
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "timeout": 5000,
      "retries": 2,
      "waitAfter": 500,
      "onError": "captureScreenshot",
      "errorMessage": "Could not enter password."
    },
    {
      "step": 4,
      "action": "click",
      "selector": "#login-button",
      "timeout": 7000,
      "retries": 3,
      "waitAfter": 1000,
      "onError": "captureScreenshot",
      "errorMessage": "Could not click login button.",
      "value": null
    },
    {
      "step": 5,
      "action": "click",
      "selector": ".product_sort_container",
      "timeout": 5000,
      "retries": 2,
      "waitAfter": 500,
      "onError": "captureScreenshot",
      "errorMessage": "Could not click product sort filter dropdown.",
      "value": null
    },
    {
      "step": 6,
      "action": "selectOption",
      "selector": ".product_sort_container",
      "timeout": 5000,
      "retries": 2,
      "waitAfter": 500,
      "onError": "captureScreenshot",
      "errorMessage": "Could not select Name (Z to A) from the product sort filter.",
      "value": "za"
    },
    {
      "step": 7,
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "timeout": 7000,
      "retries": 3,
      "waitAfter": 1000,
      "onError": "captureScreenshot",
      "errorMessage": "Could not add Sauce Labs Backpack to cart.",
      "value": null
    },
    {
      "step": 8,
      "action": "click",
      "selector": ".shopping_cart_link",
      "timeout": 7000,
      "retries": 3,
      "waitAfter": 1000,
      "onError": "captureScreenshot",
      "errorMessage": "Could not click the cart icon.",
      "value": null
    },
    {
      "step": 9,
      "action": "isVisible",
      "selector": ".cart_item .inventory_item_name:has-text('Sauce Labs Backpack')",
      "timeout": 7000,
      "retries": 3,
      "onError": "captureScreenshot",
      "errorMessage": "Sauce Labs Backpack is not present in the cart.",
      "value": null
    },
    {
      "step": 10,
      "action": "click",
      "selector": "#checkout",
      "timeout": 7000,
      "retries": 3,
      "waitAfter": 1000,
      "onError": "captureScreenshot",
      "errorMessage": "Could not click the checkout button.",
      "value": null
    },
    {
      "step": 11,
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "timeout": 5000,
      "retries": 2,
      "waitAfter": 500,
      "onError": "captureScreenshot",
      "errorMessage": "Could not enter first name."
    },
    {
      "step": 12,
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "timeout": 5000,
      "retries": 2,
      "waitAfter": 500,
      "onError": "captureScreenshot",
      "errorMessage": "Could not enter last name."
    },
    {
      "step": 13,
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "timeout": 5000,
      "retries": 2,
      "waitAfter": 500,
      "onError": "captureScreenshot",
      "errorMessage": "Could not enter postal code."
    },
    {
      "step": 14,
      "action": "click",
      "selector": "#continue",
      "timeout": 7000,
      "retries": 3,
      "waitAfter": 1000,
      "onError": "captureScreenshot",
      "errorMessage": "Could not click the continue button.",
      "value": null
    },
    {
      "step": 15,
      "action": "click",
      "selector": "#finish",
      "timeout": 7000,
      "retries": 3,
      "waitAfter": 1000,
      "onError": "captureScreenshot",
      "errorMessage": "Could not click the finish button.",
      "value": null
    },
    {
      "step": 16,
      "action": "isVisible",
      "selector": ".complete-header",
      "timeout": 7000,
      "retries": 3,
      "onError": "captureScreenshot",
      "errorMessage": "The message 'Thank you for your order!' is not displayed.",
      "value": null
    },
    {
      "step": 17,
      "action": "click",
      "selector": "#back-to-products",
      "timeout": 7000,
      "retries": 3,
      "waitAfter": 1000,
      "onError": "captureScreenshot",
      "errorMessage": "Could not click the back to home button.",
      "value": null
    },
    {
      "step": 18,
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "timeout": 7000,
      "retries": 3,
      "waitAfter": 1000,
      "onError": "captureScreenshot",
      "errorMessage": "Could not click the burger bar.",
      "value": null
    },
    {
      "step": 19,
      "action": "click",
      "selector": "#logout_sidebar_link",
      "timeout": 7000,
      "retries": 3,
      "waitAfter": 1000,
      "onError": "captureScreenshot",
      "errorMessage": "Could not click the logout button.",
      "value": null
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
                  stepStatus = "error";
                }
                break;
              case "selectOption":
                  await page.locator(stepData.selector).selectOption(stepData.value);
                  stepDetails = `Selected option ${stepData.value} in ${stepData.selector}`;
                  break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute step ${stepData.step}: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(`Step ${stepData.step}: ${stepData.action} ${stepData.selector || stepData.url || stepData.value}`);
          executionResults.push({
            step: `Step ${stepData.step}`,
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
      user_test_steps: originalUserSteps.map(step => `Step ${step.step}: ${step.action} ${step.selector || step.url || step.value}`),
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