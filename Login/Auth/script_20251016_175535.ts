import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('OrangeHRM Login and Logout', async () => {
  const originalUserSteps = [
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

  const stepsFromInput = [
    {
      "step": 1,
      "action": "goto",
      "url": "https://opensource-demo.orangehrmlive.com/",
      "description": "Navigate to the OrangeHRM demo site",
      "waitStrategy": "domcontentloaded",
      "timeout": 10000,
      "errorHandling": "retry",
      "retries": 3
    },
    {
      "step": 2,
      "action": "isVisible",
      "selector": "#loginForm",
      "description": "Verify that the login form is visible",
      "timeout": 5000,
      "errorHandling": "assert",
      "altSelectors": [".orangehrm-login-form"],
      "waitStrategy": "visible"
    },
    {
      "step": 3,
      "action": "fill",
      "selector": "#username",
      "value": "Admin",
      "description": "Enter username",
      "timeout": 5000,
      "errorHandling": "retry",
      "retries": 2,
      "altSelectors": ["input[name='username']"],
      "waitStrategy": "attached"
    },
    {
      "step": 4,
      "action": "fill",
      "selector": "#password",
      "value": "admin123",
      "description": "Enter password",
      "timeout": 5000,
      "errorHandling": "retry",
      "retries": 2,
      "altSelectors": ["input[name='password']"],
      "waitStrategy": "attached"
    },
    {
      "step": 5,
      "action": "click",
      "selector": "#loginBtn",
      "description": "Click the login button",
      "timeout": 10000,
      "errorHandling": "retry",
      "retries": 3,
      "altSelectors": ["button[type='submit']"],
      "waitStrategy": "enabled"
    },
    {
      "step": 6,
      "action": "waitFor",
      "selector": ".oxd-topbar",
      "state": "visible",
      "description": "Wait for the dashboard to load",
      "timeout": 10000,
      "errorHandling": "retry",
      "retries": 3,
      "waitStrategy": "visible"
    },
    {
      "step": 7,
      "action": "isVisible",
      "selector": ".oxd-topbar-header-title:has-text('Dashboard')",
      "description": "Verify that the dashboard page is visible",
      "timeout": 5000,
      "errorHandling": "soft",
      "altSelectors": [".oxd-userdropdown-name"],
      "waitStrategy": "visible",
      "orSelectors": [".oxd-userdropdown-name"]
    },
    {
      "step": 8,
      "action": "click",
      "selector": ".oxd-userdropdown-name",
      "description": "Click the user dropdown",
      "timeout": 5000,
      "errorHandling": "retry",
      "retries": 2,
      "waitStrategy": "enabled"
    },
    {
      "step": 9,
      "action": "click",
      "selector": "#logoutBtn",
      "description": "Click the logout button",
      "timeout": 10000,
      "errorHandling": "retry",
      "retries": 3,
      "waitStrategy": "enabled"
    }
  ];

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
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
      if (originalUserSteps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        for (const stepData of stepsFromInput) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            switch (stepData.action) {
              case "goto":
                await page.goto(stepData.url);
                stepDetails = `Navigated to ${stepData.url}`;
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
                try {
                  await page.locator(stepData.selector).waitFor({ state: 'visible', timeout: stepData.timeout });
                  stepDetails = `Element ${stepData.selector} is visible`;
                } catch (e) {
                  stepStatus = "error";
                  stepDetails = `Element ${stepData.selector} is not visible`;
                }
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
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