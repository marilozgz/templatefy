import { useState } from "react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
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
  const [isTextareaEmpty, setIsTextareaEmpty] = useState(false);

  const n = 1;
  const stop = "";
  const temperature = 0.7;

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
    setIsTextareaEmpty(event.target.value === "");
  };

  const getResponseFromOpenAI = async (isThread) => {
    setIsLoading(true);
    const prompt = `Compose a ${
      isThread ? "thread of tweets" : "tweet"
    } based on the input text '${texto}'. Ensure the ${
      isThread ? "tweets are" : "tweet is"
    } within the character limit and includes any relevant hashtags or mentions.`;

    try {
      const dataText = await callOpenAITextAPI(prompt, n, stop, temperature);
      if (dataText === "" || dataText === null) {
        setTweetSugerido(null);
      } else {
        setTweetSugerido(dataText);
      }
    } catch (error) {
      console.log(error);
    }

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
    <div className="hero h-1/2 w-screen pb-20">
      <div className="hero-content w-screen flex flex-row justify-start items-start">
        <div className="w-1/2 h-80 p-2">
          <div className="flex flex-col bg-white border-4 border-black rounded-lg p-4 shadow-xl">
            <h3 className="mb-2">
              <span className="font-bold">Write your prompt 👇</span>
            </h3>
            <textarea
              className={`text-lg md:text-xl textarea h-80 mb-6 resize-none ${
                isLoading && "opacity-50"
              }`}
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
                  getResponseFromOpenAI(false).finally(() =>
                    setIsLoadingTweet(false)
                  );
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
                  getResponseFromOpenAI(true).finally(() =>
                    setIsLoadingThread(false)
                  );
                }}
                disabled={!texto}
                style={{
                  display: !texto ? "none" : "block",
                  marginLeft: "auto",
                }}
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
        <div className="w-1/2 h-80 p-2">
          <div className="flex flex-col  bg-white border-4 border-black rounded-lg p-4 shadow-xl">
            <h3 className="mb-2">
              <span className="font-bold">Suggestion</span>
            </h3>
            {tweetSugerido ? (
              <textarea
                value={tweetSugerido}
                onChange={() => {}}
                onFocus={(event) => event.target.select()}
                className={'text-lg md:text-xl textarea h-72 mb-6 resize-none'}
              />
            ) : (
              <div className=" flex items-center justify-center">
                <Image width={308} height={230} src="/images/tweet_1x.webp" alt="No tweet to edit" />
              </div>
            )}

            <div className="flex mt-12">
              {tweetSugerido && !isLoading && (
                <button
                  className="btn btn-link text-sm"
                  onClick={handleResetClick}
                >
                  Reset all
                </button>
              )}
              {tweetSugerido && (
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
