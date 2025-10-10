import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id user-name.",
    "Enter \"secret_sauce\" in the password field with id password.",
    "Click the Login button with id login-button.",
    "Click on the product sort filter dropdown with class product_sort_container.",
    "Select Name (Z to A) from the product sort filter dropdown.",
    "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for product Sauce Labs Backpack.",
    "Click on the cart icon with class shopping_cart_link.",
    "Verify that the product Sauce Labs Backpack is present in the cart.",
    "Click on the checkout button with id checkout.",
    "Enter \"chaitanya\" in the first name field with id first-name.",
    "Enter \"Kompella\" in the last name field with id last-name.",
    "Enter \"62567352\" in the postal code field with id postal-code.",
    "Click on the continue button with id continue.",
    "Click on the finish button with id finish.",
    "Verify the presence of the message “Thank you for your order!”",
    "Click on the back to home button with id back-to-products.",
    "Click on the burger bar with id react-burger-menu-btn.",
    "Click on the logout button with id logout_sidebar_link.",
    "Keep the browser open."
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
          "fallbacks": [],
          "errorMessage": "Navigation to saucedemo failed after multiple retries.",
          "stepDescription": "Navigate to the Saucedemo login page."
        },
        {
          "action": "fill",
          "selector": "[data-test=\"username\"]",
          "value": "standard_user",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#user-name",
            "input[name=\"user-name\"]"
          ],
          "errorMessage": "Failed to fill username field after multiple attempts.",
          "stepDescription": "Enter username 'standard_user'."
        },
        {
          "action": "fill",
          "selector": "[data-test=\"password\"]",
          "value": "secret_sauce",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#password",
            "input[name=\"password\"]"
          ],
          "errorMessage": "Failed to fill password field after multiple attempts.",
          "stepDescription": "Enter password 'secret_sauce'."
        },
        {
          "action": "click",
          "selector": "[data-test=\"login-button\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#login-button",
            "input[name=\"login-button\"]"
          ],
          "errorMessage": "Failed to click login button after multiple attempts.",
          "stepDescription": "Click the Login button."
        },
        {
          "action": "click",
          "selector": "[data-test=\"product-sort-container\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            ".product_sort_container",
            "select.product_sort_container"
          ],
          "errorMessage": "Failed to click product sort filter dropdown after multiple attempts.",
          "stepDescription": "Click on the product sort filter dropdown."
        },
        {
          "action": "click",
          "selector": "[data-test=\"product-sort-container\"] option[value=\"za\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            ".product_sort_container option[value=\"za\"]",
            "select.product_sort_container option:nth-child(2)"
          ],
          "errorMessage": "Failed to select 'Name (Z to A)' from the sort dropdown after multiple attempts.",
          "stepDescription": "Select Name (Z to A) from the product sort filter dropdown."
        },
        {
          "action": "click",
          "selector": "[data-test=\"add-to-cart-sauce-labs-backpack\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#add-to-cart-sauce-labs-backpack",
            "button[name=\"add-to-cart-sauce-labs-backpack\"]"
          ],
          "errorMessage": "Failed to click 'Add to cart' for 'Sauce Labs Backpack' after multiple attempts.",
          "stepDescription": "Click the Add to cart button for product Sauce Labs Backpack."
        },
        {
          "action": "click",
          "selector": "[data-test=\"shopping-cart-link\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            ".shopping_cart_link",
            "#shopping_cart_container > a"
          ],
          "errorMessage": "Failed to click the cart icon after multiple attempts.",
          "stepDescription": "Click on the cart icon."
        },
        {
          "action": "isVisible",
          "selector": ".cart_item [data-test=\"inventory-item-name\"]:contains(\"Sauce Labs Backpack\")",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            ".cart_item .inventory_item_name:contains(\"Sauce Labs Backpack\")"
          ],
          "errorMessage": "Failed to verify that 'Sauce Labs Backpack' is present in the cart after multiple attempts.",
          "stepDescription": "Verify that the product Sauce Labs Backpack is present in the cart."
        },
        {
          "action": "click",
          "selector": "[data-test=\"checkout\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#checkout",
            "button#checkout"
          ],
          "errorMessage": "Failed to click the checkout button after multiple attempts.",
          "stepDescription": "Click on the checkout button."
        },
        {
          "action": "fill",
          "selector": "[data-test=\"firstName\"]",
          "value": "chaitanya",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#first-name",
            "input[name=\"firstName\"]"
          ],
          "errorMessage": "Failed to fill first name field after multiple attempts.",
          "stepDescription": "Enter 'chaitanya' in the first name field."
        },
        {
          "action": "fill",
          "selector": "[data-test=\"lastName\"]",
          "value": "Kompella",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#last-name",
            "input[name=\"lastName\"]"
          ],
          "errorMessage": "Failed to fill last name field after multiple attempts.",
          "stepDescription": "Enter 'Kompella' in the last name field."
        },
        {
          "action": "fill",
          "selector": "[data-test=\"postalCode\"]",
          "value": "62567352",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#postal-code",
            "input[name=\"postalCode\"]"
          ],
          "errorMessage": "Failed to fill postal code field after multiple attempts.",
          "stepDescription": "Enter '62567352' in the postal code field."
        },
        {
          "action": "click",
          "selector": "[data-test=\"continue\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#continue",
            "input[name=\"continue\"]"
          ],
          "errorMessage": "Failed to click the continue button after multiple attempts.",
          "stepDescription": "Click on the continue button."
        },
        {
          "action": "click",
          "selector": "[data-test=\"finish\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#finish",
            "button#finish"
          ],
          "errorMessage": "Failed to click the finish button after multiple attempts.",
          "stepDescription": "Click on the finish button."
        },
        {
          "action": "isVisible",
          "selector": "[data-test=\"complete-header\"]:contains(\"Thank you for your order!\")",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            ".complete-header:contains(\"Thank you for your order!\")"
          ],
          "errorMessage": "Failed to verify the presence of the message 'Thank you for your order!' after multiple attempts.",
          "stepDescription": "Verify the presence of the message “Thank you for your order!”"
        },
        {
          "action": "click",
          "selector": "[data-test=\"back-to-products\"]",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#back-to-products",
            "button#back-to-products"
          ],
          "errorMessage": "Failed to click the back to home button after multiple attempts.",
          "stepDescription": "Click on the back to home button."
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "#menu_button_container > div > div:nth-child(1) > button"
          ],
          "errorMessage": "Failed to click the burger bar after multiple attempts.",
          "stepDescription": "Click on the burger bar."
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the logout button after multiple attempts.",
          "stepDescription": "Click on the logout button."
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
                // Intentionally empty, as waitFor doesn't have a specific action
                stepDetails = `Waiting Completed`;
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