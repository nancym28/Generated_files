import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to OrangeHRM login page",
    "Verify that the login form is visible",
    "Enter username",
    "Enter password",
    "Click Login button",
    "Wait for Dashboard page to load",
    "Verify that the Dashboard heading is visible",
    "Click user dropdown",
    "Click Logout button",
    "Verify that the login form is visible after logout"
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
          "value": "https://opensource-demo.orangehrmlive.com/",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to navigate to OrangeHRM login page",
          "stepDescription": "Navigate to OrangeHRM login page"
        },
        {
          "action": "isVisible",
          "selector": "#loginForm",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Login form is not visible",
          "stepDescription": "Verify that the login form is visible"
        },
        {
          "action": "fill",
          "selector": "#username",
          "value": "Admin",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter username",
          "stepDescription": "Enter username"
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "admin123",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter password",
          "stepDescription": "Enter password"
        },
        {
          "action": "click",
          "selector": "#loginBtn",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to click login button",
          "stepDescription": "Click Login button"
        },
        {
          "action": "waitFor",
          "selector": ".oxd-topbar",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Dashboard page did not load",
          "stepDescription": "Wait for Dashboard page to load"
        },
        {
          "action": "isVisible",
          "selector": ".oxd-topbar-header-title h6",
          "value": "Dashboard",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Dashboard heading is not visible",
          "stepDescription": "Verify that the Dashboard heading is visible"
        },
        {
          "action": "click",
          "selector": ".oxd-userdropdown-name",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to click user dropdown",
          "stepDescription": "Click user dropdown"
        },
        {
          "action": "click",
          "selector": "#logoutBtn",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to click logout button",
          "stepDescription": "Click Logout button"
        },
        {
          "action": "isVisible",
          "selector": "#loginForm",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Login form is not visible after logout",
          "stepDescription": "Verify that the login form is visible after logout"
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
                stepDetails = `Filled ${stepData.selector}`;
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
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});