This is a sample README file that you can use as a template
when submitting your project files.

## Scraper Setup - Mac

1. Download the project and place it on your Desktop
2. Open terminal and run `cd ~/Desktop/scraper`
3. Install required components by running `yarn install`

- If this command fails, you likely need to install BOTH `npm` and `yarn`
- If you do not have `npm` installed, following the instructions
  at `https://www.npmjs.com/get-npm`
- If you do not have `yarn` installed, follow the instructions
  at `https://classic.yarnpkg.com/en/docs/install/#mac-stable `

4. Run `yarn start` to execute the scrapper script. If done right, you should
   see output as follows:

```
> yarn start
yarn run v1.12.1
$ node scraper.js
🤪  Here goes nothing...
Scraping: 7524.811ms
✅  Successfully scraped %s https://www.baps.org/Global-Network/North-America/BAPS-North-America---All-Centers.aspx
Writing center data to file for 103 center
✅  Successfully wrote center data to file: %s centers.json
Writing: 0.766ms
✅  Closing browser...
✨  Done in 8.20s.
```

5. Ensure that `centers.json` file is created and has the JSON data for all BAPS North American centers.
