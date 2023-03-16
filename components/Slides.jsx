import { useState } from "react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const callOpenAITextAPI = async (prompt, type, n, stop, temperature) => {
  const response = await fetch("/api/openai/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      type: type,
      max_tokens: type === "slides" ? 2048 : 280,
      n: n,
      stop: stop,
      temperature: temperature,
    }),
  });

  const data = await response.json();
  return type === "slides" ? data.url : data.text;
};

export const Slides = () => {
  const [texto, setTexto] = useState("");
  const [slidesUrl, setSlidesUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const n = 1;
  const stop = "";
  const temperature = 0.7;

  const [isTextareaEmpty, setIsTextareaEmpty] = useState(false);

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
    setIsTextareaEmpty(event.target.value === "");
  };

  const getResponseFromOpenAI = async (type) => {
    setIsLoading(true);
    const prompt = `Create a ${type} based on the input text '${texto}'. Ensure the content is within the character limit.`;

    const data = await callOpenAITextAPI(prompt, type, n, stop, temperature);
    setSlidesUrl(type === "slides" ? data : "");
    setIsLoading(false);
  };

  const handleResetClick = () => {
    setTexto("");
    setSlidesUrl("");
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
            <h3 className="mb-2">
              <span className="font-bold">Write your prompt 👇</span>
            </h3>
            <textarea
              className={`text-lg md:text-xl textarea h-full resize-none ${isLoading && "opacity-50"
                }`}
              placeholder="e.g.: Write a presentation about the benefits of meditation"
              value={texto}
              onChange={handleTextoChange}
              onBlur={(e) => setIsTextareaEmpty(e.target.value === "")}
              onFocus={() => setIsTextareaEmpty(false)}
            />
            <div className="btn-container flex align-center">
              <button
                className="btn btn-primary text-sm mt-5 self-start"
                onClick={() => {
                  setIsLoading(true);
                  getResponseFromOpenAI("slides").finally(() =>
                    setIsLoading(false)
                  );
                }}
                disabled={!texto}
                style={{ display: !texto ? "none" : "block" }}
              >

                {isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                ) : (
                  " Generate slides"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-1/2 p-2" style={{ width: "50%" }}>
          <div className="flex flex-col h-full bg-white border-4 border-black rounded-lg p-4 shadow-xl">
            <h3 className="mb-2">
              <span className="font-bold">Suggestion</span>
            </h3>
            {slidesUrl ? (
              <div className="h-full flex items-center justify-center">
                <iframe
                  src={slidesUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <img src="/images/slides_1x.webp" alt="No slides to show" />
              </div>
            )}
            <div className="flex mt-12">
              {slidesUrl && (
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
                    className={`absolute left-0 bottom-full mb-2 p-2 rounded-md bg-gray-700 text-white ${tooltipVisible ? "opacity-100" : "opacity-0"
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