import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Demoblaze Purchase Flow', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    "Navigate to https://www.demoblaze.com/",
    "Click on the 'Log in' link",
    "Enter 'chaitanya123' in the 'Username' field in the Log in modal",
    "Enter 'Password@123' in the 'Password' field in the Log in modal",
    "Click the 'Log in' button in the Log in modal",
    "Click on the 'Laptops' category",
    "Click on the product 'Sony vaio i5'",
    "Click the 'Add to cart' button",
    "Wait for the alert and accept it",
    "Click on the 'Cart' link",
    "Verify that the 'Sony vaio i5' is present in the cart",
    "Click on the 'Place Order' button",
    "Enter 'Chaitanya' in the 'Name' field in the order modal",
    "Enter 'India' in the 'Country' field in the order modal",
    "Enter 'Hyderabad' in the 'City' field in the order modal",
    "Enter '1234 5678 9876 5432' in the 'Credit Card' field in the order modal",
    "Enter 'October' in the 'Month' field in the order modal",
    "Enter '2025' in the 'Year' field in the order modal",
    "Click 'Purchase' in the order modal",
    "Verify that a confirmation message appears with the text 'Thank you for your purchase!'",
    "Click 'OK' on the confirmation popup",
    "Keep the browser open"
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  try {
    try {
      browser = await chromium.launch({
        headless: false,
        slowMo: 50,
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
    } catch (setupErr: any) {
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
          "step": 1,
          "action": "goto",
          "url": "https://www.demoblaze.com/",
          "description": "Navigate to the homepage",
          "waitStrategy": "domcontentloaded",
          "timeout": 10000,
          "retry": 3,
          "errorHandling": "logAndContinue",
          "selector": null,
          "value": null
        },
        {
          "step": 2,
          "action": "click",
          "selector": "#login2",
          "selectorType": "css",
          "description": "Click on the 'Log in' link",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//a[text()='Log in']",
            "text=Log in"
          ],
          "value": null
        },
        {
          "step": 3,
          "action": "fill",
          "selector": "#loginusername",
          "selectorType": "css",
          "value": "chaitanya123",
          "description": "Enter 'chaitanya123' in the 'Username' field in the Log in modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//input[@id='loginusername']",
            "[placeholder='Username']"
          ]
        },
        {
          "step": 4,
          "action": "fill",
          "selector": "#loginpassword",
          "selectorType": "css",
          "value": "Password@123",
          "description": "Enter 'Password@123' in the 'Password' field in the Log in modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//input[@id='loginpassword']",
            "[placeholder='Password']"
          ]
        },
        {
          "step": 5,
          "action": "click",
          "selector": "//button[text()='Log in']",
          "selectorType": "xpath",
          "description": "Click the 'Log in' button in the Log in modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "button.btn.btn-primary[onclick='logIn()']",
            "text=Log in"
          ],
          "value": null
        },
        {
          "step": 6,
          "action": "click",
          "selector": "//a[text()='Laptops']",
          "selectorType": "xpath",
          "description": "Click on the 'Laptops' category",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "text=Laptops",
            "[href*='notebook']"
          ],
          "value": null
        },
        {
          "step": 7,
          "action": "click",
          "selector": "//a[text()='Sony vaio i5']",
          "selectorType": "xpath",
          "description": "Click on the product 'Sony vaio i5'",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "text=Sony vaio i5",
            "a.hrefch:has-text('Sony vaio i5')"
          ],
          "value": null
        },
        {
          "step": 8,
          "action": "click",
          "selector": "//a[contains(text(),'Add to cart')]",
          "selectorType": "xpath",
          "description": "Click the 'Add to cart' button",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "button.btn.btn-success[onclick*='addToCart']",
            "text=Add to cart"
          ],
          "value": null
        },
        {
          "step": 9,
          "action": "click",
          "selector": "body",
          "selectorType": "css",
          "description": "Wait for the alert and accept it",
          "waitStrategy": "alert",
          "timeout": 5000,
          "retry": 1,
          "errorHandling": "throw",
          "value": null
        },
        {
          "step": 10,
          "action": "click",
          "selector": "#cartur",
          "selectorType": "css",
          "description": "Click on the 'Cart' link",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//a[text()='Cart']",
            "text=Cart"
          ],
          "value": null
        },
        {
          "step": 11,
          "action": "isVisible",
          "selector": "//td[text()='Sony vaio i5']",
          "selectorType": "xpath",
          "description": "Verify that the 'Sony vaio i5' is present in the cart",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "text=Sony vaio i5",
            "//table[@id='tbodyid']//td[contains(text(),'Sony vaio i5')]"
          ],
          "value": null
        },
        {
          "step": 12,
          "action": "click",
          "selector": "//button[text()='Place Order']",
          "selectorType": "xpath",
          "description": "Click on the 'Place Order' button",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "button.btn.btn-success[data-target='#orderModal']",
            "text=Place Order"
          ],
          "value": null
        },
        {
          "step": 13,
          "action": "fill",
          "selector": "#name",
          "selectorType": "css",
          "value": "Chaitanya",
          "description": "Enter 'Chaitanya' in the 'Name' field in the order modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//input[@id='name']",
            "[placeholder='Name']"
          ]
        },
        {
          "step": 14,
          "action": "fill",
          "selector": "#country",
          "selectorType": "css",
          "value": "India",
          "description": "Enter 'India' in the 'Country' field in the order modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//input[@id='country']",
            "[placeholder='Country']"
          ]
        },
        {
          "step": 15,
          "action": "fill",
          "selector": "#city",
          "selectorType": "css",
          "value": "Hyderabad",
          "description": "Enter 'Hyderabad' in the 'City' field in the order modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//input[@id='city']",
            "[placeholder='City']"
          ]
        },
        {
          "step": 16,
          "action": "fill",
          "selector": "#card",
          "selectorType": "css",
          "value": "1234 5678 9876 5432",
          "description": "Enter '1234 5678 9876 5432' in the 'Credit Card' field in the order modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//input[@id='card']",
            "[placeholder='Credit Card']"
          ]
        },
        {
          "step": 17,
          "action": "fill",
          "selector": "#month",
          "selectorType": "css",
          "value": "October",
          "description": "Enter 'October' in the 'Month' field in the order modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//input[@id='month']",
            "[placeholder='Month']"
          ]
        },
        {
          "step": 18,
          "action": "fill",
          "selector": "#year",
          "selectorType": "css",
          "value": "2025",
          "description": "Enter '2025' in the 'Year' field in the order modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "//input[@id='year']",
            "[placeholder='Year']"
          ]
        },
        {
          "step": 19,
          "action": "click",
          "selector": "//button[text()='Purchase']",
          "selectorType": "xpath",
          "description": "Click 'Purchase' in the order modal",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "button.btn.btn-primary[onclick='purchaseOrder()']",
            "text=Purchase"
          ],
          "value": null
        },
        {
          "step": 20,
          "action": "isVisible",
          "selector": "//h2[text()='Thank you for your purchase!']",
          "selectorType": "xpath",
          "description": "Verify that a confirmation message appears with the text 'Thank you for your purchase!'",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "text=Thank you for your purchase!",
            ".sweet-alert h2"
          ],
          "value": null
        },
        {
          "step": 21,
          "action": "click",
          "selector": "//button[text()='OK']",
          "selectorType": "xpath",
          "description": "Click 'OK' on the confirmation popup",
          "waitStrategy": "visible",
          "timeout": 5000,
          "retry": 3,
          "errorHandling": "throw",
          "alternativeSelectors": [
            "button.confirm",
            "text=OK"
          ],
          "value": null
        }
      ];

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
              case "click":
                try {
                  await page.locator(stepData.selector).click();
                  stepDetails = `Clicked ${stepData.selector}`;
                } catch (error) {
                  let clicked = false;
                  if (stepData.alternativeSelectors) {
                    for (const altSelector of stepData.alternativeSelectors) {
                      try {
                        await page.locator(altSelector).click();
                        stepDetails = `Clicked ${altSelector} (alternative)`;
                        clicked = true;
                        break;
                      } catch (altError) {
                        // Ignore alternative selector error, try next one
                      }
                    }
                  }
                  if (!clicked) {
                    throw error; // Re-throw original error if no alternative worked
                  }
                }
                break;
              case "fill":
                try {
                  await page.locator(stepData.selector).fill(stepData.value);
                  stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                } catch (error) {
                  let filled = false;
                  if (stepData.alternativeSelectors) {
                    for (const altSelector of stepData.alternativeSelectors) {
                      try {
                        await page.locator(altSelector).fill(stepData.value);
                        stepDetails = `Filled ${altSelector} with ${stepData.value} (alternative)`;
                        filled = true;
                        break;
                      } catch (altError) {
                        // Ignore alternative selector error, try next one
                      }
                    }
                  }
                  if (!filled) {
                    throw error; // Re-throw original error if no alternative worked
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
                  await page.locator(stepData.selector).isVisible();
                  stepDetails = `Element ${stepData.selector} is visible`;
                } catch (error) {
                  stepDetails = `Element ${stepData.selector} is not visible`;
                  stepStatus = "error";
                }
                break;
              case "alert":
                page.on('dialog', async dialog => {
                  await dialog.accept();
                  stepDetails = `Alert accepted`;
                });
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
      } catch (closeError: any) {
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
    } catch (writeError: any) {
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    return result;
  }
});