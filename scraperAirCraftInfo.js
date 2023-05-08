var stringify = require('json-stringify');
const fs = require('fs');
//const json = require('./output.json') 
const Excel = require('exceljs');
const cheerio = require("cheerio");

const scraperObject = {
	url: 'contoller.com',
	async fetchUrl(browser, url) {
		let page = await browser.newPage();
		//await page.setRequestInterception(true); 

		var founded_url = 0;
		var a = [];
		console.log(`Navigating to ${url}...`);
		var x = JSON.stringify(a);
		fs.writeFileSync('url_result_controller.json', x, 'utf8');
		var scrape_result = fs.readFileSync('url_result_controller.json');
		var myObject = JSON.parse(scrape_result);
		// If there is any error this line will execute
		//if (err) throw err;
		// Here we are converting the data to Javascript object
		//const file = JSON.parse(data);
		// Here we are printing the data. 
		//var ad_url = file[i].url;
		await page.goto(url, { 'timeout': 20000, 'waitUntil': 'domcontentloaded' });
		await page.setViewport({ width: 1280, height: 720 });
		await page.setExtraHTTPHeaders({
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
			'upgrade-insecure-requests': '1',
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
			'accept-encoding': 'gzip, deflate, br',
			'accept-language': 'en-US,en;q=0.9,en;q=0.8'
		});

		// Limit requests 
		await page.setRequestInterception(true);
		page.on('request', async (request) => {
			if (request.resourceType() == 'image') {
				await request.abort();
			} else {
				await request.continue();
			}
		});  
		var no_page_to_scrape =3; 
		// store an array with a length of no-page to be scraped . 
		var someArray =  Array(no_page_to_scrape).fill(0).map((e,i)=>i+1)
	
		for (let i = 0; someArray.length; i++) {
			try {
				await page.goto('https://www.controlleremea.co.uk/listings/search?Category=3&page=' + someArray[i], { 'timeout': 20000, 'waitUntil': 'domcontentloaded' })
				await page.setViewport({ width: 1280, height: 720 });
				await page.setExtraHTTPHeaders({
					'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
					'upgrade-insecure-requests': '1',
					'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
					'accept-encoding': 'gzip, deflate, br',
					'accept-language': 'en-US,en;q=0.9,en;q=0.8'
				});

				// Limit requests 
				await page.setRequestInterception(true);
				page.on('request', async (request) => {
					if (request.resourceType() == 'image') {
						await request.abort();
					} else {
						await request.continue();
					}
				});

				//await page.waitForSelector("h1")
				const html = await page.content();
				// const response=request.get(Url)
				const $ = await cheerio.load(html);
				var someArray = []// Array(no_page_to_scrape).fill(0).map((e,i)=>i+1)
			
				$('#listContainer').find('.list-listing-title-link').each(function (index, element) {
					// var imageKey = "image"+index;
					//gInforMap.set(imageKey,$(element).attr("data-src")); 
					someArray.push("https://www.controlleremea.co.uk" + $(element).attr("href"))
					//generalInfo.push($(element).text());
				});
				// 
				for (let index = 0; index < someArray.length; index++) {
					const url = someArray[index];

					var d = { url };
					//console.log(stringify(data));
					//Add url to urls.json 
					myObject.push(JSON.parse(JSON.stringify(d)));
					var newData = JSON.stringify(myObject);

					fs.writeFile('url_result_controller.json', newData, (err) => {
						if (err) reject(err)
						founded_url = founded_url + 1;
						console.log("Aircraft url saved (" + founded_url + ')')
					})}
				
					// manipulating the DOM
				} catch (e) {
					console.error(e)
				}
			}

			//loop through each page to find ad urls 
			//pagination(element,myObject,0,no_page_to_scrape) 
			console.log(url)
		
	},
	async fetchCategories(browser, url) {
		let page = await browser.newPage();
		await page.setExtraHTTPHeaders({
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
			'upgrade-insecure-requests': '1',
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
			'accept-encoding': 'gzip, deflate, br',
			'accept-language': 'en-US,en;q=0.9,en;q=0.8'
		});
		// Limit requests 
		await page.setRequestInterception(true);
		page.on('request', async (request) => {
			if (request.resourceType() == 'image') {
				await request.abort();
			} else {
				await request.continue();
			}
		});

		//await page.setRequestInterception(true);
		var founded_url = 0;
		var a = [];
		console.log(`Navigating to ${url}...`);
		var x = JSON.stringify(a);
		fs.writeFileSync('url_categories.json', x, 'utf8');
		var scrape_result = fs.readFileSync('url_categories.json');
		var myObject = JSON.parse(scrape_result);
		// If there is any error this line will execute
		//if (err) throw err;
		// Here we are converting the data to Javascript object
		//const file = JSON.parse(data);
		// Here we are printing the data. 
		//var ad_url = file[i].url;
		await page.goto(url, { 'timeout': 20000, 'waitUntil': 'domcontentloaded' });

		//await page.waitForSelector("h1")
		const html = await page.content();
		// const response=request.get(Url)
		const $ = await cheerio.load(html);
		var someArray = []// Array(no_page_to_scrape).fill(0).map((e,i)=>i+1)
		const items = $('.categories').text();
		var total_ads = items.replace(/[^0-9]/g, '');
		var total_page = Number(total_ads) / 24
		total_page = Math.round(total_page);
		var a = [];
		var x = JSON.stringify(a);
		fs.writeFileSync('url_categories.json', x, 'utf8');
		var url_result = fs.readFileSync('url_categories.json');
		var myObject = JSON.parse(url_result);
		$('.categories').find('.category-content').each(function (index, element) {
			// var imageKey = "image"+index;
			//gInforMap.set(imageKey,$(element).attr("data-src")); 
			someArray.push("https://www.controlleremea.co.uk" + $(element).attr("href"))
			//generalInfo.push($(element).text());
		});
		// 
		for (let index = 0; index < someArray.length; index++) {
			const url = someArray[index];

			var d = { url };
			//console.log(stringify(data));
			//Add url to urls.json 
			myObject.push(JSON.parse(JSON.stringify(d)));
			var newData = JSON.stringify(myObject);

			fs.writeFile('url_categories.json', newData, (err) => {
				if (err) reject(err)
				founded_url = founded_url + 1;
				console.log("Aircraft url saved (" + founded_url + ')')
			})
			//loop through each page to find ad urls 
			//pagination(element,myObject,0,no_page_to_scrape) 
			console.log(url)
		}
	},
	async scraper(browser) {
		let page = await browser.newPage();
		//await page.setRequestInterception(true);

		var a = [];
		console.log(`Navigating to ${this.url}...`);
		fs.readFile("url_result_controller.json", async function (err, data) {
			var x = JSON.stringify(a);
			fs.writeFileSync('controller_output.json', x, 'utf8');
			var scrape_result = fs.readFileSync('controller_output.json');
			var myObject = JSON.parse(scrape_result);
			// If there is any error this line will execute
			if (err) throw err;
			// Here we are converting the data to Javascript object
			const file = JSON.parse(data);
			// Here we are printing the data. 
			console.log(file.length)
			console.log(file[0]['url']);
			for (i = 0; i < file.length; i++) {

				var ad_url = file[i].url;
				await page.goto(ad_url, { 'timeout': 20000, 'waitUntil': 'domcontentloaded' });
				await page.waitForSelector("h1")
				const html = await page.content();
				// const response=request.get(Url)
				const $ = await cheerio.load(html);
				const title = $('h1').text();
				const category = $('.detail__category').text()
				const thumbnail_selected = $('.mc-selected>img').attr('src')
				console.log(title);
				console.log(category);
				console.log(thumbnail_selected);
				//Generat Information 
				var generalInfo = [];
				const gInforMap = new Map();

				var gNewInfoArray = [];
				function mapToObj(inputMap) {
					let obj = {};

					inputMap.forEach(function (value, key) {
						obj[key] = value
					});

					return obj;
				}

				$('.detail__specs-wrapper').find('div').each(function (index, element) {
					generalInfo.push($(element).text());
				});

				//console.log(gNewInfoArray); 
				//contatc info 
				var contactInfoLeft = [];
				$('.dealer-contact__details_left-col').find('div').each(function (index, element) {
					contactInfoLeft.push($(element).text());
				});
				console.log("################### Contact Infor #########")
				console.log(contactInfoLeft);
				var contactInfoRight = [];
				$('.dealer-contact__details_right-col').find('a').each(function (index, element) {
					contactInfoRight.push($(element).attr('href'));
				});
				console.log("################### Contact Infor #########")
				console.log(contactInfoRight);
				var detailsDetails = [];
				console.log("############Details Details ")
				$('.detail__details').find('.detail__title').each(function (index, element) {
					detailsDetails.push($(element).text());
				});

				// Details 

				const category2 = $('.detail__category').text()
				const price_entered_as = $('.listing-prices__price-entered-as').text().slice(22)
				const air_craft_location_map = $('.MuiTypography-root.MuiTypography-text.MuiLink-root.MuiLink-underlineHover.wwwcontrolleremeacouk-18yyjcp').attr('href');
				const air_craft_location_alt = $('.MuiTypography-root.MuiTypography-text.MuiLink-root.MuiLink-underlineHover.wwwcontrolleremeacouk-18yyjcp').text();
				const dealer_contact_location = $('.MuiTypography-root.MuiTypography-body2.dealer-contact__location.wwwcontrolleremeacouk-9gup2g').text()
				//details 
				gInforMap.set("url", ad_url);
				gInforMap.set("title", title);
				gInforMap.set("category", category2);
				gInforMap.set("price_entered_as", price_entered_as);
				gInforMap.set("air_craft_location_map", air_craft_location_map);
				gInforMap.set("air_craft_location_alt", air_craft_location_alt);
				//seller information  
				gInforMap.set("dealer-contact__branch-name", contactInfoLeft[0]);
				gInforMap.set("dealer-contact__name", contactInfoLeft[1].slice(7));
				gInforMap.set("dealer-contact__phone", contactInfoRight[0].slice(3));
				gInforMap.set("dealer-contact__location", dealer_contact_location);
				//dealer Information 
				gInforMap.set("dealer-contact__whatsapp", contactInfoRight[1]);
				for (var i = 0; i < generalInfo.length - 1; i = i + 2) { // I want to concatenate the middle elements
					if (typeof generalInfo[i + 1] != 'undefined') {
						gNewInfoArray.push('"' + generalInfo[i] + '":' + '"' + generalInfo[i + 1] + '"')

						gInforMap.set(generalInfo[i], generalInfo[i + 1])
					}

				}
				gInforMap.set("thumbnaile", thumbnail_selected);
				$('.mc-li-image').find('img').each(function (index, element) {
					//console.log("***********IMAGES********")
					//console.log($(element).attr("data-src")) 
					var imageKey = "image" + index;
					gInforMap.set(imageKey, $(element).attr("data-src"));
					//generalInfo.push($(element).text());
				});
				//save it to file 
				var data = JSON.stringify(mapToObj(gInforMap))
				console.log(data)
				var parsed = JSON.parse(data)
				//myObject.push(parsed)  
				//var newData = JSON.stringify(myObject);
				myObject.push(parsed)
				//console.log(myObject); 
				var newData = JSON.stringify(myObject);
				//console.log(newData);	
				fs.writeFile('controller_output.json', newData, (err) => {
					if (err) reject(err)
					console.log("Aircraft saved")
				})


			}
		});
	}

}

module.exports = scraperObject;