const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver'); 
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

// Add options to prevent the browser from closing immediately
const options = new chrome.Options();
options.addArguments('--start-maximized');

// Launch the browser with options
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build(); 

async function runTest() {
    try {
        // Open the HTML file in the browser
        await driver.get('file://' + __dirname + '/index.html');
        
        // Find the input elements and enter values
        const num1 = await driver.findElement(By.id('num1'));
        await num1.sendKeys('50');
        
        const num2 = await driver.findElement(By.id('num2'));
        await num2.sendKeys('10');

        // Click the "Add" button
        const addButton = await driver.findElement(By.id('add'));
        await addButton.click();

        // Wait until the result is updated
        const result = await driver.findElement(By.id('result'));
        await driver.wait(until.elementTextIs(result, '60'), 5000);
        
        // Get the result text and verify it
        const text = await result.getText();
        assert.strictEqual(text, '60', 'Sum is incorrect');
        console.log('Test passed');

        // Keep the browser open for review
        await new Promise(() => {});

    } catch (error) {
        console.error('Test failed', error);
    } 
}

runTest();
