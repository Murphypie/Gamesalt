const puppeteer = require('puppeteer');
const fs = require('fs');
const fastcsv = require('fast-csv');
const path = require('path')

async function scrapeMetacritic(){
    // headless: false indicates that we do not want the browser to be hidden when we run our script. You can see the activity being executed in the browser
    // By default the browser window in Chromium is very small and it’s hard to see everything, so we can override this with the following parameter defaultViewport: false
    const browser = await puppeteer.launch({headless: false, defaultViewport:false})
    const page = await browser.newPage();

    let listPageData = [];

    await page.goto('https://www.metacritic.com/search/game/the%20legend%20of%20zelda/results', {waitUntil: "load"});

    // After going to the page, there might be multiple entries. We want to navigate as long as the "Next" button is present and clickable.
    // We can do that by using Puppeteer's built in page.$() function and passing the query selector span.flipper.next > a > span 
    // span.flipper.next is a span class name that contains next button in Metacritic
    let nextButtonVisible = await page.$('span.flipper.next > a > span') !== null;

    while(nextButtonVisible){
        await page.waitForSelector('.search_results.module > .result.first_result') // Wait until page is loaded. Runs for every Next button

        // $ is querySelector, $$ for querySelectorAll
        const gameResults = await page.$$('.search_results.module > .result'); // Gets every search result
        
        for(const gameResult of gameResults){
            const title = await page.evaluate(el => el.querySelector('.product_title.basic_stat > a').textContent, gameResult)
            const metacriticScore = await page.evaluate(el => el.querySelector('.metascore_w').textContent, gameResult);
            const url = await page.evaluate(el => el.querySelector('.product_title.basic_stat a[href]').href, gameResult);
            listPageData.push({
                title: title.trim(),
                metacriticScore: metacriticScore.trim(),
                pageUrl: url.trim()
            })
        }

        if (await page.$('span.flipper.next > a > span') !== null) {
            await page.waitForSelector('span.flipper.next > a > span');
            await page.click('span.flipper.next > a > span');
        } else {
            nextButtonVisible = false;
        }   
    }

      // let's try to figure out how to add unique elements from the details page to our existing list of JSON object created (listpageData)
      for(entry of listPageData){
        let url = entry.pageUrl; // To be used to navigate to the details page of the current listing 
        await page.evaluate((url)=>{window.location = url}, url); // Navigate to the details page,
        await page.waitForSelector('body > iframe'); // Wait for the page to load before trying to do interactions

        let userScore = null;
        // Get the contents of the details page
        const itemDetails = await page.$('.module.product_data.product_data_summary');

        try {
            userScore = await page.evaluate(el => el.querySelector('.metascore_w.user').innerText, itemDetails);
        } catch(error) {}
        
        //const genre = await page.evaluate(el => el.querySelector('.summary_detail.product_genre .data').innerText, itemDetails);
        const genre = await page.evaluate(el => el.querySelector('.summary_detail.product_genre').innerText, itemDetails);

        var matchingEntry = listPageData.filter(function(item) { return item.pageUrl === url; });

        if (matchingEntry.length > 0) {
            matchingEntry[0]['userScore'] = userScore;
            matchingEntry[0]['genre'] = genre;
        }

      }

      const ws = fs.createWriteStream(path.resolve(__dirname, './data', "out.csv"));
      fastcsv.write(listPageData, { headers: true })
          .pipe(ws);
      await browser.close();
      console.log('Web Scraping Complete');
}

scrapeMetacritic();