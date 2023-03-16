import { useState } from "react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const callOpenAITextAPI = async (prompt, n, stop, temperature) => {
  const response = await fetch("/api/openai/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 280, // máximo permitido para un tweet
      n: n,
      stop: stop,
      temperature: temperature,
    }),
  });

  const data = await response.json();
  return data.text;
};

export const Tweets = () => {
  const [texto, setTexto] = useState("");
  const [tweetSugerido, setTweetSugerido] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTweet, setIsLoadingTweet] = useState(false);
  const [isLoadingThread, setIsLoadingThread] = useState(false);


  const n = 1;
  const stop = "";
  const temperature = 0.7;

  const [isTextareaEmpty, setIsTextareaEmpty] = useState(false);

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
    setIsTextareaEmpty(event.target.value === "");
  };

  const getResponseFromOpenAI = async (isThread) => {
    setIsLoading(true);
    const prompt = `Compose a ${isThread ? "thread of tweets" : "tweet"} based on the input text '${texto}'. Ensure the ${isThread ? "tweets are" : "tweet is"} within the character limit and includes any relevant hashtags or mentions.`;

    const dataText = await callOpenAITextAPI(prompt, n, stop, temperature);
    setTweetSugerido(dataText);
    setIsLoading(false);
  };

  const handleResetClick = () => {
    setTexto("");
    setTweetSugerido("");
  };

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopyClick = () => {
    const textarea = document.querySelector("textarea");
    textarea.select();
    document.execCommand("copy");
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 1000);
  };
  
  return (
    <div className="hero min-h-screen w-screen">
      <div className="hero-content w-screen h-screen flex flex-row justify-start items-start">
        <div className="w-full h-1/2 p-2" style={{ width: "50%" }}>
          <div className="flex flex-col h-full bg-white border-4 border-black rounded-lg p-4 shadow-xl">
            <h3 className="mb-2"><span className="font-bold">Write your prompt 👇</span></h3>
            <textarea
              className={`text-lg md:text-xl textarea h-full resize-none ${isLoading && "opacity-50"}`}
              placeholder="e.g.: Write a tweet with a witty comment about the weather"
              value={texto}
              onChange={handleTextoChange}
              onBlur={(e) => setIsTextareaEmpty(e.target.value === "")}
              onFocus={() => setIsTextareaEmpty(false)}
            />
            <div className="btn-container flex align-center">
            <button
              className="btn btn-primary text-sm mt-5 self-start"
              onClick={() => {
                setIsLoadingTweet(true);
                getResponseFromOpenAI(false).finally(() => setIsLoadingTweet(false));
              }}
              disabled={!texto}
              style={{ display: !texto ? "none" : "block" }}
            >
              {isLoadingTweet ? (
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              ) : (
                " Tweet"
              )}
            </button>

            <button
              className="btn btn-secondary text-sm mt-5 ml-4 self-start"
              onClick={() => {
                setIsLoadingThread(true);
                getResponseFromOpenAI(true).finally(() => setIsLoadingThread(false));
              }}
              disabled={!texto}
              style={{ display: !texto ? "none" : "block", marginLeft: "auto" }}
            >
              {isLoadingThread ? (
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              ) : (
                "Thread"
              )}
            </button>

            </div>
            </div>
          </div>
          <div className="w-full h-1/2 p-2" style={{ width: "50%" }}>
            <div className="flex flex-col h-full bg-white border-4 border-black rounded-lg p-4 shadow-xl">
            <h3 className="mb-2"><span className="font-bold">Suggestion</span></h3>
              {tweetSugerido.length > 0 ? (
                <textarea
                  className={`h-screen ${isLoading && "opacity-50"}`}
                  value={tweetSugerido}
                  readOnly={isLoading}
                />
                
              ) : (
                <div className="h-screen flex items-center justify-center">
                  <img src="/images/tweet_1x.webp" alt="No tweet to edit" />
                </div>
              )}
              
              <div className="flex mt-12">
                {tweetSugerido.length > 0 && !isLoading && (
                  <button
                    className="btn btn-link text-sm"
                    onClick={handleResetClick}
                  >
                    Reset all
                  </button>
                )}
                {tweetSugerido.length > 0 && (
                  <div className="ml-auto relative">
                    <button
                      className="btn btn-link text-sm"
                      disabled={isLoading || !texto}
                      onClick={handleCopyClick}
                    >
                      <FontAwesomeIcon icon={faCopy} className="mr-2" />
                      Copy
                    </button>
                    <div
                      className={`absolute left-0 bottom-full mb-2 p-2 rounded-md bg-gray-700 text-white ${
                        tooltipVisible ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-500 ease-in-out`}
                      style={{ zIndex: 999 }}
                    >
                      Copied!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
                    };      
