import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('OrangeHRM Login and Logout', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "step": 1,
      "action": "goto",
      "url": "https://opensource-demo.orangehrmlive.com/",
      "description": "Navigates to the OrangeHRM demo site login page.",
      "timeout": 30000,
      "retries": 3,
      "errorHandling": "continue"
    },
    {
      "step": 2,
      "action": "isVisible",
      "target": "#loginForm",
      "description": "Verifies that the login form is visible.",
      "timeout": 10000,
      "retries": 2,
      "errorHandling": "throw"
    },
    {
      "step": 3,
      "action": "fill",
      "target": "#username",
      "value": "Admin",
      "description": "Enters the username 'Admin' in the username input field.",
      "timeout": 10000,
      "retries": 2,
      "errorHandling": "throw"
    },
    {
      "step": 4,
      "action": "fill",
      "target": "#password",
      "value": "admin123",
      "description": "Enters the password 'admin123' in the password input field.",
      "timeout": 10000,
      "retries": 2,
      "errorHandling": "throw"
    },
    {
      "step": 5,
      "action": "click",
      "target": "#loginBtn",
      "description": "Clicks the Login button.",
      "timeout": 10000,
      "retries": 3,
      "errorHandling": "throw"
    },
    {
      "step": 6,
      "action": "waitFor",
      "target": ".oxd-topbar",
      "description": "Waits for the Dashboard element to be visible.",
      "timeout": 30000,
      "retries": 3,
      "errorHandling": "throw"
    },
    {
      "step": 7,
      "action": "isVisible",
      "target": ".oxd-topbar-header-title",
      "description": "Verifies that the Dashboard heading is visible.",
      "timeout": 10000,
      "retries": 2,
      "errorHandling": "throw"
    },
    {
      "step": 8,
      "action": "click",
      "target": ".oxd-userdropdown-name",
      "description": "Clicks the user dropdown on the top-right corner.",
      "timeout": 10000,
      "retries": 3,
      "errorHandling": "throw"
    },
    {
      "step": 9,
      "action": "click",
      "target": "#logoutBtn",
      "description": "Clicks the Logout button to return to the login page.",
      "timeout": 10000,
      "retries": 3,
      "errorHandling": "throw"
    }
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
      if (originalUserSteps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        for (const stepData of originalUserSteps) {
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
                await page.locator(stepData.target).click();
                stepDetails = `Clicked ${stepData.target}`;
                break;
              case "fill":
                await page.locator(stepData.target).fill(stepData.value);
                stepDetails = `Filled ${stepData.target} with ${stepData.value}`;
                break;
              case "check":
                await page.locator(stepData.target).check();
                stepDetails = `Checked ${stepData.target}`;
                break;
              case "uncheck":
                await page.locator(stepData.target).uncheck();
                stepDetails = `Unchecked ${stepData.target}`;
                break;
              case "hover":
                await page.locator(stepData.target).hover();
                stepDetails = `Hovered ${stepData.target}`;
                break;
              case "waitFor":
                await page.locator(stepData.target).waitFor();
                stepDetails = `Waited for ${stepData.target}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.target).isVisible();
                stepDetails = `Element ${stepData.target} is ${isVisible ? 'visible' : 'not visible'}`;
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
      user_test_steps: originalUserSteps.map(step => step.description),
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