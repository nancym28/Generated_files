import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Enter 'Admin' into the username field",
    "Enter 'admin123' into the password field",
    "Click the login button",
    "Navigate to PIM",
    "Click Add Employee",
    "Enter text into the First Name field with id 'firstName'",
    "Enter text into the Middle Name field with id 'middleName'",
    "Enter text into the Last Name field with id 'lastName'",
    "Check the 'Create Login Details' checkbox with id 'createLoginDetails'",
    "Enter text into the Username field with id 'userName'",
    "Enter text into the Password field with id 'userPassword'",
    "Enter text into the Confirm Password field with id 'confirmPassword'",
    "Select 'Enabled' from the Status dropdown with id 'status'",
    "Click the Save button with id 'btnSave'",
    "Verify that the Personal Details Page is displayed",
    "Navigate to Contact Details tab",
    "Enter text into the Street Address field with id 'street1'",
    "Enter text into the City field with id 'city'",
    "Enter text into the State/Province field with id 'state'",
    "Enter text into the Zip/Postal Code field with id 'zipCode'",
    "Select 'us' from the Country dropdown with id 'country'",
    "Enter text into the Phone field with id 'phone'",
    "Click the Save button with id 'saveContact'",
    "Verify success message"
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const steps = [
    {
      "action": "fill",
      "selector": "[name='username']",
      "value": "Admin",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter username",
      "stepDescription": "Enter 'Admin' into the username field"
    },
    {
      "action": "fill",
      "selector": "[name='password']",
      "value": "admin123",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter password",
      "stepDescription": "Enter 'admin123' into the password field"
    },
    {
      "action": "click",
      "selector": "button[type='submit']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": ["waitForLoadState"],
      "errorMessage": "Failed to click login button",
      "stepDescription": "Click the login button"
    },
    {
      "action": "click",
      "selector": "text=PIM",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to navigate to PIM",
      "stepDescription": "Navigate to PIM"
    },
    {
      "action": "click",
      "selector": "text=Add Employee",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click Add Employee",
      "stepDescription": "Click Add Employee"
    },
    {
      "action": "fill",
      "selector": "#firstName",
      "value": "John",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter first name",
      "stepDescription": "Enter text into the First Name field with id 'firstName'"
    },
    {
      "action": "fill",
      "selector": "#middleName",
      "value": "M",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter middle name",
      "stepDescription": "Enter text into the Middle Name field with id 'middleName'"
    },
    {
      "action": "fill",
      "selector": "#lastName",
      "value": "Doe",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter last name",
      "stepDescription": "Enter text into the Last Name field with id 'lastName'"
    },
    {
      "action": "check",
      "selector": "#createLoginDetails",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to check create login details",
      "stepDescription": "Check the 'Create Login Details' checkbox with id 'createLoginDetails'"
    },
    {
      "action": "fill",
      "selector": "#userName",
      "value": "johndoe",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter username",
      "stepDescription": "Enter text into the Username field with id 'userName'"
    },
    {
      "action": "fill",
      "selector": "#userPassword",
      "value": "P@sswOrd123",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter password",
      "stepDescription": "Enter text into the Password field with id 'userPassword'"
    },
    {
      "action": "fill",
      "selector": "#confirmPassword",
      "value": "P@sswOrd123",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter confirm password",
      "stepDescription": "Enter text into the Confirm Password field with id 'confirmPassword'"
    },
    {
      "action": "click",
      "selector": "#status",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click status dropdown",
      "stepDescription": "Select 'Enabled' from the Status dropdown with id 'status'"
    },
    {
      "action": "click",
      "selector": "#status > option[value='enabled']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to select enabled status",
      "stepDescription": "Select 'Enabled' from the Status dropdown with id 'status'"
    },
    {
      "action": "click",
      "selector": "#btnSave",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": ["waitForLoadState"],
      "errorMessage": "Failed to click save button",
      "stepDescription": "Click the Save button with id 'btnSave'"
    },
    {
      "action": "isVisible",
      "selector": ".personal-details",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Personal details page not visible",
      "stepDescription": "Verify that the Personal Details Page is displayed"
    },
    {
      "action": "click",
      "selector": "text=Contact Details",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to navigate to contact details tab",
      "stepDescription": "Navigate to Contact Details tab"
    },
    {
      "action": "fill",
      "selector": "#street1",
      "value": "123 Main St",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter street address",
      "stepDescription": "Enter text into the Street Address field with id 'street1'"
    },
    {
      "action": "fill",
      "selector": "#city",
      "value": "Anytown",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter city",
      "stepDescription": "Enter text into the City field with id 'city'"
    },
    {
      "action": "fill",
      "selector": "#state",
      "value": "CA",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter state",
      "stepDescription": "Enter text into the State/Province field with id 'state'"
    },
    {
      "action": "fill",
      "selector": "#zipCode",
      "value": "91234",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter zip code",
      "stepDescription": "Enter text into the Zip/Postal Code field with id 'zipCode'"
    },
    {
      "action": "click",
      "selector": "#country",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click country dropdown",
      "stepDescription": "Select 'us' from the Country dropdown with id 'country'"
    },
    {
      "action": "click",
      "selector": "#country > option[value='us']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to select country",
      "stepDescription": "Select 'us' from the Country dropdown with id 'country'"
    },
    {
      "action": "fill",
      "selector": "#phone",
      "value": "555-123-4567",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to enter phone number",
      "stepDescription": "Enter text into the Phone field with id 'phone'"
    },
    {
      "action": "click",
      "selector": "#saveContact",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": ["waitForLoadState"],
      "errorMessage": "Failed to click save contact button",
      "stepDescription": "Click the Save button with id 'saveContact'"
    },
    {
      "action": "isVisible",
      "selector": ".success-message",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Success message not visible",
      "stepDescription": "Verify success message"
    }
  ];

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
                if (!isVisible) stepStatus = 'error';
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