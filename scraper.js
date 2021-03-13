// © BAPS Swaminarayan Sanstha 2021

// Library that helps us read and write files to disk
const fs = require('fs');
// Library that helps us read webpages to scrape data
const puppeteer = require('puppeteer');

const CHECK_MARK = String.fromCodePoint(0x2705);
const ZANY_FACE = String.fromCodePoint(0x1f92a);

// This is a function that is executed when this script is run.
// It load the website at URL and tries to scrape data.
(async (url, fileName) => {
  // Start tracking how long our script takes to scrape the page
  console.time('Scraping');
  console.log(ZANY_FACE, ' Here goes nothing...');

  // Launch a browser and go to URL
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  try {
    // Read HTML and gather information about each center
    const centers = await page.evaluate(() => {
      const results = [];
      for (let i of document.querySelectorAll('*')) {
        const id = i.getAttribute('id');
        if (/^ctl01_mainContent_ctl00_rptLinks_.*_l1$/.test(id)) {
          // Get name and image
          const name = i.querySelector('h3.content-title > a');
          const image = i.querySelector('img.carousel-inner');

          // Get address
          const description = i.querySelector('div.description > div');
          let address = 'NONE';
          if (description != null) {
            address = description.textContent
              // Replace new line (ie. enter) character with comma
              .replace(/\n/gi, ',')
              // Get parts of the address in an array
              .split(',')
              // Remove starting and ending spaces
              .map(text => text.trim())
              // Keep only text that is not empty
              .filter(text => text.length !== 0);
          }

          // Add the center entry into our data.
          results.push({
            address: address != null ? address : [],
            image: image != null ? image.getAttribute('src') : 'NONE',
            name: name != null ? name.textContent : 'NONE',
          });
        }
      }
      return results;
    });

    // Log the time it took to scrape the page
    console.timeLog('Scraping');
    console.log(CHECK_MARK, ' Successfully scraped %s', url);

    if (centers.length > 0) {
      console.time('Writing');
      console.log('Writing center data to file for %s center', centers.length);
  
      // Write centers data to a file with given name
      fs.writeFileSync(fileName, JSON.stringify(centers, null, 4));
  
      console.log(CHECK_MARK, ' Successfully wrote center data to file: %s', fileName);
      console.timeLog('Writing');
    }

  } catch (err) {
    console.log('Error...');
    console.log(error);
  } finally {
    console.log(CHECK_MARK, ' Closing browser...');

    // Close the browser we opened at the beginning to cleanup memory
    await browser.close();
  }
})(
  // Webpage we want to scrape
  'https://www.baps.org/Global-Network/North-America/BAPS-North-America---All-Centers.aspx',
  // File name where we want to store this data
  'centers.json',
);