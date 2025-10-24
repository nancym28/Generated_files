import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Add Employee and Contact Details', async () => {
  const originalUserSteps = [
    "Navigate to the OrangeHRM login page",
    "Enter 'Admin' as username",
    "Enter 'admin123' as password",
    "Click the login button",
    "Navigate to PIM",
    "Click Add Employee",
    "Enter First Name in the 'firstName' field",
    "Enter Middle Name in the 'middleName' field",
    "Enter Last Name in the 'lastName' field",
    "Check the 'Create Login Details' checkbox",
    "Enter Username in the 'userName' field",
    "Enter Password in the 'userPassword' field",
    "Enter Confirm Password in the 'confirmPassword' field",
    "Select 'Enabled' in the 'status' dropdown",
    "Click the 'Save' button",
    "Verify that the Personal Details page is displayed",
    "Navigate to Contact Details tab",
    "Enter Street Address in the 'street1' field",
    "Enter City in the 'city' field",
    "Enter State/Province in the 'state' field",
    "Enter Zip/Postal Code in the 'zipCode' field",
    "Select Country in the 'country' dropdown",
    "Enter Phone in the 'phone' field",
    "Click the 'saveContact' button",
    "Verify success message is displayed"
  ];

  const steps = [
    {
      "step": 1,
      "description": "Navigate to the OrangeHRM login page",
      "action": "goto",
      "url": "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
      "timeout": 10000,
      "retries": 3,
      "error": "Failed to navigate to the login page after multiple retries.",
      "waitAfter": 1000
    },
    {
      "step": 2,
      "description": "Enter 'Admin' as username",
      "action": "fill",
      "selector": "[name='username']",
      "value": "Admin",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter username after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 3,
      "description": "Enter 'admin123' as password",
      "action": "fill",
      "selector": "[name='password']",
      "value": "admin123",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter password after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 4,
      "description": "Click the login button",
      "action": "click",
      "selector": "button[type='submit']",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to click the login button after multiple retries.",
      "waitAfter": 2000
    },
    {
      "step": 5,
      "description": "Navigate to PIM",
      "action": "goto",
      "url": "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule",
      "timeout": 10000,
      "retries": 3,
      "error": "Failed to navigate to the PIM page after multiple retries.",
      "waitAfter": 1000
    },
    {
      "step": 6,
      "description": "Click Add Employee",
      "action": "click",
      "selector": "a[href*='/web/index.php/pim/addEmployee']",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to click the Add Employee button after multiple retries.",
      "waitAfter": 2000
    },
    {
      "step": 7,
      "description": "Enter First Name in the 'firstName' field",
      "action": "fill",
      "selector": "#firstName",
      "value": "John",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter first name after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 8,
      "description": "Enter Middle Name in the 'middleName' field",
      "action": "fill",
      "selector": "#middleName",
      "value": "David",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter middle name after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 9,
      "description": "Enter Last Name in the 'lastName' field",
      "action": "fill",
      "selector": "#lastName",
      "value": "Smith",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter last name after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 10,
      "description": "Check the 'Create Login Details' checkbox",
      "action": "check",
      "selector": "#createLoginDetails",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to check the 'Create Login Details' checkbox after multiple retries.",
      "waitAfter": 1000
    },
    {
      "step": 11,
      "description": "Enter Username in the 'userName' field",
      "action": "fill",
      "selector": "#userName",
      "value": "john.smith",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter username after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 12,
      "description": "Enter Password in the 'userPassword' field",
      "action": "fill",
      "selector": "#userPassword",
      "value": "Password123",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter password after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 13,
      "description": "Enter Confirm Password in the 'confirmPassword' field",
      "action": "fill",
      "selector": "#confirmPassword",
      "value": "Password123",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter confirm password after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 14,
      "description": "Select 'Enabled' in the 'status' dropdown",
      "action": "click",
      "selector": "#status",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to select 'Enabled' in the status dropdown after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 15,
      "description": "Click the 'Save' button",
      "action": "click",
      "selector": "#btnSave",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to click the Save button after multiple retries.",
      "waitAfter": 5000
    },
    {
      "step": 16,
      "description": "Verify that the Personal Details page is displayed",
      "action": "isVisible",
      "selector": ".personal-details h6",
      "timeout": 5000,
      "retries": 2,
      "error": "Personal Details page is not displayed after saving.",
      "waitAfter": 2000
    },
    {
      "step": 17,
      "description": "Navigate to Contact Details tab",
      "action": "click",
      "selector": "a[href*='/web/index.php/pim/contactDetails/empNumber/']",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to navigate to Contact Details tab after multiple retries.",
      "waitAfter": 2000
    },
    {
      "step": 18,
      "description": "Enter Street Address in the 'street1' field",
      "action": "fill",
      "selector": "#street1",
      "value": "123 Main St",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter street address after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 19,
      "description": "Enter City in the 'city' field",
      "action": "fill",
      "selector": "#city",
      "value": "Anytown",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter city after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 20,
      "description": "Enter State/Province in the 'state' field",
      "action": "fill",
      "selector": "#state",
      "value": "CA",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter state/province after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 21,
      "description": "Enter Zip/Postal Code in the 'zipCode' field",
      "action": "fill",
      "selector": "#zipCode",
      "value": "91234",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter zip/postal code after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 22,
      "description": "Select Country in the 'country' dropdown",
      "action": "click",
      "selector": "#country",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to select country in the dropdown after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 23,
      "description": "Enter Phone in the 'phone' field",
      "action": "fill",
      "selector": "#phone",
      "value": "555-123-4567",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to enter phone number after multiple retries.",
      "waitAfter": 500
    },
    {
      "step": 24,
      "description": "Click the 'saveContact' button",
      "action": "click",
      "selector": "#saveContact",
      "timeout": 5000,
      "retries": 2,
      "error": "Failed to click the Save Contact button after multiple retries.",
      "waitAfter": 5000
    },
    {
      "step": 25,
      "description": "Verify success message is displayed",
      "action": "isVisible",
      "selector": ".oxd-alert--success",
      "timeout": 5000,
      "retries": 2,
      "error": "Success message is not displayed after saving contact details.",
      "waitAfter": 1000
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

          if (stepData.waitAfter) {
            await page.waitForTimeout(stepData.waitAfter);
          }
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
        console.error(`Failed to close browser: ${closeError.message}`);
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
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    return result;
  }
});