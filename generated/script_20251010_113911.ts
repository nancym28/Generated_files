import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { writeFileSync } from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to the Demoblaze homepage",
    "Click on the 'Log in' link",
    "Enter 'chaitanya123' in the 'Username' field",
    "Enter 'Password@123' in the 'Password' field",
    "Click the 'Log in' button",
    "Click on the 'Laptops' category",
    "Click on the product 'Sony vaio i5'",
    "Click the 'Add to cart' button",
    "Wait for the alert to appear",
    "Click on the 'Cart' link",
    "Verify that the 'Sony vaio i5' is present in the cart",
    "Click on the 'Place Order' button",
    "Enter 'Chaitanya' in the 'Name' field",
    "Enter 'India' in the 'Country' field",
    "Enter 'Hyderabad' in the 'City' field",
    "Enter '1234 5678 9876 5432' in the 'Credit Card' field",
    "Enter 'October' in the 'Month' field",
    "Enter '2025' in the 'Year' field",
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
      "waitTimeoutMs": 30000,
      "retry": 3,
      "fallbacks": [
        "waitForLoadState"
      ],
      "errorMessage": "Failed to navigate to Demoblaze homepage",
      "stepDescription": "Navigate to the Demoblaze homepage"
    },
    {
      "action": "click",
      "selector": "a#login2",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the 'Log in' link",
      "stepDescription": "Click on the 'Log in' link"
    },
    {
      "action": "fill",
      "selector": "input#loginusername",
      "value": "chaitanya123",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter username",
      "stepDescription": "Enter 'chaitanya123' in the 'Username' field"
    },
    {
      "action": "fill",
      "selector": "input#loginpassword",
      "value": "Password@123",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter password",
      "stepDescription": "Enter 'Password@123' in the 'Password' field"
    },
    {
      "action": "click",
      "selector": "button[onclick='logIn()']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click the 'Log in' button",
      "stepDescription": "Click the 'Log in' button"
    },
    {
      "action": "click",
      "selector": "a[href='#'][onclick*='showcategories()']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the 'Laptops' category",
      "stepDescription": "Click on the 'Laptops' category"
    },
    {
      "action": "click",
      "selector": "a.hrefch[href*='prod.html?idp_=8']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the product 'Sony vaio i5'",
      "stepDescription": "Click on the product 'Sony vaio i5'"
    },
    {
      "action": "click",
      "selector": "a[onclick='addToCart(8)']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click the 'Add to cart' button",
      "stepDescription": "Click the 'Add to cart' button"
    },
    {
      "action": "waitFor",
      "selector": null,
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 0,
      "fallbacks": [],
      "errorMessage": "Alert not found",
      "stepDescription": "Wait for the alert to appear"
    },
    {
      "action": "click",
      "selector": "a#cartur",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the 'Cart' link",
      "stepDescription": "Click on the 'Cart' link"
    },
    {
      "action": "isVisible",
      "selector": "td:has-text('Sony vaio i5')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Product 'Sony vaio i5' not found in cart",
      "stepDescription": "Verify that the 'Sony vaio i5' is present in the cart"
    },
    {
      "action": "click",
      "selector": "button[data-target='#orderModal']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click on the 'Place Order' button",
      "stepDescription": "Click on the 'Place Order' button"
    },
    {
      "action": "fill",
      "selector": "input#name",
      "value": "Chaitanya",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter name",
      "stepDescription": "Enter 'Chaitanya' in the 'Name' field"
    },
    {
      "action": "fill",
      "selector": "input#country",
      "value": "India",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter country",
      "stepDescription": "Enter 'India' in the 'Country' field"
    },
    {
      "action": "fill",
      "selector": "input#city",
      "value": "Hyderabad",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter city",
      "stepDescription": "Enter 'Hyderabad' in the 'City' field"
    },
    {
      "action": "fill",
      "selector": "input#card",
      "value": "1234 5678 9876 5432",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter credit card",
      "stepDescription": "Enter '1234 5678 9876 5432' in the 'Credit Card' field"
    },
    {
      "action": "fill",
      "selector": "input#month",
      "value": "October",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter month",
      "stepDescription": "Enter 'October' in the 'Month' field"
    },
    {
      "action": "fill",
      "selector": "input#year",
      "value": "2025",
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter year",
      "stepDescription": "Enter '2025' in the 'Year' field"
    },
    {
      "action": "click",
      "selector": "button[onclick='purchaseOrder()']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click the 'Purchase' button",
      "stepDescription": "Click the 'Purchase' button"
    },
    {
      "action": "isVisible",
      "selector": "div.sweet-alert h2:has-text('Thank you for your purchase!')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView"
      ],
      "errorMessage": "Confirmation message not found",
      "stepDescription": "Verify that a confirmation message appears with the text 'Thank you for your purchase!'"
    },
    {
      "action": "click",
      "selector": "button.confirm",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 2,
      "fallbacks": [
        "scrollIntoView",
        "waitForLoadState"
      ],
      "errorMessage": "Failed to click 'OK' on the confirmation popup",
      "stepDescription": "Click 'OK' on the confirmation popup"
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
                // Added try-catch inside waitFor to handle potential timeout errors
                try {
                  await page.waitForTimeout(2000); // Wait for 2 seconds as a default
                } catch (waitError) {
                  stepStatus = "error";
                  stepDetails = `Wait timed out: ${waitError.message}`;
                }
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selector).isVisible();
                stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
                if (!isVisible) {
                  stepStatus = "error"; // Set status to error if not visible
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

          if (stepData.action === "waitFor" && stepStatus === "error") {
            break;
          }
        }

        try {
          page.on('dialog', async dialog => {
            await dialog.accept();
          });
        } catch (dialogError) {
          console.error("Error handling dialog:", dialogError);
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
      writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing to file:", writeError);
    }

    return result;
  }
});