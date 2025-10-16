import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Wikipedia Navigation and Search Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "step": 1,
      "action": "goto",
      "url": "https://www.wikipedia.org/",
      "timeout": 30000,
      "retries": 2,
      "fallback": null,
      "errorMessage": "Navigation to Wikipedia failed.",
      "description": "Navigate to Wikipedia homepage."
    },
    {
      "step": 2,
      "action": "isVisible",
      "selector": "//img[@src='//upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png']",
      "timeout": 10000,
      "retries": 3,
      "fallback": null,
      "errorMessage": "Wikipedia logo is not visible.",
      "description": "Verify the visibility of the Wikipedia logo."
    },
    {
      "step": 3,
      "action": "click",
      "selector": "#searchInput",
      "timeout": 10000,
      "retries": 2,
      "fallback": null,
      "errorMessage": "Could not click on the search input field.",
      "description": "Click on the search input field."
    },
    {
      "step": 4,
      "action": "fill",
      "selector": "#searchInput",
      "value": "Playwright",
      "timeout": 10000,
      "retries": 2,
      "fallback": null,
      "errorMessage": "Could not enter text in the search input field.",
      "description": "Enter 'Playwright' in the search field."
    },
    {
      "step": 5,
      "action": "click",
      "selector": "#searchButton",
      "timeout": 10000,
      "retries": 2,
      "fallback": null,
      "errorMessage": "Could not click the search button.",
      "description": "Click the search button."
    },
    {
      "step": 6,
      "action": "waitFor",
      "selector": "#mw-content-text",
      "timeout": 20000,
      "retries": 3,
      "fallback": null,
      "errorMessage": "Search results page did not load in time.",
      "description": "Wait for the search results page to load."
    },
    {
      "step": 7,
      "action": "click",
      "selector": "a[title='Playwright (software)']",
      "timeout": 10000,
      "retries": 2,
      "fallback": null,
      "errorMessage": "Could not click on the first search result link.",
      "description": "Click on the first search result link for 'Playwright (software)'."
    },
    {
      "step": 8,
      "action": "isVisible",
      "selector": "#firstHeading:has-text('Playwright')",
      "timeout": 10000,
      "retries": 3,
      "fallback": null,
      "errorMessage": "Page heading does not contain 'Playwright'.",
      "description": "Verify that the page heading contains 'Playwright'."
    },
    {
      "step": 9,
      "action": "waitFor",
      "selector": "#History",
      "timeout": 10000,
      "retries": 2,
      "fallback": null,
      "errorMessage": "Could not find the History section.",
      "description": "Wait for the 'History' section to load."
    },
    {
      "step": 10,
      "action": "click",
      "selector": "#ca-history a",
      "timeout": 10000,
      "retries": 2,
      "fallback": null,
      "errorMessage": "Could not click the 'View history' tab.",
      "description": "Click the 'View history' tab at the top of the page."
    },
    {
      "step": 11,
      "action": "isVisible",
      "selector": ".mw-history-rows",
      "timeout": 10000,
      "retries": 3,
      "fallback": null,
      "errorMessage": "Revision history entries are not visible.",
      "description": "Verify that the page shows revision history entries."
    },
    {
      "step": 12,
      "action": "click",
      "selector": "#p-logo a",
      "timeout": 10000,
      "retries": 2,
      "fallback": null,
      "errorMessage": "Could not click the 'Main page' link in the sidebar.",
      "description": "Click the 'Main page' link in the sidebar."
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
          } catch (stepError: any) {
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
  } catch (unexpectedError: any) {
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
      user_test_steps: originalUserSteps.map(step => step.description),
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
      // File write failed but we still return results
    }

    return result;
  }
});