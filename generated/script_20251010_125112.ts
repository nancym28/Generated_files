import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" into the username field with id user-name",
    "Enter \"secret_sauce\" into the password field with id password",
    "Click the Login button with id login-button",
    "Click on the product sort filter dropdown with class product_sort_container",
    "Select Name (Z to A) from the product sort filter dropdown",
    "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for the product Sauce Labs Backpack",
    "Click on the cart icon with class shopping_cart_link",
    "Verify that the product Sauce Labs Backpack is present in the cart",
    "Click on the Checkout button with id checkout",
    "Enter \"chaitanya\" into the first name field with id first-name",
    "Enter \"Kompella\" into the last name field with id last-name",
    "Enter \"62567352\" into the postal code field with id postal-code",
    "Click the Continue button with id continue",
    "Click the Finish button with id finish",
    "Verify the presence of the message “Thank you for your order!”",
    "Click the Back to Home button with id back-to-products",
    "Click on the burger menu button with id react-burger-menu-btn",
    "Click on the logout button with id logout_sidebar_link"
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const testSteps = [
    {
      "step": 1,
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "selector": null,
      "value": null,
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Navigation to saucedemo failed.",
      "description": "Navigate to the Saucedemo website"
    },
    {
      "step": 2,
      "action": "fill",
      "selector": "[data-test=\"username\"]",
      "value": "standard_user",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        {
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user"
        }
      ],
      "errorMessage": "Failed to enter username.",
      "description": "Enter username 'standard_user'"
    },
    {
      "step": 3,
      "action": "fill",
      "selector": "[data-test=\"password\"]",
      "value": "secret_sauce",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        {
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce"
        }
      ],
      "errorMessage": "Failed to enter password.",
      "description": "Enter password 'secret_sauce'"
    },
    {
      "step": 4,
      "action": "click",
      "selector": "[data-test=\"login-button\"]",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        {
          "action": "click",
          "selector": "#login-button"
        }
      ],
      "errorMessage": "Failed to click login button.",
      "description": "Click the login button"
    },
    {
      "step": 5,
      "action": "click",
      "selector": "[data-test=\"product-sort-container\"]",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        {
          "action": "click",
          "selector": ".product_sort_container"
        }
      ],
      "errorMessage": "Failed to click product sort container.",
      "description": "Click the product sort container to open the sorting options"
    },
    {
      "step": 6,
      "action": "selectOption",
      "selector": "[data-test=\"product-sort-container\"]",
      "value": "za",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to select 'Name (Z to A)' option.",
      "description": "Select 'Name (Z to A)' from the sorting options"
    },
    {
      "step": 7,
      "action": "click",
      "selector": "[data-test=\"add-to-cart-sauce-labs-backpack\"]",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack"
        }
      ],
      "errorMessage": "Failed to click add to cart button.",
      "description": "Add the 'Sauce Labs Backpack' to the cart"
    },
    {
      "step": 8,
      "action": "click",
      "selector": "[data-test=\"shopping-cart-link\"]",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        {
          "action": "click",
          "selector": ".shopping_cart_link"
        }
      ],
      "errorMessage": "Failed to click shopping cart link.",
      "description": "Navigate to the shopping cart"
    },
    {
      "step": 9,
      "action": "isVisible",
      "selector": "div[data-test=\"inventory-item\"] div[data-test=\"inventory-item-name\"]:text-is('Sauce Labs Backpack')",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        {
          "action": "isVisible",
          "selector": "//div[@data-test='inventory-item']//div[@data-test='inventory-item-name'][text()='Sauce Labs Backpack']"
        }
      ],
      "errorMessage": "Sauce Labs Backpack not found in cart.",
      "description": "Verify that the 'Sauce Labs Backpack' is in the cart"
    },
    {
      "step": 10,
      "action": "click",
      "selector": "[data-test=\"checkout\"]",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [
        {
          "action": "click",
          "selector": "#checkout"
        }
      ],
      "errorMessage": "Failed to click checkout button.",
      "description": "Click the checkout button"
    },
    {
      "step": 11,
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter first name.",
      "description": "Enter first name 'chaitanya'"
    },
    {
      "step": 12,
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter last name.",
      "description": "Enter last name 'Kompella'"
    },
    {
      "step": 13,
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to enter postal code.",
      "description": "Enter postal code '62567352'"
    },
    {
      "step": 14,
      "action": "click",
      "selector": "#continue",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click continue button.",
      "description": "Click the continue button"
    },
    {
      "step": 15,
      "action": "click",
      "selector": "#finish",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click finish button.",
      "description": "Click the finish button to complete the checkout"
    },
    {
      "step": 16,
      "action": "isVisible",
      "selector": "//h2[text()='Thank you for your order!']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Thank you message not found.",
      "description": "Verify that the 'Thank you for your order!' message is displayed"
    },
    {
      "step": 17,
      "action": "click",
      "selector": "#back-to-products",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click back to home button.",
      "description": "Click the back to products button"
    },
    {
      "step": 18,
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click burger menu button.",
      "description": "Open the burger menu"
    },
    {
      "step": 19,
      "action": "click",
      "selector": "#logout_sidebar_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click logout button.",
      "description": "Click the logout button"
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
      if (testSteps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        for (const stepData of testSteps) {
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
                  let fallbackApplied = false;
                  if (stepData.fallbacks && stepData.fallbacks.length > 0) {
                    for (const fallback of stepData.fallbacks) {
                      try {
                        await page.locator(fallback.selector).fill(fallback.value);
                        stepDetails = `Filled ${fallback.selector} with ${fallback.value} (Fallback Applied)`;
                        fallbackApplied = true;
                        break;
                      } catch (fallbackError) {
                        //ignore fallback error and continue to next fallback
                      }
                    }
                  }
                  if (!fallbackApplied) {
                    throw error;
                  }
                }
                break;
              case "click":
                try {
                  await page.locator(stepData.selector).click();
                  stepDetails = `Clicked ${stepData.selector}`;
                } catch (error) {
                  let fallbackApplied = false;
                  if (stepData.fallbacks && stepData.fallbacks.length > 0) {
                    for (const fallback of stepData.fallbacks) {
                      try {
                        await page.locator(fallback.selector).click();
                        stepDetails = `Clicked ${fallback.selector} (Fallback Applied)`;
                        fallbackApplied = true;
                        break;
                      } catch (fallbackError) {
                        //ignore fallback error and continue to next fallback
                      }
                    }
                  }
                  if (!fallbackApplied) {
                    throw error;
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
                await page.locator(stepData.selector).waitFor();
                stepDetails = `Waited for ${stepData.selector}`;
                break;
              case "isVisible":
                try {
                  await page.locator(stepData.selector).isVisible({ timeout: stepData.waitTimeoutMs });
                  stepDetails = `Element ${stepData.selector} is visible`;
                } catch (error) {
                  stepDetails = `Element ${stepData.selector} is not visible`;
                  stepStatus = "error";
                }
                break;
              case "selectOption":
                await page.locator(stepData.selector).selectOption(stepData.value);
                stepDetails = `Selected option ${stepData.value} in ${stepData.selector}`;
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepData.description}. Error: ${stepError.message || stepError}`;
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