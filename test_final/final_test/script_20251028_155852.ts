import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://demoqa.com/droppable",
    "Verify element with id 'draggable' is visible",
    "Verify element with id 'droppable' is visible",
    "Hover over the draggable element",
    "Press the mouse down on the draggable element",
    "Hover over the droppable element",
    "Release the mouse on the droppable element",
    "Verify text of element with id 'droppable' is 'Dropped!'",
    "Verify background color of element with id 'droppable' is not rgba(0, 0, 0, 0)"
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
      const steps = [
        {
          "action": "goto",
          "selector": null,
          "value": "https://demoqa.com/droppable",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to navigate to https://demoqa.com/droppable",
          "stepDescription": "Navigate to https://demoqa.com/droppable"
        },
        {
          "action": "isVisible",
          "selector": "#draggable",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Element with id 'draggable' is not visible",
          "stepDescription": "Verify element with id 'draggable' is visible"
        },
        {
          "action": "isVisible",
          "selector": "#droppable",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Element with id 'droppable' is not visible",
          "stepDescription": "Verify element with id 'droppable' is visible"
        },
        {
          "action": "hover",
          "selector": "#draggable",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to hover over draggable element",
          "stepDescription": "Hover over the draggable element"
        },
        {
          "action": "click",
          "selector": "#draggable",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click on draggable element",
          "stepDescription": "Press the mouse down on the draggable element"
        },
        {
          "action": "hover",
          "selector": "#droppable",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
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
          "errorMessage": "Failed to release mouse on droppable element",
          "stepDescription": "Release the mouse on the droppable element"
        },
        {
          "action": "waitFor",
          "selector": "#droppable",
          "value": "Dropped!",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Text of element with id 'droppable' is not 'Dropped!'",
          "stepDescription": "Verify text of element with id 'droppable' is 'Dropped!'"
        },
        {
          "action": "isVisible",
          "selector": "#droppable",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Background color of element with id 'droppable' is rgba(0, 0, 0, 0)",
          "stepDescription": "Verify background color of element with id 'droppable' is not rgba(0, 0, 0, 0)"
        }
      ];

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
      require('fs').writeFileSync('test_result.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing to file:", writeError);
    }

    return result;
  }
});