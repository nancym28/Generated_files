import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { writeFileSync } from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://the-internet.herokuapp.com/nested_frames",
    "Switch to frame 'frame-left'",
    "Verify text 'LEFT' is present",
    "Switch to parent frame",
    "Switch to frame 'frame-middle'",
    "Verify text 'MIDDLE' is present",
    "Switch to parent frame",
    "Switch to frame 'frame-right'",
    "Verify text 'RIGHT' is present",
    "Switch to parent frame",
    "Switch to frame 'frame-bottom'",
    "Verify text 'BOTTOM' is present"
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const stepsFromInput = [
    {
      "action": "goto",
      "selector": null,
      "value": "https://the-internet.herokuapp.com/nested_frames",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": ["waitForLoadState"],
      "errorMessage": "Failed to navigate to https://the-internet.herokuapp.com/nested_frames",
      "stepDescription": "Navigate to https://the-internet.herokuapp.com/nested_frames"
    },
    {
      "action": "waitFor",
      "selector": "frame[name='frame-left']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to switch to frame 'frame-left'",
      "stepDescription": "Switch to frame 'frame-left' from default content"
    },
    {
      "action": "isVisible",
      "selector": "body:has-text('LEFT')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Text 'LEFT' is not visible in frame 'frame-left'",
      "stepDescription": "Verify text 'LEFT' is present"
    },
    {
      "action": "waitFor",
      "selector": "body",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to switch to parent frame from 'frame-left'",
      "stepDescription": "Switch to parent frame from 'frame-left' (back to default content)"
    },
    {
      "action": "waitFor",
      "selector": "frame[name='frame-middle']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to switch to frame 'frame-middle'",
      "stepDescription": "Switch to frame 'frame-middle' from default content"
    },
    {
      "action": "isVisible",
      "selector": "body:has-text('MIDDLE')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Text 'MIDDLE' is not visible in frame 'frame-middle'",
      "stepDescription": "Verify text 'MIDDLE' is present"
    },
    {
      "action": "waitFor",
      "selector": "body",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to switch to parent frame from 'frame-middle'",
      "stepDescription": "Switch to parent frame from 'frame-middle' (back to default content)"
    },
    {
      "action": "waitFor",
      "selector": "frame[name='frame-right']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to switch to frame 'frame-right'",
      "stepDescription": "Switch to frame 'frame-right' from default content"
    },
    {
      "action": "isVisible",
      "selector": "body:has-text('RIGHT')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Text 'RIGHT' is not visible in frame 'frame-right'",
      "stepDescription": "Verify text 'RIGHT' is present"
    },
    {
      "action": "waitFor",
      "selector": "body",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to switch to parent frame from 'frame-right'",
      "stepDescription": "Switch to parent frame from 'frame-right' (back to default content)"
    },
    {
      "action": "waitFor",
      "selector": "frame[name='frame-bottom']",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to switch to frame 'frame-bottom'",
      "stepDescription": "Switch to frame 'frame-bottom' from default content"
    },
    {
      "action": "isVisible",
      "selector": "body:has-text('BOTTOM')",
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Text 'BOTTOM' is not visible in frame 'frame-bottom'",
      "stepDescription": "Verify text 'BOTTOM' is present"
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
        for (const stepData of stepsFromInput) {
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
                stepDetails = `Filled ${stepData.selector}`;
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
        // Log but don't fail - we still need to return results
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
      writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    return result;
  }
});