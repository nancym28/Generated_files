import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test('Generated Test', async () => {
  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to OrangeHRM login page.",
    "Verify that the login form is visible.",
    "Enter the username 'Admin' in the username input field.",
    "Enter the password 'admin123' in the password input field.",
    "Click the Login button.",
    "Wait for the Dashboard page to load.",
    "Verify that the Dashboard heading or profile dropdown is visible.",
    "Click the user dropdown on the top-right corner.",
    "Click the Logout button to return to the login page."
  ]; // from input
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
            "selector": null,
            "value": "https://opensource-demo.orangehrmlive.com/",
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Navigation to OrangeHRM login page failed.",
            "stepDescription": "Navigate to OrangeHRM login page."
          },
          {
            "action": "isVisible",
            "selector": "#loginForm",
            "value": null,
            "waitTimeoutMs": 5000,
            "retry": 2,
            "fallbacks": [],
            "errorMessage": "Login form is not visible.",
            "stepDescription": "Verify that the login form is visible."
          },
          {
            "action": "fill",
            "selector": "#username",
            "value": "Admin",
            "waitTimeoutMs": 5000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Could not enter username.",
            "stepDescription": "Enter the username 'Admin' in the username input field."
          },
          {
            "action": "fill",
            "selector": "#password",
            "value": "admin123",
            "waitTimeoutMs": 5000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Could not enter password.",
            "stepDescription": "Enter the password 'admin123' in the password input field."
          },
          {
            "action": "click",
            "selector": "#loginBtn",
            "value": null,
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Could not click the Login button.",
            "stepDescription": "Click the Login button."
          },
          {
            "action": "waitFor",
            "selector": ".oxd-topbar-header-title > h6",
            "value": "Dashboard",
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Dashboard page did not load correctly.",
            "stepDescription": "Wait for the Dashboard page to load."
          },
          {
            "action": "isVisible",
            "selector": ".oxd-topbar-header-title > h6, .oxd-userdropdown-name",
            "value": null,
            "waitTimeoutMs": 5000,
            "retry": 2,
            "fallbacks": [],
            "errorMessage": "Dashboard heading or profile dropdown is not visible.",
            "stepDescription": "Verify that the Dashboard heading or profile dropdown is visible."
          },
          {
            "action": "click",
            "selector": ".oxd-userdropdown-name",
            "value": null,
            "waitTimeoutMs": 5000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Could not click the user dropdown.",
            "stepDescription": "Click the user dropdown on the top-right corner."
          },
          {
            "action": "click",
            "selector": "#logoutBtn",
            "value": null,
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Could not click the Logout button.",
            "stepDescription": "Click the Logout button to return to the login page."
          }
        ];

        for (const stepData of steps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            // Execute the specific action
            switch (stepData.action) {
              case "goto":
                await page.goto(stepData.value as string);
                stepDetails = `Navigated to ${stepData.value}`;
                break;
              case "click":
                await page.locator(stepData.selector as string).click();
                stepDetails = `Clicked ${stepData.selector}`;
                break;
              case "fill":
                await page.locator(stepData.selector as string).fill(stepData.value as string);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                break;
              case "check":
                await page.locator(stepData.selector as string).check();
                stepDetails = `Checked ${stepData.selector}`;
                break;
              case "uncheck":
                await page.locator(stepData.selector as string).uncheck();
                stepDetails = `Unchecked ${stepData.selector}`;
                break;
              case "hover":
                await page.locator(stepData.selector as string).hover();
                stepDetails = `Hovered ${stepData.selector}`;
                break;
              case "waitFor":
                await page.locator(stepData.selector as string).waitFor();
                stepDetails = `Waited for ${stepData.selector}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selector as string).isVisible();
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
      fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    // GUARANTEED RETURN - This must ALWAYS execute
    return result;
  }
});