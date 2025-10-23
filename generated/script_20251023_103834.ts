import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test.setTimeout(120000);

test('SauceDemo Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id 'user-name'.",
    "Enter \"secret_sauce\" in the password field with id 'password'.",
    "Click the Login button with id 'login-button'.",
    "Click on the product sort filter dropdown with class 'product_sort_container'.",
    "Select Name (Z to A) from the product sort filter dropdown with value 'za'.",
    "Click the Add to Cart button for the product \"Sauce Labs Backpack\" with id 'add-to-cart-sauce-labs-backpack'.",
    "Click on the cart icon with class 'shopping_cart_link'.",
    "Verify that the product \"Sauce Labs Backpack\" is present in the cart.",
    "Click on the checkout button with id 'checkout'.",
    "Enter \"chaitanya\" in the first name field with id 'first-name'.",
    "Enter \"Kompella\" in the last name field with id 'last-name'.",
    "Enter \"62567352\" in the postal code field with id 'postal-code'.",
    "Click on continue button with id 'continue'.",
    "Click on finish button with id 'finish'.",
    "Verify that the text \"Thank you for your order!\" is present.",
    "Click on back to home button with id 'back-to-products'.",
    "Click on the burger bar with id 'react-burger-menu-btn'.",
    "Click on logout with id 'logout_sidebar_link'."
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const steps = [
    {
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "options": {
        "timeout": 30000,
        "waitUntil": "load"
      },
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/"
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "stepDescription": "Navigate to https://www.saucedemo.com/."
    },
    {
      "action": "fill",
      "selector": {
        "primary": "#user-name",
        "alt": "[data-test='username']",
        "backup": "//input[@placeholder='Username']"
      },
      "value": "standard_user",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "value",
        "value": "standard_user"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Enter \"standard_user\" in the username field with id 'user-name'."
    },
    {
      "action": "fill",
      "selector": {
        "primary": "#password",
        "alt": "[data-test='password']",
        "backup": "//input[@placeholder='Password']"
      },
      "value": "secret_sauce",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "value",
        "value": "secret_sauce"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Enter \"secret_sauce\" in the password field with id 'password'."
    },
    {
      "action": "click",
      "selector": {
        "primary": "#login-button",
        "alt": "[data-test='login-button']",
        "backup": "//input[@value='Login']"
      },
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/inventory.html"
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "stepDescription": "Click the Login button with id 'login-button'."
    },
    {
      "action": "click",
      "selector": {
        "primary": ".product_sort_container",
        "alt": "[data-test='product-sort-container']"
      },
      "options": {
        "timeout": 10000
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Click on the product sort filter dropdown with class 'product_sort_container'."
    },
    {
      "action": "click",
      "selector": {
        "primary": "option[value='za']",
        "alt": "//option[text()='Name (Z to A)']"
      },
      "options": {
        "timeout": 10000
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Select Name (Z to A) from the product sort filter dropdown with value 'za'."
    },
    {
      "action": "click",
      "selector": {
        "primary": "#add-to-cart-sauce-labs-backpack",
        "alt": "[data-test='add-to-cart-sauce-labs-backpack']",
        "backup": "//button[contains(text(),'Add to cart') and ancestor::div[@class='inventory_item_description']//div[@class='inventory_item_name' and text()='Sauce Labs Backpack']]"
      },
      "options": {
        "timeout": 10000
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "stepDescription": "Click the Add to Cart button for the product \"Sauce Labs Backpack\" with id 'add-to-cart-sauce-labs-backpack'."
    },
    {
      "action": "click",
      "selector": {
        "primary": ".shopping_cart_link",
        "alt": "[data-test='shopping-cart-link']"
      },
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/cart.html"
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "stepDescription": "Click on the cart icon with class 'shopping_cart_link'."
    },
    {
      "action": "waitFor",
      "selector": {
        "primary": ".inventory_item_name",
        "alt": "[data-test='inventory-item-name']"
      },
      "options": {
        "state": "visible",
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "value": true
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Verify that the product \"Sauce Labs Backpack\" is present in the cart."
    },
    {
      "action": "click",
      "selector": {
        "primary": "#checkout",
        "alt": "[data-test='checkout']"
      },
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/checkout-step-one.html"
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "stepDescription": "Click on the checkout button with id 'checkout'."
    },
    {
      "action": "fill",
      "selector": {
        "primary": "#first-name",
        "alt": "[data-test='firstName']"
      },
      "value": "chaitanya",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "value",
        "value": "chaitanya"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Enter \"chaitanya\" in the first name field with id 'first-name'."
    },
    {
      "action": "fill",
      "selector": {
        "primary": "#last-name",
        "alt": "[data-test='lastName']"
      },
      "value": "Kompella",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "value",
        "value": "Kompella"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Enter \"Kompella\" in the last name field with id 'last-name'."
    },
    {
      "action": "fill",
      "selector": {
        "primary": "#postal-code",
        "alt": "[data-test='postalCode']"
      },
      "value": "62567352",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "value",
        "value": "62567352"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Enter \"62567352\" in the postal code field with id 'postal-code'."
    },
    {
      "action": "click",
      "selector": {
        "primary": "#continue",
        "alt": "[data-test='continue']"
      },
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/checkout-step-two.html"
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "stepDescription": "Click on continue button with id 'continue'."
    },
    {
      "action": "click",
      "selector": {
        "primary": "#finish",
        "alt": "[data-test='finish']"
      },
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/checkout-complete.html"
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "stepDescription": "Click on finish button with id 'finish'."
    },
    {
      "action": "waitFor",
      "selector": {
        "primary": ".complete-header",
        "alt": "//h2[text()='Thank you for your order!']"
      },
      "options": {
        "state": "visible",
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "value": true
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Verify that the text \"Thank you for your order!\" is present."
    },
    {
      "action": "click",
      "selector": {
        "primary": "#back-to-products",
        "alt": "[data-test='back-to-products']"
      },
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/inventory.html"
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "stepDescription": "Click on back to home button with id 'back-to-products'."
    },
    {
      "action": "click",
      "selector": {
        "primary": "#react-burger-menu-btn"
      },
      "options": {
        "timeout": 10000
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "stepDescription": "Click on the burger bar with id 'react-burger-menu-btn'."
    },
    {
      "action": "click",
      "selector": {
        "primary": "#logout_sidebar_link"
      },
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/"
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "stepDescription": "Click on logout with id 'logout_sidebar_link'."
    }
  ];

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
                await page.goto(stepData.url, stepData.options);
                stepDetails = `Navigated to ${stepData.url}`;
                break;
              case "click":
                const clickSelector = stepData.selector.primary;
                await page.locator(clickSelector).click(stepData.options);
                stepDetails = `Clicked ${clickSelector}`;
                break;
              case "fill":
                const fillSelector = stepData.selector.primary;
                await page.locator(fillSelector).fill(stepData.value, stepData.options);
                stepDetails = `Filled ${fillSelector} with ${stepData.value}`;
                break;
              case "check":
                const checkSelector = stepData.selector.primary;
                await page.locator(checkSelector).check(stepData.options);
                stepDetails = `Checked ${checkSelector}`;
                break;
              case "uncheck":
                const uncheckSelector = stepData.selector.primary;
                await page.locator(uncheckSelector).uncheck(stepData.options);
                stepDetails = `Unchecked ${uncheckSelector}`;
                break;
              case "hover":
                const hoverSelector = stepData.selector.primary;
                await page.locator(hoverSelector).hover(stepData.options);
                stepDetails = `Hovered ${hoverSelector}`;
                break;
              case "waitFor":
                const waitForSelector = stepData.selector.primary;
                await page.locator(waitForSelector).waitFor(stepData.options);
                stepDetails = `Waited for ${waitForSelector}`;
                break;
              case "isVisible":
                  const isVisibleSelector = stepData.selector.primary;
                  const isVisible = await page.locator(isVisibleSelector).isVisible();
                  stepDetails = `Element ${isVisibleSelector} is ${isVisible ? 'visible' : 'not visible'}`;
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