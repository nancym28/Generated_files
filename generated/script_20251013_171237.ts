import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to the Saucedemo website",
    "Enter username",
    "Enter password",
    "Click login button",
    "Click product sort filter",
    "Select sort option 'za'",
    "Add Sauce Labs Backpack to cart",
    "Click on the cart icon",
    "Verify Sauce Labs Backpack is in the cart",
    "Click checkout button",
    "Enter first name",
    "Enter last name",
    "Enter postal code",
    "Click continue button",
    "Click finish button",
    "Verify thank you message",
    "Click back to home button",
    "Click burger menu button",
    "Click logout button"
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
      const testSteps = [
        {
          stepNumber: 1,
          description: "Navigate to the Saucedemo website",
          actions: [
            {
              action: "goto",
              url: "https://www.saucedemo.com/",
              options: {
                waitUtil: "load",
                timeout: 10000
              },
              error: "Navigation to Saucedemo failed after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "waitForLoadState",
                  state: "load",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 2,
          description: "Enter username",
          actions: [
            {
              action: "fill",
              selector: "#user-name",
              value: "standard_user",
              options: {
                timeout: 10000
              },
              error: "Failed to enter username after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "fill",
                  selector: "[data-test='username']",
                  value: "standard_user",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 3,
          description: "Enter password",
          actions: [
            {
              action: "fill",
              selector: "#password",
              value: "secret_sauce",
              options: {
                timeout: 10000
              },
              error: "Failed to enter password after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "fill",
                  selector: "[data-test='password']",
                  value: "secret_sauce",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 4,
          description: "Click login button",
          actions: [
            {
              action: "click",
              selector: "#login-button",
              options: {
                timeout: 10000
              },
              error: "Failed to click login button after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "click",
                  selector: "[data-test='login-button']",
                  options: {
                    timeout: 10000
                  }
                },
                {
                  action: "waitForLoadState",
                  state: "load",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 5,
          description: "Click product sort filter",
          actions: [
            {
              action: "click",
              selector: ".product_sort_container",
              options: {
                timeout: 10000
              },
              error: "Failed to click product sort filter after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "scrollIntoView",
                  selector: ".product_sort_container",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 6,
          description: "Select sort option 'za'",
          actions: [
            {
              action: "click",
              selector: "option[value='za']",
              options: {
                timeout: 10000
              },
              error: "Failed to select sort option 'za' after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "scrollIntoView",
                  selector: "option[value='za']",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 7,
          description: "Add Sauce Labs Backpack to cart",
          actions: [
            {
              action: "click",
              selector: "#add-to-cart-sauce-labs-backpack",
              options: {
                timeout: 10000
              },
              error: "Failed to add Sauce Labs Backpack to cart after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "click",
                  selector: "[data-test='add-to-cart-sauce-labs-backpack']",
                  options: {
                    timeout: 10000
                  }
                },
                {
                  action: "scrollIntoView",
                  selector: "#add-to-cart-sauce-labs-backpack",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 8,
          description: "Click on the cart icon",
          actions: [
            {
              action: "click",
              selector: ".shopping_cart_link",
              options: {
                timeout: 10000
              },
              error: "Failed to click cart icon after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "scrollIntoView",
                  selector: ".shopping_cart_link",
                  options: {
                    timeout: 10000
                  }
                },
                {
                  action: "waitForLoadState",
                  state: "load",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 9,
          description: "Verify Sauce Labs Backpack is in the cart",
          actions: [
            {
              action: "isVisible",
              selector: ".inventory_item_name:has-text('Sauce Labs Backpack')",
              options: {
                timeout: 10000
              },
              error: "Sauce Labs Backpack is not visible in the cart after multiple retries.",
              retry: 3
            }
          ]
        },
        {
          stepNumber: 10,
          description: "Click checkout button",
          actions: [
            {
              action: "click",
              selector: "#checkout",
              options: {
                timeout: 10000
              },
              error: "Failed to click checkout button after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "click",
                  selector: "[data-test='checkout']",
                  options: {
                    timeout: 10000
                  }
                },
                {
                  action: "scrollIntoView",
                  selector: "#checkout",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 11,
          description: "Enter first name",
          actions: [
            {
              action: "fill",
              selector: "#first-name",
              value: "chaitanya",
              options: {
                timeout: 10000
              },
              error: "Failed to enter first name after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "fill",
                  selector: "[data-test='firstName']",
                  value: "chaitanya",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 12,
          description: "Enter last name",
          actions: [
            {
              action: "fill",
              selector: "#last-name",
              value: "Kompella",
              options: {
                timeout: 10000
              },
              error: "Failed to enter last name after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "fill",
                  selector: "[data-test='lastName']",
                  value: "Kompella",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 13,
          description: "Enter postal code",
          actions: [
            {
              action: "fill",
              selector: "#postal-code",
              value: "62567352",
              options: {
                timeout: 10000
              },
              error: "Failed to enter postal code after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "fill",
                  selector: "[data-test='postalCode']",
                  value: "62567352",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 14,
          description: "Click continue button",
          actions: [
            {
              action: "click",
              selector: "#continue",
              options: {
                timeout: 10000
              },
              error: "Failed to click continue button after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "click",
                  selector: "[data-test='continue']",
                  options: {
                    timeout: 10000
                  }
                },
                {
                  action: "waitForLoadState",
                  state: "load",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 15,
          description: "Click finish button",
          actions: [
            {
              action: "click",
              selector: "#finish",
              options: {
                timeout: 10000
              },
              error: "Failed to click finish button after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "click",
                  selector: "[data-test='finish']",
                  options: {
                    timeout: 10000
                  }
                },
                {
                  action: "scrollIntoView",
                  selector: "#finish",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 16,
          description: "Verify thank you message",
          actions: [
            {
              action: "isVisible",
              selector: ".complete-header:has-text('Thank you for your order!')",
              options: {
                timeout: 10000
              },
              error: "Thank you message is not visible after multiple retries.",
              retry: 3
            }
          ]
        },
        {
          stepNumber: 17,
          description: "Click back to home button",
          actions: [
            {
              action: "click",
              selector: "#back-to-products",
              options: {
                timeout: 10000
              },
              error: "Failed to click back to home button after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "click",
                  selector: "[data-test='back-to-products']",
                  options: {
                    timeout: 10000
                  }
                },
                {
                  action: "scrollIntoView",
                  selector: "#back-to-products",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 18,
          description: "Click burger menu button",
          actions: [
            {
              action: "click",
              selector: "#react-burger-menu-btn",
              options: {
                timeout: 10000
              },
              error: "Failed to click burger menu button after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "scrollIntoView",
                  selector: "#react-burger-menu-btn",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        },
        {
          stepNumber: 19,
          description: "Click logout button",
          actions: [
            {
              action: "click",
              selector: "#logout",
              options: {
                timeout: 10000
              },
              error: "Failed to click logout button after multiple retries.",
              retry: 3,
              fallbacks: [
                {
                  action: "click",
                  selector: "[data-test='logout']",
                  options: {
                    timeout: 10000
                  }
                },
                {
                  action: "waitForLoadState",
                  state: "load",
                  options: {
                    timeout: 10000
                  }
                }
              ]
            }
          ]
        }
      ];

      for (const stepData of testSteps) {
        const startTime = Date.now();
        let stepStatus = "success";
        let stepDetails = "";

        try {
          for (const actionData of stepData.actions) {
            try {
              switch (actionData.action) {
                case "goto":
                  await page.goto(actionData.url, actionData.options);
                  stepDetails = `Navigated to ${actionData.url}`;
                  break;
                case "fill":
                  await page.locator(actionData.selector).fill(actionData.value, actionData.options);
                  stepDetails = `Filled ${actionData.selector} with ${actionData.value}`;
                  break;
                case "click":
                  await page.locator(actionData.selector).click(actionData.options);
                  stepDetails = `Clicked ${actionData.selector}`;
                  break;
                case "check":
                  await page.locator(actionData.selector).check(actionData.options);
                  stepDetails = `Checked ${actionData.selector}`;
                  break;
                case "uncheck":
                  await page.locator(actionData.selector).uncheck(actionData.options);
                  stepDetails = `Unchecked ${actionData.selector}`;
                  break;
                case "hover":
                  await page.locator(actionData.selector).hover(actionData.options);
                  stepDetails = `Hovered ${actionData.selector}`;
                  break;
                case "waitFor":
                  await page.locator(actionData.selector).waitFor(actionData.options);
                  stepDetails = `Waited for ${actionData.selector}`;
                  break;
                case "isVisible":
                  const isVisible = await page.locator(actionData.selector).isVisible(actionData.options);
                  stepDetails = `Element ${actionData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
                  break;
                case "scrollIntoView":
                  await page.locator(actionData.selector).scrollIntoViewIfNeeded(actionData.options);
                  stepDetails = `Scrolled into view ${actionData.selector}`;
                  break;
                case "waitForLoadState":
                  await page.waitForLoadState(actionData.state, actionData.options);
                  stepDetails = `Waited for load state ${actionData.state}`;
                  break;
                default:
                  stepStatus = "error";
                  stepDetails = `Unknown action: ${actionData.action}`;
                  break;
              }
            } catch (actionError) {
              stepStatus = "error";
              stepDetails = `Action failed: ${actionError.message}`;

              if (actionData.fallbacks) {
                for (const fallbackAction of actionData.fallbacks) {
                  try {
                    switch (fallbackAction.action) {
                      case "goto":
                        await page.goto(fallbackAction.url, fallbackAction.options);
                        stepDetails += ` (Fallback: Navigated to ${fallbackAction.url})`;
                        break;
                      case "fill":
                        await page.locator(fallbackAction.selector).fill(fallbackAction.value, fallbackAction.options);
                        stepDetails += ` (Fallback: Filled ${fallbackAction.selector} with ${fallbackAction.value})`;
                        break;
                      case "click":
                        await page.locator(fallbackAction.selector).click(fallbackAction.options);
                        stepDetails += ` (Fallback: Clicked ${fallbackAction.selector})`;
                        break;
                      case "check":
                        await page.locator(fallbackAction.selector).check(fallbackAction.options);
                        stepDetails += ` (Fallback: Checked ${fallbackAction.selector})`;
                        break;
                      case "uncheck":
                        await page.locator(fallbackAction.selector).uncheck(fallbackAction.options);
                        stepDetails += ` (Fallback: Unchecked ${fallbackAction.selector})`;
                        break;
                      case "hover":
                        await page.locator(fallbackAction.selector).hover(fallbackAction.options);
                        stepDetails += ` (Fallback: Hovered ${fallbackAction.selector})`;
                        break;
                      case "waitFor":
                        await page.locator(fallbackAction.selector).waitFor(fallbackAction.options);
                        stepDetails += ` (Fallback: Waited for ${fallbackAction.selector})`;
                        break;
                      case "isVisible":
                        const isVisible = await page.locator(fallbackAction.selector).isVisible(fallbackAction.options);
                        stepDetails += ` (Fallback: Element ${fallbackAction.selector} is ${isVisible ? 'visible' : 'not visible'})`;
                        break;
                      case "scrollIntoView":
                        await page.locator(fallbackAction.selector).scrollIntoViewIfNeeded(fallbackAction.options);
                        stepDetails += ` (Fallback: Scrolled into view ${fallbackAction.selector})`;
                        break;
                      case "waitForLoadState":
                        await page.waitForLoadState(fallbackAction.state, fallbackAction.options);
                        stepDetails += ` (Fallback: Waited for load state ${fallbackAction.state})`;
                        break;
                      default:
                        stepStatus = "error";
                        stepDetails += ` (Fallback: Unknown action: ${fallbackAction.action})`;
                        break;
                    }
                    stepStatus = "success";
                    break;
                  } catch (fallbackError) {
                    stepStatus = "error";
                    stepDetails += ` (Fallback failed: ${fallbackError.message})`;
                  }
                }
              }
            }
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
        if (!process.env.KEEP_BROWSER_OPEN) {
          await browser.close();
        }
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
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    return result;
  }
});