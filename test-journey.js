const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the local server
  await page.goto('http://localhost:3000/#journey');
  
  // Wait for the JourneySteps section to load
  await page.waitForSelector('#journey');
  
  // Check the card dimensions
  const cardHandle = await page.$('.bg-white.dark\\:bg-brand-dark-secondary.shadow-\\[0px_20px_40px_-10px_rgba\\(0\\,0\\,0\\,0\\.05\\)\\]');
  if (cardHandle) {
    const box = await cardHandle.boundingBox();
    console.log(`Card dimensions: width=${box.width}, height=${box.height}`);
  } else {
    console.log('Card not found');
  }
  
  await browser.close();
})();
