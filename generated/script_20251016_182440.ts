import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';
test.setTimeout(120000);
test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "stepNumber": 1,
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "timeout": 30000,
      "retry": 3,
      "onError": "continue",
      "description": "Navigate to the Saucedemo website."
    },
    {
      "stepNumber": 2,
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Enter username 'standard_user'.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 3,
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Enter password 'secret_sauce'.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 4,
      "action": "click",
      "selector": "#login-button",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click the Login button.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 5,
      "action": "click",
      "selector": "[data-test='product-sort-container']",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click on the product sort filter dropdown.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 6,
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click the Add to Cart button for Sauce Labs Backpack.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 7,
      "action": "click",
      "selector": "[data-test='shopping-cart-link']",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click on the cart icon.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 8,
      "action": "isVisible",
      "selector": "//div[@class='cart_item']//div[@class='inventory_item_name' and text()='Sauce Labs Backpack']",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Verify that the product 'Sauce Labs Backpack' is present in the cart.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 9,
      "action": "click",
      "selector": "[data-test='checkout']",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click on the checkout button.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 10,
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Enter 'chaitanya' in the first name field.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 11,
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Enter 'Kompella' in the last name field.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 12,
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Enter '62567352' in the postal code field.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 13,
      "action": "click",
      "selector": "#continue",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click on the continue button.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 14,
      "action": "click",
      "selector": "[data-test='finish']",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click on the finish button.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 15,
      "action": "isVisible",
      "selector": "//h2[text()='Thank you for your order!']",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Verify the presence of the message 'Thank you for your order!'.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 16,
      "action": "click",
      "selector": "[data-test='back-to-products']",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click on back to home button.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 17,
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click on the burger bar.",
      "waitStrategy": "visible"
    },
    {
      "stepNumber": 18,
      "action": "click",
      "selector": "#logout_sidebar_link",
      "timeout": 10000,
      "retry": 2,
      "onError": "fail",
      "description": "Click on logout.",
      "waitStrategy": "visible"
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
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }
    return result;
  }
});