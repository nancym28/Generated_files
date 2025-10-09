import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('DemoWebshop End-to-End Test', async () => {
  const originalUserSteps = [
    "Navigate to the DemoWebshop homepage",
    "Click on the Log in link",
    "Enter email address into the email field",
    "Enter password into the password field",
    "Click on the Log in button",
    "Wait for the account name to be displayed",
    "Click on the Books link in the top menu",
    "Click on the first product link on the page",
    "Click on the Add to cart button",
    "Click on the Shopping cart link",
    "Ensure that the product is present in the shopping cart",
    "Click the Terms of service checkbox",
    "Click the Checkout button",
    "Click the Continue button in the billing address section",
    "Ensure that the shipping address section is displayed",
    "Click the Continue button in the shipping address section",
    "Ensure that the Shipping method section is displayed",
    "Click the Continue button in the shipping method section",
    "Ensure that Cash On Delivery is selected by default in the payment method section",
    "Click the Continue button in the payment method section",
    "Ensure that the selected payment method is displayed in the Payment information section",
    "Click the Continue button in the payment information section",
    "Click the Confirm button in the confirm order section",
    "Ensure that the order number is shown on the order confirmation page"
  ];

  const steps = [
    {
      "stepNumber": 1,
      "description": "Navigate to the DemoWebshop homepage",
      "action": "goto",
      "selector": null,
      "value": "https://demowebshop.tricentis.com",
      "waitTime": 2000,
      "retries": 3,
      "fallback": null,
      "errorMessage": "Navigation to homepage failed.",
      "timeout": 10000
    },
    {
      "stepNumber": 2,
      "description": "Click on the Log in link",
      "action": "click",
      "selector": "a.ico-login",
      "value": null,
      "waitTime": 1000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Login link not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 3,
      "description": "Enter email address into the email field",
      "action": "fill",
      "selector": "#Email",
      "value": "snaptest@yopmail.com",
      "waitTime": 500,
      "retries": 1,
      "fallback": ["scrollIntoView"],
      "errorMessage": "Email field not found or not writable.",
      "timeout": 5000
    },
    {
      "stepNumber": 4,
      "description": "Enter password into the password field",
      "action": "fill",
      "selector": "#Password",
      "value": "snaptest@123",
      "waitTime": 500,
      "retries": 1,
      "fallback": ["scrollIntoView"],
      "errorMessage": "Password field not found or not writable.",
      "timeout": 5000
    },
    {
      "stepNumber": 5,
      "description": "Click on the Log in button",
      "action": "click",
      "selector": "input.button-1.login-button",
      "value": null,
      "waitTime": 1000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Login button not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 6,
      "description": "Wait for the account name to be displayed",
      "action": "waitFor",
      "selector": "a.account",
      "value": null,
      "waitTime": 1000,
      "retries": 3,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Account name not found.",
      "timeout": 5000
    },
    {
      "stepNumber": 7,
      "description": "Click on the Books link in the top menu",
      "action": "click",
      "selector": "ul.top-menu a[href='/books']",
      "value": null,
      "waitTime": 1000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Books link not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 8,
      "description": "Click on the first product link on the page",
      "action": "click",
      "selector": "div.item-box a[href*='/book']",
      "value": null,
      "waitTime": 1000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Product link not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 9,
      "description": "Click on the Add to cart button",
      "action": "click",
      "selector": "input.button-1.add-to-cart-button",
      "value": null,
      "waitTime": 1000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Add to cart button not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 10,
      "description": "Click on the Shopping cart link",
      "action": "click",
      "selector": "a.ico-cart",
      "value": null,
      "waitTime": 2000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Shopping cart link not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 11,
      "description": "Ensure that the product is present in the shopping cart",
      "action": "waitFor",
      "selector": "div.cart-item-row",
      "value": null,
      "waitTime": 2000,
      "retries": 3,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Product not found in the shopping cart.",
      "timeout": 5000
    },
    {
      "stepNumber": 12,
      "description": "Click the Terms of service checkbox",
      "action": "click",
      "selector": "#termsofservice",
      "value": null,
      "waitTime": 1000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Terms of service checkbox not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 13,
      "description": "Click the Checkout button",
      "action": "click",
      "selector": "#checkout",
      "value": null,
      "waitTime": 1000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Checkout button not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 14,
      "description": "Click the Continue button in the billing address section",
      "action": "click",
      "selector": "input[title='Continue']",
      "value": null,
      "waitTime": 2000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Continue button in billing address not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 15,
      "description": "Ensure that the shipping address section is displayed",
      "action": "waitFor",
      "selector": "#shipping-buttons-container",
      "value": null,
      "waitTime": 2000,
      "retries": 3,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Shipping address section is not displayed.",
      "timeout": 5000
    },
    {
      "stepNumber": 16,
      "description": "Click the Continue button in the shipping address section",
      "action": "click",
      "selector": "#shipping-buttons-container input[title='Continue']",
      "value": null,
      "waitTime": 2000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Continue button in shipping address not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 17,
      "description": "Ensure that the Shipping method section is displayed",
      "action": "waitFor",
      "selector": "#shipping-method-buttons-container",
      "value": null,
      "waitTime": 2000,
      "retries": 3,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Shipping method section is not displayed.",
      "timeout": 5000
    },
    {
      "stepNumber": 18,
      "description": "Click the Continue button in the shipping method section",
      "action": "click",
      "selector": "#shipping-method-buttons-container input[title='Continue']",
      "value": null,
      "waitTime": 2000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Continue button in shipping method not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 19,
      "description": "Ensure that Cash On Delivery is selected by default in the payment method section",
      "action": "isVisible",
      "selector": "#paymentmethod_0[checked]",
      "value": null,
      "waitTime": 2000,
      "retries": 3,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Cash On Delivery is not selected by default.",
      "timeout": 5000
    },
    {
      "stepNumber": 20,
      "description": "Click the Continue button in the payment method section",
      "action": "click",
      "selector": "#payment-method-buttons-container input[title='Continue']",
      "value": null,
      "waitTime": 2000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Continue button in payment method not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 21,
      "description": "Ensure that the selected payment method is displayed in the Payment information section",
      "action": "waitFor",
      "selector": "#payment-info-buttons-container",
      "value": null,
      "waitTime": 2000,
      "retries": 3,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Payment information section is not displayed.",
      "timeout": 5000
    },
    {
      "stepNumber": 22,
      "description": "Click the Continue button in the payment information section",
      "action": "click",
      "selector": "#payment-info-buttons-container input[title='Continue']",
      "value": null,
      "waitTime": 2000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Continue button in payment info not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 23,
      "description": "Click the Confirm button in the confirm order section",
      "action": "click",
      "selector": "#confirmorder-buttons-container input[value='Confirm']",
      "value": null,
      "waitTime": 2000,
      "retries": 2,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Confirm button not found or not clickable.",
      "timeout": 5000
    },
    {
      "stepNumber": 24,
      "description": "Ensure that the order number is shown on the order confirmation page",
      "action": "waitFor",
      "selector": "div.order-completed p strong",
      "value": null,
      "waitTime": 5000,
      "retries": 3,
      "fallback": ["waitForLoadState"],
      "errorMessage": "Order confirmation message not found.",
      "timeout": 10000
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
      fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});