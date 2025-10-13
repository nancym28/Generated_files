import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.demoblaze.com/",
    "Click on the 'Log in' link with id 'login2'",
    "Enter 'chaitanya123' in the username field with id 'loginusername'",
    "Enter 'Password@123' in the password field with id 'loginpassword'",
    "Click the 'Log in' button with onclick 'logIn()'",
    "Click on the 'Laptops' category link with text 'Laptops'",
    "Click on the product 'Sony vaio i5' link with class 'hrefch' and text 'Sony vaio i5'",
    "Click the 'Add to cart' button with onclick 'addToCart(8)'",
    "Wait for the alert",
    "Accept the alert",
    "Click on the 'Cart' link with id 'cartur'",
    "Verify that the 'Sony vaio i5' is present in the cart table with text 'Sony vaio i5'",
    "Click on the 'Place Order' button with data-target '#orderModal'",
    "Enter 'Chaitanya' in the name field with id 'name'",
    "Enter 'India' in the country field with id 'country'",
    "Enter 'Hyderabad' in the city field with id 'city'",
    "Enter '1234 5678 9876 5432' in the credit card field with id 'card'",
    "Enter 'October' in the month field with id 'month'",
    "Enter '2025' in the year field with id 'year'",
    "Click 'Purchase' button with onclick 'purchaseOrder()'",
    "Verify that a confirmation message appears with the text 'Thank you for your purchase!'",
    "Click 'OK' on the confirmation popup"
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
          "value": "https://www.demoblaze.com/",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to navigate to demoblaze",
          "stepDescription": "Navigate to https://www.demoblaze.com/"
        },
        {
          "action": "click",
          "selector": "#login2",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to click login link",
          "stepDescription": "Click on the 'Log in' link with id 'login2'"
        },
        {
          "action": "fill",
          "selector": "#loginusername",
          "value": "chaitanya123",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to fill username field",
          "stepDescription": "Enter 'chaitanya123' in the username field with id 'loginusername'"
        },
        {
          "action": "fill",
          "selector": "#loginpassword",
          "value": "Password@123",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to fill password field",
          "stepDescription": "Enter 'Password@123' in the password field with id 'loginpassword'"
        },
        {
          "action": "click",
          "selector": "button[onclick='logIn()']",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to click login button",
          "stepDescription": "Click the 'Log in' button with onclick 'logIn()'"
        },
        {
          "action": "click",
          "selector": "a:has-text('Laptops')",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to click laptops category",
          "stepDescription": "Click on the 'Laptops' category link with text 'Laptops'"
        },
        {
          "action": "click",
          "selector": "a.hrefch:has-text('Sony vaio i5')",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to click Sony vaio i5 product",
          "stepDescription": "Click on the product 'Sony vaio i5' link with class 'hrefch' and text 'Sony vaio i5'"
        },
        {
          "action": "click",
          "selector": "button[onclick='addToCart(8)']",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to click add to cart button",
          "stepDescription": "Click the 'Add to cart' button with onclick 'addToCart(8)'"
        },
        {
          "action": "waitFor",
          "selector": null,
          "value": "alert",
          "waitTimeoutMs": 10000,
          "retry": 1,
          "fallbacks": [],
          "errorMessage": "Alert did not appear",
          "stepDescription": "Wait for the alert"
        },
        {
          "action": "click",
          "selector": null,
          "value": "alert.accept()",
          "waitTimeoutMs": 10000,
          "retry": 1,
          "fallbacks": [],
          "errorMessage": "Failed to accept alert",
          "stepDescription": "Accept the alert"
        },
        {
          "action": "click",
          "selector": "#cartur",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to click cart link",
          "stepDescription": "Click on the 'Cart' link with id 'cartur'"
        },
        {
          "action": "isVisible",
          "selector": "td:has-text('Sony vaio i5')",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Sony vaio i5 not found in cart",
          "stepDescription": "Verify that the 'Sony vaio i5' is present in the cart table with text 'Sony vaio i5'"
        },
        {
          "action": "click",
          "selector": "button[data-target='#orderModal']",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to click place order button",
          "stepDescription": "Click on the 'Place Order' button with data-target '#orderModal'"
        },
        {
          "action": "fill",
          "selector": "#name",
          "value": "Chaitanya",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to fill name field",
          "stepDescription": "Enter 'Chaitanya' in the name field with id 'name'"
        },
        {
          "action": "fill",
          "selector": "#country",
          "value": "India",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to fill country field",
          "stepDescription": "Enter 'India' in the country field with id 'country'"
        },
        {
          "action": "fill",
          "selector": "#city",
          "value": "Hyderabad",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to fill city field",
          "stepDescription": "Enter 'Hyderabad' in the city field with id 'city'"
        },
        {
          "action": "fill",
          "selector": "#card",
          "value": "1234 5678 9876 5432",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to fill credit card field",
          "stepDescription": "Enter '1234 5678 9876 5432' in the credit card field with id 'card'"
        },
        {
          "action": "fill",
          "selector": "#month",
          "value": "October",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to fill month field",
          "stepDescription": "Enter 'October' in the month field with id 'month'"
        },
        {
          "action": "fill",
          "selector": "#year",
          "value": "2025",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to fill year field",
          "stepDescription": "Enter '2025' in the year field with id 'year'"
        },
        {
          "action": "click",
          "selector": "button[onclick='purchaseOrder()']",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to click purchase button",
          "stepDescription": "Click 'Purchase' button with onclick 'purchaseOrder()'"
        },
        {
          "action": "isVisible",
          "selector": "h2:has-text('Thank you for your purchase!')",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Confirmation message not found",
          "stepDescription": "Verify that a confirmation message appears with the text 'Thank you for your purchase!'",
        },
        {
          "action": "click",
          "selector": "button:has-text('OK')",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to click OK button",
          "stepDescription": "Click 'OK' on the confirmation popup"
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
                // Assuming waitFor is for an alert
                await page.waitForEvent('dialog');
                stepDetails = `Waited for alert`;
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
      fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});