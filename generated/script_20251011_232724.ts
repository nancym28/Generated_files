import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.demoblaze.com/",
    "Click on the 'Log in' link",
    "Enter 'chaitanya123' in the 'loginusername' field",
    "Enter 'Password@123' in the 'loginpassword' field",
    "Click the 'Log in' button in the modal",
    "Click on the 'Laptops' category",
    "Click on the 'Sony vaio i5' link",
    "Click the 'Add to cart' button",
    "Accept the alert",
    "Click on the 'Cart' link",
    "Verify that the 'Sony vaio i5' is present in the cart",
    "Click on the 'Place Order' button",
    "Enter 'Chaitanya' in the 'name' field",
    "Enter 'India' in the 'country' field",
    "Enter 'Hyderabad' in the 'city' field",
    "Enter '1234 5678 9876 5432' in the 'card' field",
    "Enter 'October' in the 'month' field",
    "Enter '2025' in the 'year' field",
    "Click the 'Purchase' button",
    "Verify that a confirmation message appears with the text 'Thank you for your purchase!'",
    "Click 'OK' on the confirmation popup"
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const steps = [
    {
      "action": "goto",
      "selector": null,
      "value": "https://www.demoblaze.com/",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Navigation to demoblaze.com failed after multiple retries.",
      "stepDescription": "Navigate to the Demoblaze homepage."
    },
    {
      "action": "click",
      "selector": "a#login2",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the 'Log in' link after multiple retries.",
      "stepDescription": "Click on the 'Log in' link to open the login modal."
    },
    {
      "action": "fill",
      "selector": "input#loginusername",
      "value": "chaitanya123",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter username in the 'loginusername' field after multiple retries.",
      "stepDescription": "Enter the username 'chaitanya123' in the login username field."
    },
    {
      "action": "fill",
      "selector": "input#loginpassword",
      "value": "Password@123",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter password in the 'loginpassword' field after multiple retries.",
      "stepDescription": "Enter the password 'Password@123' in the login password field."
    },
    {
      "action": "click",
      "selector": "button[onclick='logIn()']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the 'Log in' button in the modal after multiple retries.",
      "stepDescription": "Click the 'Log in' button to submit the login form."
    },
    {
      "action": "click",
      "selector": "a[href='#'][onclick*='byCat(\\'notebook\\')']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the 'Laptops' category link after multiple retries.",
      "stepDescription": "Click on the 'Laptops' category to filter the products."
    },
    {
      "action": "click",
      "selector": "a.hrefch[href*='prod.html?idp_=8']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the 'Sony vaio i5' link after multiple retries.",
      "stepDescription": "Click on the 'Sony vaio i5' link to view product details."
    },
    {
      "action": "click",
      "selector": "a.hrefch + div > div.card-footer > button.btn.btn-success",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the 'Add to cart' button after multiple retries.",
      "stepDescription": "Click the 'Add to cart' button to add the product to the cart."
    },
    {
      "action": "waitFor",
      "selector": null,
      "value": "alert",
      "waitTimeoutMs": 5000,
      "retry": 0,
      "fallbacks": [],
      "errorMessage": "Alert was not present after adding item to cart.",
      "stepDescription": "Wait for the alert to appear after adding the item to the cart."
    },
    {
      "action": "click",
      "selector": "a#cartur",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the 'Cart' link after multiple retries.",
      "stepDescription": "Click on the 'Cart' link to view the shopping cart."
    },
    {
      "action": "isVisible",
      "selector": "td=Sony vaio i5",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "The 'Sony vaio i5' is not present in the cart after multiple retries.",
      "stepDescription": "Verify that the 'Sony vaio i5' is present in the cart."
    },
    {
      "action": "click",
      "selector": "button[data-toggle='modal'][data-target='#orderModal']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the 'Place Order' button after multiple retries.",
      "stepDescription": "Click on the 'Place Order' button to open the order form."
    },
    {
      "action": "fill",
      "selector": "input#name",
      "value": "Chaitanya",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter name in the 'name' field after multiple retries.",
      "stepDescription": "Enter 'Chaitanya' in the name field."
    },
    {
      "action": "fill",
      "selector": "input#country",
      "value": "India",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter country in the 'country' field after multiple retries.",
      "stepDescription": "Enter 'India' in the country field."
    },
    {
      "action": "fill",
      "selector": "input#city",
      "value": "Hyderabad",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter city in the 'city' field after multiple retries.",
      "stepDescription": "Enter 'Hyderabad' in the city field."
    },
    {
      "action": "fill",
      "selector": "input#card",
      "value": "1234 5678 9876 5432",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter card number in the 'card' field after multiple retries.",
      "stepDescription": "Enter '1234 5678 9876 5432' in the card field."
    },
    {
      "action": "fill",
      "selector": "input#month",
      "value": "October",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter month in the 'month' field after multiple retries.",
      "stepDescription": "Enter 'October' in the month field."
    },
    {
      "action": "fill",
      "selector": "input#year",
      "value": "2025",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter year in the 'year' field after multiple retries.",
      "stepDescription": "Enter '2025' in the year field."
    },
    {
      "action": "click",
      "selector": "button[onclick='purchaseOrder()']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the 'Purchase' button after multiple retries.",
      "stepDescription": "Click the 'Purchase' button to submit the order."
    },
    {
      "action": "isVisible",
      "selector": "div.sweet-alert > h2=Thank you for your purchase!",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Confirmation message is not displayed after multiple retries.",
      "stepDescription": "Verify that the confirmation message 'Thank you for your purchase!' appears."
    },
    {
      "action": "click",
      "selector": "button.confirm.btn.btn-lg.btn-primary",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click the 'OK' button on the confirmation popup after multiple retries.",
      "stepDescription": "Click 'OK' on the confirmation popup."
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
      if (originalUserSteps.length === 0) {
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
                if (stepData.value === 'alert') {
                  await page.waitForEvent('dialog');
                  const dialog = await page.evaluate(() => {
                    return new Promise(resolve => {
                      window.addEventListener('load', () => {
                        window.addEventListener('dialog', event => {
                          resolve(event);
                        });
                      });
                    });
                  });
                  if (dialog) {
                    await dialog.accept();
                  }
                  stepDetails = `Waited for and accepted alert`;
                } else {
                  await page.locator(stepData.selector).waitFor();
                  stepDetails = `Waited for ${stepData.selector}`;
                }
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
        console.error(`Failed to close browser: ${closeError.message}`);
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
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    return result;
  }
});