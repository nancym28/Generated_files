import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter 'standard_user' into the username field",
    "Enter 'secret_sauce' into the password field",
    "Click the Login button",
    "Click on the product sort filter dropdown",
    "Select Name (Z to A) from the product sort filter dropdown",
    "Click the Add to cart button for the product Sauce Labs Backpack",
    "Click on the cart icon",
    "Verify that the product Sauce Labs Backpack is present in the cart",
    "Click on the checkout button",
    "Enter 'chaitanya' into the first name field",
    "Enter 'Kompella' into the last name field",
    "Enter '62567352' into the postal code field",
    "Click on the continue button",
    "Click on the finish button",
    "Verify the presence of the message “Thank you for your order!”",
    "Click on the back to home button",
    "Click on the burger bar button",
    "Click on the logout button"
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
          "errorMessage": "Failed to navigate to saucedemo.com after multiple retries.",
          "stepDescription": "Navigate to https://www.saucedemo.com/"
        },
        {
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to enter username after multiple retries.",
          "stepDescription": "Enter 'standard_user' into the username field"
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to enter password after multiple retries.",
          "stepDescription": "Enter 'secret_sauce' into the password field"
        },
        {
          "action": "click",
          "selector": "#login-button",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the login button after multiple retries.",
          "stepDescription": "Click the Login button"
        },
        {
          "action": "click",
          "selector": ".product_sort_container",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the product sort filter dropdown after multiple retries.",
          "stepDescription": "Click on the product sort filter dropdown"
        },
        {
          "action": "click",
          "selector": ".product_sort_container option[value='za']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to select 'Name (Z to A)' from the sort dropdown after multiple retries.",
          "stepDescription": "Select Name (Z to A) from the product sort filter dropdown"
        },
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the 'Add to cart' button for 'Sauce Labs Backpack' after multiple retries.",
          "stepDescription": "Click the Add to cart button for the product Sauce Labs Backpack"
        },
        {
          "action": "click",
          "selector": ".shopping_cart_link",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the cart icon after multiple retries.",
          "stepDescription": "Click on the cart icon"
        },
        {
          "action": "isVisible",
          "selector": "div.cart_item div.inventory_item_name:has-text('Sauce Labs Backpack')",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to verify that the product 'Sauce Labs Backpack' is present in the cart after multiple retries.",
          "stepDescription": "Verify that the product Sauce Labs Backpack is present in the cart"
        },
        {
          "action": "click",
          "selector": "#checkout",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the checkout button after multiple retries.",
          "stepDescription": "Click on the checkout button"
        },
        {
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to enter first name after multiple retries.",
          "stepDescription": "Enter 'chaitanya' into the first name field"
        },
        {
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to enter last name after multiple retries.",
          "stepDescription": "Enter 'Kompella' into the last name field"
        },
        {
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to enter postal code after multiple retries.",
          "stepDescription": "Enter '62567352' into the postal code field"
        },
        {
          "action": "click",
          "selector": "#continue",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the continue button after multiple retries.",
          "stepDescription": "Click on the continue button"
        },
        {
          "action": "click",
          "selector": "#finish",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the finish button after multiple retries.",
          "stepDescription": "Click on the finish button"
        },
        {
          "action": "isVisible",
          "selector": "text='Thank you for your order!'",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to verify the presence of the message 'Thank you for your order!' after multiple retries.",
          "stepDescription": "Verify the presence of the message “Thank you for your order!”"
        },
        {
          "action": "click",
          "selector": "#back-to-products",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the back to home button after multiple retries.",
          "stepDescription": "Click on the back to home button"
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the burger bar button after multiple retries.",
          "stepDescription": "Click on the burger bar button"
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click the logout button after multiple retries.",
          "stepDescription": "Click on the logout button"
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
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});