import React, { useEffect, useState } from 'react';
import { Carousel } from './carousel';
import './home.css';

export function Home() {
    const [quote, setQuote] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');

    useEffect(() => {
      const url = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '9db24a0080msh121ccc6c1888c35p1aa90bjsn65775fee3975',
          'x-rapidapi-host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
        }
      };
      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data && data.text) {
            setQuote(data.text);
            setQuoteAuthor(data.author || 'Unknown');
          } else {
            setQuote('No quote available');
            setQuoteAuthor('Unknown');
          }
        })
        .catch(error => {
          console.error('Error fetching the quote:', error);
        });
    }, []);
    
    return (
        <main>
            <div>
                <Carousel />
            </div>
            <h3 className="mission-section">Our Mission</h3>
            <p className="mission-text">
                At Beauty by EB, our mission is to provide the finest <i>all-natural</i> beauty products that help our loyal clients not only look their best but feel more 
                <i>confident</i> every day. Whether you're seeking <i>thicker, fuller</i> hair or a <i>radiant complexion,</i> we offer premium products at a fraction of the cost. Why pay 
                more when you can have the best? Choose Beauty by EB and be <i>Eternamente Bella—beautiful, always.</i>
            </p>
            <div className="quote-section">
                <p className="quote-text">"{quote}"</p>
                <p className="quote-author">- {quoteAuthor}</p>
            </div>
        </main>
    );
}

