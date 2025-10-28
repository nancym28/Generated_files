import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://demoqa.com/droppable",
    "Verify draggable element is visible",
    "Verify droppable element is visible",
    "Click on the draggable element to initiate drag",
    "Hover over the droppable element",
    "Release click on the droppable element to complete the drop",
    "Verify that text changes to 'Dropped!'",
    "Verify that background color changes"
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
            "action": "goto",
            "selector": null,
            "value": "https://demoqa.com/droppable",
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": ["waitForLoadState"],
            "errorMessage": "Failed to navigate to droppable page",
            "stepDescription": "Navigate to https://demoqa.com/droppable"
          },
          {
            "action": "isVisible",
            "selector": "#draggable",
            "value": null,
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": ["scrollIntoView"],
            "errorMessage": "Draggable element not visible",
            "stepDescription": "Verify draggable element is visible"
          },
          {
            "action": "isVisible",
            "selector": "#droppable",
            "value": null,
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": ["scrollIntoView"],
            "errorMessage": "Droppable element not visible",
            "stepDescription": "Verify droppable element is visible"
          },
          {
            "action": "click",
            "selector": "#draggable",
            "value": null,
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Failed to click draggable element",
            "stepDescription": "Click on the draggable element to initiate drag"
          },
          {
            "action": "hover",
            "selector": "#droppable",
            "value": null,
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Failed to hover over droppable element",
            "stepDescription": "Hover over the droppable element"
          },
          {
            "action": "click",
            "selector": "#droppable",
            "value": null,
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Failed to release click on droppable element",
            "stepDescription": "Release click on the droppable element to complete the drop"
          },
          {
            "action": "waitFor",
            "selector": "#droppable:has-text('Dropped!')",
            "value": null,
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Text did not change to 'Dropped!'",
            "stepDescription": "Verify that text changes to 'Dropped!'"
          },
          {
            "action": "isVisible",
            "selector": "#droppable[style*='background-color']",
            "value": null,
            "waitTimeoutMs": 10000,
            "retry": 3,
            "fallbacks": [],
            "errorMessage": "Background color did not change",
            "stepDescription": "Verify that background color changes"
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