import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Add Employee and Contact Details', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps = [
    "Navigate to the application login page",
    "Enter 'Admin' into the username field",
    "Enter 'admin123' into the password field",
    "Click the login button",
    "Navigate to PIM",
    "Click on Add Employee",
    "Enter text into the 'firstName' field with id 'firstName'",
    "Enter text into the 'middleName' field with id 'middleName'",
    "Enter text into the 'lastName' field with id 'lastName'",
    "Click the checkbox with id 'createLoginDetails'",
    "Enter text into the 'userName' field with id 'userName'",
    "Enter text into the 'userPassword' field with id 'userPassword'",
    "Enter text into the 'confirmPassword' field with id 'confirmPassword'",
    "Select 'enabled' from the dropdown with id 'status'",
    "Click the button with id 'btnSave'",
    "Click on the Contact Details tab",
    "Enter text into the 'street1' field with id 'street1'",
    "Enter text into the 'city' field with id 'city'",
    "Enter text into the 'state' field with id 'state'",
    "Enter text into the 'zipCode' field with id 'zipCode'",
    "Select 'us' from the dropdown with id 'country'",
    "Enter text into the 'phone' field with id 'phone'",
    "Click the button with id 'saveContact'",
    "Verify the presence of a success message"
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
        const steps = [
          {
            "step": 1,
            "description": "Navigate to the application login page",
            "action": "goto",
            "url": "/login",
            "errorHandling": "retry",
            "retries": 3,
            "timeout": 10000
          },
          {
            "step": 2,
            "description": "Enter 'Admin' into the username field",
            "action": "fill",
            "selector": "#username",
            "altSelector": "[name='username']",
            "value": "Admin",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 3,
            "description": "Enter 'admin123' into the password field",
            "action": "fill",
            "selector": "#password",
            "altSelector": "[name='password']",
            "value": "admin123",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 4,
            "description": "Click the login button",
            "action": "click",
            "selector": "#loginButton",
            "altSelector": "[type='submit']",
            "waitFor": "navigation",
            "errorHandling": "strict",
            "timeout": 10000
          },
          {
            "step": 5,
            "description": "Navigate to PIM",
            "action": "click",
            "selector": "#menu_pim_viewPimModule",
            "altSelector": "text=PIM",
            "waitFor": "navigation",
            "errorHandling": "strict",
            "timeout": 10000
          },
          {
            "step": 6,
            "description": "Click on Add Employee",
            "action": "click",
            "selector": "#menu_pim_addEmployee",
            "altSelector": "text=Add Employee",
            "waitFor": "navigation",
            "errorHandling": "strict",
            "timeout": 10000
          },
          {
            "step": 7,
            "description": "Enter text into the 'firstName' field with id 'firstName'",
            "action": "fill",
            "selector": "#firstName",
            "value": "John",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 8,
            "description": "Enter text into the 'middleName' field with id 'middleName'",
            "action": "fill",
            "selector": "#middleName",
            "value": "M",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 9,
            "description": "Enter text into the 'lastName' field with id 'lastName'",
            "action": "fill",
            "selector": "#lastName",
            "value": "Doe",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 10,
            "description": "Click the checkbox with id 'createLoginDetails'",
            "action": "check",
            "selector": "#createLoginDetails",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 11,
            "description": "Enter text into the 'userName' field with id 'userName'",
            "action": "fill",
            "selector": "#userName",
            "value": "johndoe",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 12,
            "description": "Enter text into the 'userPassword' field with id 'userPassword'",
            "action": "fill",
            "selector": "#userPassword",
            "value": "password123",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 13,
            "description": "Enter text into the 'confirmPassword' field with id 'confirmPassword'",
            "action": "fill",
            "selector": "#confirmPassword",
            "value": "password123",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 14,
            "description": "Select 'enabled' from the dropdown with id 'status'",
            "action": "fill",
            "selector": "#status",
            "value": "enabled",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 15,
            "description": "Click the button with id 'btnSave'",
            "action": "click",
            "selector": "#btnSave",
            "waitFor": "navigation",
            "errorHandling": "strict",
            "timeout": 10000
          },
          {
            "step": 16,
            "description": "Click on the Contact Details tab",
            "action": "click",
            "selector": "text=Contact Details",
            "altSelector": "#contactDetails_tab",
            "errorHandling": "strict",
            "timeout": 10000
          },
          {
            "step": 17,
            "description": "Enter text into the 'street1' field with id 'street1'",
            "action": "fill",
            "selector": "#street1",
            "value": "123 Main St",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 18,
            "description": "Enter text into the 'city' field with id 'city'",
            "action": "fill",
            "selector": "#city",
            "value": "Anytown",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 19,
            "description": "Enter text into the 'state' field with id 'state'",
            "action": "fill",
            "selector": "#state",
            "value": "CA",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 20,
            "description": "Enter text into the 'zipCode' field with id 'zipCode'",
            "action": "fill",
            "selector": "#zipCode",
            "value": "12345",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 21,
            "description": "Select 'us' from the dropdown with id 'country'",
            "action": "fill",
            "selector": "#country",
            "value": "us",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 22,
            "description": "Enter text into the 'phone' field with id 'phone'",
            "action": "fill",
            "selector": "#phone",
            "value": "555-123-4567",
            "errorHandling": "strict",
            "timeout": 5000
          },
          {
            "step": 23,
            "description": "Click the button with id 'saveContact'",
            "action": "click",
            "selector": "#saveContact",
            "errorHandling": "strict",
            "timeout": 10000
          },
          {
            "step": 24,
            "description": "Verify the presence of a success message",
            "action": "waitFor",
            "selector": ".success-message",
            "altSelector": "text=Successfully Saved",
            "state": "visible",
            "errorHandling": "strict",
            "timeout": 10000
          }
        ];

        for (const stepData of steps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
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