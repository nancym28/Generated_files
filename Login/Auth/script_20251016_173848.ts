import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://opensource-demo.orangehrmlive.com/",
    "Verify that the element with id 'loginForm' is visible",
    "Enter 'Admin' into the input field with id 'username'",
    "Enter 'admin123' into the input field with id 'password'",
    "Click the element with id 'loginBtn'",
    "Wait for the element with class 'oxd-topbar' to be visible",
    "Verify that the element with class 'oxd-topbar-header-title' and text 'Dashboard' or the element with class 'oxd-userdropdown-name' is visible",
    "Click the element with class 'oxd-userdropdown-name'",
    "Click the element with id 'logoutBtn'"
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
          "selector": "https://opensource-demo.orangehrmlive.com/",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Navigation to OrangeHRM login page failed after multiple retries.",
          "stepDescription": "Navigate to https://opensource-demo.orangehrmlive.com/"
        },
        {
          "action": "isVisible",
          "selector": "#loginForm",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Login form is not visible after page load.",
          "stepDescription": "Verify that the element with id 'loginForm' is visible"
        },
        {
          "action": "fill",
          "selector": "#username",
          "value": "Admin",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to enter username.",
          "stepDescription": "Enter 'Admin' into the input field with id 'username'"
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "admin123",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to enter password.",
          "stepDescription": "Enter 'admin123' into the input field with id 'password'"
        },
        {
          "action": "click",
          "selector": "#loginBtn",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Login button click failed.",
          "stepDescription": "Click the element with id 'loginBtn'"
        },
        {
          "action": "waitFor",
          "selector": ".oxd-topbar",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Dashboard topbar did not become visible after login.",
          "stepDescription": "Wait for the element with class 'oxd-topbar' to be visible"
        },
        {
          "action": "isVisible",
          "selector": ".oxd-topbar-header-title:has-text('Dashboard'), .oxd-userdropdown-name",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Dashboard title or user dropdown name is not visible after login.",
          "stepDescription": "Verify that the element with class 'oxd-topbar-header-title' and text 'Dashboard' or the element with class 'oxd-userdropdown-name' is visible"
        },
        {
          "action": "click",
          "selector": ".oxd-userdropdown-name",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click user dropdown.",
          "stepDescription": "Click the element with class 'oxd-userdropdown-name'"
        },
        {
          "action": "click",
          "selector": "#logoutBtn",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Logout button click failed.",
          "stepDescription": "Click the element with id 'logoutBtn'"
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
                await page.goto(stepData.selector);
                stepDetails = `Navigated to ${stepData.selector}`;
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