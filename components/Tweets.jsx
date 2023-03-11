import React, { useState, useRef } from 'react';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Tweets = () => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  const [texto, setTexto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleGenerarClick = async () => {
    setIsLoading(true);
    const API_KEY = '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';
    const prompt = `Please write a tweet, in the language introduced, in base to "${texto}" and provide more details if necessary.`;
    const model = "text-davinci-003";
    const maxTokens = 280;
    const n = 3; // Genera 3 tweets para el hilo
    const stop = "";
    const temperature = 0.7;
    const tweetsArr = [];
  
    for (let i = 0; i < n; i++) {
      const response = await fetch(`https://api.openai.com/v1/engines/${model}/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: maxTokens,
          n: n,
          stop: stop,
          temperature: temperature,
        }),
      });
  
      const data = await response.json();
      const suggestion = data.choices[0].text.toString();
      tweetsArr.push(suggestion);
    }
  
    setTweets(tweetsArr);
    setIsLoading(false);
  };
  
  const handleTweetThread = () => {
    let tweetThread = tweets.join('\n\n'); // Junta los tweets con dos saltos de línea
    tweetThread = encodeURIComponent(tweetThread);
    window.open(`https://twitter.com/intent/tweet?text=${tweetThread}`);
  };
  
  const handleCopyClick = () => {
    textareaRef.current.select();
    document.execCommand("copy");
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };

  const handleResetClick = () => {
    setTweet('');
  };
  return (
    <div className="hero h-auto justify-left flex-col mt-5">
      <div className="hero-content flex-col-reverse w-screen lg:flex-row-reverse h-fit">
        <div className="flex-auto w-full lg:w-1/2">
          <div className="flex flex-col justify-center h-full">
            <div className="relative flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                {isLoading && <p>Loading...</p>}
                <textarea
                  ref={textareaRef}
                  className={`text-lg md:text-xl textarea h-56 sm:h-80 w-full border-4 border-black rounded-lg p-4 shadow-xl resize-none bg-white ${isLoading && 'opacity-50'}`}
                  placeholder="Write your tweet here"
                  disabled={isLoading}
                  value={texto}
                  onChange={(event) => setTexto(event.target.value)}
                />
                <div className="flex mt-4 sm:mt-0">
                  <button
                    className="btn btn-secondary text-sm mr-2 mt-4"
                    disabled={isLoading}
                    onClick={handleGenerarClick}
                  >
                    {isLoading ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>
              <div className="flex-1 mt-10 sm:mt-0">
                <textarea
                  className={`text-lg md:text-xl textarea h-56 sm:h-80 w-full border-4 border-black rounded-lg p-4 shadow-xl resize-none bg-white ${isLoading && 'opacity-50'}`}
                  placeholder="Tweet suggestion"
                  value={tweet}
                  readOnly
                />
                <div className="mt-4 flex justify-between items-center">
                  {tweet && (
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        tweet
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary text-sm"
                    >
                      <FontAwesomeIcon icon={['fab', 'twitter']} className="mr-2" />
                      Tweet
                    </a>
                  )}
                  <div>
                    <button
                      className="btn btn-secondary text-sm"
                      disabled={isLoading || !tweet}
                      onClick={handleCopyClick}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <button
                      className="btn btn-secondary text-sm ml-2"
                      disabled={!tweet}
                      onClick={handleResetClick}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                  };  