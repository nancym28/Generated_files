import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" in the username field with id user-name",
    "Enter \"secret_sauce\" in the password field with id password",
    "Click the Login button with id login-button",
    "Click on the product sort filter dropdown with class product_sort_container",
    "Locate the product \"Sauce Labs Backpack\" and click the Add to Cart button with id add-to-cart-sauce-labs-backpack",
    "Click on the cart icon with class shopping_cart_link",
    "Ensure that the product \"Sauce Labs Backpack\" is present in the cart",
    "Click on the checkout button with id checkout",
    "Enter \"chaitanya\" in the first name field with id first-name",
    "Enter \"Kompella\" in the last name field with id last-name",
    "Enter \"62567352\" in postal code field with id postal-code",
    "Click on continue button with id continue",
    "Click on finish button with id finish",
    "You should see a message “Thank you for your order!” with class complete-header",
    "Then click on back to home button with id back-to-products",
    "Click on the burger bar with id react-burger-menu-btn",
    "Click on logout with id logout_sidebar_link",
    "Keep the browser open after the test execution is complete."
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
          "step": 1,
          "action": "goto",
          "selector": null,
          "value": "https://www.saucedemo.com/",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to navigate to https://www.saucedemo.com/",
          "stepDescription": "Navigate to https://www.saucedemo.com/"
        },
        {
          "step": 2,
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter username",
          "stepDescription": "Enter \"standard_user\" in the username field with id user-name"
        },
        {
          "step": 3,
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter password",
          "stepDescription": "Enter \"secret_sauce\" in the password field with id password"
        },
        {
          "step": 4,
          "action": "click",
          "selector": "#login-button",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click the Login button",
          "stepDescription": "Click the Login button with id login-button"
        },
        {
          "step": 5,
          "action": "click",
          "selector": ".product_sort_container",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click on the product sort filter dropdown",
          "stepDescription": "Click on the product sort filter dropdown with class product_sort_container"
        },
        {
          "step": 6,
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click the Add to Cart button for Sauce Labs Backpack",
          "stepDescription": "Locate the product \"Sauce Labs Backpack\" and click the Add to Cart button with id add-to-cart-sauce-labs-backpack"
        },
        {
          "step": 7,
          "action": "click",
          "selector": ".shopping_cart_link",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click on the cart icon",
          "stepDescription": "Click on the cart icon with class shopping_cart_link"
        },
        {
          "step": 8,
          "action": "isVisible",
          "selector": "//div[@class='cart_item']//div[@class='inventory_item_name' and text()='Sauce Labs Backpack']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Sauce Labs Backpack is not present in the cart",
          "stepDescription": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart"
        },
        {
          "step": 9,
          "action": "click",
          "selector": "#checkout",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click on the checkout button",
          "stepDescription": "Click on the checkout button with id checkout"
        },
        {
          "step": 10,
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter first name",
          "stepDescription": "Enter \"chaitanya\" in the first name field with id first-name"
        },
        {
          "step": 11,
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter last name",
          "stepDescription": "Enter \"Kompella\" in the last name field with id last-name"
        },
        {
          "step": 12,
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter postal code",
          "stepDescription": "Enter \"62567352\" in postal code field with id postal-code"
        },
        {
          "step": 13,
          "action": "click",
          "selector": "#continue",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click on continue button",
          "stepDescription": "Click on continue button with id continue"
        },
        {
          "step": 14,
          "action": "click",
          "selector": "#finish",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click on finish button",
          "stepDescription": "Click on finish button with id finish"
        },
        {
          "step": 15,
          "action": "isVisible",
          "selector": ".complete-header",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "The message “Thank you for your order!” is not visible",
          "stepDescription": "You should see a message “Thank you for your order!” with class complete-header"
        },
        {
          "step": 16,
          "action": "click",
          "selector": "#back-to-products",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click on back to home button",
          "stepDescription": "Then click on back to home button with id back-to-products"
        },
        {
          "step": 17,
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click on the burger bar",
          "stepDescription": "Click on the burger bar with id react-burger-menu-btn"
        },
        {
          "step": 18,
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForElementToBeVisible"],
          "errorMessage": "Failed to click on logout",
          "stepDescription": "Click on logout with id logout_sidebar_link"
        }
      ];

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
    const passedSteps = executionResults.filter(r => r.status === 'success').length;
    const failedSteps = executionResults.filter(r => r.status === 'error').length;

    const result = {
      user_test_steps: originalUserSteps,
      executed_test_steps: executedSteps,
      execution_results: executionResults,
      summary: {
        total_steps: executionResults.length,
        passed: passedSteps,
        failed: failedSteps,
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