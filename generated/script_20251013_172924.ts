import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to saucedemo login page",
    "Enter username",
    "Enter password",
    "Click login",
    "Click product sort dropdown",
    "Select Name (Z to A)",
    "Add Sauce Labs Backpack to cart",
    "Click cart icon",
    "Verify Sauce Labs Backpack in cart",
    "Click checkout",
    "Fill first name",
    "Fill last name",
    "Fill postal code",
    "Click continue",
    "Click finish",
    "Verify Thank you message",
    "Click back to home",
    "Click burger menu",
    "Click logout"
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
          "fallbacks": [
            "waitForLoadState"
          ],
          "errorMessage": "Failed to navigate to saucedemo",
          "stepDescription": "Navigate to saucedemo login page"
        },
        {
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not fill username field",
          "stepDescription": "Enter username"
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not fill password field",
          "stepDescription": "Enter password"
        },
        {
          "action": "click",
          "selector": "#login-button",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not click login button",
          "stepDescription": "Click login"
        },
        {
          "action": "click",
          "selector": ".product_sort_container",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not click product sort dropdown",
          "stepDescription": "Click product sort dropdown"
        },
        {
          "action": "click",
          "selector": "select.product_sort_container > option[value=\"za\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not select Name (Z to A)",
          "stepDescription": "Select Name (Z to A)"
        },
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not add Sauce Labs Backpack to cart",
          "stepDescription": "Add Sauce Labs Backpack to cart"
        },
        {
          "action": "click",
          "selector": ".shopping_cart_link",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not click cart icon",
          "stepDescription": "Click cart icon"
        },
        {
          "action": "isVisible",
          "selector": ".cart_item:has-text(\"Sauce Labs Backpack\")",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector"
          ],
          "errorMessage": "Sauce Labs Backpack not found in cart",
          "stepDescription": "Verify Sauce Labs Backpack in cart"
        },
        {
          "action": "click",
          "selector": "#checkout",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not click checkout button",
          "stepDescription": "Click checkout"
        },
        {
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not fill first name",
          "stepDescription": "Fill first name"
        },
        {
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not fill last name",
          "stepDescription": "Fill last name"
        },
        {
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not fill postal code",
          "stepDescription": "Fill postal code"
        },
        {
          "action": "click",
          "selector": "#continue",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not click continue button",
          "stepDescription": "Click continue"
        },
        {
          "action": "click",
          "selector": "#finish",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not click finish button",
          "stepDescription": "Click finish"
        },
        {
          "action": "isVisible",
          "selector": "text=\"Thank you for your order!\"",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector"
          ],
          "errorMessage": "Thank you message not found",
          "stepDescription": "Verify Thank you message"
        },
        {
          "action": "click",
          "selector": "#back-to-products",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not click back to home button",
          "stepDescription": "Click back to home"
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not click burger menu",
          "stepDescription": "Click burger menu"
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "waitForSelector",
            "scrollIntoView"
          ],
          "errorMessage": "Could not click logout button",
          "stepDescription": "Click logout"
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