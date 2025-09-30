import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('SauceDemo E2E Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "stepName": "Navigate to saucedemo",
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Enter username",
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Enter password",
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Click login button",
      "action": "click",
      "selector": "#login-button",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Click product sort dropdown",
      "action": "click",
      "selector": ".product_sort_container",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Select Name (Z to A)",
      "action": "click",
      "selector": "option[value='za']",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Add Sauce Labs Backpack to cart",
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Click cart icon",
      "action": "click",
      "selector": ".shopping_cart_link",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Ensure Sauce Labs Backpack is in cart",
      "action": "isVisible",
      "selector": ".cart_item:has-text('Sauce Labs Backpack')",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Click checkout button",
      "action": "click",
      "selector": "#checkout",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Enter first name",
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Enter last name",
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Enter postal code",
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Click continue button",
      "action": "click",
      "selector": "#continue",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Click finish button",
      "action": "click",
      "selector": "#finish",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Verify success message",
      "action": "isVisible",
      "selector": ".complete-header:has-text('Thank you for your order!')",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Click back to home",
      "action": "click",
      "selector": "#back-to-products",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Click burger bar",
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
    },
    {
      "stepName": "Click logout",
      "action": "click",
      "selector": "#logout_sidebar_link",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "onError": "continue"
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
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepData.stepName}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(stepData.stepName);
          executionResults.push({
            step: stepData.stepName,
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
      user_test_steps: originalUserSteps.map(step => step.stepName),
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