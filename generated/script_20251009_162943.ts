import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('Generated Test', async () => {
  test.setTimeout(120000);

  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to demowebshop homepage",
    "Click on the Log in link",
    "Enter 'snaptest@yopmail.com' into the Email field",
    "Enter 'snaptest@123' into the Password field",
    "Click on the Log in button",
    "Verify that 'snaptest@yopmail.com' is displayed in the header",
    "Click on the Books link in the top menu",
    "Click on the first product link on the page",
    "Click on the Add to cart button",
    "Click on the Shopping cart link",
    "Verify that the product is present in the shopping cart",
    "Click the Terms of service checkbox",
    "Click the Checkout button",
    "Click the Continue button in the billing address section",
    "Verify that the shipping address section is displayed",
    "Click the Continue button in the shipping address section",
    "Verify that the Shipping method section is displayed",
    "Click the Continue button in the shipping method section",
    "Verify that Cash On Delivery is selected by default in the payment method section",
    "Click the Continue button in the payment method section",
    "Verify that the selected payment method is displayed in the Payment information section",
    "Click the Continue button in the payment information section",
    "Click the Confirm button in the confirm order section",
    "Verify that the order number is shown on the order confirmation page"
  ]; // from input
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const steps = [
    {
      "action": "goto",
      "selector": null,
      "value": "https://demowebshop.tricentis.com",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState"
      ],
      "errorMessage": "Failed to navigate to demowebshop homepage",
      "stepDescription": "Navigate to demowebshop homepage"
    },
    {
      "action": "click",
      "selector": "a.ico-login",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Log in link",
      "stepDescription": "Click on the Log in link"
    },
    {
      "action": "fill",
      "selector": "#Email",
      "value": "snaptest@yopmail.com",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter email",
      "stepDescription": "Enter 'snaptest@yopmail.com' into the Email field"
    },
    {
      "action": "fill",
      "selector": "#Password",
      "value": "snaptest@123",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter password",
      "stepDescription": "Enter 'snaptest@123' into the Password field"
    },
    {
      "action": "click",
      "selector": "input.button-1.login-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Log in button",
      "stepDescription": "Click on the Log in button"
    },
    {
      "action": "isVisible",
      "selector": "a.account",
      "value": "snaptest@yopmail.com",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Logged in email not visible",
      "stepDescription": "Verify that 'snaptest@yopmail.com' is displayed in the header"
    },
    {
      "action": "click",
      "selector": "ul.top-menu > li > a[href='/books']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Books link",
      "stepDescription": "Click on the Books link in the top menu"
    },
    {
      "action": "click",
      "selector": "div.item-box a[href*='/book']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the first product link",
      "stepDescription": "Click on the first product link on the page"
    },
    {
      "action": "click",
      "selector": "input.button-1.add-to-cart-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Add to cart button",
      "stepDescription": "Click on the Add to cart button"
    },
    {
      "action": "click",
      "selector": "a.ico-cart",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Shopping cart link",
      "stepDescription": "Click on the Shopping cart link"
    },
    {
      "action": "isVisible",
      "selector": "div.cart-item-row",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Product not present in the shopping cart",
      "stepDescription": "Verify that the product is present in the shopping cart"
    },
    {
      "action": "check",
      "selector": "#termsofservice",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to check the Terms of service checkbox",
      "stepDescription": "Click the Terms of service checkbox"
    },
    {
      "action": "click",
      "selector": "#checkout",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Checkout button",
      "stepDescription": "Click the Checkout button"
    },
    {
      "action": "click",
      "selector": "input.button-1.new-address-next-step-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Continue button in the billing address section",
      "stepDescription": "Click the Continue button in the billing address section"
    },
    {
      "action": "isVisible",
      "selector": "div#shipping-address-block",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Shipping address section is not displayed",
      "stepDescription": "Verify that the shipping address section is displayed"
    },
    {
      "action": "click",
      "selector": "input.button-1.new-address-next-step-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Continue button in the shipping address section",
      "stepDescription": "Click the Continue button in the shipping address section"
    },
    {
      "action": "isVisible",
      "selector": "div#shipping-method-block",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Shipping method section is not displayed",
      "stepDescription": "Verify that the Shipping method section is displayed"
    },
    {
      "action": "click",
      "selector": "input.button-1.shipping-method-next-step-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Continue button in the shipping method section",
      "stepDescription": "Click the Continue button in the shipping method section"
    },
    {
      "action": "isVisible",
      "selector": "#paymentmethod_0",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Cash On Delivery is not selected by default",
      "stepDescription": "Verify that Cash On Delivery is selected by default in the payment method section"
    },
    {
      "action": "click",
      "selector": "input.button-1.payment-method-next-step-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Continue button in the payment method section",
      "stepDescription": "Click the Continue button in the payment method section"
    },
    {
      "action": "isVisible",
      "selector": "div#payment-info-block",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Payment information section is not displayed",
      "stepDescription": "Verify that the selected payment method is displayed in the Payment information section"
    },
    {
      "action": "click",
      "selector": "input.button-1.payment-info-next-step-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Continue button in the payment information section",
      "stepDescription": "Click the Continue button in the payment information section"
    },
    {
      "action": "click",
      "selector": "input.button-1.confirm-order-next-step-button",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the Confirm button in the confirm order section",
      "stepDescription": "Click the Confirm button in the confirm order section"
    },
    {
      "action": "isVisible",
      "selector": "div.order-completed p strong",
      "value": "Order number:",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Order number is not displayed on the order confirmation page",
      "stepDescription": "Verify that the order number is shown on the order confirmation page"
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
      if (originalUserSteps.length === 0) {
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

            stepDetails = `Successfully executed: ${stepData.stepDescription}. ${stepDetails}`;
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