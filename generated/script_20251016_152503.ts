import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('Generated Test', async () => {
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
      "action": "goto",
      "selector": null,
      "value": "https://www.saucedemo.com/",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState"
      ],
      "errorMessage": "Failed to navigate to https://www.saucedemo.com/",
      "stepDescription": "Navigate to https://www.saucedemo.com/."
    },
    {
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='username']",
        "input[placeholder='Username']"
      ],
      "errorMessage": "Failed to enter username",
      "stepDescription": "Enter \"standard_user\" in the username field with id user-name."
    },
    {
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        "[data-test='password']",
        "input[placeholder='Password']"
      ],
      "errorMessage": "Failed to enter password",
      "stepDescription": "Enter \"secret_sauce\" in the password field with id password."
    },
    {
      "action": "click",
      "selector": "#login-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "[data-test='login-button']",
        "input[value='Login']"
      ],
      "errorMessage": "Failed to click the Login button",
      "stepDescription": "Click the Login button with id login-button."
    },
    {
      "action": "click",
      "selector": "[data-test='product-sort-container']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click the product sort filter dropdown",
      "stepDescription": "Click on the product sort filter dropdown with data-test product-sort-container."
    },
    {
      "action": "click",
      "selector": "[data-test='product-sort-container'] > option[value='az']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to select Name (A to Z) from the product sort filter dropdown",
      "stepDescription": "Select Name (A to Z) from the product sort filter dropdown."
    },
    {
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "[data-test='add-to-cart-sauce-labs-backpack']",
        "button:has-text('Add to cart')"
      ],
      "errorMessage": "Failed to click the Add to cart button for product Sauce Labs Backpack",
      "stepDescription": "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for product Sauce Labs Backpack."
    },
    {
      "action": "click",
      "selector": "[data-test='shopping-cart-link']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click on the cart icon",
      "stepDescription": "Click on the cart icon with data-test shopping-cart-link to verify that the product has been added."
    },
    {
      "action": "isVisible",
      "selector": ".cart_item:has-text('Sauce Labs Backpack')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Product Sauce Labs Backpack is not present in the cart",
      "stepDescription": "Ensure that the product Sauce Labs Backpack is present in the cart."
    },
    {
      "action": "click",
      "selector": "[data-test='checkout']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "#checkout"
      ],
      "errorMessage": "Failed to click on the checkout button",
      "stepDescription": "Click on the checkout button with data-test checkout."
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
      "errorMessage": "Failed to enter first name",
      "stepDescription": "Enter \"chaitanya\" in the first name field with id first-name."
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
      "errorMessage": "Failed to enter last name",
      "stepDescription": "Enter \"Kompella\" in the last name field with id last-name."
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
      "errorMessage": "Failed to enter postal code",
      "stepDescription": "Enter \"62567352\" in postal code field with id postal-code."
    },
    {
      "action": "click",
      "selector": "#continue",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "[data-test='continue']",
        "input[name='continue']"
      ],
      "errorMessage": "Failed to click on continue button",
      "stepDescription": "Click on continue button with id continue."
    },
    {
      "action": "click",
      "selector": "[data-test='finish']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click on finish button",
      "stepDescription": "Click on finish button with data-test finish."
    },
    {
      "action": "isVisible",
      "selector": "text='Thank you for your order!'",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Message “Thank you for your order!” is not present",
      "stepDescription": "Verify the presence of the message “Thank you for your order!”"
    },
    {
      "action": "click",
      "selector": "[data-test='back-to-products']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click on back to home button",
      "stepDescription": "Click on back to home button with data-test back-to-products."
    },
    {
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click on the burger bar",
      "stepDescription": "Click on the burger bar with id react-burger-menu-btn."
    },
    {
      "action": "click",
      "selector": "#logout_sidebar_link",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click on logout",
      "stepDescription": "Click on logout with id logout_sidebar_link."
    }
  ];

  test.setTimeout(120000);

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
      require('fs').writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    return result;
  }
});