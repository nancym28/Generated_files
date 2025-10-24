import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test('Generated Test', async () => {
  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Enter 'Admin' into the username field",
    "Enter 'admin123' into the password field",
    "Click the login button",
    "Navigate to PIM",
    "Click Add Employee",
    "Enter First Name into the First Name field",
    "Enter Middle Name into the Middle Name field",
    "Enter Last Name into the Last Name field",
    "Check the Create Login Details checkbox",
    "Enter Username into the Username field",
    "Enter Password into the Password field",
    "Enter Confirm Password into the Confirm Password field",
    "Select 'enabled' from the Status dropdown",
    "Click Save",
    "Verify Personal Details Page is displayed",
    "Navigate to Contact Details tab",
    "Enter Street Address into the Street Address field",
    "Enter City into the City field",
    "Enter State/Province into the State/Province field",
    "Enter Zip/Postal Code into the Zip/Postal Code field",
    "Select United States from the Country dropdown",
    "Enter Phone into the Phone field",
    "Click Save on Contact Details",
    "Verify success message"
  ]; // from input
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const stepsFromInput = [
    {
      "action": "fill",
      "selector": "#txtUsername",
      "value": "Admin",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "[name='username']",
        "input[placeholder='Username']"
      ],
      "errorMessage": "Failed to enter username.",
      "stepDescription": "Enter 'Admin' into the username field"
    },
    {
      "action": "fill",
      "selector": "#txtPassword",
      "value": "admin123",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "[name='password']",
        "input[placeholder='Password']"
      ],
      "errorMessage": "Failed to enter password.",
      "stepDescription": "Enter 'admin123' into the password field"
    },
    {
      "action": "click",
      "selector": "#btnLogin",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[value='Login']",
        "button[type='submit']"
      ],
      "errorMessage": "Failed to click the login button.",
      "stepDescription": "Click the login button"
    },
    {
      "action": "goto",
      "selector": "/pim",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to navigate to PIM page.",
      "stepDescription": "Navigate to PIM"
    },
    {
      "action": "click",
      "selector": "#btnAdd",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "//button[text()='Add']",
        "a[href*='addEmployee']"
      ],
      "errorMessage": "Failed to click Add Employee button.",
      "stepDescription": "Click Add Employee"
    },
    {
      "action": "fill",
      "selector": "#firstName",
      "value": "John",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[name='firstName']",
        "input[placeholder='First Name']"
      ],
      "errorMessage": "Failed to enter First Name.",
      "stepDescription": "Enter First Name into the First Name field"
    },
    {
      "action": "fill",
      "selector": "#middleName",
      "value": "M",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[name='middleName']",
        "input[placeholder='Middle Name']"
      ],
      "errorMessage": "Failed to enter Middle Name.",
      "stepDescription": "Enter Middle Name into the Middle Name field"
    },
    {
      "action": "fill",
      "selector": "#lastName",
      "value": "Doe",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[name='lastName']",
        "input[placeholder='Last Name']"
      ],
      "errorMessage": "Failed to enter Last Name.",
      "stepDescription": "Enter Last Name into the Last Name field"
    },
    {
      "action": "check",
      "selector": "#createLoginDetails",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[type='checkbox']"
      ],
      "errorMessage": "Failed to check Create Login Details checkbox.",
      "stepDescription": "Check the Create Login Details checkbox"
    },
    {
      "action": "fill",
      "selector": "#userName",
      "value": "johndoe",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[placeholder='Username']"
      ],
      "errorMessage": "Failed to enter Username.",
      "stepDescription": "Enter Username into the Username field"
    },
    {
      "action": "fill",
      "selector": "#userPassword",
      "value": "password123",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[placeholder='Password']"
      ],
      "errorMessage": "Failed to enter Password.",
      "stepDescription": "Enter Password into the Password field"
    },
    {
      "action": "fill",
      "selector": "#confirmPassword",
      "value": "password123",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[placeholder='Confirm Password']"
      ],
      "errorMessage": "Failed to enter Confirm Password.",
      "stepDescription": "Enter Confirm Password into the Confirm Password field"
    },
    {
      "action": "click",
      "selector": "#status",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "select[id='status']"
      ],
      "errorMessage": "Failed to click the Status dropdown.",
      "stepDescription": "Select 'enabled' from the Status dropdown"
    },
    {
     "action": "click",
     "selector": "#status > option[value='enabled']",
     "waitTimeoutMs": 5000,
     "retry": 3,
     "fallbacks": [
       "select[id='status'] > option:nth-child(1)"
     ],
     "errorMessage": "Failed to select 'enabled' from the Status dropdown.",
     "stepDescription": "Select 'enabled' from the Status dropdown"
   },
    {
      "action": "click",
      "selector": "#btnSave",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "button[type='submit']"
      ],
      "errorMessage": "Failed to click Save button.",
      "stepDescription": "Click Save"
    },
    {
      "action": "isVisible",
      "selector": ".personal-details",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "#pdMainContainer"
      ],
      "errorMessage": "Personal Details Page is not displayed.",
      "stepDescription": "Verify Personal Details Page is displayed"
    },
    {
      "action": "click",
      "selector": "text=Contact Details",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "a[href='#contactDetails']"
      ],
      "errorMessage": "Failed to navigate to Contact Details tab.",
      "stepDescription": "Navigate to Contact Details tab"
    },
    {
      "action": "fill",
      "selector": "#street1",
      "value": "123 Main St",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[placeholder='Street Address']"
      ],
      "errorMessage": "Failed to enter Street Address.",
      "stepDescription": "Enter Street Address into the Street Address field"
    },
    {
      "action": "fill",
      "selector": "#city",
      "value": "Anytown",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[placeholder='City']"
      ],
      "errorMessage": "Failed to enter City.",
      "stepDescription": "Enter City into the City field"
    },
    {
      "action": "fill",
      "selector": "#state",
      "value": "CA",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[placeholder='State/Province']"
      ],
      "errorMessage": "Failed to enter State/Province.",
      "stepDescription": "Enter State/Province into the State/Province field"
    },
    {
      "action": "fill",
      "selector": "#zipCode",
      "value": "12345",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[placeholder='Zip/Postal Code']"
      ],
      "errorMessage": "Failed to enter Zip/Postal Code.",
      "stepDescription": "Enter Zip/Postal Code into the Zip/Postal Code field"
    },
    {
      "action": "click",
      "selector": "#country",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "select[id='country']"
      ],
      "errorMessage": "Failed to click the Country dropdown.",
      "stepDescription": "Select United States from the Country dropdown"
    },
    {
     "action": "click",
     "selector": "#country > option[value='us']",
     "waitTimeoutMs": 5000,
     "retry": 3,
     "fallbacks": [
       "select[id='country'] > option:nth-child(1)"
     ],
     "errorMessage": "Failed to select 'United States' from the Country dropdown.",
     "stepDescription": "Select United States from the Country dropdown"
   },
    {
      "action": "fill",
      "selector": "#phone",
      "value": "555-123-4567",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "input[placeholder='Phone']"
      ],
      "errorMessage": "Failed to enter Phone.",
      "stepDescription": "Enter Phone into the Phone field"
    },
    {
      "action": "click",
      "selector": "#saveContact",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        "button[id='saveContact']"
      ],
      "errorMessage": "Failed to click Save on Contact Details.",
      "stepDescription": "Click Save on Contact Details"
    },
    {
      "action": "isVisible",
      "selector": ".success",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [
        ".message"
      ],
      "errorMessage": "Success message is not displayed.",
      "stepDescription": "Verify success message"
    }
  ];

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
        for (const stepData of stepsFromInput) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            // Execute the specific action
            switch (stepData.action) {
              case "goto":
                await page.goto(stepData.selector);
                stepDetails = `Navigated to ${stepData.selector}`;
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