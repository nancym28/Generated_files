import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" in the username field with id 'user-name'",
    "Enter \"secret_sauce\" in the password field with id 'password'",
    "Click the Login button with id 'login-button'",
    "Click on the product sort filter dropdown with data-test 'product-sort-container'",
    "Select 'Name (Z to A)' from the sort dropdown by value 'za'",
    "Click the Add to Cart button for 'Sauce Labs Backpack' with id 'add-to-cart-sauce-labs-backpack'",
    "Click on the cart icon with data-test 'shopping-cart-link'",
    "Verify that the product 'Sauce Labs Backpack' is present in the cart with data-test 'inventory-item'",
    "Click on the checkout button with data-test 'checkout'",
    "Enter 'chaitanya' in the first name field with id 'first-name'",
    "Enter 'Kompella' in the last name field with id 'last-name'",
    "Enter '62567352' in the postal code field with id 'postal-code'",
    "Click on the continue button with data-test 'continue'",
    "Click on the finish button with data-test 'finish'",
    "Verify the presence of the text 'Thank you for your order!'",
    "Click on the back to home button with data-test 'back-to-home'",
    "Click on the burger bar with id 'react-burger-menu-btn'",
    "Click on the logout button with id 'logout_sidebar_link'"
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
    } catch (setupErr: any) {
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
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to navigate to saucedemo.com",
          "stepDescription": "Navigate to https://www.saucedemo.com/"
        },
        {
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["[name=\"user-name\"]"],
          "errorMessage": "Failed to enter username",
          "stepDescription": "Enter \"standard_user\" in the username field with id 'user-name'"
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["[name=\"password\"]"],
          "errorMessage": "Failed to enter password",
          "stepDescription": "Enter \"secret_sauce\" in the password field with id 'password'"
        },
        {
          "action": "click",
          "selector": "#login-button",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["[data-test=\"login-button\"]"],
          "errorMessage": "Failed to click the Login button",
          "stepDescription": "Click the Login button with id 'login-button'"
        },
        {
          "action": "click",
          "selector": "[data-test='product-sort-container']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the product sort filter dropdown",
          "stepDescription": "Click on the product sort filter dropdown with data-test 'product-sort-container'"
        },
        {
          "action": "click",
          "selector": "option[value='za']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to select 'Name (Z to A)' from the sort dropdown",
          "stepDescription": "Select 'Name (Z to A)' from the sort dropdown by value 'za'"
        },
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["[data-test='add-to-cart-sauce-labs-backpack']"],
          "errorMessage": "Failed to click the Add to Cart button for 'Sauce Labs Backpack'",
          "stepDescription": "Click the Add to Cart button for 'Sauce Labs Backpack' with id 'add-to-cart-sauce-labs-backpack'"
        },
        {
          "action": "click",
          "selector": "[data-test='shopping-cart-link']",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click on the cart icon",
          "stepDescription": "Click on the cart icon with data-test 'shopping-cart-link'"
        },
        {
          "action": "isVisible",
          "selector": ".cart_item",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Product 'Sauce Labs Backpack' is not present in the cart",
          "stepDescription": "Verify that the product 'Sauce Labs Backpack' is present in the cart with data-test 'inventory-item'"
        },
        {
          "action": "click",
          "selector": "[data-test='checkout']",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click on the checkout button",
          "stepDescription": "Click on the checkout button with data-test 'checkout'"
        },
        {
          "action": "fill",
          "selector": "#firstName",
          "value": "chaitanya",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["[name=\"firstName\"]", "label:has-text(\"First Name\") >> input"],
          "errorMessage": "Failed to enter 'chaitanya' in the first name field",
          "stepDescription": "Enter 'chaitanya' in the first name field with id 'first-name'"
        },
        {
          "action": "fill",
          "selector": "#lastName",
          "value": "Kompella",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["[name=\"lastName\"]", "label:has-text(\"Last Name\") >> input"],
          "errorMessage": "Failed to enter 'Kompella' in the last name field",
          "stepDescription": "Enter 'Kompella' in the last name field with id 'last-name'"
        },
        {
          "action": "fill",
          "selector": "#postalCode",
          "value": "62567352",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["[name=\"postalCode\"]", "label:has-text(\"Postal Code\") >> input"],
          "errorMessage": "Failed to enter '62567352' in the postal code field",
          "stepDescription": "Enter '62567352' in the postal code field with id 'postal-code'"
        },
        {
          "action": "click",
          "selector": "text=Continue",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["button[role=\"button\"][name=\"Continue\"]", "[data-test='continue']"],
          "errorMessage": "Failed to click on the continue button",
          "stepDescription": "Click on the continue button with data-test 'continue'"
        },
        {
          "action": "click",
          "selector": "text=Finish",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["button[role=\"button\"][name=\"Finish\"]", "[data-test='finish']"],
          "errorMessage": "Failed to click on the finish button",
          "stepDescription": "Click on the finish button with data-test 'finish'"
        },
        {
          "action": "isVisible",
          "selector": "text='Thank you for your order!'",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "The message 'Thank you for your order!' is not visible",
          "stepDescription": "Verify the presence of the text 'Thank you for your order!'"
        },
        {
          "action": "click",
          "selector": "text=Back to Home",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["button[role=\"button\"][name=\"Back to Home\"]", "[data-test='back-to-home']"],
          "errorMessage": "Failed to click on the back to home button",
          "stepDescription": "Click on the back to home button with data-test 'back-to-home'"
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click on the burger bar",
          "stepDescription": "Click on the burger bar with id 'react-burger-menu-btn'"
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click on the logout button",
          "stepDescription": "Click on the logout button with id 'logout_sidebar_link'"
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
                await page.goto(stepData.value as string);
                stepDetails = `Navigated to ${stepData.value}`;
                break;
              case "fill":
                await page.locator(stepData.selector as string).fill(stepData.value as string);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                break;
              case "click":
                await page.locator(stepData.selector as string).click();
                stepDetails = `Clicked ${stepData.selector}`;
                break;
              case "check":
                await page.locator(stepData.selector as string).check();
                stepDetails = `Checked ${stepData.selector}`;
                break;
              case "uncheck":
                await page.locator(stepData.selector as string).uncheck();
                stepDetails = `Unchecked ${stepData.selector}`;
                break;
              case "hover":
                await page.locator(stepData.selector as string).hover();
                stepDetails = `Hovered ${stepData.selector}`;
                break;
              case "waitFor":
                await page.locator(stepData.selector as string).waitFor();
                stepDetails = `Waited for ${stepData.selector}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selector as string).isVisible();
                stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
                if (!isVisible) {
                  stepStatus = "error";
                }
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError: any) {
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
  } catch (unexpectedError: any) {
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
      } catch (closeError: any) {
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
    } catch (writeError: any) {
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    return result;
  }
});