import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to the OrangeHRM login page.",
    "Verify that the login form is visible.",
    "Enter the username 'Admin' in the username input field.",
    "Enter the password 'admin123' in the password input field.",
    "Click the Login button.",
    "Wait for the Dashboard page to load.",
    "Verify that the Dashboard heading is visible.",
    "Click the user dropdown on the top-right corner.",
    "Click the Logout button to return to the login page."
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
          "stepDescription": "Navigate to the OrangeHRM login page."
        },
        {
          "action": "isVisible",
          "selector": "#loginForm",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 0,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Login form is not visible",
          "stepDescription": "Verify that the login form is visible."
        },
        {
          "action": "fill",
          "selector": "input[name='username']",
          "value": "Admin",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter username",
          "stepDescription": "Enter the username 'Admin' in the username input field."
        },
        {
          "action": "fill",
          "selector": "input[name='password']",
          "value": "admin123",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter password",
          "stepDescription": "Enter the password 'admin123' in the password input field."
        },
        {
          "action": "click",
          "selector": "button[type='submit']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the Login button",
          "stepDescription": "Click the Login button."
        },
        {
          "action": "isVisible",
          "selector": ".oxd-topbar-header-breadcrumb",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Dashboard page did not load",
          "stepDescription": "Wait for the Dashboard page to load."
        },
        {
          "action": "isVisible",
          "selector": ".oxd-topbar-header-breadcrumb h6",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 0,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Dashboard heading is not visible",
          "stepDescription": "Verify that the Dashboard heading is visible."
        },
        {
          "action": "click",
          "selector": ".oxd-topbar-header-userarea",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the user dropdown",
          "stepDescription": "Click the user dropdown on the top-right corner."
        },
        {
          "action": "click",
          "selector": "a[href*='/auth/logout']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click the Logout button",
          "stepDescription": "Click the Logout button to return to the login page."
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
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});