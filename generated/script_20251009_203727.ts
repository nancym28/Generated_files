import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to the application dashboard",
    "Click on system settings menu",
    "Click on shutdown option",
    "Confirm shutdown action",
    "Verify shutdown confirmation message"
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const steps = [
    {
      "action": "goto",
      "selector": null,
      "value": "https://example.com/dashboard",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to navigate to the application dashboard.",
      "stepDescription": "Navigate to the application dashboard"
    },
    {
      "action": "click",
      "selector": "[data-test='settings-menu']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        {
          "action": "scrollIntoView",
          "selector": "[data-test='settings-menu']"
        },
        {
          "action": "waitFor",
          "selector": "[data-test='settings-menu']"
        }
      ],
      "errorMessage": "Failed to click on the system settings menu.",
      "stepDescription": "Click on system settings menu"
    },
    {
      "action": "click",
      "selector": "[data-test='shutdown-option']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        {
          "action": "scrollIntoView",
          "selector": "[data-test='shutdown-option']"
        },
        {
          "action": "waitFor",
          "selector": "[data-test='shutdown-option']"
        }
      ],
      "errorMessage": "Failed to click on the shutdown option.",
      "stepDescription": "Click on shutdown option"
    },
    {
      "action": "click",
      "selector": "[data-test='confirm-shutdown']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        {
          "action": "scrollIntoView",
          "selector": "[data-test='confirm-shutdown']"
        },
        {
          "action": "waitFor",
          "selector": "[data-test='confirm-shutdown']"
        }
      ],
      "errorMessage": "Failed to confirm shutdown action.",
      "stepDescription": "Confirm shutdown action"
    },
    {
      "action": "isVisible",
      "selector": "[data-test='confirmation-message']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [
        {
          "action": "waitFor",
          "selector": "[data-test='confirmation-message']"
        }
      ],
      "errorMessage": "Shutdown confirmation message is not visible.",
      "stepDescription": "Verify shutdown confirmation message"
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
        for (const stepData of steps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            // Execute the specific action
            if (stepData.action === "goto") {
              await page.goto(stepData.value);
              stepDetails = `Navigated to ${stepData.value}`;
            } else if (stepData.action === "click") {
              await page.locator(stepData.selector).click();
              stepDetails = `Clicked ${stepData.selector}`;
            } else if (stepData.action === "fill") {
              await page.locator(stepData.selector).fill(stepData.value);
              stepDetails = `Filled ${stepData.selector}`;
            } else if (stepData.action === "check") {
              await page.locator(stepData.selector).check();
              stepDetails = `Checked ${stepData.selector}`;
            } else if (stepData.action === "uncheck") {
              await page.locator(stepData.selector).uncheck();
              stepDetails = `Unchecked ${stepData.selector}`;
            } else if (stepData.action === "hover") {
              await page.locator(stepData.selector).hover();
              stepDetails = `Hovered ${stepData.selector}`;
            } else if (stepData.action === "waitFor") {
              await page.locator(stepData.selector).waitFor();
              stepDetails = `Waited for ${stepData.selector}`;
            } else if (stepData.action === "isVisible") {
              const isVisible = await page.locator(stepData.selector).isVisible();
              stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
              if (!isVisible) {
                  stepStatus = "error";
              }
            } else if (stepData.action === "scrollIntoView") {
                await page.locator(stepData.selector).scrollIntoViewIfNeeded();
                stepDetails = `Scrolled into view ${stepData.selector}`;
            } else {
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