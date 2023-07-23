const puppeteer = require('puppeteer-extra')  

//const json = require('./output.json') 


// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


// puppeteer.use(
//   RecaptchaPlugin({
//     provider: {
//       id: '2captcha',
//       token: 'b'


//     },
//     visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
//   })
// )   


// Add adblocker plugin to block all ads and trackers (saves bandwidth)
//const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
//puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';
    
// That's it, the rest is puppeteer usage as normal 😊
var PROXY_USERNAME = 'scraperapi';
var PROXY_PASSWORD = 'cd5497eba7916ba846ecfa745772f477'; // <-- enter your API_Key here
var PROXY_SERVER = 'proxy-server.scraperapi.com';
var PROXY_SERVER_PORT = '8001'; 


const proxies = {
    'session_1': 'http://64.225.8.82:9997',
    'session_2': 'http://64.225.8.82:8080',
    'session_3': 'http://64.225.8.118:9989',
    'session_4': 'http://200.198.42.168:8080',
    'session_5': 'http://62.210.209.223:3128', 
    'session_6': 'http://34.94.0.168:80',
  };
  
  
async function startBrowser(){ 
    var p = 'http://localhost:3001/proxy'
	let browser; 
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: false,
            // args: [
            //     '--no-sandbox',
            //     '--disable-setuid-sandbox',
            //     `--proxy-server=${p}`
            // ],
	        'ignoreHTTPSErrors': true,
			
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};
