import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test.setTimeout(120000);

test('SauceDemo Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" into the username field with id user-name",
    "Enter \"secret_sauce\" into the password field with id password",
    "Click the Login button with id login-button",
    "Click on the product sort filter dropdown",
    "Click on Name (Z to A) option"
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
          "stepNumber": 1,
          "description": "Navigate to https://www.saucedemo.com/",
          "action": "goto",
          "url": "https://www.saucedemo.com/",
          "timeout": 30000,
          "retries": 3,
          "errorHandling": "strict",
          "errorMessage": "Navigation to https://www.saucedemo.com/ failed.",
          "waitStrategy": "networkidle"
        },
        {
          "stepNumber": 2,
          "description": "Enter \"standard_user\" into the username field with id user-name",
          "action": "fill",
          "selector": "#user-name",
          "selectorType": "id",
          "altSelectors": [
            "[data-test='username']",
            "input[name='user-name']"
          ],
          "value": "standard_user",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "strict",
          "errorMessage": "Failed to enter username.",
          "waitStrategy": "visible",
          "fallbackAction": "clear"
        },
        {
          "stepNumber": 3,
          "description": "Enter \"secret_sauce\" into the password field with id password",
          "action": "fill",
          "selector": "#password",
          "selectorType": "id",
          "altSelectors": [
            "[data-test='password']",
            "input[name='password']"
          ],
          "value": "secret_sauce",
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "strict",
          "errorMessage": "Failed to enter password.",
          "waitStrategy": "visible",
          "fallbackAction": "clear"
        },
        {
          "stepNumber": 4,
          "description": "Click the Login button with id login-button",
          "action": "click",
          "selector": "#login-button",
          "selectorType": "id",
          "altSelectors": [
            "[data-test='login-button']",
            "input[name='login-button']"
          ],
          "timeout": 15000,
          "retries": 3,
          "errorHandling": "strict",
          "errorMessage": "Failed to click the login button.",
          "waitStrategy": "clickable"
        },
        {
          "stepNumber": 5,
          "description": "Click on the product sort filter dropdown",
          "action": "click",
          "selector": ".product_sort_container",
          "selectorType": "css",
          "altSelectors": [
            "[data-test='product_sort_container']"
          ],
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "strict",
          "errorMessage": "Failed to click the product sort filter dropdown.",
          "waitStrategy": "clickable"
        },
        {
          "stepNumber": 6,
          "description": "Click on Name (Z to A) option",
          "action": "click",
          "selector": "option[value='za']",
          "selectorType": "css",
          "altSelectors": [
            "text=Name (Z to A)"
          ],
          "timeout": 10000,
          "retries": 2,
          "errorHandling": "strict",
          "errorMessage": "Failed to click on Name (Z to A) option.",
          "waitStrategy": "visible"
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
                await page.goto(stepData.url);
                stepDetails = `Navigated to ${stepData.url}`;
                break;
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
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});