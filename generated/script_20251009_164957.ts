import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "id": 1,
      "action": "goto",
      "url": "https://demowebshop.tricentis.com",
      "options": {
        "timeout": 30000,
        "waitUntil": "load"
      },
      "assert": {
        "type": "url",
        "value": "https://demowebshop.tricentis.com/",
        "operator": "equals"
      },
      "errorHandling": {
        "retry": 3,
        "delay": 1000
      },
      "description": "Navigate to the demo webshop homepage"
    },
    {
      "id": 2,
      "action": "click",
      "selector": "a.ico-login",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "/login",
        "operator": "contains"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click on the Log in link"
    },
    {
      "id": 3,
      "action": "fill",
      "selector": "#Email",
      "selectorType": "css",
      "value": "snaptest@yopmail.com",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "value",
        "selector": "#Email",
        "selectorType": "css",
        "value": "snaptest@yopmail.com",
        "operator": "equals"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Enter email address"
    },
    {
      "id": 4,
      "action": "fill",
      "selector": "#Password",
      "selectorType": "css",
      "value": "snaptest@123",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "value",
        "selector": "#Password",
        "selectorType": "css",
        "value": "snaptest@123",
        "operator": "equals"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Enter password"
    },
    {
      "id": 5,
      "action": "click",
      "selector": "input.button-1.login-button",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": "a.account",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click on the Log in button"
    },
    {
      "id": 6,
      "action": "isVisible",
      "selector": "a.account",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "text",
        "selector": "a.account",
        "selectorType": "css",
        "value": "snaptest@yopmail.com",
        "operator": "contains"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Verify logged in user"
    },
    {
      "id": 7,
      "action": "click",
      "selector": "ul.top-menu > li > a:has-text('Books')",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "/books",
        "operator": "contains"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click on Books link"
    },
    {
      "id": 8,
      "action": "click",
      "selector": "div.item-box a[href*='/book']",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": "input[value='Add to cart']",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click on the first book link"
    },
    {
      "id": 9,
      "action": "click",
      "selector": "#add-to-cart-button-45",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".success",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click on Add to cart button"
    },
    {
      "id": 10,
      "action": "click",
      "selector": "a.ico-cart",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "/cart",
        "operator": "contains"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click on Shopping cart link"
    },
    {
      "id": 11,
      "action": "isVisible",
      "selector": "div.cart-item-row",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": "div.cart-item-row",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Verify the product is in the shopping cart"
    },
    {
      "id": 12,
      "action": "check",
      "selector": "#termsofservice",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isChecked",
        "selector": "#termsofservice",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Check the Terms of service checkbox"
    },
    {
      "id": 13,
      "action": "click",
      "selector": "#checkout",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "url",
        "value": "/checkout",
        "operator": "contains"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click on Checkout button"
    },
    {
      "id": 14,
      "action": "click",
      "selector": "input.button-1.new-address-next-step-button",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".shipping-address",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click Continue on Billing Address"
    },
    {
      "id": 15,
      "action": "isVisible",
      "selector": ".shipping-address",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".shipping-address",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Verify Shipping address section is displayed"
    },
    {
      "id": 16,
      "action": "click",
      "selector": "input.button-1.new-address-next-step-button",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".shipping-method",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click Continue on Shipping Address"
    },
    {
      "id": 17,
      "action": "isVisible",
      "selector": ".shipping-method",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".shipping-method",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Verify Shipping method section is displayed"
    },
    {
      "id": 18,
      "action": "click",
      "selector": "input.button-1.shipping-method-next-step-button",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".payment-method",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click Continue on Shipping Method"
    },
    {
      "id": 19,
      "action": "isVisible",
      "selector": "#paymentmethod_0",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isChecked",
        "selector": "#paymentmethod_0",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Verify Cash On Delivery is selected"
    },
    {
      "id": 20,
      "action": "click",
      "selector": "input.button-1.payment-method-next-step-button",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".payment-info",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click Continue on Payment Method"
    },
    {
      "id": 21,
      "action": "isVisible",
      "selector": ".payment-info",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".payment-info",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Verify Payment Information is displayed"
    },
    {
      "id": 22,
      "action": "click",
      "selector": "input.button-1.payment-info-next-step-button",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".confirm-order",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click Continue on Payment Information"
    },
    {
      "id": 23,
      "action": "click",
      "selector": "input.button-1.confirm-order-next-step-button",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".order-completed",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Click Confirm on Confirm Order"
    },
    {
      "id": 24,
      "action": "isVisible",
      "selector": ".order-number strong",
      "selectorType": "css",
      "options": {
        "timeout": 10000
      },
      "assert": {
        "type": "isVisible",
        "selector": ".order-number strong",
        "selectorType": "css"
      },
      "errorHandling": {
        "retry": 2,
        "delay": 500
      },
      "description": "Verify Order Number is displayed"
    }
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

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
    } catch (setupErr: any) {
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
        for (const stepData of originalUserSteps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            // Execute the specific action
            switch (stepData.action) {
              case "goto":
                await page.goto(stepData.url, stepData.options);
                stepDetails = `Navigated to ${stepData.url}`;
                break;
              case "click":
                await page.locator(stepData.selector).click(stepData.options);
                stepDetails = `Clicked ${stepData.selector}`;
                break;
              case "fill":
                await page.locator(stepData.selector).fill(stepData.value, stepData.options);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                break;
              case "check":
                await page.locator(stepData.selector).check(stepData.options);
                stepDetails = `Checked ${stepData.selector}`;
                break;
              case "uncheck":
                await page.locator(stepData.selector).uncheck(stepData.options);
                stepDetails = `Unchecked ${stepData.selector}`;
                break;
              case "hover":
                await page.locator(stepData.selector).hover(stepData.options);
                stepDetails = `Hovered ${stepData.selector}`;
                break;
              case "waitFor":
                await page.locator(stepData.selector).waitFor(stepData.options);
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
            //Assertions
            if (stepData.assert) {
              try {
                switch (stepData.assert.type) {
                  case "url":
                    if (stepData.assert.operator === "equals") {
                      expect(page.url()).toBe(stepData.assert.value);
                    } else if (stepData.assert.operator === "contains") {
                      expect(page.url()).toContain(stepData.assert.value);
                    }
                    break;
                  case "isVisible":
                    await expect(page.locator(stepData.assert.selector)).toBeVisible();
                    break;
                  case "value":
                    await expect(page.locator(stepData.assert.selector)).toHaveValue(stepData.assert.value);
                    break;
                  case "text":
                    await expect(page.locator(stepData.assert.selector)).toContainText(stepData.assert.value);
                    break;
                  case "isChecked":
                    await expect(page.locator(stepData.assert.selector)).toBeChecked();
                    break;
                  default:
                    console.warn(`Unknown assertion type: ${stepData.assert.type}`);
                }
              } catch (assertError: any) {
                stepStatus = "error";
                stepDetails += `. Assertion Failed: ${assertError.message}`;
              }
            }

            stepDetails = `Successfully executed: ${stepData.description}. ${stepDetails}`;
          } catch (stepError: any) {
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
  } catch (unexpectedError: any) {
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
      } catch (closeError: any) {
        // Log but don't fail - we still need to return results
        console.error(`Failed to close browser: ${closeError.message}`);
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
      fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError: any) {
      // File write failed but we still return results
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    // GUARANTEED RETURN - This must ALWAYS execute
    return result;
  }
});