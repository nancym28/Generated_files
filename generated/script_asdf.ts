import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "step": 1,
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "description": "Navigate to the Saucedemo website.",
      "wait_options": {
        "wait_until": "domcontentloaded",
        "timeout": 10000
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
    },
    {
      "step": 2,
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "description": "Enter username.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 2,
        "on_error": "continue"
      }
    },
    {
      "step": 3,
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "description": "Enter password.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 2,
        "on_error": "continue"
      }
    },
    {
      "step": 4,
      "action": "click",
      "selector": "#login-button",
      "description": "Click login button.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
    },
    {
      "step": 5,
      "action": "click",
      "selector": ".product_sort_container",
      "description": "Click the product sort filter dropdown.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 2,
        "on_error": "continue"
      }
    },
    {
      "step": 6,
      "action": "click",
      "selector": "option[value=\"za\"]",
      "description": "Select Name (Z to A) from the product sort filter dropdown.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 2,
        "on_error": "continue"
      }
    },
    {
      "step": 7,
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "description": "Locate the product \"Sauce Labs Backpack\" and click the Add to Cart button.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
    },
    {
      "step": 8,
      "action": "click",
      "selector": "a.shopping_cart_link",
      "description": "Click on the cart icon.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
    },
    {
      "step": 9,
      "action": "isVisible",
      "selector": "div.cart_item[data-test=\"inventory-item\"]",
      "description": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 2,
        "on_error": "continue"
      }
    },
    {
      "step": 10,
      "action": "click",
      "selector": "#checkout",
      "description": "Click on the checkout button.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
    },
    {
      "step": 11,
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "description": "Enter \"chaitanya\" in the first name field.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 2,
        "on_error": "continue"
      }
    },
    {
      "step": 12,
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "description": "Enter \"Kompella\" in the last name field.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 2,
        "on_error": "continue"
      }
    },
    {
      "step": 13,
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "description": "Enter \"62567352\" in the postal code field.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 2,
        "on_error": "continue"
      }
    },
    {
      "step": 14,
      "action": "click",
      "selector": "#continue",
      "description": "Click on the continue button.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
    },
    {
      "step": 15,
      "action": "click",
      "selector": "#finish",
      "description": "Click on the finish button.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
    },
    {
      "step": 16,
      "action": "isVisible",
      "selector": "text=Thank you for your order!",
      "description": "Verify the presence of the message “Thank you for your order!”.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 2,
        "on_error": "continue"
      }
    },
    {
      "step": 17,
      "action": "click",
      "selector": "#back-to-products",
      "description": "Click on the back to home button.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
    },
    {
      "step": 18,
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "description": "Click on the burger bar.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
    },
    {
      "step": 19,
      "action": "click",
      "selector": "#logout_sidebar_link",
      "description": "Click on logout.",
      "wait_options": {
        "wait_for": "selector",
        "timeout": 5000,
        "state": "attached"
      },
      "error_handling": {
        "retry": 3,
        "on_error": "fail"
      }
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
                await page.goto(stepData.url, { waitUntil: stepData.wait_options?.wait_until, timeout: stepData.wait_options?.timeout });
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
      user_test_steps: originalUserSteps.map(step => step.description),
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
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});