const fs = require('fs');
const cheerio = require("cheerio");
var randomUseragent = require('random-useragent');
const urlExist = require('url-exist');
var founded_url = 0;
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';
const useProxy = require('puppeteer-page-proxy');
// That's it, the rest is puppeteer usage as normal 😊
var PROXY_USERNAME = 'scraperapi';
var PROXY_PASSWORD = 'cd5497eba7916ba846ecfa745772f477'; // <-- enter your API_Key here
var PROXY_SERVER = 'proxy-server.scraperapi.com';
var PROXY_SERVER_PORT = '8001';
async function scrpeP(url,page,myObject){
    try {
          
        // console.log(url)
        await page.goto(url, { 'timeout': 20000, 'waitUntil': 'domcontentloaded' });
        //await page.waitForTimeout(10000);  
        // await page.solveRecaptchas()s
        const html = await page.content();
        const $ = await cheerio.load(html);
        var someArray = []// Array(no_page_to_scrape).fill(0).map((e,i)=>i+1)


        $('#listContainer').find('.list-listing-title-link').each(function (index, element) {

            someArray.push("https://www.controlleremea.co.uk" + $(element).attr("href"))
           // aircraft_in_page.push($(element).attr("href"))
        });
        if(myObject.length==0){
            var d = { url }
            var data = JSON.stringify(d);
            var parsed = JSON.parse(data);
            myObject.push(parsed);
            var newData = JSON.stringify(myObject);

            fs.writeFile('url_result_controller.json', newData, (err) => {
                if (err) reject(err)
                founded_url = founded_url + 1;
                console.log("Aircraft url saved (" + founded_url + ')')
        
            })
        }
        // 
        for (let index = 0; index < someArray.length; index++) {
            const url = someArray[index];
            for(let p=0;p<myObject.length;p++){
                if(url==myObject[p].url){
                    break;
                }else if(p==myObject.length-1){
                    var d = { url }
                    var data = JSON.stringify(d);
                    var parsed = JSON.parse(data);
                    myObject.push(parsed);
                    var newData = JSON.stringify(myObject);

                    fs.writeFile('url_result_controller.json', newData, (err) => {
                        if (err) reject(err)
                        founded_url = founded_url + 1;
                        console.log("Aircraft url saved (" + founded_url + ')')
                        console.log(index)
                    })
                }

            }
            //  console.log(url)
        } 
        if(someArray.length==0){
          return false;
        }else{
            return true;
        }

    

} catch (e) {
    console.error(e)
}  
}
async function scrapePage(category,page,myObject,someArray2){
    
    for (let v = 0; v < someArray2.length; v++) {
        const pa = category+someArray2[v] 
      await  scrpeP(pa,page,myObject)
    }
}
const scraperObject = {
    url: 'https://bina.az/items/3408770',
    async scraper(browser) {

        const userAgent = randomUseragent.getRandom();


        const UA = USER_AGENT;

        const page = await browser.newPage()
        const cookies_c = [{
            "name": "_uetsid",
            "value": "1c7ca0e0ec9a11eda433bd325d152eb6",
            "domain": "controlleremea.co.uk",
            "path": "/",
            "expires": 1683524662,
            "size": 39,
            "httpOnly": false,
            "secure": false,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "__gpi",
            "value": "UID=00000c11a7480ec7:T=1683438216:RT=1683438216:S=ALNI_Mbyt-Uq0l5r4FlDHBBvboHgF6qpyQ",
            "domain": "controlleremea.co.uk",
            "path": "/",
            "expires": 1717134216,
            "size": 89,
            "httpOnly": false,
            "secure": false,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "__gads",
            "value": "ID=a4f5b58b7ea1cfec:T=1683438216:S=ALNI_MZIiozRq1gcPn0kpETJ_dUC-yWm9w",
            "domain": "controlleremea.co.uk",
            "path": "/",
            "expires": 1717134216,
            "size": 75, 
            "httpOnly": false,
            "secure": false,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "Tracking",
            "value": "SessionStarted=1&UserReferrer=https%3a%2f%2fwww.controlleremea.co.uk%2flistings%2ffor-sale%2fjet-aircraft%2f3&GUID=387990177494717553283",
            "domain": "www.controlleremea.co.uk",
            "path": "/",
            "expires": 1683439459.576923,
            "size": 144,
            "httpOnly": false,
            "secure": true,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "AMP_TOKEN",
            "value": "%24NOT_FOUND",
            "domain": "controlleremea.co.uk",
            "path": "/",
            "expires": 1683441816,
            "size": 21,
            "httpOnly": false,
            "secure": false,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "_ga",
            "value": "GA1.1.133370643.16834^C",
            "domain": "controlleremea.co.uk",
            "httpOnly": true,
            "secure": true,
            "session": true,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "_uetvid",
            "value": "1c7d2440ec9a11ed89bc71feabac04f2",
            "domain": "controlleremea.co.uk",
            "path": "/",
            "expires": 1717134262,
            "size": 39,
            "httpOnly": false,
            "secure": false,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "__RequestVerificationToken",
            "value": "lkFPYX_-ljqbN53wUnskfKlivcewaza7VFhhD8w0Xb1uLQZ33bJYXtiJt-cTH78GcHtBAA2",
            "domain": "www.controlleremea.co.uk",
            "path": "/",
            "expires": -1,
            "size": 97,
            "httpOnly": true,
            "secure": false,
            "session": true,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "_ga_YW84BNZ375",
            "value": "GS1.1.1683438213.1.1.1683438260.0.0.0",
            "domain": "controlleremea.co.uk",
            "path": "/",
            "expires": 1746510260,
            "size": 51,
            "httpOnly": false,
            "secure": false,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "UserID",
            "value": "ID=hrMl%2fHnntFfhO9jxnCxRuYqIxmStKJEZHYM0zoraPbyg73XVSpoxzJV653dFsH8PBckXNK7nth3qIVLcMCy1sg%3d%3d&LV=aAogvCuOQO3HerZiX2ueF1FoMYlOIHCw2jy3IMkHqQIThXSYTokLx8OuAK1%2fofWqCpE5QHfvLm76E5li3CmgWSAfCimI9R3b",
            "domain": "www.controlleremea.co.uk",
            "path": "/",
            "expires": 1999057407.167773,
            "size": 205,
            "httpOnly": false,
            "secure": true,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "reese84",
            "value": "3:G453SJPsz4B5t6mqag3u5g==:U+PC64ae0IhrBGGNbHOE9fq27DseNvZmwvSZQ9GS8WPYSArVDeLXYY4GRaHJlp1iFn6lMZ0+fRAWNuazSIa2ZLpgiKErYOjcmG5hO+kXyqZl8VfO/7n1LtsoYYJdRbaGg760nvj1QMRKe193/iV2/RSAEmcUHyID+SdS3qSTYbfl0M4+S/2J6PK3+4fBk8Qt1lyA1qa76aGokUrJvvgCykzjZp8b5iW2JM8DVF34RCcUESjCY+K9Xc0R8RbqLwfwm4Kb2W1f6RD/o62marZA3DFbGg5At63NUUSbwLng8P5I4YTKtLH8PJl+bEsdugJ38hAK+0dtx9vXJg/7J0RCKe8GmkNFymEK9Sw3jxicV7ofQ+KThzQFfA5lDVp8OoCdL7f4ER8jBEt7EpC99348baSsRhxPxRHp7/U/YG+waU0P52fzFzGpUEK5RdPihgo4n7bEXRPWAC4GRyZWFuLeY1o2zdmTKg5wBQ9blVsbdIk97XnLUyzOaD6aKJ+awyFSWspKowiCiu+Nzw2Z26pS1pSNrozfEI3yslBlNKYmepaVoyLd/SeR8rTTjew25c2ORDzFraUpdrmyDsguAfUAAZtkusSPPJBsQvrRE0w7LXfHdeKkfMSh6zxquRBdh7+z8AUFEpvHQWmm3Pnn40qA1YaLgznjCGONnmRO4xqYQaxf3XqKcoGv4GnK6DtcE/vZr9Z7LdvvP72u771aTusLzA==:77QsSDHp7LKSX0i+nv78GrwCCBquoXEdtSux9j7JQBI=",
            "domain": "www.controlleremea.co.uk",
            "path": "/",
            "expires": 1686030207.06595,
            "size": 807,
            "httpOnly": false,
            "secure": false,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "UserSettingsCookie",
            "value": "screenSize=1980|3087",
            "domain": "www.controlleremea.co.uk",
            "path": "/",
            "expires": 1714971600.730007,
            "size": 38,
            "httpOnly": false,
            "secure": true,
            "session": false,
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }, {
            "name": "ASP.NET_SessionId",
            "value": "tg3xye4tudswhgum1jer0pex",
            "domain": "www.controlleremea.co.uk",
            "path": "/",
            "expires": -1,
            "size": 41,
            "httpOnly": true,
            "secure": false,
            "session": true,
            "sameSite": "Lax",
            "sameParty": false,
            "sourceScheme": "Secure",
            "sourcePort": 443
        }]
        await page.setCookie(...cookies_c);
        //   await page.authenticate({
        //     username: PROXY_USERNAME,
        //         password: PROXY_PASSWORD,
        //   });
        //Randomize viewport size 
        //  await useProxy(page, 'http://127.0.0.1:3001');
        await page.setViewport({
            width: 1920 + Math.floor(Math.random() * 100),
            height: 3000 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });

        await page.setUserAgent(UA);
        await page.setJavaScriptEnabled(true);
        await page.setDefaultNavigationTimeout(0);

        //Skip images/styles/fonts loading for performance
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.evaluateOnNewDocument(() => {
            // Pass webdriver check
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        await page.evaluateOnNewDocument(() => {
            // Pass chrome check
            window.chrome = {
                runtime: {},
                // etc.
            };
        });

        await page.evaluateOnNewDocument(() => {
            //Pass notifications check
            const originalQuery = window.navigator.permissions.query;
            return window.navigator.permissions.query = (parameters) => (
                parameters.name === 'notifications' ?
                    Promise.resolve({ state: Notification.permission }) :
                    originalQuery(parameters)
            );
        });

        await page.evaluateOnNewDocument(() => {
            // Overwrite the `plugins` property to use a custom getter.
            Object.defineProperty(navigator, 'plugins', {
                // This just needs to have `length > 0` for the current test,
                // but we could mock the plugins too if necessary.
                get: () => [1, 2, 3, 4, 5],
            });
        });

        await page.evaluateOnNewDocument(() => {
            // Overwrite the `languages` property to use a custom getter.
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            });
        });
        var url = 'https://www.controlleremea.co.uk/listings/for-sale/jet-aircraft/3';
        //await page.setRequestInterception(true); 
        var founded_url = 0;

        console.log(`Navigating to ${url}...`);


        await page.goto(url, { 'timeout': 200000, 'waitUntil': 'domcontentloaded' });

        await page.waitForTimeout(10000);
        //  await page.waitForSelector('.breadcrumbs__list-item')
        // await page.solveRecaptchas() 
        // get the last element  

        await Promise.all([
            page.setCookie(...cookies_c),
            page.waitForNavigation(),
            

        ])
        await scrapeAirCraft();

        // Limit requests 
        var the_interval = 5 * 60 * 1000;
       await setInterval(async function () {
            await scrapeAirCraft();
            // do your stuff here
        }, the_interval);

        var no_page_to_scrape = 100;
        // store an array with a length of no-page to be scraped . 
        var someArray2 = Array(no_page_to_scrape).fill(0).map((e, i) => i + 1)
        async function scrapeAirCraft() { 
           // page.setCookie(...cookies_c)
            console.log("Scraping Air Craft Started ")
           

            const a = [];
            var x = JSON.stringify(a);
            fs.writeFileSync('url_result_controller.json', x, 'utf8');
            var scrape_result = fs.readFileSync('url_result_controller.json');
            var myObject = JSON.parse(scrape_result);
            var categories = ['https://www.controlleremea.co.uk/listings/search?Category=3&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=8&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=6&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=9&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=433&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=2&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=47&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=70&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=10004&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=10007&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=1&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=71&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=5&page=',
            'https://www.controlleremea.co.uk/listings/search?Category=7&page=',

        ]

        var no_page_to_scrape = 25;
        // store an array with a length of no-page to be scraped . 
        var someArray2 = Array(no_page_to_scrape).fill(0).map((e, i) => i + 1) 
        
        // var categories = ["https://www.controlleremea.co.uk/listings/search?Category=3&page="]
            for(let y=0;y<categories.length;y++){ 
                const category = categories[y];
               await scrapePage(category,page,myObject,someArray2);
              
            }
    
         
        }  

        


        console.log(`All done, check the screenshots. ✨`)

    }

}

module.exports = scraperObject;