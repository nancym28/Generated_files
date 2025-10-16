import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to Saucedemo homepage",
    "Enter username",
    "Enter password",
    "Click login button",
    "Click product sort dropdown",
    "Click add to cart for Sauce Labs Backpack",
    "Click shopping cart link",
    "Assert Sauce Labs Backpack is in cart",
    "Click checkout button",
    "Enter first name",
    "Enter last name",
    "Enter postal code",
    "Click continue button",
    "Click finish button",
    "Assert Thank you for your order! text is present",
    "Click back to home button",
    "Click burger bar",
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
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to navigate to Saucedemo homepage.",
          "stepDescription": "Navigate to Saucedemo homepage"
        },
        {
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='username']",
            "[name='username']",
            "input[placeholder='Username']"
          ],
          "errorMessage": "Failed to enter username.",
          "stepDescription": "Enter username"
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='password']",
            "[name='password']",
            "input[placeholder='Password']"
          ],
          "errorMessage": "Failed to enter password.",
          "stepDescription": "Enter password"
        },
        {
          "action": "click",
          "selector": "#login-button",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='login-button']",
            "input[value='Login']",
            "input[name='login-button']"
          ],
          "errorMessage": "Failed to click login button.",
          "stepDescription": "Click login button"
        },
        {
          "action": "click",
          "selector": ".product_sort_container",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='product_sort_container']",
            "select[class='product_sort_container']"
          ],
          "errorMessage": "Failed to click product sort dropdown.",
          "stepDescription": "Click product sort dropdown"
        },
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='add-to-cart-sauce-labs-backpack']",
            "button[name='add-to-cart-sauce-labs-backpack']",
            "button:has-text('Add to cart')"
          ],
          "errorMessage": "Failed to click add to cart for Sauce Labs Backpack.",
          "stepDescription": "Click add to cart for Sauce Labs Backpack"
        },
        {
          "action": "click",
          "selector": ".shopping_cart_link",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='shopping_cart_link']",
            "a[class='shopping_cart_link']",
            "a:has([class='shopping_cart_badge'])"
          ],
          "errorMessage": "Failed to click shopping cart link.",
          "stepDescription": "Click shopping cart link"
        },
        {
          "action": "isVisible",
          "selector": "//div[@class=\"inventory_item_name\" and text()=\"Sauce Labs Backpack\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='inventory_item_name']:has-text('Sauce Labs Backpack')",
            "div:has-text('Sauce Labs Backpack')"
          ],
          "errorMessage": "Sauce Labs Backpack not found in cart.",
          "stepDescription": "Assert Sauce Labs Backpack is in cart"
        },
        {
          "action": "click",
          "selector": "#checkout",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='checkout']",
            "button[name='checkout']",
            "button:has-text('Checkout')"
          ],
          "errorMessage": "Failed to click checkout button.",
          "stepDescription": "Click checkout button"
        },
        {
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='firstName']",
            "[name='firstName']",
            "input[placeholder='First Name']"
          ],
          "errorMessage": "Failed to enter first name.",
          "stepDescription": "Enter first name"
        },
        {
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='lastName']",
            "[name='lastName']",
            "input[placeholder='Last Name']"
          ],
          "errorMessage": "Failed to enter last name.",
          "stepDescription": "Enter last name"
        },
        {
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='postalCode']",
            "[name='postalCode']",
            "input[placeholder='Zip/Postal Code']"
          ],
          "errorMessage": "Failed to enter postal code.",
          "stepDescription": "Enter postal code"
        },
        {
          "action": "click",
          "selector": "#continue",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='continue']",
            "input[value='Continue']",
            "input[name='continue']"
          ],
          "errorMessage": "Failed to click continue button.",
          "stepDescription": "Click continue button"
        },
        {
          "action": "click",
          "selector": "#finish",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='finish']",
            "button[name='finish']",
            "button:has-text('Finish')"
          ],
          "errorMessage": "Failed to click finish button.",
          "stepDescription": "Click finish button"
        },
        {
          "action": "waitFor",
          "selector": "text=Thank you for your order!",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='complete-header']",
            "h2:has-text('Thank you for your order!')",
            "//h2[text()=\"Thank you for your order!\"]"
          ],
          "errorMessage": "Thank you for your order! text not found.",
          "stepDescription": "Assert Thank you for your order! text is present"
        },
        {
          "action": "click",
          "selector": "#back-to-products",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='back-to-products']",
            "button[name='back-to-products']",
            "button:has-text('Back to products')"
          ],
          "errorMessage": "Failed to click back to home button.",
          "stepDescription": "Click back to home button"
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='react-burger-menu-btn']",
            "button[id='react-burger-menu-btn']",
            "button:has([class='bm-burger-lines'])"
          ],
          "errorMessage": "Failed to click burger bar.",
          "stepDescription": "Click burger bar"
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "[data-test='logout_sidebar_link']",
            "a[id='logout_sidebar_link']",
            "a:has-text('Logout')"
          ],
          "errorMessage": "Failed to click logout.",
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
                  stepStatus = 'error';
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
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});