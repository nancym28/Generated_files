import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" into the username field with id user-name",
    "Enter \"secret_sauce\" into the password field with id password",
    "Click the Login button with id login-button",
    "Click on the product sort filter dropdown with class product_sort_container",
    "Select Name (Z to A) from the product sort filter dropdown",
    "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for the product Sauce Labs Backpack",
    "Click on the cart icon with class shopping_cart_link",
    "Verify that the product Sauce Labs Backpack is present in the cart",
    "Click on the checkout button with id checkout",
    "Enter \"chaitanya\" into the first name field with id first-name",
    "Enter \"Kompella\" into the last name field with id last-name",
    "Enter \"62567352\" into the postal code field with id postal-code",
    "Click on the continue button with id continue",
    "Click on the finish button with id finish",
    "Verify that the message “Thank you for your order!” is displayed",
    "Click on the back to home button with id back-to-products",
    "Click on the burger bar button with id react-burger-menu-btn",
    "Click on the logout button with id logout",
    "Keep the browser open"
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const steps = [
    {
      "action": "goto",
      "selector": null,
      "value": "https://www.saucedemo.com/",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Navigation to saucedemo failed after multiple retries.",
      "stepDescription": "Navigate to https://www.saucedemo.com/"
    },
    {
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='username']",
        "input[name='user-name']"
      ],
      "errorMessage": "Failed to fill username field after multiple retries.",
      "stepDescription": "Enter 'standard_user' into the username field."
    },
    {
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='password']",
        "input[name='password']"
      ],
      "errorMessage": "Failed to fill password field after multiple retries.",
      "stepDescription": "Enter 'secret_sauce' into the password field."
    },
    {
      "action": "click",
      "selector": "#login-button",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='login-button']",
        "input[value='Login']"
      ],
      "errorMessage": "Failed to click login button after multiple retries.",
      "stepDescription": "Click the Login button."
    },
    {
      "action": "click",
      "selector": ".product_sort_container",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='product_sort_container']",
        "select[class='product_sort_container']"
      ],
      "errorMessage": "Failed to click product sort container after multiple retries.",
      "stepDescription": "Click the product sort filter dropdown."
    },
    {
      "action": "click",
      "selector": "option[value='za']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "//select[@class='product_sort_container']/option[text()='Name (Z to A)']",
        "text=Name (Z to A)"
      ],
      "errorMessage": "Failed to select 'Name (Z to A)' option after multiple retries.",
      "stepDescription": "Click the 'Name (Z to A)' option."
    },
    {
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='add-to-cart-sauce-labs-backpack']",
        "button:has-text('Add to cart'):near(:text('Sauce Labs Backpack'))"
      ],
      "errorMessage": "Failed to click 'Add to cart' for 'Sauce Labs Backpack' after multiple retries.",
      "stepDescription": "Click the Add to cart button for 'Sauce Labs Backpack'."
    },
    {
      "action": "click",
      "selector": ".shopping_cart_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "a[class='shopping_cart_link']",
        "//div[@id='shopping_cart_container']/a"
      ],
      "errorMessage": "Failed to click the cart icon after multiple retries.",
      "stepDescription": "Click the cart icon."
    },
    {
      "action": "isVisible",
      "selector": ".inventory_item_name:has-text('Sauce Labs Backpack')",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "//div[@class='inventory_item_name' and text()='Sauce Labs Backpack']",
        "text='Sauce Labs Backpack'"
      ],
      "errorMessage": "'Sauce Labs Backpack' not found in cart after multiple retries.",
      "stepDescription": "Assert that 'Sauce Labs Backpack' is present in the cart."
    },
    {
      "action": "click",
      "selector": "#checkout",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='checkout']",
        "button:has-text('Checkout')"
      ],
      "errorMessage": "Failed to click the checkout button after multiple retries.",
      "stepDescription": "Click the checkout button."
    },
    {
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='firstName']",
        "input[name='firstName']"
      ],
      "errorMessage": "Failed to fill first name field after multiple retries.",
      "stepDescription": "Enter 'chaitanya' into the first name field."
    },
    {
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='lastName']",
        "input[name='lastName']"
      ],
      "errorMessage": "Failed to fill last name field after multiple retries.",
      "stepDescription": "Enter 'Kompella' into the last name field."
    },
    {
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='postalCode']",
        "input[name='postalCode']"
      ],
      "errorMessage": "Failed to fill postal code field after multiple retries.",
      "stepDescription": "Enter '62567352' into the postal code field."
    },
    {
      "action": "click",
      "selector": "#continue",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='continue']",
        "input[value='Continue']"
      ],
      "errorMessage": "Failed to click the continue button after multiple retries.",
      "stepDescription": "Click the continue button."
    },
    {
      "action": "click",
      "selector": "#finish",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='finish']",
        "button:has-text('Finish')"
      ],
      "errorMessage": "Failed to click the finish button after multiple retries.",
      "stepDescription": "Click the finish button."
    },
    {
      "action": "isVisible",
      "selector": ".complete-header:has-text('Thank you for your order!')",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "//h2[@class='complete-header' and text()='Thank you for your order!']",
        "text='Thank you for your order!'"
      ],
      "errorMessage": "Confirmation message not found after multiple retries.",
      "stepDescription": "Assert that the message 'Thank you for your order!' is displayed."
    },
    {
      "action": "click",
      "selector": "#back-to-products",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='back-to-products']",
        "button:has-text('Back to products')"
      ],
      "errorMessage": "Failed to click the back to home button after multiple retries.",
      "stepDescription": "Click the back to home button."
    },
    {
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "button#react-burger-menu-btn",
        "//button[@id='react-burger-menu-btn']"
      ],
      "errorMessage": "Failed to click the burger bar button after multiple retries.",
      "stepDescription": "Click the burger bar button."
    },
    {
      "action": "click",
      "selector": "#logout_sidebar_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "a#logout_sidebar_link",
        "//a[@id='logout_sidebar_link']"
      ],
      "errorMessage": "Failed to click the logout button after multiple retries.",
      "stepDescription": "Click the logout button."
    },
    {
      "action": "waitFor",
      "selector": null,
      "value": null,
      "waitTimeoutMs": 0,
      "retry": 0,
      "fallbacks": [],
      "errorMessage": null,
      "stepDescription": "Keep the browser open."
    }
  ];

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
                // Intentionally empty, as waitFor is meant to keep the browser open
                stepDetails = `Waiting for browser to close manually`;
                break;
              case "isVisible":
                try {
                  await page.locator(stepData.selector).isVisible({ timeout: stepData.waitTimeoutMs });
                  stepDetails = `Element ${stepData.selector} is visible`;
                } catch (e) {
                  stepStatus = "error";
                  stepDetails = `Element ${stepData.selector} is not visible`;
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
      fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    return result;
  }
});