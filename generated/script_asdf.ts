import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('SauceDemo Purchase Flow', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id user-name.",
    "Enter \"secret_sauce\" in the password field with id password.",
    "Click the Login button with id login-button.",
    "Click on the product sort filter dropdown with class product_sort_container.",
    "Select Name (Z to A) from the product sort filter dropdown.",
    "Locate the product \"Sauce Labs Backpack\" and click the Add to Cart button with id add-to-cart-sauce-labs-backpack.",
    "Click on the cart icon with class shopping_cart_link.",
    "Ensure that the product \"Sauce Labs Backpack\" is present in the cart.",
    "Click on the checkout button with id checkout.",
    "Enter \"chaitanya\" in the first name field with id first-name.",
    "Enter \"Kompella\" in the last name field with id last-name.",
    "Enter \"62567352\" in the postal code field with id postal-code.",
    "Click on the continue button with id continue.",
    "Click on the finish button with id finish.",
    "Verify the presence of the message “Thank you for your order!”",
    "Click on the back to home button with id back-to-products.",
    "Click on the burger bar with id react-burger-menu-btn.",
    "Click on logout with id logout_sidebar_link."
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
          "url": "https://www.saucedemo.com/",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Navigation to saucedemo failed.",
          "stepDescription": "Navigate to https://www.saucedemo.com/."
        },
        {
          "action": "fill",
          "selector": "#user-name",
          "url": null,
          "value": "standard_user",
          "waitTimeoutMs": 3000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to fill username field.",
          "stepDescription": "Enter \"standard_user\" in the username field with id user-name."
        },
        {
          "action": "fill",
          "selector": "#password",
          "url": null,
          "value": "secret_sauce",
          "waitTimeoutMs": 3000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to fill password field.",
          "stepDescription": "Enter \"secret_sauce\" in the password field with id password."
        },
        {
          "action": "click",
          "selector": "#login-button",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Login button click failed.",
          "stepDescription": "Click the Login button with id login-button."
        },
        {
          "action": "click",
          "selector": ".product_sort_container",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click product sort dropdown.",
          "stepDescription": "Click on the product sort filter dropdown with class product_sort_container."
        },
        {
          "action": "selectOption",
          "selector": ".product_sort_container",
          "url": null,
          "value": "za",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to select Name (Z to A) from sort dropdown.",
          "stepDescription": "Select Name (Z to A) from the product sort filter dropdown."
        },
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to add Sauce Labs Backpack to cart.",
          "stepDescription": "Locate the product \"Sauce Labs Backpack\" and click the Add to Cart button with id add-to-cart-sauce-labs-backpack."
        },
        {
          "action": "click",
          "selector": ".shopping_cart_link",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the cart icon.",
          "stepDescription": "Click on the cart icon with class shopping_cart_link."
        },
        {
          "action": "isVisible",
          "selector": ".cart_item",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Sauce Labs Backpack is not visible in the cart.",
          "stepDescription": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart."
        },
        {
          "action": "click",
          "selector": "#checkout",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the checkout button.",
          "stepDescription": "Click on the checkout button with id checkout."
        },
        {
          "action": "fill",
          "selector": "#first-name",
          "url": null,
          "value": "chaitanya",
          "waitTimeoutMs": 3000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to fill first name field.",
          "stepDescription": "Enter \"chaitanya\" in the first name field with id first-name."
        },
        {
          "action": "fill",
          "selector": "#last-name",
          "url": null,
          "value": "Kompella",
          "waitTimeoutMs": 3000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to fill last name field.",
          "stepDescription": "Enter \"Kompella\" in the last name field with id last-name."
        },
        {
          "action": "fill",
          "selector": "#postal-code",
          "url": null,
          "value": "62567352",
          "waitTimeoutMs": 3000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to fill postal code field.",
          "stepDescription": "Enter \"62567352\" in the postal code field with id postal-code."
        },
        {
          "action": "click",
          "selector": "#continue",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the continue button.",
          "stepDescription": "Click on the continue button with id continue."
        },
        {
          "action": "click",
          "selector": "#finish",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the finish button.",
          "stepDescription": "Click on the finish button with id finish."
        },
        {
          "action": "isVisible",
          "selector": ".complete-header",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Thank you message is not visible.",
          "stepDescription": "Verify the presence of the message “Thank you for your order!”"
        },
        {
          "action": "click",
          "selector": "#back-to-products",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the back to home button.",
          "stepDescription": "Click on the back to home button with id back-to-products."
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the burger bar.",
          "stepDescription": "Click on the burger bar with id react-burger-menu-btn."
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "url": null,
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the logout button.",
          "stepDescription": "Click on logout with id logout_sidebar_link."
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
                await page.goto(stepData.url!);
                stepDetails = `Navigated to ${stepData.url}`;
                break;
              case "fill":
                await page.locator(stepData.selector!).fill(stepData.value!);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                break;
              case "click":
                await page.locator(stepData.selector!).click();
                stepDetails = `Clicked ${stepData.selector}`;
                break;
              case "check":
                await page.locator(stepData.selector!).check();
                stepDetails = `Checked ${stepData.selector}`;
                break;
              case "uncheck":
                await page.locator(stepData.selector!).uncheck();
                stepDetails = `Unchecked ${stepData.selector}`;
                break;
              case "hover":
                await page.locator(stepData.selector!).hover();
                stepDetails = `Hovered ${stepData.selector}`;
                break;
              case "waitFor":
                await page.locator(stepData.selector!).waitFor();
                stepDetails = `Waited for ${stepData.selector}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selector!).isVisible();
                stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
                if (!isVisible) {
                  stepStatus = 'error';
                }
                break;
              case "selectOption":
                await page.locator(stepData.selector!).selectOption({ value: stepData.value! });
                stepDetails = `Selected option ${stepData.value} in ${stepData.selector}`;
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