import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" in the username field with id user-name",
    "Enter \"secret_sauce\" in the password field with id password",
    "Click the Login button with id login-button",
    "Click on the product sort filter dropdown with class product_sort_container",
    "Select Name (Z to A) from the product sort filter dropdown",
    "Click the Add to Cart button for the product \"Sauce Labs Backpack\" with id add-to-cart-sauce-labs-backpack",
    "Click on the cart icon with class shopping_cart_link",
    "Ensure that the product \"Sauce Labs Backpack\" is present in the cart",
    "Click on the checkout button with id checkout",
    "Enter \"chaitanya\" in the first name field with id first-name",
    "Enter \"Kompella\" in the last name field with id last-name",
    "Enter \"62567352\" in the postal code field with id postal-code",
    "Click on the continue button with id continue",
    "Click on the finish button with id finish",
    "Verify the presence of the message “Thank you for your order!”",
    "Click on the back to home button with id back-to-products",
    "Click on the burger bar with id react-burger-menu-btn",
    "Click on the logout button with id logout_sidebar_link"
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
          "selector": "https://www.saucedemo.com/",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Navigation to https://www.saucedemo.com/ failed.",
          "stepDescription": "Navigate to https://www.saucedemo.com/"
        },
        {
          "step": 2,
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#user-name"
            }
          ],
          "errorMessage": "Failed to enter 'standard_user' in the username field.",
          "stepDescription": "Enter 'standard_user' in the username field"
        },
        {
          "step": 3,
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#password"
            }
          ],
          "errorMessage": "Failed to enter 'secret_sauce' in the password field.",
          "stepDescription": "Enter 'secret_sauce' in the password field"
        },
        {
          "step": 4,
          "action": "click",
          "selector": "#login-button",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#login-button"
            }
          ],
          "errorMessage": "Failed to click the Login button.",
          "stepDescription": "Click the Login button"
        },
        {
          "step": 5,
          "action": "click",
          "selector": ".product_sort_container",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": ".product_sort_container"
            }
          ],
          "errorMessage": "Failed to click on the product sort filter dropdown.",
          "stepDescription": "Click on the product sort filter dropdown"
        },
        {
          "step": 6,
          "action": "click",
          "selector": "select.product_sort_container option[value='za']",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to select Name (Z to A) from the product sort filter dropdown.",
          "stepDescription": "Select Name (Z to A) from the product sort filter dropdown"
        },
        {
          "step": 7,
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#add-to-cart-sauce-labs-backpack"
            }
          ],
          "errorMessage": "Failed to click the Add to Cart button for the product 'Sauce Labs Backpack'.",
          "stepDescription": "Click the Add to Cart button for the product 'Sauce Labs Backpack'"
        },
        {
          "step": 8,
          "action": "click",
          "selector": ".shopping_cart_link",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": ".shopping_cart_link"
            }
          ],
          "errorMessage": "Failed to click on the cart icon.",
          "stepDescription": "Click on the cart icon"
        },
        {
          "step": 9,
          "action": "isVisible",
          "selector": "//div[@class='inventory_item_name' and text()='Sauce Labs Backpack']",
          "value": true,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "The product 'Sauce Labs Backpack' is not present in the cart.",
          "stepDescription": "Ensure that the product 'Sauce Labs Backpack' is present in the cart"
        },
        {
          "step": 10,
          "action": "click",
          "selector": "#checkout",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#checkout"
            }
          ],
          "errorMessage": "Failed to click on the checkout button.",
          "stepDescription": "Click on the checkout button"
        },
        {
          "step": 11,
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#first-name"
            }
          ],
          "errorMessage": "Failed to enter 'chaitanya' in the first name field.",
          "stepDescription": "Enter 'chaitanya' in the first name field"
        },
        {
          "step": 12,
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#last-name"
            }
          ],
          "errorMessage": "Failed to enter 'Kompella' in the last name field.",
          "stepDescription": "Enter 'Kompella' in the last name field"
        },
        {
          "step": 13,
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#postal-code"
            }
          ],
          "errorMessage": "Failed to enter '62567352' in the postal code field.",
          "stepDescription": "Enter '62567352' in the postal code field"
        },
        {
          "step": 14,
          "action": "click",
          "selector": "#continue",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#continue"
            }
          ],
          "errorMessage": "Failed to click on the continue button.",
          "stepDescription": "Click on the continue button"
        },
        {
          "step": 15,
          "action": "click",
          "selector": "#finish",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#finish"
            }
          ],
          "errorMessage": "Failed to click on the finish button.",
          "stepDescription": "Click on the finish button"
        },
        {
          "step": 16,
          "action": "isVisible",
          "selector": "//h2[text()='Thank you for your order!']",
          "value": true,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "The message 'Thank you for your order!' is not present.",
          "stepDescription": "Verify the presence of the message 'Thank you for your order!'"
        },
        {
          "step": 17,
          "action": "click",
          "selector": "#back-to-products",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#back-to-products"
            }
          ],
          "errorMessage": "Failed to click on the back to home button.",
          "stepDescription": "Click on the back to home button"
        },
        {
          "step": 18,
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#react-burger-menu-btn"
            }
          ],
          "errorMessage": "Failed to click on the burger bar.",
          "stepDescription": "Click on the burger bar"
        },
        {
          "step": 19,
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            {
              "action": "scrollIntoView",
              "selector": "#logout_sidebar_link"
            }
          ],
          "errorMessage": "Failed to click on the logout button.",
          "stepDescription": "Click on the logout button"
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
                await page.goto(stepData.selector);
                stepDetails = `Navigated to ${stepData.selector}`;
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