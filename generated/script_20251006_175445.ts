import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id user-name.",
    "Enter \"secret_sauce\" in the password field with id password.",
    "Click the Login button with id login-button.",
    "Click on the product sort filter dropdown with class product_sort_container.",
    "Select Name (Z to A) from the product sort filter dropdown.",
    "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for the product Sauce Labs Backpack.",
    "Click on the cart icon with class shopping_cart_link.",
    "Ensure that the product Sauce Labs Backpack is present in the cart.",
    "Click on the checkout button with id checkout.",
    "Enter \"chaitanya\" in the first name field with id first-name.",
    "Enter \"Kompella\" in the last name field with id last-name.",
    "Enter \"62567352\" in the postal code field with id postal-code.",
    "Click on continue button with id continue.",
    "Click on finish button with id finish.",
    "Verify the text content is “Thank you for your order!” on the page.",
    "Click on back to home button with id back-to-products.",
    "Click on the burger bar button with id react-burger-menu-btn.",
    "Click on logout button with id logout_sidebar_link."
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const steps = [
    {
      "step": 1,
      "action": "goto",
      "url": "/",
      "timeout": 10000,
      "retries": 3,
      "error": "Navigation to saucedemo failed after multiple retries."
    },
    {
      "step": 2,
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "timeout": 5000,
      "retries": 2,
      "errorMessage": "Could not fill username field.",
      "altSelectors": [
        "[data-test='username']"
      ]
    },
    {
      "step": 3,
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "timeout": 5000,
      "retries": 2,
      "errorMessage": "Could not fill password field.",
      "altSelectors": [
        "[data-test='password']"
      ]
    },
    {
      "step": 4,
      "action": "click",
      "selector": "#login-button",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not click login button.",
      "altSelectors": [
        "[data-test='login-button']"
      ]
    },
    {
      "step": 5,
      "action": "click",
      "selector": ".product_sort_container",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not click product sort container.",
      "altSelectors": [
        "[data-test='product-sort-container']"
      ]
    },
    {
      "step": 6,
      "action": "click",
      "selector": ".product_sort_container > option[value='za']",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not select 'Name (Z to A)' from the sort dropdown.",
      "altSelectors": [
        "text=Name (Z to A)"
      ]
    },
    {
      "step": 7,
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not add Sauce Labs Backpack to cart.",
      "altSelectors": [
        "[data-test='add-to-cart-sauce-labs-backpack']",
        "text=Add to cart"
      ]
    },
    {
      "step": 8,
      "action": "click",
      "selector": ".shopping_cart_link",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not click the cart icon.",
      "altSelectors": [
        "[data-test='shopping-cart-link']"
      ]
    },
    {
      "step": 9,
      "action": "isVisible",
      "selector": ".cart_item:has-text('Sauce Labs Backpack')",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Sauce Labs Backpack is not present in the cart.",
      "altSelectors": [
        "[data-test='inventory-item']:has-text('Sauce Labs Backpack')"
      ]
    },
    {
      "step": 10,
      "action": "click",
      "selector": "#checkout",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not click the checkout button.",
      "altSelectors": [
        "[data-test='checkout']"
      ]
    },
    {
      "step": 11,
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "timeout": 5000,
      "retries": 2,
      "errorMessage": "Could not fill first name field.",
      "altSelectors": [
        "[data-test='first-name']"
      ]
    },
    {
      "step": 12,
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "timeout": 5000,
      "retries": 2,
      "errorMessage": "Could not fill last name field.",
      "altSelectors": [
        "[data-test='last-name']"
      ]
    },
    {
      "step": 13,
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "timeout": 5000,
      "retries": 2,
      "errorMessage": "Could not fill postal code field.",
      "altSelectors": [
        "[data-test='postal-code']"
      ]
    },
    {
      "step": 14,
      "action": "click",
      "selector": "#continue",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not click the continue button.",
      "altSelectors": [
        "[data-test='continue']"
      ]
    },
    {
      "step": 15,
      "action": "click",
      "selector": "#finish",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not click the finish button.",
      "altSelectors": [
        "[data-test='finish']"
      ]
    },
    {
      "step": 16,
      "action": "waitFor",
      "selector": "text=Thank you for your order!",
      "timeout": 10000,
      "retries": 3,
      "errorMessage": "Verification failed: 'Thank you for your order!' text not found.",
      "altSelectors": [
        ".complete-header"
      ]
    },
    {
      "step": 17,
      "action": "click",
      "selector": "#back-to-products",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not click the back to home button.",
      "altSelectors": [
        "[data-test='back-to-products']"
      ]
    },
    {
      "step": 18,
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not click the burger bar button.",
      "altSelectors": [
        "[data-test='react-burger-menu-btn']"
      ]
    },
    {
      "step": 19,
      "action": "click",
      "selector": "#logout_sidebar_link",
      "timeout": 5000,
      "retries": 3,
      "errorMessage": "Could not click the logout button.",
      "altSelectors": [
        "[data-test='logout']"
      ]
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
                try {
                  await page.locator(stepData.selector).fill(stepData.value);
                  stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                } catch (error) {
                  let filled = false;
                  if (stepData.altSelectors) {
                    for (const altSelector of stepData.altSelectors) {
                      try {
                        await page.locator(altSelector).fill(stepData.value);
                        stepDetails = `Filled ${altSelector} with ${stepData.value} (Alt Selector)`;
                        filled = true;
                        break;
                      } catch (altError) {
                        // Ignore alt selector error and try the next one
                      }
                    }
                  }
                  if (!filled) {
                    throw error; // Re-throw the original error if no alt selector worked
                  }
                }
                break;
              case "click":
                try {
                  await page.locator(stepData.selector).click();
                  stepDetails = `Clicked ${stepData.selector}`;
                } catch (error) {
                  let clicked = false;
                  if (stepData.altSelectors) {
                    for (const altSelector of stepData.altSelectors) {
                      try {
                        await page.locator(altSelector).click();
                        stepDetails = `Clicked ${altSelector} (Alt Selector)`;
                        clicked = true;
                        break;
                      } catch (altError) {
                        // Ignore alt selector error and try the next one
                      }
                    }
                  }
                  if (!clicked) {
                    throw error; // Re-throw the original error if no alt selector worked
                  }
                }
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
                try {
                  await page.locator(stepData.selector).waitFor({ timeout: stepData.timeout });
                  stepDetails = `Waited for ${stepData.selector}`;
                } catch (error) {
                  let waited = false;
                  if (stepData.altSelectors) {
                    for (const altSelector of stepData.altSelectors) {
                      try {
                        await page.locator(altSelector).waitFor({ timeout: stepData.timeout });
                        stepDetails = `Waited for ${altSelector} (Alt Selector)`;
                        waited = true;
                        break;
                      } catch (altError) {
                        // Ignore alt selector error and try the next one
                      }
                    }
                  }
                  if (!waited) {
                    throw error; // Re-throw the original error if no alt selector worked
                  }
                }
                break;
              case "isVisible":
                try {
                  await page.locator(stepData.selector).isVisible({ timeout: stepData.timeout });
                  stepDetails = `Element ${stepData.selector} is visible`;
                } catch (error) {
                  let visible = false;
                  if (stepData.altSelectors) {
                    for (const altSelector of stepData.altSelectors) {
                      try {
                        const isElementVisible = await page.locator(altSelector).isVisible({ timeout: stepData.timeout });
                        stepDetails = `Element ${altSelector} is ${isElementVisible ? 'visible' : 'not visible'} (Alt Selector)`;
                        visible = true;
                        break;
                      } catch (altError) {
                        // Ignore alt selector error and try the next one
                      }
                    }
                  }
                  if (!visible) {
                    stepDetails = `Element ${stepData.selector} is not visible`;
                    stepStatus = "error";
                    break;
                  }
                }
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute step ${stepData.step}: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(originalUserSteps[stepData.step - 1]);
          executionResults.push({
            step: originalUserSteps[stepData.step - 1],
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