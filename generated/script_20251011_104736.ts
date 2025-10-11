import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('Generated Test', async () => {
  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" into the username field with id user-name",
    "Enter \"secret_sauce\" into the password field with id password",
    "Click the Login button with id login-button",
    "Click the product sort filter dropdown with class product_sort_container",
    "Select Name (Z to A) from the product sort filter dropdown",
    "Click the Add to cart button for Sauce Labs Backpack with id add-to-cart-sauce-labs-backpack",
    "Click the cart icon with class shopping_cart_link",
    "Verify that the product Sauce Labs Backpack is present in the cart",
    "Click the Checkout button with id checkout",
    "Enter \"chaitanya\" into the first name field with id first-name",
    "Enter \"Kompella\" into the last name field with id last-name",
    "Enter \"62567352\" into the postal code field with id postal-code",
    "Click the Continue button with id continue",
    "Click the Finish button with id finish",
    "Verify the presence of the text “Thank you for your order!”",
    "Click the Back to home button with id back-to-products",
    "Click the burger menu button with id react-burger-menu-btn",
    "Click the Logout button with id logout_sidebar_link"
  ]; // from input
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
      "fallbacks": ["waitForLoadState"],
      "errorMessage": "Failed to navigate to saucedemo.com",
      "stepDescription": "Navigate to https://www.saucedemo.com/"
    },
    {
      "action": "fill",
      "selector": "[data-test='username']",
      "value": "standard_user",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#user-name"],
      "errorMessage": "Failed to enter username",
      "stepDescription": "Enter \"standard_user\" into the username field"
    },
    {
      "action": "fill",
      "selector": "[data-test='password']",
      "value": "secret_sauce",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#password"],
      "errorMessage": "Failed to enter password",
      "stepDescription": "Enter \"secret_sauce\" into the password field"
    },
    {
      "action": "click",
      "selector": "[data-test='login-button']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#login-button"],
      "errorMessage": "Failed to click login button",
      "stepDescription": "Click the Login button"
    },
    {
      "action": "click",
      "selector": "[data-test='product-sort-container']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [".product_sort_container"],
      "errorMessage": "Failed to click product sort filter dropdown",
      "stepDescription": "Click the product sort filter dropdown"
    },
    {
      "action": "click",
      "selector": "[data-test='product-sort-container'] option[value='za']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [".product_sort_container option[value='za']"],
      "errorMessage": "Failed to select Name (Z to A) from the product sort filter dropdown",
      "stepDescription": "Select Name (Z to A) from the product sort filter dropdown"
    },
    {
      "action": "click",
      "selector": "[data-test='add-to-cart-sauce-labs-backpack']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#add-to-cart-sauce-labs-backpack"],
      "errorMessage": "Failed to click the Add to cart button for Sauce Labs Backpack",
      "stepDescription": "Click the Add to cart button for Sauce Labs Backpack"
    },
    {
      "action": "click",
      "selector": "[data-test='shopping-cart-link']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#shopping_cart_container .shopping_cart_link"],
      "errorMessage": "Failed to click the cart icon",
      "stepDescription": "Click the cart icon"
    },
    {
      "action": "isVisible",
      "selector": ".cart_item [data-test='inventory-item-name']:has-text('Sauce Labs Backpack')",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [".cart_item .inventory_item_name:has-text('Sauce Labs Backpack')"],
      "errorMessage": "Product Sauce Labs Backpack is not present in the cart",
      "stepDescription": "Verify that the product Sauce Labs Backpack is present in the cart"
    },
    {
      "action": "click",
      "selector": "[data-test='checkout']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#checkout"],
      "errorMessage": "Failed to click the Checkout button",
      "stepDescription": "Click the Checkout button"
    },
    {
      "action": "fill",
      "selector": "[data-test='firstName']",
      "value": "chaitanya",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#first-name"],
      "errorMessage": "Failed to enter the first name",
      "stepDescription": "Enter \"chaitanya\" into the first name field"
    },
    {
      "action": "fill",
      "selector": "[data-test='lastName']",
      "value": "Kompella",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#last-name"],
      "errorMessage": "Failed to enter the last name",
      "stepDescription": "Enter \"Kompella\" into the last name field"
    },
    {
      "action": "fill",
      "selector": "[data-test='postalCode']",
      "value": "62567352",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#postal-code"],
      "errorMessage": "Failed to enter the postal code",
      "stepDescription": "Enter \"62567352\" into the postal code field"
    },
    {
      "action": "click",
      "selector": "[data-test='continue']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#continue"],
      "errorMessage": "Failed to click the Continue button",
      "stepDescription": "Click the Continue button"
    },
    {
      "action": "click",
      "selector": "[data-test='finish']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#finish"],
      "errorMessage": "Failed to click the Finish button",
      "stepDescription": "Click the Finish button"
    },
    {
      "action": "isVisible",
      "selector": ".complete-header:has-text('Thank you for your order!')",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [".complete-header"],
      "errorMessage": "The message “Thank you for your order!” is not present",
      "stepDescription": "Verify the presence of the text “Thank you for your order!”"
    },
    {
      "action": "click",
      "selector": "[data-test='back-to-products']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": ["#back-to-products"],
      "errorMessage": "Failed to click the Back to home button",
      "stepDescription": "Click the Back to home button"
    },
    {
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the burger menu button",
      "stepDescription": "Click the burger menu button"
    },
    {
      "action": "click",
      "selector": "#logout_sidebar_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the Logout button",
      "stepDescription": "Click the Logout button"
    }
  ];

  try {
    // Browser setup with its own error handling
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

    // Only proceed with steps if setup succeeded
    if (!setupError && page) {
      // Handle empty steps case
      if (steps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        // Execute each step with individual error handling
        for (const stepData of steps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            // Execute the specific action
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
    // Only add this if no other results exist
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
    // Guaranteed cleanup and return
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        // Log but don't fail - we still need to return results
      }
    }

    // Ensure we always have at least one result
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

    // GUARANTEED RETURN - This must ALWAYS execute
    return result;
  }
});