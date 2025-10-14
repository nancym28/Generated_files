import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('SauceDemo Test', async () => {
  const originalUserSteps = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" in the username field with id user-name",
    "Enter \"secret_sauce\" in the password field with id password",
    "Click the Login button with id login-button",
    "Click on the product sort filter dropdown with class product_sort_container",
    "Select Name (Z to A) from the product sort filter dropdown with class product_sort_container",
    "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for the product Sauce Labs Backpack",
    "Click on the cart icon with class shopping_cart_link",
    "Verify that the product Sauce Labs Backpack is present in the cart",
    "Click on the Checkout button with id checkout",
    "Enter \"chaitanya\" in the first name field with id first-name",
    "Enter \"Kompella\" in the last name field with id last-name",
    "Enter \"62567352\" in the postal code field with id postal-code",
    "Click on the Continue button with id continue",
    "Click on the Finish button with id finish",
    "Verify the presence of the text “Thank you for your order!”",
    "Click on the Back to home button with id back-to-products",
    "Click on the burger bar button with id react-burger-menu-btn",
    "Click on the Logout button with id logout_sidebar_link"
  ];

  const stepsFromInput = [
    {
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "description": "Navigate to https://www.saucedemo.com/",
      "timeout": 10000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Navigate to https://www.saucedemo.com/"
    },
    {
      "action": "fill",
      "selector": "#user-name",
      "altSelectors": [
        "[data-test='username']",
        "input[name='user-name']",
        "input[placeholder='Username']"
      ],
      "value": "standard_user",
      "description": "Enter \"standard_user\" in the username field with id user-name",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "stepDescription": "Enter \"standard_user\" in the username field with id user-name"
    },
    {
      "action": "fill",
      "selector": "#password",
      "altSelectors": [
        "[data-test='password']",
        "input[name='password']",
        "input[placeholder='Password']"
      ],
      "value": "secret_sauce",
      "description": "Enter \"secret_sauce\" in the password field with id password",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "stepDescription": "Enter \"secret_sauce\" in the password field with id password"
    },
    {
      "action": "click",
      "selector": "#login-button",
      "altSelectors": [
        "[data-test='login-button']",
        "input[name='login-button']",
        "input[value='Login']"
      ],
      "description": "Click the Login button with id login-button",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click the Login button with id login-button"
    },
    {
      "action": "click",
      "selector": ".product_sort_container",
      "altSelectors": [
        "[data-test='product-sort-container']"
      ],
      "description": "Click on the product sort filter dropdown with class product_sort_container",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click on the product sort filter dropdown with class product_sort_container"
    },
    {
      "action": "click",
      "selector": ".product_sort_container > option[value='za']",
      "altSelectors": [
        "[data-test='product-sort-container'] > option[value='za']",
        "select.product_sort_container > option:nth-child(2)"
      ],
      "description": "Select Name (Z to A) from the product sort filter dropdown with class product_sort_container",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Select Name (Z to A) from the product sort filter dropdown with class product_sort_container"
    },
    {
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "altSelectors": [
        "[data-test='add-to-cart-sauce-labs-backpack']",
        "button[name='add-to-cart-sauce-labs-backpack']",
        "div.inventory_item:has-text('Sauce Labs Backpack') button"
      ],
      "description": "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for the product Sauce Labs Backpack",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click the Add to cart button with id add-to-cart-sauce-labs-backpack for the product Sauce Labs Backpack"
    },
    {
      "action": "click",
      "selector": ".shopping_cart_link",
      "altSelectors": [
        "[data-test='shopping-cart-link']"
      ],
      "description": "Click on the cart icon with class shopping_cart_link",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click on the cart icon with class shopping_cart_link"
    },
    {
      "action": "isVisible",
      "selector": "div.cart_item:has-text('Sauce Labs Backpack')",
      "altSelectors": [
        "[data-test='inventory-item']:has-text('Sauce Labs Backpack')",
        "a[id='item_4_title_link']:has-text('Sauce Labs Backpack')"
      ],
      "description": "Verify that the product Sauce Labs Backpack is present in the cart",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Verify that the product Sauce Labs Backpack is present in the cart"
    },
    {
      "action": "click",
      "selector": "#checkout",
      "altSelectors": [
        "[data-test='checkout']",
        "button[name='checkout']"
      ],
      "description": "Click on the Checkout button with id checkout",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click on the Checkout button with id checkout"
    },
    {
      "action": "fill",
      "selector": "#first-name",
      "altSelectors": [
        "[data-test='first-name']",
        "input[name='firstName']",
        "input[placeholder='First Name']"
      ],
      "value": "chaitanya",
      "description": "Enter \"chaitanya\" in the first name field with id first-name",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "stepDescription": "Enter \"chaitanya\" in the first name field with id first-name"
    },
    {
      "action": "fill",
      "selector": "#last-name",
      "altSelectors": [
        "[data-test='last-name']",
        "input[name='lastName']",
        "input[placeholder='Last Name']"
      ],
      "value": "Kompella",
      "description": "Enter \"Kompella\" in the last name field with id last-name",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "stepDescription": "Enter \"Kompella\" in the last name field with id last-name"
    },
    {
      "action": "fill",
      "selector": "#postal-code",
      "altSelectors": [
        "[data-test='postal-code']",
        "input[name='postalCode']",
        "input[placeholder='Zip/Postal Code']"
      ],
      "value": "62567352",
      "description": "Enter \"62567352\" in the postal code field with id postal-code",
      "timeout": 5000,
      "retries": 2,
      "assertions": [],
      "stepDescription": "Enter \"62567352\" in the postal code field with id postal-code"
    },
    {
      "action": "click",
      "selector": "#continue",
      "altSelectors": [
        "[data-test='continue']",
        "input[name='continue']"
      ],
      "description": "Click on the Continue button with id continue",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click on the Continue button with id continue"
    },
    {
      "action": "click",
      "selector": "#finish",
      "altSelectors": [
        "[data-test='finish']",
        "button[name='finish']"
      ],
      "description": "Click on the Finish button with id finish",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click on the Finish button with id finish"
    },
    {
      "action": "isVisible",
      "selector": "text='Thank you for your order!'",
      "altSelectors": [
        ".complete-header",
        ".complete-text"
      ],
      "description": "Verify the presence of the text “Thank you for your order!”",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Verify the presence of the text “Thank you for your order!”"
    },
    {
      "action": "click",
      "selector": "#back-to-products",
      "altSelectors": [
        "[data-test='back-to-products']",
        "button[name='back-to-products']"
      ],
      "description": "Click on the Back to home button with id back-to-products",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click on the Back to home button with id back-to-products"
    },
    {
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "altSelectors": [
        "[data-test='react-burger-menu-btn']"
      ],
      "description": "Click on the burger bar button with id react-burger-menu-btn",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click on the burger bar button with id react-burger-menu-btn"
    },
    {
      "action": "click",
      "selector": "#logout_sidebar_link",
      "altSelectors": [
        "[data-test='logout_sidebar_link']"
      ],
      "description": "Click on the Logout button with id logout_sidebar_link",
      "timeout": 5000,
      "retries": 3,
      "assertions": [],
      "stepDescription": "Click on the Logout button with id logout_sidebar_link"
    }
  ];

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
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
      if (stepsFromInput.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        for (const stepData of stepsFromInput) {
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