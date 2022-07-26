import { currentLanguage } from '../script.js'

let randomQuoteNum;

function randomQuote(min, max) {
    randomQuoteNum = Math.floor(Math.random() * (max - min + 1)) + 1;
}

async function getQuotes() {
    let quotes = '';
    if (currentLanguage === 'english') {
        quotes = './modules/quoteEn.json';
    } else if (currentLanguage === 'russian') {
        quotes = './modules/quoteRu.json';
    }
    const res = await fetch(quotes);
    const data = await res.json();
    
    document.querySelector('.quote').textContent = data[`${randomQuoteNum}`].text;
    document.querySelector('.author').textContent = data[`${randomQuoteNum}`].author;
}

function changeQuote() {
    let dataLength = 9;
    randomQuoteNum === dataLength ? randomQuoteNum = 0 : randomQuoteNum += 1;
    getQuotes();
}

export {getQuotes, changeQuote, randomQuote};
