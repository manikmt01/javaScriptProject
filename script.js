const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiquotes = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// hiden loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// Show newQuote
function newQuote() {
  // loading
  loading();
  // Pick a random quote from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote and hide loader
  quoteText.textContent = quote.text;
  complete();
}
// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // newQuote function
    newQuote();
  } catch (error) {
    // Catch Error here
    console.log(`The error is ${error}`);
  }
}
// tweet quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, '_blank');
} // Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);
// On Load
getQuotes();
