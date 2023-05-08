const express = require('express')
var bodyParser = require('body-parser') 
const expressip = require('express-ip');
const app = express(); 
const axios = require("axios");
const cheerio = require("cheerio");   
const request = require('request');
var proxy = require('express-http-proxy');
const bodyParserErrorHandler = require('express-body-parser-error-handler')
//Pupeteer  
//Pupeteer Extra Browser Object 
const puppeteerExtraBrowserObject = require('./browserx.js');
const scraperControllerX= require('./pageControllerX.js')
const fetchController = require('./pageAirCraftController.js');
function selectProxyHost() {
	return (new Date() % 2) ? '34.174.149.225:8585' : '159.203.61.169:8080';
  } 
  let ip_addresses = [];
  let port_numbers = [];
const { createProxyMiddleware } = require('http-proxy-middleware');  
var proxy = 'http://190.110.35.222:999'; 
request("https://sslproxies.org/", function(error, response, html) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
      
          $("td:nth-child(1)").each(function(index, value) {
            ip_addresses[index] = $(this).text();
          });
      
          $("td:nth-child(2)").each(function(index, value) {
            port_numbers[index] = $(this).text();
          });
        } else {
          console.log("Error loading proxy, please try again");
        }
      
        ip_addresses.join(", ");
        port_numbers.join(", ");
      
        //console.log("IP Addresses:", ip_addresses);
        //console.log("Port Numbers:", port_numbers); 
        let random_number = Math.floor(Math.random() * 100);
        //console.log(ip_addresses[random_number]);
          //console.log(port_numbers[random_number]); 
          proxy = `http://${ip_addresses[random_number]}:${port_numbers[random_number]}`;
         // console.log(proxy); 
         j = proxy  
         return proxy;
         
        
      });

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' })); 
app.use(bodyParserErrorHandler());
app.use(expressip().getIpInfoMiddleware);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // need the website to include cookies in the requests sent

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
//Get Ad information whether it's for sale or rent 


const PORT = 3008; 



app.get('/scrape_aircraft_information',(req,res)=>{
	try{
		res.send("Scraping Aircrafts, check Output.json"); 
		let browserInstance = puppeteerExtraBrowserObject.startBrowser();
		// Pass the browser instance to the scraper controller
		fetchController(browserInstance)
	 }catch(err){
		console.log(err)
	 }
})

app.use('/scrape_aircrafts_urls',(req,res)=>{
    //fetch url from urls.json then fetch and store data to output.json 
     //Start the browser and create a browser instance 
	 try{
		res.send("Scraping Aircrafts, check Output.json"); 
		let browserInstance = puppeteerExtraBrowserObject.startBrowser();
		// Pass the browser instance to the scraper controller
		scraperControllerX(browserInstance)
	 }catch(err){
		console.log(err)
	 }
})

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

