import { useState, useRef } from "react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Emails = () => {
  const [texto, setTexto] = useState("");
  const [emailSugerido, setEmailSugerido] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTextareaEmpty, setIsTextareaEmpty] = useState(true);
  const textareaRef = useRef(null);
  const n = 1;
  const stop = "";
  const temperature = 0.7;

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
    setIsTextareaEmpty(event.target.value === "");
  };

  const getResponseFromOpenAI = async () => {
    setIsLoading(true);
    const prompt = `Please write an email, in the language introduced, in base to "${texto}"  and provide more details such as the recipient, the purpose of the email, etc.`;

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 500,
        n: n,
        stop: stop,
        temperature: temperature,
      }),
    });

    const data = await response.json();
    setIsLoading(false);
    setEmailSugerido(data.text);
  };

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopyClick = () => {
    textareaRef.current.select();
    document.execCommand("copy");
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };

  const handleResetClick = () => {
    setTexto("");
    setEmailSugerido("");
  };

  return (
    <div className="hero h-auto justify-left flex-col mt-5">
    <div className="hero-content flex-col-reverse w-screen lg:flex-row-reverse h-fit flex-col">
      <div className="flex-auto w-full lg:w-1/2">
        <div className="flex flex-col justify-center h-full">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 opacity-50 flex items-center justify-center">
                <i className="fas fa-spinner fa-spin"></i> Loading...
              </div>
            )}
            <textarea
              ref={textareaRef}
              className={`text-lg md:text-xl textarea h-56 sm:h-80 w-full border-4 border-black rounded-lg p-4 shadow-xl resize-none bg-white ${
                isLoading && "opacity-50"
              }`}
              placeholder="Email suggestion"
              value={emailSugerido}
              readOnly
            />
          </div>
          <div className="flex justify-between">
            <button
              className="btn btn-link text-sm"
              onClick={handleResetClick}
              disabled={!texto}
            >
              Reset all
            </button>
            {emailSugerido.length > 0 && (
              <div className="relative">
                <button
                  className="btn btn-link text-sm"
                  onClick={handleCopyClick}
                  disabled={isTextareaEmpty}
                >
                  <FontAwesomeIcon icon={faCopy} className="mr-2" /> Copy
                </button>
                {tooltipVisible && <div>Copied!</div>}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-0 h-auto lg:h-96 w-full lg:w-1/2 mx-auto relative flex items-center mt-5 lg:mt-0">
        <div className="flex-1 relative w-full">
          <textarea
            className={`text-lg md:text-xl textarea h-56 sm:h-80 w-full border-4 border-black rounded-lg p-4 shadow-xl resize-none bg-white ${
              isLoading && "opacity-50"
            }`}
            placeholder="e.g.: Write an email with the excuse that I can't attend tomorrow's meeting"
            value={texto}
            onChange={handleTextoChange}
            onBlur={(e) => setIsTextareaEmpty(e.target.value === "")}
            onFocus={() => setIsTextareaEmpty(false)}
          />
          <button
            className="btn btn-primary text-sm mt-2 self-start"
            onClick={getResponseFromOpenAI}
            disabled={!texto}
          >
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );};    
