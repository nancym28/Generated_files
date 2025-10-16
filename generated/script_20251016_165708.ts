import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id user-name.",
    "Enter \"secret_sauce\" in the password field with id password.",
    "Click the Login button with id login-button.",
    "Click on the product sort filter dropdown with data-test product-sort-container.",
    "Click the Add to Cart button for product \"Sauce Labs Backpack\" with id add-to-cart-sauce-labs-backpack.",
    "Click on the cart icon with data-test shopping-cart-link.",
    "Verify that the product \"Sauce Labs Backpack\" is present in the cart.",
    "Click on the checkout button with data-test checkout.",
    "Enter \"chaitanya\" in the first name field with id first-name.",
    "Enter \"Kompella\" in the last name field with id last-name.",
    "Enter \"62567352\" in the postal code field with id postal-code.",
    "Click on continue button with id continue.",
    "Click on finish button with data-test finish.",
    "Verify that the message “Thank you for your order!” is displayed.",
    "Click on back to home button with data-test back-to-products.",
    "Click on the burger bar with id react-burger-menu-btn.",
    "Click on logout with id logout_sidebar_link.",
    "Keep the browser open."
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const steps = [
    {
      "stepDescription": "Navigate to https://www.saucedemo.com/.",
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to navigate to https://www.saucedemo.com/."
    },
    {
      "stepDescription": "Enter \"standard_user\" in the username field with id user-name.",
      "action": "fill",
      "selectors": [
        "#user-name",
        "[data-test='username']",
        "[name='user-name']",
        "input[type='text'][placeholder='Username']"
      ],
      "text": "standard_user",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to enter username."
    },
    {
      "stepDescription": "Enter \"secret_sauce\" in the password field with id password.",
      "action": "fill",
      "selectors": [
        "#password",
        "[data-test='password']",
        "[name='password']",
        "input[type='password'][placeholder='Password']"
      ],
      "text": "secret_sauce",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to enter password."
    },
    {
      "stepDescription": "Click the Login button with id login-button.",
      "action": "click",
      "selectors": [
        "#login-button",
        "[data-test='login-button']",
        "[name='login-button']",
        "input[type='submit'][value='Login']"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click login button."
    },
    {
      "stepDescription": "Click on the product sort filter dropdown with data-test product-sort-container.",
      "action": "click",
      "selectors": [
        "[data-test='product-sort-container']",
        "select.product_sort_container"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click product sort filter dropdown."
    },
    {
      "stepDescription": "Click the Add to Cart button for product \"Sauce Labs Backpack\" with id add-to-cart-sauce-labs-backpack.",
      "action": "click",
      "selectors": [
        "#add-to-cart-sauce-labs-backpack",
        "[data-test='add-to-cart-sauce-labs-backpack']",
        "[name='add-to-cart-sauce-labs-backpack']",
        "button.btn.btn_primary.btn_small.btn_inventory"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click add to cart button for Sauce Labs Backpack."
    },
    {
      "stepDescription": "Click on the cart icon with data-test shopping-cart-link.",
      "action": "click",
      "selectors": [
        "[data-test='shopping-cart-link']",
        "a.shopping_cart_link"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click cart icon."
    },
    {
      "stepDescription": "Verify that the product \"Sauce Labs Backpack\" is present in the cart.",
      "action": "isVisible",
      "selectors": [
        "div.cart_item[data-test='inventory-item'] div.inventory_item_name[data-test='inventory-item-name']"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Failed to verify Sauce Labs Backpack is present in the cart."
    },
    {
      "stepDescription": "Click on the checkout button with data-test checkout.",
      "action": "click",
      "selectors": [
        "[data-test='checkout']",
        "#checkout",
        "[name='checkout']",
        "button.checkout_button"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click checkout button."
    },
    {
      "stepDescription": "Enter \"chaitanya\" in the first name field with id first-name.",
      "action": "fill",
      "selectors": [
        "#first-name",
        "[data-test='firstName']",
        "[name='firstName']",
        "input[placeholder='First Name']"
      ],
      "text": "chaitanya",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to enter first name."
    },
    {
      "stepDescription": "Enter \"Kompella\" in the last name field with id last-name.",
      "action": "fill",
      "selectors": [
        "#last-name",
        "[data-test='lastName']",
        "[name='lastName']",
        "input[placeholder='Last Name']"
      ],
      "text": "Kompella",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to enter last name."
    },
    {
      "stepDescription": "Enter \"62567352\" in the postal code field with id postal-code.",
      "action": "fill",
      "selectors": [
        "#postal-code",
        "[data-test='postalCode']",
        "[name='postalCode']",
        "input[placeholder='Zip/Postal Code']"
      ],
      "text": "62567352",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to enter postal code."
    },
    {
      "stepDescription": "Click on continue button with id continue.",
      "action": "click",
      "selectors": [
        "#continue",
        "[data-test='continue']",
        "[name='continue']",
        "input[value='Continue']"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click continue button."
    },
    {
      "stepDescription": "Click on finish button with data-test finish.",
      "action": "click",
      "selectors": [
        "[data-test='finish']",
        "#finish",
        "[name='finish']",
        "button.btn.btn_action.cart_button"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click finish button."
    },
    {
      "stepDescription": "Verify that the message “Thank you for your order!” is displayed.",
      "action": "isVisible",
      "selectors": [
        "h2.complete-header"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Failed to verify Thank you for your order! message is displayed."
    },
    {
      "stepDescription": "Click on back to home button with data-test back-to-products.",
      "action": "click",
      "selectors": [
        "[data-test='back-to-products']",
        "#back-to-products",
        "[name='back-to-products']",
        "button.btn.btn_secondary"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click back to home button."
    },
    {
      "stepDescription": "Click on the burger bar with id react-burger-menu-btn.",
      "action": "click",
      "selectors": [
        "#react-burger-menu-btn"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click burger bar."
    },
    {
      "stepDescription": "Click on logout with id logout_sidebar_link.",
      "action": "click",
      "selectors": [
        "#logout_sidebar_link"
      ],
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState",
        "scrollIntoView"
      ],
      "errorMessage": "Failed to click logout."
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
                await page.goto(stepData.url);
                stepDetails = `Navigated to ${stepData.url}`;
                break;
              case "fill":
                await page.locator(stepData.selectors[0]).fill(stepData.text);
                stepDetails = `Filled ${stepData.selectors[0]}`;
                break;
              case "click":
                await page.locator(stepData.selectors[0]).click();
                stepDetails = `Clicked ${stepData.selectors[0]}`;
                break;
              case "check":
                await page.locator(stepData.selectors[0]).check();
                stepDetails = `Checked ${stepData.selectors[0]}`;
                break;
              case "uncheck":
                await page.locator(stepData.selectors[0]).uncheck();
                stepDetails = `Unchecked ${stepData.selectors[0]}`;
                break;
              case "hover":
                await page.locator(stepData.selectors[0]).hover();
                stepDetails = `Hovered ${stepData.selectors[0]}`;
                break;
              case "waitFor":
                await page.locator(stepData.selectors[0]).waitFor();
                stepDetails = `Waited for ${stepData.selectors[0]}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selectors[0]).isVisible();
                stepDetails = `Element ${stepData.selectors[0]} is ${isVisible ? 'visible' : 'not visible'}`;
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