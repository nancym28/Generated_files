import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('Generated Test', async () => {
  test.setTimeout(120000);

  const stepsFromInput = [
    {
      "stepDescription": "Navigate to https://www.demoblaze.com/",
      "action": "goto",
      "selector": null,
      "value": "https://www.demoblaze.com/",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to navigate to demoblaze"
    },
    {
      "stepDescription": "Click on the 'Log in' link",
      "action": "click",
      "selector": "a[data-target='#logInModal']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": ["waitForLoadState"],
      "errorMessage": "Failed to click login link"
    },
    {
      "stepDescription": "Enter 'chaitanya123' in the 'loginusername' field",
      "action": "fill",
      "selector": "#loginusername",
      "value": "chaitanya123",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill username"
    },
    {
      "stepDescription": "Enter 'Password@123' in the 'loginpassword' field",
      "action": "fill",
      "selector": "#loginpassword",
      "value": "Password@123",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill password"
    },
    {
      "stepDescription": "Click the 'Log in' button in the modal",
      "action": "click",
      "selector": "button[onclick='logIn()']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click login button"
    },
    {
      "stepDescription": "Click on the 'Laptops' category",
      "action": "click",
      "selector": "a[href*='notebook']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": ["scrollIntoView"],
      "errorMessage": "Failed to click laptops category"
    },
    {
      "stepDescription": "Click on the 'Sony vaio i5' link",
      "action": "click",
      "selector": "a.hrefch:has-text('Sony vaio i5')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": ["scrollIntoView"],
      "errorMessage": "Failed to click sony vaio i5"
    },
    {
      "stepDescription": "Click the 'Add to cart' button",
      "action": "click",
      "selector": "button.btn.btn-success:has-text('Add to cart')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click add to cart"
    },
    {
      "stepDescription": "Accept the alert",
      "action": "waitFor",
      "selector": "alert",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to accept alert"
    },
    {
      "stepDescription": "Click on the 'Cart' link",
      "action": "click",
      "selector": "#cartur",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": ["waitForLoadState"],
      "errorMessage": "Failed to click cart link"
    },
    {
      "stepDescription": "Verify that the 'Sony vaio i5' is present in the cart",
      "action": "isVisible",
      "selector": "#cartp tr td:has-text('Sony vaio i5')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Sony vaio i5 not found in cart"
    },
    {
      "stepDescription": "Click on the 'Place Order' button",
      "action": "click",
      "selector": "button[data-target='#orderModal']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click place order"
    },
    {
      "stepDescription": "Enter 'Chaitanya' in the 'name' field",
      "action": "fill",
      "selector": "#name",
      "value": "Chaitanya",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill name"
    },
    {
      "stepDescription": "Enter 'India' in the 'country' field",
      "action": "fill",
      "selector": "#country",
      "value": "India",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill country"
    },
    {
      "stepDescription": "Enter 'Hyderabad' in the 'city' field",
      "action": "fill",
      "selector": "#city",
      "value": "Hyderabad",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill city"
    },
    {
      "stepDescription": "Enter '1234 5678 9876 5432' in the 'card' field",
      "action": "fill",
      "selector": "#card",
      "value": "1234 5678 9876 5432",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill card"
    },
    {
      "stepDescription": "Enter 'October' in the 'month' field",
      "action": "fill",
      "selector": "#month",
      "value": "October",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill month"
    },
    {
      "stepDescription": "Enter '2025' in the 'year' field",
      "action": "fill",
      "selector": "#year",
      "value": "2025",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill year"
    },
    {
      "stepDescription": "Click the 'Purchase' button",
      "action": "click",
      "selector": "button[onclick='purchaseOrder()']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click purchase"
    },
    {
      "stepDescription": "Verify that a confirmation message appears",
      "action": "isVisible",
      "selector": ".sweet-alert:has-text('Thank you for your purchase!')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Confirmation message not found"
    },
    {
      "stepDescription": "Click 'OK' on the confirmation popup",
      "action": "click",
      "selector": "button.confirm",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click OK on confirmation"
    }
  ];

  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = stepsFromInput.map(step => step.stepDescription);
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
        for (const stepData of stepsFromInput) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            // Execute the specific action
            if (stepData.action === "goto") {
              await page.goto(stepData.value);
              stepDetails = `Navigated to ${stepData.value}`;
            } else if (stepData.action === "click") {
              await page.locator(stepData.selector).click();
              stepDetails = `Clicked ${stepData.selector}`;
            } else if (stepData.action === "fill") {
              await page.locator(stepData.selector).fill(stepData.value);
              stepDetails = `Filled ${stepData.selector}`;
            } else if (stepData.action === "check") {
              await page.locator(stepData.selector).check();
              stepDetails = `Checked ${stepData.selector}`;
            } else if (stepData.action === "uncheck") {
              await page.locator(stepData.selector).uncheck();
              stepDetails = `Unchecked ${stepData.selector}`;
            } else if (stepData.action === "hover") {
              await page.locator(stepData.selector).hover();
              stepDetails = `Hovered ${stepData.selector}`;
            } else if (stepData.action === "waitFor") {
              // Handle alert differently
              if (stepData.selector === "alert") {
                page.on('dialog', async dialog => {
                  await dialog.accept();
                });
                stepDetails = "Accepted the alert";
              } else {
                await page.locator(stepData.selector).waitFor();
                stepDetails = `Waited for ${stepData.selector}`;
              }
            } else if (stepData.action === "isVisible") {
              const isVisible = await page.locator(stepData.selector).isVisible();
              stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
              if (!isVisible) {
                stepStatus = "error";
              }
            } else {
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