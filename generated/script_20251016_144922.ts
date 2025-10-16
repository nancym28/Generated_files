import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
const fs = require('fs');

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://opensource-demo.orangehrmlive.com/",
    "Verify that the login form is visible using the selector input[name='username']",
    "Enter 'Admin' into the username input field using the selector input[name='username']",
    "Enter 'admin123' into the password input field using the selector input[name='password']",
    "Click the Login button using the selector button[type='submit']",
    "Wait for the Dashboard page to load by waiting for the presence of the dashboard heading using the selector h6.oxd-topbar-header-breadcrumb-module",
    "Verify that the Dashboard heading is visible using the selector h6.oxd-topbar-header-breadcrumb-module",
    "Click the user dropdown on the top-right corner using the selector .oxd-userdropdown-tab",
    "Click the Logout button using the selector a[href='/web/index.php/auth/logout']"
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
          "fallbacks": [],
          "errorMessage": "Failed to navigate to OrangeHRM login page.",
          "stepDescription": "Navigate to https://opensource-demo.orangehrmlive.com/"
        },
        {
          "action": "isVisible",
          "selector": "input[name='username']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Login form (username input) is not visible.",
          "stepDescription": "Verify that the login form is visible using the selector input[name='username']"
        },
        {
          "action": "fill",
          "selector": "input[name='username']",
          "value": "Admin",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to enter username.",
          "stepDescription": "Enter 'Admin' into the username input field using the selector input[name='username']"
        },
        {
          "action": "fill",
          "selector": "input[name='password']",
          "value": "admin123",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to enter password.",
          "stepDescription": "Enter 'admin123' into the password input field using the selector input[name='password']"
        },
        {
          "action": "click",
          "selector": "button[type='submit']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the Login button.",
          "stepDescription": "Click the Login button using the selector button[type='submit']"
        },
        {
          "action": "waitFor",
          "selector": "h6.oxd-topbar-header-breadcrumb-module",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Dashboard page failed to load.",
          "stepDescription": "Wait for the Dashboard page to load by waiting for the presence of the dashboard heading using the selector h6.oxd-topbar-header-breadcrumb-module"
        },
        {
          "action": "isVisible",
          "selector": "h6.oxd-topbar-header-breadcrumb-module",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Dashboard heading is not visible.",
          "stepDescription": "Verify that the Dashboard heading is visible using the selector h6.oxd-topbar-header-breadcrumb-module"
        },
        {
          "action": "click",
          "selector": ".oxd-userdropdown-tab",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the user dropdown.",
          "stepDescription": "Click the user dropdown on the top-right corner using the selector .oxd-userdropdown-tab"
        },
        {
          "action": "click",
          "selector": "a[href='/web/index.php/auth/logout']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click the Logout button.",
          "stepDescription": "Click the Logout button using the selector a[href='/web/index.php/auth/logout']"
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