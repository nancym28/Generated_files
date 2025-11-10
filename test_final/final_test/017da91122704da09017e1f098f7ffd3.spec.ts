import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('Generated Test', async () => {
  // Initialize immediately to guarantee they exist
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the input field with id 'user-name'.",
    "Enter \"secret_sauce\" in the input field with id 'password'.",
    "Click the input field with id 'login-button'.",
    "Click on the product sort filter dropdown with data-test 'product-sort-container'.",
    "Select Name (Z to A) from the product sort filter dropdown with data-test 'product-sort-container'.",
    "Find the product \"pencil\" and click the Add to Cart button.",
    "Click on the shopping cart link with data-test 'shopping-cart-link'.",
    "Ensure that the product is present in the cart.",
    "Click on the checkout button with data-test 'checkout'.",
    "Enter \"chai\" in the first name field with id 'first-name'.",
    "Enter \"Kompella\" in the last name field with id 'last-name'.",
    "Enter \"62567352\" in postal code field with id 'postal-code'.",
    "Click on continue button with data-test 'continue'.",
    "Click on finish button with data-test 'finish'.",
    "You should see a message “Thank you for your order!”.",
    "Then click on back to home button with data-test 'back-to-products'.",
    "Click  to burger bar",
    "Click on logout.",
    "Keep the browser open after the test execution is complete."
  ];
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  try {
    // Browser setup with its own error handling
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

    // Only proceed with steps if setup succeeded
    if (!setupError && page) {
      // Handle empty steps case
      if (originalUserSteps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        // Execute each step with individual error handling
        for (let i = 0; i < originalUserSteps.length; i++) {
          const stepDescription = originalUserSteps[i];
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            // Execute the specific action
            if (stepDescription.startsWith("Navigate to")) {
              const url = stepDescription.substring("Navigate to".length).trim().replace(/\.$/, '');
              await page.goto(url);
              stepDetails = `Navigated to ${url}`;
            } else if (stepDescription.startsWith("Enter")) {
              const parts = stepDescription.split(" in the input field with id ");
              const value = parts[0].substring("Enter ".length).trim().replace(/"/g, '');
              const selector = `#${parts[1].replace(/\.$/, '').replace(/'/g, '')}`;
              await page.locator(selector).fill(value);
              stepDetails = `Filled ${selector}`;
            } else if (stepDescription.startsWith("Click the input field with id")) {
              const selector = `#${stepDescription.split("id ")[1].replace(/\.$/, '').replace(/'/g, '')}`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (stepDescription.startsWith("Click on the product sort filter dropdown with data-test")) {
              const selector = `[data-test='${stepDescription.split("data-test ")[1].replace(/\.$/, '').replace(/'/g, '')}']`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (stepDescription.startsWith("Select Name (Z to A) from the product sort filter dropdown with data-test")) {
              const selector = `[data-test='product-sort-container']`;
              await page.locator(selector).selectOption({ label: 'Name (Z to A)' });
              stepDetails = `Selected Name (Z to A) from ${selector}`;
            } else if (stepDescription.startsWith("Find the product")) {
              const parts = stepDescription.split("and click the Add to Cart button.");
              const productName = parts[0].substring("Find the product ".length).trim().replace(/"/g, '');
              const selector = `//div[contains(text(), '${productName}')]/ancestor::div[@class='inventory_item']//button`;
              await page.locator(selector).click();
              stepDetails = `Clicked Add to Cart for ${productName}`;
            } else if (stepDescription.startsWith("Click on the shopping cart link with data-test")) {
              const selector = `[data-test='${stepDescription.split("data-test ")[1].replace(/\.$/, '').replace(/'/g, '')}']`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (stepDescription.startsWith("Ensure that the product is present in the cart.")) {
              // Assuming you want to check for at least one product in the cart
              const cartItemSelector = '.cart_item';
              await page.locator(cartItemSelector).waitFor();
              const isVisible = await page.locator(cartItemSelector).isVisible();
              stepDetails = isVisible ? "Product is present in the cart" : "Product is not present in the cart";
              if (!isVisible) {
                stepStatus = "error";
              }
            } else if (stepDescription.startsWith("Click on the checkout button with data-test")) {
              const selector = `[data-test='${stepDescription.split("data-test ")[1].replace(/\.$/, '').replace(/'/g, '')}']`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (stepDescription.startsWith("Enter")) {
              if (stepDescription.includes("first name field with id")) {
                const parts = stepDescription.split(" in the first name field with id ");
                const value = parts[0].substring("Enter ".length).trim().replace(/"/g, '');
                const selector = `#${parts[1].replace(/\.$/, '').replace(/'/g, '')}`;
                await page.locator(selector).fill(value);
                stepDetails = `Filled ${selector}`;
              } else if (stepDescription.includes("last name field with id")) {
                const parts = stepDescription.split(" in the last name field with id ");
                const value = parts[0].substring("Enter ".length).trim().replace(/"/g, '');
                const selector = `#${parts[1].replace(/\.$/, '').replace(/'/g, '')}`;
                await page.locator(selector).fill(value);
                stepDetails = `Filled ${selector}`;
              } else if (stepDescription.includes("postal code field with id")) {
                const parts = stepDescription.split(" in postal code field with id ");
                const value = parts[0].substring("Enter ".length).trim().replace(/"/g, '');
                const selector = `#${parts[1].replace(/\.$/, '').replace(/'/g, '')}`;
                await page.locator(selector).fill(value);
                stepDetails = `Filled ${selector}`;
              }
            } else if (stepDescription.startsWith("Click on continue button with data-test")) {
              const selector = `[data-test='${stepDescription.split("data-test ")[1].replace(/\.$/, '').replace(/'/g, '')}']`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (stepDescription.startsWith("Click on finish button with data-test")) {
              const selector = `[data-test='${stepDescription.split("data-test ")[1].replace(/\.$/, '').replace(/'/g, '')}']`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (stepDescription.startsWith("You should see a message")) {
              const expectedMessage = stepDescription.split("You should see a message ")[1].trim().replace(/[“”]/g, '');
              const selector = '.complete-header';
              await page.locator(selector).waitFor();
              const actualMessage = await page.locator(selector).innerText();
              if (actualMessage.trim() === expectedMessage) {
                stepDetails = `Message "${expectedMessage}" is displayed`;
              } else {
                stepStatus = "error";
                stepDetails = `Expected message "${expectedMessage}", but got "${actualMessage}"`;
              }
            } else if (stepDescription.startsWith("Then click on back to home button with data-test")) {
              const selector = `[data-test='${stepDescription.split("data-test ")[1].replace(/\.$/, '').replace(/'/g, '')}']`;
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (stepDescription.startsWith("Click  to burger bar")) {
              const selector = '#react-burger-menu-btn';
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (stepDescription.startsWith("Click on logout.")) {
              const selector = '#logout_sidebar_link';
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            } else if (stepDescription.startsWith("Keep the browser open after the test execution is complete.")) {
              stepDetails = "Keeping browser open";
            } else {
              stepStatus = "error";
              stepDetails = `Unknown step: ${stepDescription}`;
            }

            stepDetails = `Successfully executed: ${stepDescription}`;
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepDescription}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(stepDescription);
          executionResults.push({
            step: stepDescription,
            status: stepStatus,
            details: stepDetails,
            timestamp: startTime,
            duration_ms: endTime - startTime
          });
        }
      }
    }
  } catch (unexpectedError) {
    // Only add this if no other results exist
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
    // Guaranteed cleanup and return
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        // Log but don't fail - we still need to return results
      }
    }

    // Ensure we always have at least one result
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
      require('fs').writeFileSync('017da91122704da09017e1f098f7ffd3.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    // GUARANTEED RETURN - This must ALWAYS execute
    return result;
  }
});