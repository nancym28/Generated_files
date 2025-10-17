import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  const originalUserSteps = [
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
    "Enter \"62567352\" in the postal code field with id postal-code",
    "Click on continue button with id continue",
    "Click on finish button with id finish",
    "You should see a message “Thank you for your order!”",
    "Then click on back to home button with id back-to-products",
    "Click on the burger bar with id react-burger-menu-btn",
    "Click on logout with id logout_sidebar_link",
    "Keep the browser open after the test execution is complete"
  ];

  const steps = [
    {
      "action": "goto",
      "selector": "https://www.saucedemo.com/",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to navigate to Saucedemo login page.",
      "stepDescription": "Navigate to Saucedemo login page"
    },
    {
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[name=\"username\"]",
        "input[placeholder=\"Username\"]"
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
        "input[name=\"password\"]",
        "input[placeholder=\"Password\"]"
      ],
      "errorMessage": "Failed to enter password.",
      "stepDescription": "Enter password"
    },
    {
      "action": "click",
      "selector": "#login-button",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[type=\"submit\"]",
        "input[value=\"Login\"]"
      ],
      "errorMessage": "Failed to click login button.",
      "stepDescription": "Click login button"
    },
    {
      "action": "click",
      "selector": ".product_sort_container",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "select[data-test=\"product_sort_container\"]",
        "span[class=\"select_container\"]"
      ],
      "errorMessage": "Failed to click product sort dropdown.",
      "stepDescription": "Click product sort dropdown"
    },
    {
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "button[name=\"add-to-cart-sauce-labs-backpack\"]",
        "button:has-text(\"Add to cart\")"
      ],
      "errorMessage": "Failed to click add to cart for Sauce Labs Backpack.",
      "stepDescription": "Click add to cart for Sauce Labs Backpack"
    },
    {
      "action": "click",
      "selector": ".shopping_cart_link",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "a[class=\"shopping_cart_link\"]",
        "div[id=\"shopping_cart_container\"] a"
      ],
      "errorMessage": "Failed to click cart icon.",
      "stepDescription": "Click cart icon"
    },
    {
      "action": "waitFor",
      "selector": "div.cart_item div.inventory_item_name:has-text(\"Sauce Labs Backpack\")",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "div.cart_item:has-text(\"Sauce Labs Backpack\")",
        "div:has-text(\"Sauce Labs Backpack\")"
      ],
      "errorMessage": "Sauce Labs Backpack is not present in the cart.",
      "stepDescription": "Verify Sauce Labs Backpack is in the cart"
    },
    {
      "action": "click",
      "selector": "#checkout",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "button[name=\"checkout\"]",
        "button:has-text(\"Checkout\")"
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
        "input[name=\"firstName\"]",
        "input[placeholder=\"First Name\"]"
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
        "input[name=\"lastName\"]",
        "input[placeholder=\"Last Name\"]"
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
        "input[name=\"postalCode\"]",
        "input[placeholder=\"Zip/Postal Code\"]"
      ],
      "errorMessage": "Failed to enter postal code.",
      "stepDescription": "Enter postal code"
    },
    {
      "action": "click",
      "selector": "#continue",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[name=\"continue\"]",
        "input[value=\"Continue\"]"
      ],
      "errorMessage": "Failed to click continue button.",
      "stepDescription": "Click continue button"
    },
    {
      "action": "click",
      "selector": "#finish",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "button[name=\"finish\"]",
        "button:has-text(\"Finish\")"
      ],
      "errorMessage": "Failed to click finish button.",
      "stepDescription": "Click finish button"
    },
    {
      "action": "waitFor",
      "selector": "h2.complete-header:has-text(\"Thank you for your order!\")",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "div.complete-text:has-text(\"Your order has been dispatched\")",
        "div.complete-text"
      ],
      "errorMessage": "Confirmation message is not displayed.",
      "stepDescription": "Verify confirmation message"
    },
    {
      "action": "click",
      "selector": "#back-to-products",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "button[name=\"back-to-products\"]",
        "button:has-text(\"Back to products\")"
      ],
      "errorMessage": "Failed to click back to home button.",
      "stepDescription": "Click back to home button"
    },
    {
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "button[id=\"react-burger-menu-btn\"]",
        "button:has-text(\"Open Menu\")"
      ],
      "errorMessage": "Failed to click burger bar.",
      "stepDescription": "Click burger bar"
    },
    {
      "action": "click",
      "selector": "#logout_sidebar_link",
      "value": "",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "a[id=\"logout_sidebar_link\"]",
        "a:has-text(\"Logout\")"
      ],
      "errorMessage": "Failed to click logout.",
      "stepDescription": "Click logout"
    }
  ];

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
                await page.goto(stepData.selector);
                stepDetails = `Navigated to ${stepData.selector}`;
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