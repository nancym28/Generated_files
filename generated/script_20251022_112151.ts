import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test.setTimeout(120000);

test('Saucedemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to Saucedemo",
    "Enter Username",
    "Enter Password",
    "Click Login Button",
    "Click Product Sort Filter",
    "Select Name (Z to A)",
    "Add Sauce Labs Backpack to Cart",
    "Click Cart Icon",
    "Ensure Product is in Cart",
    "Click Checkout Button",
    "Enter First Name",
    "Enter Last Name",
    "Enter Postal Code",
    "Click Continue Button",
    "Click Finish Button",
    "Verify Thank You Message",
    "Click Back to Home Button",
    "Click Burger Bar",
    "Click Logout"
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
      const testSteps = [
        {
          "stepName": "Navigate to Saucedemo",
          "action": "goto",
          "url": "https://www.saucedemo.com/",
          "timeout": 10000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Enter Username",
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "timeout": 5000,
          "retries": 2,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Enter Password",
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "timeout": 5000,
          "retries": 2,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Click Login Button",
          "action": "click",
          "selector": "#login-button",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Click Product Sort Filter",
          "action": "click",
          "selector": "[data-test=\"product_sort_container\"]",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Select Name (Z to A)",
          "action": "click",
          "selector": "text=Name (Z to A)",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Add Sauce Labs Backpack to Cart",
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Click Cart Icon",
          "action": "click",
          "selector": ".shopping_cart_link",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Ensure Product is in Cart",
          "action": "isVisible",
          "selector": ".cart_item",
          "timeout": 5000,
          "retries": 3,
          "assertions": [
            {
              "type": "isVisible",
              "expected": true
            }
          ],
          "onError": "continue"
        },
        {
          "stepName": "Click Checkout Button",
          "action": "click",
          "selector": "[data-test=\"checkout\"]",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Enter First Name",
          "action": "fill",
          "selector": "[data-test=\"firstName\"]",
          "value": "chaitanya",
          "timeout": 5000,
          "retries": 2,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Enter Last Name",
          "action": "fill",
          "selector": "[data-test=\"lastName\"]",
          "value": "Kompella",
          "timeout": 5000,
          "retries": 2,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Enter Postal Code",
          "action": "fill",
          "selector": "[data-test=\"postalCode\"]",
          "value": "62567352",
          "timeout": 5000,
          "retries": 2,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Click Continue Button",
          "action": "click",
          "selector": "[data-test=\"continue\"]",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Click Finish Button",
          "action": "click",
          "selector": "[data-test=\"finish\"]",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Verify Thank You Message",
          "action": "isVisible",
          "selector": "text=\"Thank you for your order!\"",
          "timeout": 5000,
          "retries": 3,
          "assertions": [
            {
              "type": "isVisible",
              "expected": true
            }
          ],
          "onError": "continue"
        },
        {
          "stepName": "Click Back to Home Button",
          "action": "click",
          "selector": "[data-test=\"back-to-products\"]",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Click Burger Bar",
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        },
        {
          "stepName": "Click Logout",
          "action": "click",
          "selector": "text=Logout",
          "timeout": 5000,
          "retries": 3,
          "assertions": [],
          "onError": "continue"
        }
      ];

      if (testSteps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        for (const stepData of testSteps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            executedSteps.push(stepData.stepName);
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
                if (stepData.assertions && stepData.assertions.length > 0) {
                  const assertion = stepData.assertions[0];
                  if (assertion.type === "isVisible") {
                    if (isVisible !== assertion.expected) {
                      stepStatus = "error";
                      stepDetails = `Assertion failed: Element ${stepData.selector} visibility is ${isVisible}, expected ${assertion.expected}`;
                    }
                  }
                }
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepData.stepName}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executionResults.push({
            step: stepData.stepName,
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
    const passedCount = executionResults.filter(r => r.status === 'success').length;
    const failedCount = executionResults.filter(r => r.status === 'error').length;

    const result = {
      user_test_steps: originalUserSteps,
      executed_test_steps: executedSteps,
      execution_results: executionResults,
      summary: {
        total_steps: executionResults.length,
        passed: passedCount,
        failed: failedCount,
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