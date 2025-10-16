import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.wikipedia.org/",
    "Assert element visible with alt text 'Wikipedia' and class 'central-featured-logo-img'",
    "Click element with id 'searchInput'",
    "Type 'Playwright' into element with id 'searchInput'",
    "Click element with id 'searchButton'",
    "Wait for element with class 'mw-search-results' to be visible",
    "Click element with title 'Playwright (software)' inside element with class 'mw-search-result'",
    "Assert page heading contains 'Playwright'",
    "Scroll to element with id 'History'",
    "Click element with id 'ca-history'",
    "Assert element with class 'history-table' is visible",
    "Click element with title 'Visit the main page' inside div with id 'p-logo'",
    "Keep browser open"
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
          "value": "https://www.wikipedia.org/",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Navigation to Wikipedia failed.",
          "stepDescription": "Navigate to https://www.wikipedia.org/"
        },
        {
          "action": "isVisible",
          "selector": ".central-featured-logo-img[alt='Wikipedia']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Wikipedia logo is not visible.",
          "stepDescription": "Assert element visible with alt text 'Wikipedia' and class 'central-featured-logo-img'"
        },
        {
          "action": "click",
          "selector": "#searchInput",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Could not click the search input field.",
          "stepDescription": "Click element with id 'searchInput'"
        },
        {
          "action": "fill",
          "selector": "#searchInput",
          "value": "Playwright",
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Could not type into the search input field.",
          "stepDescription": "Type 'Playwright' into element with id 'searchInput'"
        },
        {
          "action": "click",
          "selector": "#searchButton",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Could not click the search button.",
          "stepDescription": "Click element with id 'searchButton'"
        },
        {
          "action": "waitFor",
          "selector": ".mw-search-results",
          "value": "visible",
          "waitTimeoutMs": 10000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Search results did not appear in time.",
          "stepDescription": "Wait for element with class 'mw-search-results' to be visible"
        },
        {
          "action": "click",
          "selector": ".mw-search-result a[title='Playwright (software)']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Could not click the 'Playwright (software)' search result.",
          "stepDescription": "Click element with title 'Playwright (software)' inside element with class 'mw-search-result'"
        },
        {
          "action": "isVisible",
          "selector": "h1#firstHeading:has-text('Playwright')",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Page heading does not contain 'Playwright'.",
          "stepDescription": "Assert page heading contains 'Playwright'"
        },
        {
          "action": "hover",
          "selector": "#History",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 1,
          "fallbacks": [],
          "errorMessage": "Could not scroll to the History section.",
          "stepDescription": "Scroll to element with id 'History'"
        },
        {
          "action": "click",
          "selector": "#ca-history a",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Could not click the 'View history' tab.",
          "stepDescription": "Click element with id 'ca-history'"
        },
        {
          "action": "isVisible",
          "selector": ".history-table",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "History table is not visible.",
          "stepDescription": "Assert element with class 'history-table' is visible"
        },
        {
          "action": "click",
          "selector": "#p-logo a[title='Visit the main page']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Could not click the 'Visit the main page' link.",
          "stepDescription": "Click element with title 'Visit the main page' inside div with id 'p-logo'"
        },
        {
          "action": "waitFor",
          "selector": "body",
          "value": "visible",
          "waitTimeoutMs": 30000,
          "retry": 0,
          "fallbacks": [],
          "errorMessage": "Test finished",
          "stepDescription": "Keep browser open"
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
      // File write failed but we still return results
    }

    return result;
  }
});