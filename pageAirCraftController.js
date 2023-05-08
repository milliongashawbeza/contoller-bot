const pageScraper = require('./scraperAirCraftInfo');
async function fetchAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;
		await pageScraper.scraper(browser);	
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => fetchAll(browserInstance)