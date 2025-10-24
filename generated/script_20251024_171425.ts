import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('Add Employee Test', async () => {
  const originalUserSteps = [
    "Enter text into First Name field",
    "Enter text into Middle Name field",
    "Enter text into Last Name field",
    "Click on Create Login Details checkbox",
    "Enter text into Username field",
    "Enter text into Password field",
    "Enter text into Confirm Password field",
    "Select Enabled from Status dropdown",
    "Click Save button",
    "Enter text into Street Address field",
    "Enter text into City field",
    "Enter text into State/Province field",
    "Enter text into Zip/Postal Code field",
    "Select United States from Country dropdown",
    "Enter text into Phone field",
    "Click Save button"
  ];

  const steps = [
    {
      "step": 1,
      "description": "Enter text into First Name field",
      "action": "fill",
      "selector": "#firstName",
      "value": "John",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill First Name",
      "stepDescription": "Enter First Name"
    },
    {
      "step": 2,
      "description": "Enter text into Middle Name field",
      "action": "fill",
      "selector": "#middleName",
      "value": "M",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill Middle Name",
      "stepDescription": "Enter Middle Name"
    },
    {
      "step": 3,
      "description": "Enter text into Last Name field",
      "action": "fill",
      "selector": "#lastName",
      "value": "Doe",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill Last Name",
      "stepDescription": "Enter Last Name"
    },
    {
      "step": 4,
      "description": "Click on Create Login Details checkbox",
      "action": "check",
      "selector": "#createLoginDetails",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to check Create Login Details checkbox",
      "stepDescription": "Check Create Login Details"
    },
    {
      "step": 5,
      "description": "Enter text into Username field",
      "action": "fill",
      "selector": "#userName",
      "value": "johndoe",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill Username",
      "stepDescription": "Enter Username"
    },
    {
      "step": 6,
      "description": "Enter text into Password field",
      "action": "fill",
      "selector": "#userPassword",
      "value": "password123",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill Password",
      "stepDescription": "Enter Password"
    },
    {
      "step": 7,
      "description": "Enter text into Confirm Password field",
      "action": "fill",
      "selector": "#confirmPassword",
      "value": "password123",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill Confirm Password",
      "stepDescription": "Enter Confirm Password"
    },
    {
      "step": 8,
      "description": "Select Enabled from Status dropdown",
      "action": "click",
      "selector": "#status",
      "value": "enabled",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to select Enabled from Status",
      "stepDescription": "Select Status Enabled"
    },
    {
      "step": 9,
      "description": "Click Save button",
      "action": "click",
      "selector": "#btnSave",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click Save button",
      "stepDescription": "Click Save"
    },
    {
      "step": 10,
      "description": "Enter text into Street Address field",
      "action": "fill",
      "selector": "#street1",
      "value": "123 Main St",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill Street Address",
      "stepDescription": "Enter Street Address"
    },
    {
      "step": 11,
      "description": "Enter text into City field",
      "action": "fill",
      "selector": "#city",
      "value": "Anytown",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill City",
      "stepDescription": "Enter City"
    },
    {
      "step": 12,
      "description": "Enter text into State/Province field",
      "action": "fill",
      "selector": "#state",
      "value": "CA",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill State/Province",
      "stepDescription": "Enter State/Province"
    },
    {
      "step": 13,
      "description": "Enter text into Zip/Postal Code field",
      "action": "fill",
      "selector": "#zipCode",
      "value": "91234",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill Zip/Postal Code",
      "stepDescription": "Enter Zip/Postal Code"
    },
    {
      "step": 14,
      "description": "Select United States from Country dropdown",
      "action": "click",
      "selector": "#country",
      "value": "us",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to select United States from Country",
      "stepDescription": "Select Country United States"
    },
    {
      "step": 15,
      "description": "Enter text into Phone field",
      "action": "fill",
      "selector": "#phone",
      "value": "555-123-4567",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill Phone",
      "stepDescription": "Enter Phone"
    },
    {
      "step": 16,
      "description": "Click Save button",
      "action": "click",
      "selector": "#saveContact",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click Save button",
      "stepDescription": "Click Save"
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
      if ("your_base_url_here") {
        await page.goto("your_base_url_here");
      }
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