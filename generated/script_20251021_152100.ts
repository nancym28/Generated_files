import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Enter 'Admin' into the username field",
    "Enter 'admin123' into the password field",
    "Click the login button",
    "Wait for the top bar to be visible",
    "Assert that the Dashboard title is visible",
    "Click the Admin user dropdown"
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
          "action": "fill",
          "selector": "#username",
          "value": "Admin",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "input[name='username']",
            "input[placeholder='Username']"
          ],
          "errorMessage": "Failed to fill username field",
          "stepDescription": "Enter 'Admin' into the username field"
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "admin123",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "input[name='password']",
            "input[placeholder='Password']"
          ],
          "errorMessage": "Failed to fill password field",
          "stepDescription": "Enter 'admin123' into the password field"
        },
        {
          "action": "click",
          "selector": "#loginBtn",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            "button[type='submit']",
            "button:has-text('Login')"
          ],
          "errorMessage": "Failed to click the login button",
          "stepDescription": "Click the login button"
        },
        {
          "action": "waitFor",
          "selector": ".oxd-topbar",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [
            "div[class*='oxd-topbar']"
          ],
          "errorMessage": "Top bar did not become visible after login",
          "stepDescription": "Wait for the top bar to be visible"
        },
        {
          "action": "isVisible",
          "selector": ".oxd-topbar-header-title:has-text('Dashboard')",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "span.oxd-topbar-header-breadcrumb > h6.oxd-topbar-header-title"
          ],
          "errorMessage": "Dashboard title is not visible",
          "stepDescription": "Assert that the Dashboard title is visible"
        },
        {
          "action": "click",
          "selector": ".oxd-userdropdown-name",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [
            "span:has-text('Admin')",
            "i.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon"
          ],
          "errorMessage": "Failed to click the Admin user dropdown",
          "stepDescription": "Click the Admin user dropdown"
        }
      ];

      if (originalUserSteps.length === 0) {
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
            switch (stepData.action) {
              case "fill":
                await page.locator(stepData.selector).fill(stepData.value);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                break;
              case "click":
                await page.locator(stepData.selector).click();
                stepDetails = `Clicked ${stepData.selector}`;
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
      fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing test_result.json:", writeError);
    }

    return result;
  }
});