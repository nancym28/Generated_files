import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" into the username field with id user-name",
    "Enter \"secret_sauce\" into the password field with id password",
    "Click the Login button with id login-button",
    "Click on the product sort filter dropdown with class product_sort_container",
    "Select Name (Z to A) from the product sort filter dropdown",
    "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for product Sauce Labs Backpack",
    "Click on the cart icon with class shopping_cart_link",
    "Verify that the product Sauce Labs Backpack is present in the cart",
    "Click on the checkout button with id checkout",
    "Enter \"chaitanya\" into the first name field with id first-name",
    "Enter \"Kompella\" into the last name field with id last-name",
    "Enter \"62567352\" into the postal code field with id postal-code",
    "Click on continue button with id continue",
    "Click on finish button with id finish",
    "Verify that the message “Thank you for your order!” is displayed",
    "Click on back to home button with id back-to-products",
    "Click on the burger bar button with id react-burger-menu-btn",
    "Click on the logout button with id logout_sidebar_link",
    "Keep the browser open"
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
          "stepNumber": 1,
          "action": "goto",
          "url": "https://www.saucedemo.com/",
          "timeout": 30000,
          "retries": 3,
          "errorHandling": "continue",
          "description": "Navigate to the login page",
          "selector": null
        },
        {
          "stepNumber": 2,
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "abort",
          "description": "Enter username",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 3,
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "abort",
          "description": "Enter password",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 4,
          "action": "click",
          "selector": "#login-button",
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "abort",
          "description": "Click login button",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 5,
          "action": "click",
          "selector": ".product_sort_container",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "abort",
          "description": "Click the product sort filter dropdown",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 6,
          "action": "click",
          "selector": "option[value='za']",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "abort",
          "description": "Select \"Name (Z to A)\" from the product sort filter dropdown",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 7,
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "abort",
          "description": "Add Sauce Labs Backpack to cart",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 8,
          "action": "click",
          "selector": ".shopping_cart_link",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "abort",
          "description": "Click the cart icon",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 9,
          "action": "isVisible",
          "selector": ".inventory_item_name:has-text('Sauce Labs Backpack')",
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "abort",
          "description": "Verify Sauce Labs Backpack is in the cart",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 10,
          "action": "click",
          "selector": "#checkout",
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "abort",
          "description": "Click checkout button",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 11,
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "abort",
          "description": "Enter first name",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 12,
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "abort",
          "description": "Enter last name",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 13,
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "abort",
          "description": "Enter postal code",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 14,
          "action": "click",
          "selector": "#continue",
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "abort",
          "description": "Click continue button",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 15,
          "action": "click",
          "selector": "#finish",
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "abort",
          "description": "Click finish button",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 16,
          "action": "isVisible",
          "selector": ".complete-header:has-text('Thank you for your order!')",
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "abort",
          "description": "Verify success message",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 17,
          "action": "click",
          "selector": "#back-to-products",
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "abort",
          "description": "Click back to home button",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 18,
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "abort",
          "description": "Click the burger bar button",
          "waitFor": "isVisible"
        },
        {
          "stepNumber": 19,
          "action": "click",
          "selector": "#logout_sidebar_link",
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "abort",
          "description": "Click the logout button",
          "waitFor": "isVisible"
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