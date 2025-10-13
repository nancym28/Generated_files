import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('SauceDemo End-to-End Test', async () => {
  test.setTimeout(120000);

  const originalUserSteps = [
    "Navigate to the login page",
    "Enter username",
    "Enter password",
    "Click login button",
    "Click product sort dropdown",
    "Select Name (Z to A)",
    "Add Sauce Labs Backpack to cart",
    "Click cart icon",
    "Verify Sauce Labs Backpack is in cart",
    "Click Checkout button",
    "Enter first name",
    "Enter last name",
    "Enter postal code",
    "Click Continue button",
    "Click Finish button",
    "Verify thank you message",
    "Click Back to home button",
    "Click burger menu button",
    "Click logout button"
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
      const steps = [
        {
          "step": 1,
          "description": "Navigate to the login page",
          "action": "goto",
          "url": "https://www.saucedemo.com/",
          "timeout": 10000,
          "retries": 3,
          "error": "Navigation to login page failed."
        },
        {
          "step": 2,
          "description": "Enter username",
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "timeout": 5000,
          "retries": 2,
          "error": "Could not enter username.",
          "altSelectors": [
            "[data-test='username']"
          ]
        },
        {
          "step": 3,
          "description": "Enter password",
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "timeout": 5000,
          "retries": 2,
          "error": "Could not enter password.",
          "altSelectors": [
            "[data-test='password']"
          ]
        },
        {
          "step": 4,
          "description": "Click login button",
          "action": "click",
          "selector": "#login-button",
          "timeout": 5000,
          "retries": 3,
          "error": "Could not click login button.",
          "altSelectors": [
            "[data-test='login-button']"
          ]
        },
        {
          "step": 5,
          "description": "Click product sort dropdown",
          "action": "click",
          "selector": ".product_sort_container",
          "timeout": 5000,
          "retries": 2,
          "error": "Could not click product sort dropdown.",
          "altSelectors": [
            "[data-test='product-sort-container']"
          ]
        },
        {
          "step": 6,
          "description": "Select Name (Z to A)",
          "action": "click",
          "selector": "option[value='za']",
          "timeout": 5000,
          "retries": 2,
          "error": "Could not select Name (Z to A).",
          "altSelectors": [
            "text=Name (Z to A)"
          ]
        },
        {
          "step": 7,
          "description": "Add Sauce Labs Backpack to cart",
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "timeout": 5000,
          "retries": 3,
          "error": "Could not add Sauce Labs Backpack to cart.",
          "altSelectors": [
            "[data-test='add-to-cart-sauce-labs-backpack']",
            "text=Add to cart"
          ]
        },
        {
          "step": 8,
          "description": "Click cart icon",
          "action": "click",
          "selector": ".shopping_cart_link",
          "timeout": 5000,
          "retries": 3,
          "error": "Could not click cart icon.",
          "altSelectors": [
            "[data-test='shopping-cart-link']"
          ]
        },
        {
          "step": 9,
          "description": "Verify Sauce Labs Backpack is in cart",
          "action": "isVisible",
          "selector": "div.cart_item div.inventory_item_name:has-text('Sauce Labs Backpack')",
          "timeout": 5000,
          "retries": 2,
          "error": "Sauce Labs Backpack is not in the cart."
        },
        {
          "step": 10,
          "description": "Click Checkout button",
          "action": "click",
          "selector": "#checkout",
          "timeout": 5000,
          "retries": 3,
          "error": "Could not click Checkout button.",
          "altSelectors": [
            "[data-test='checkout']"
          ]
        },
        {
          "step": 11,
          "description": "Enter first name",
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "timeout": 5000,
          "retries": 2,
          "error": "Could not enter first name.",
          "altSelectors": [
            "[data-test='firstName']"
          ]
        },
        {
          "step": 12,
          "description": "Enter last name",
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "timeout": 5000,
          "retries": 2,
          "error": "Could not enter last name.",
          "altSelectors": [
            "[data-test='lastName']"
          ]
        },
        {
          "step": 13,
          "description": "Enter postal code",
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "timeout": 5000,
          "retries": 2,
          "error": "Could not enter postal code.",
          "altSelectors": [
            "[data-test='postalCode']"
          ]
        },
        {
          "step": 14,
          "description": "Click Continue button",
          "action": "click",
          "selector": "#continue",
          "timeout": 5000,
          "retries": 3,
          "error": "Could not click Continue button.",
          "altSelectors": [
            "[data-test='continue']"
          ]
        },
        {
          "step": 15,
          "description": "Click Finish button",
          "action": "click",
          "selector": "#finish",
          "timeout": 5000,
          "retries": 3,
          "error": "Could not click Finish button.",
          "altSelectors": [
            "[data-test='finish']"
          ]
        },
        {
          "step": 16,
          "description": "Verify thank you message",
          "action": "isVisible",
          "selector": "text=Thank you for your order!",
          "timeout": 5000,
          "retries": 2,
          "error": "Thank you message is not visible."
        },
        {
          "step": 17,
          "description": "Click Back to home button",
          "action": "click",
          "selector": "#back-to-products",
          "timeout": 5000,
          "retries": 3,
          "error": "Could not click Back to home button.",
          "altSelectors": [
            "[data-test='back-to-products']"
          ]
        },
        {
          "step": 18,
          "description": "Click burger menu button",
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "timeout": 5000,
          "retries": 3,
          "error": "Could not click burger menu button."
        },
        {
          "step": 19,
          "description": "Click logout button",
          "action": "click",
          "selector": "#logout_sidebar_link",
          "timeout": 5000,
          "retries": 3,
          "error": "Could not click logout button."
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
                  stepStatus = 'error';
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