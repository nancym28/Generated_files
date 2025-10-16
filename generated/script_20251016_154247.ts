import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('SauceDemo E2E Test', async () => {
  const originalUserSteps = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id user-name.",
    "Enter \"secret_sauce\" in the password field with id password.",
    "Click the Login button with id login-button.",
    "Click on the product sort filter dropdown with data-test product-sort-container.",
    "Select Name (A to Z) from the product sort filter dropdown.",
    "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for product Sauce Labs Backpack.",
    "Click on the cart icon with data-test shopping-cart-link to verify that the product has been added.",
    "Ensure that the product Sauce Labs Backpack is present in the cart.",
    "Click on the checkout button with data-test checkout.",
    "Enter \"chaitanya\" in the first name field with id first-name.",
    "Enter \"Kompella\" in the last name field with id last-name.",
    "Enter \"62567352\" in postal code field with id postal-code.",
    "Click on continue button with id continue.",
    "Click on finish button with data-test finish.",
    "Verify the presence of the message “Thank you for your order!”",
    "Click on back to home button with data-test back-to-products.",
    "Click on the burger bar with id react-burger-menu-btn.",
    "Click on logout with id logout_sidebar_link.",
    "Keep the browser open after the test execution is complete."
  ];

  const steps = [
    {
      "stepNumber": 1,
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "description": "Navigate to https://www.saucedemo.com/.",
      "timeout": 30000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue",
      "selector": null,
      "value": null
    },
    {
      "stepNumber": 2,
      "action": "fill",
      "selector": "#user-name",
      "altSelectors": [
        "input[data-test='username']",
        "input[placeholder='Username']"
      ],
      "value": "standard_user",
      "description": "Enter \"standard_user\" in the username field with id user-name.",
      "timeout": 10000,
      "retries": 2,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 3,
      "action": "fill",
      "selector": "#password",
      "altSelectors": [
        "input[data-test='password']",
        "input[placeholder='Password']"
      ],
      "value": "secret_sauce",
      "description": "Enter \"secret_sauce\" in the password field with id password.",
      "timeout": 10000,
      "retries": 2,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 4,
      "action": "click",
      "selector": "#login-button",
      "altSelectors": [
        "input[data-test='login-button']",
        "input[value='Login']"
      ],
      "description": "Click the Login button with id login-button.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 5,
      "action": "click",
      "selector": "[data-test='product-sort-container']",
      "altSelectors": [
        ".product_sort_container"
      ],
      "description": "Click on the product sort filter dropdown with data-test product-sort-container.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 6,
      "action": "click",
      "selector": "option[value='az']",
      "altSelectors": [
        "text=Name (A to Z)"
      ],
      "description": "Select Name (A to Z) from the product sort filter dropdown.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 7,
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "altSelectors": [
        "[data-test='add-to-cart-sauce-labs-backpack']",
        "text=Add to cart"
      ],
      "description": "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for product Sauce Labs Backpack.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 8,
      "action": "click",
      "selector": "[data-test='shopping-cart-link']",
      "altSelectors": [
        ".shopping_cart_link"
      ],
      "description": "Click on the cart icon with data-test shopping-cart-link to verify that the product has been added.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 9,
      "action": "isVisible",
      "selector": "div.cart_item div.inventory_item_name:has-text('Sauce Labs Backpack')",
      "altSelectors": [
        "div[data-test='inventory-item'] div[data-test='inventory-item-name']:has-text('Sauce Labs Backpack')"
      ],
      "description": "Ensure that the product Sauce Labs Backpack is present in the cart.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [
        "isVisible"
      ],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 10,
      "action": "click",
      "selector": "[data-test='checkout']",
      "altSelectors": [
        "#checkout",
        "text=Checkout"
      ],
      "description": "Click on the checkout button with data-test checkout.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 11,
      "action": "fill",
      "selector": "#first-name",
      "altSelectors": [
        "input[data-test='firstName']",
        "input[placeholder='First Name']"
      ],
      "value": "chaitanya",
      "description": "Enter \"chaitanya\" in the first name field with id first-name.",
      "timeout": 10000,
      "retries": 2,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 12,
      "action": "fill",
      "selector": "#last-name",
      "altSelectors": [
        "input[data-test='lastName']",
        "input[placeholder='Last Name']"
      ],
      "value": "Kompella",
      "description": "Enter \"Kompella\" in the last name field with id last-name.",
      "timeout": 10000,
      "retries": 2,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 13,
      "action": "fill",
      "selector": "#postal-code",
      "altSelectors": [
        "input[data-test='postalCode']",
        "input[placeholder='Zip/Postal Code']"
      ],
      "value": "62567352",
      "description": "Enter \"62567352\" in postal code field with id postal-code.",
      "timeout": 10000,
      "retries": 2,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 14,
      "action": "click",
      "selector": "input[name='next']",
      "altSelectors": [
        "input[value='Continue']",
        "[data-test='continue']"
      ],
      "description": "Click on continue button with name next.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 15,
      "action": "click",
      "selector": "[data-test='finish']",
      "altSelectors": [
        "text=Finish"
      ],
      "description": "Click on finish button with data-test finish.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 16,
      "action": "isVisible",
      "selector": "text=Thank you for your order!",
      "altSelectors": [
        ".complete-header"
      ],
      "description": "Verify the presence of the message “Thank you for your order!”",
      "timeout": 10000,
      "retries": 3,
      "assertions": [
        "isVisible"
      ],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 17,
      "action": "click",
      "selector": "[data-test='back-to-products']",
      "altSelectors": [
        "text=Back to products"
      ],
      "description": "Click on back to home button with data-test back-to-products.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 18,
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "altSelectors": [
        "button[aria-label='Open Menu']"
      ],
      "description": "Click on the burger bar with id react-burger-menu-btn.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    },
    {
      "stepNumber": 19,
      "action": "click",
      "selector": "#logout_sidebar_link",
      "altSelectors": [
        "text=Logout"
      ],
      "description": "Click on logout with id logout_sidebar_link.",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "errorHandling": "continue"
    }
  ];

  const keepBrowserOpen = true;
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
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
                  stepStatus = "error";
                }
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepData.description}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(stepData.description);
          executionResults.push({
            step: stepData.description,
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
        if (!keepBrowserOpen) {
          await browser.close();
        }
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