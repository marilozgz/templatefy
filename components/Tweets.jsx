import React, { useState, useRef, useEffect } from "react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


export const Tweets = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const [texto, setTexto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const textareaRef = useRef(null);

  const getResponseFromOpenAI = async () => {
    setIsLoading(true);
    const prompt = `Please write a tweet, in the language introduced, in base to "${texto}" and provide more details if necessary.`;
  
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 280, // Ajusta el número de tokens generados
        n: 3,
        stop: "========", // Ajusta la cadena de corte
        temperature: 0.8, // Ajusta la temperatura de la muestra
      }),
    });
  
    const data = await response.json();
    const suggestions = Array.isArray(data.text) ? data.text : [data.text];
    setTweets(suggestions);
    setIsLoading(false);
  };
  

  const handleTweetThread = async () => {
    if (tweets.length === 0) return;
    setIsLoading(true);
    const thread = [];
  
    for (let i = 0; i < tweets.length; i++) {
      const tweet = tweets[i];
      const prompt = `Please write a tweet, in the language introduced, in response to "${tweet}" and provide more details if necessary.`;
  
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 280,
          n: 3,
          stop: "========", // Ajusta la cadena de corte
        temperature: 0.8, // Ajusta la temperatura de la muestra
        }),
      });
  
      const data = await response.json();
      const suggestions = Array.isArray(data.text) ? data.text : [data.text];
      thread.push(...suggestions);
    }
  
    setTweet(thread.join("\n\n"));
    setIsLoading(false);
  };  

  useEffect(() => {
    if (tweets.length > 0) {
      const tweetThread = tweets.join("\n\n");
      setTweet(tweetThread);
    } else {
      setTweet("");
    }
  }, [tweets]);

  const handleCopyClick = () => {
    const textarea = document.createElement("textarea");
    textarea.value = tweets.join("\n\n");
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };


  const handleResetClick = () => {
    setTweet("");
    setTweets([]);
    setTexto(""); // resetear el estado del textarea
  };

  const handleThreadGenerationClick = () => {
    if (tweets.length === 0) {
      getResponseFromOpenAI();
    } else {
      handleTweetThread();
    }
  };
  return (
    <div className="hero h-auto justify-left flex-col mt-5">
      <div className="hero-content flex-col-reverse w-screen lg:flex-row-reverse h-fit">
        <div className="flex-auto w-full lg:w-1/2">
          <div className="flex flex-col justify-center h-full">
            <div className="relative flex flex-col sm:flex-row sm:space-x-4">
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-200 opacity-50 flex items-center justify-center">
                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                  </div>
                )}
                <textarea
                  ref={textareaRef}
                  className={`text-lg md:text-xl textarea h-56 sm:h-80 w-full border-4 border-black rounded-lg p-4 shadow-xl resize-none bg-white ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="You can generate a tweet or a thread. e.g.: tomorrow, Diana krall concert"
                  disabled={isLoading}
                  value={texto}
                  onChange={(event) => setTexto(event.target.value)}
                />
                <div className="flex mt-4 sm:mt-0">
                  <button
                    className="btn btn-primary text-sm mr-2 mt-4"
                    disabled={isLoading || texto.trim().length === 0}
                    onClick={getResponseFromOpenAI}
                  >
                    {isLoading ? "Generating..." : "Tweet"}
                  </button>
                  <button
                    className="btn btn-secondary text-sm mr-2 mt-4"
                    disabled={isLoading || texto.trim().length === 0}
                    onClick={handleThreadGenerationClick}
                  >
                    {tweets.length > 0 ? "Thread" : "Thread"}
                  </button>
                </div>
              </div>
              <div className="flex-1 mt-10 sm:mt-0">
  <textarea
    className={`text-lg md:text-xl textarea h-56 sm:h-80 w-full border-4 border-black rounded-lg p-4 shadow-xl resize-none bg-white ${isLoading && "opacity-50 cursor-not-allowed"}`}
    placeholder="Tweet suggestion"
    value={Array.isArray(tweets) ? tweets.join("\n\n") : ""}
    readOnly
  />
  <div className="mt-4 flex justify-between items-center">
    <div>
      <button
        className="btn btn-link text-sm"
        disabled={isLoading || texto.trim().length === 0}
        onClick={handleResetClick}
      >
        Reset all
      </button>
    </div>
    {tweets.length > 0 && (
  <div className="ml-auto relative">
    <button
      className="btn btn-link text-sm"
      disabled={isLoading || !tweets}
      onClick={handleCopyClick}
    >
      <FontAwesomeIcon icon={faCopy} className="mr-2" />
      Copy
    </button>
    <div className={`absolute left-0 bottom-full mb-2 p-2 rounded-md bg-gray-700 text-white ${tooltipVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out`} style={{ zIndex: 999 }}>
      Copied!
    </div>
  </div>
)}

  </div>
</div>
</div></div></div></div></div>
  
  );
};