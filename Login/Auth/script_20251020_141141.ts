import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to the OrangeHRM login page.",
    "Verify that the login form is visible.",
    "Enter 'Admin' into the username field.",
    "Enter 'admin123' into the password field.",
    "Click the login button.",
    "Wait for the dashboard topbar to be visible.",
    "Verify that the dashboard title or Admin user dropdown is visible.",
    "Click the Admin user dropdown.",
    "Click the logout button."
  ];
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
        const steps = [
          {
            "action": "goto",
            "value": "https://opensource-demo.orangehrmlive.com/",
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Navigation to OrangeHRM login page failed after multiple retries.",
            "stepDescription": "Navigate to the OrangeHRM login page."
          },
          {
            "action": "isVisible",
            "selector": "#loginForm",
            "waitTimeoutMs": 5000,
            "retry": 2,
            "fallbacks": [],
            "errorMessage": "Login form is not visible after page load.",
            "stepDescription": "Verify that the login form is visible."
          },
          {
            "action": "fill",
            "selector": "#username",
            "value": "Admin",
            "waitTimeoutMs": 5000,
            "retry": 2,
            "fallbacks": [],
            "errorMessage": "Failed to enter username after multiple retries.",
            "stepDescription": "Enter 'Admin' into the username field."
          },
          {
            "action": "fill",
            "selector": "#password",
            "value": "admin123",
            "waitTimeoutMs": 5000,
            "retry": 2,
            "fallbacks": [],
            "errorMessage": "Failed to enter password after multiple retries.",
            "stepDescription": "Enter 'admin123' into the password field."
          },
          {
            "action": "click",
            "selector": "#loginBtn",
            "waitTimeoutMs": 7000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Login button click failed after multiple retries.",
            "stepDescription": "Click the login button."
          },
          {
            "action": "waitFor",
            "selector": ".oxd-topbar",
            "waitTimeoutMs": 10000,
            "retry": 2,
            "fallbacks": [],
            "errorMessage": "Dashboard topbar did not become visible after login.",
            "stepDescription": "Wait for the dashboard topbar to be visible."
          },
          {
            "action": "isVisible",
            "selector": ".oxd-topbar-header-title:has-text('Dashboard'), .oxd-userdropdown-name:has-text('Admin')",
            "waitTimeoutMs": 5000,
            "retry": 2,
            "fallbacks": [],
            "errorMessage": "Dashboard title or Admin user dropdown not visible after login.",
            "stepDescription": "Verify that the dashboard title or Admin user dropdown is visible."
          },
          {
            "action": "click",
            "selector": ".oxd-userdropdown-name:has-text('Admin')",
            "waitTimeoutMs": 5000,
            "retry": 2,
            "fallbacks": [],
            "errorMessage": "Failed to click on the Admin user dropdown after multiple retries.",
            "stepDescription": "Click the Admin user dropdown."
          },
          {
            "action": "click",
            "selector": "#logoutBtn",
            "waitTimeoutMs": 7000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Logout button click failed after multiple retries.",
            "stepDescription": "Click the logout button."
          }
        ];

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
        console.error(`Failed to close browser: ${closeError.message}`);
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
      fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    // GUARANTEED RETURN - This must ALWAYS execute
    return result;
  }
});