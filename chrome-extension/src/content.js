import axios from 'axios';
import cheerio from 'cheerio';

async function fetchAmazonPrice() {
  const response = await axios.get(window.location.href);
  const $ = cheerio.load(response.data);
  const productName = $('#productTitle').text().trim();
  const price = $('#priceblock_ourprice').text().trim();
  return { productName, price };
}

async function fetchFlipkartPrice() {
  const response = await axios.get(window.location.href);
  const $ = cheerio.load(response.data);
  const productName = $('.B_NuCI').text().trim();
  const price = $('._30jeq3._16Jk6d').text().trim();
  return { productName, price };
}

(async () => {
  if (window.location.hostname.includes("amazon")) {
    const amazonData = await fetchAmazonPrice();
    chrome.storage.local.set({ amazon: amazonData });
  }

  if (window.location.hostname.includes("flipkart")) {
    const flipkartData = await fetchFlipkartPrice();
    chrome.storage.local.set({ flipkart: flipkartData });
  }
})();
