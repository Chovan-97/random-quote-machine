import { useState, useEffect } from 'react';
import './index.scss'; 
import COLORS_ARRAY from './colorsArray.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

let quoteDBurl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [quote, setQuote] = useState('Life is 10% what happens and 90% of how I react to it.');
  const [author, setAuthor] = useState('Charles Swindoll');
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#223223');

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  }

  useEffect(() => {
    fetchQuotes(quoteDBurl)
  }, [quoteDBurl]);
  console.log(COLORS_ARRAY)
  const quoteGenerator = () => {
    let randomInteger = Math.floor(Math.random() * quotesArray.length);
    setRandomNumber(randomInteger);
    setAccentColor(COLORS_ARRAY[Math.floor(Math.random() * COLORS_ARRAY.length)]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  }

  return (
    <div className='App'>
      <header className='App-header' style={{backgroundColor: accentColor, color: accentColor}}>
        <div id='quote-box'>
          <p id='text' style={{color: accentColor}}>
            <svg 
            aria-hidden="true" 
            focusable="false" 
            data-prefix="fas" 
            data-icon="quote-left" 
            class="svg-inline--fa fa-quote-left fa-w-16 quote-mark" 
            role="img" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"><path fill="currentColor" 
            d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
            ></path></svg>
            {quote}</p>
          <p id='author' style={{color: accentColor}}>- {author}</p>

          <div className='buttons'>
          <a 
            style={{backgroundColor: accentColor}}
            id='tweet-quote' 
            href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}
            target='_blank'
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <button 
            style={{backgroundColor: accentColor}}
            id='new-quote'
            onClick={quoteGenerator}
          >
            Change Quote
          </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
