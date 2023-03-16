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
      max_tokens: 500,
      n: n,
      stop: stop,
      temperature: temperature,
    }),
  });

  const data = await response.json();
  return data.text;
};

export const Emails = () => {
  const [texto, setTexto] = useState("");
  const [emailSugerido, setEmailSugerido] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const n = 1;
  const stop = "";
  const temperature = 0.7;

  const [isTextareaEmpty, setIsTextareaEmpty] = useState(false);

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
    setIsTextareaEmpty(event.target.value === "");
  };

  const handleEmailSugeridoChange = (event) => {
    setEmailSugerido(event.target.value);
  };

  const getResponseFromOpenAI = async () => {
    setIsLoading(true);
    const prompt = `Compose an email based on the input text '${texto}' and in the same language introduced. 
      Include additional details such as the recipient, the purpose of the email, and any other relevant information. 
      The email must be with structure (spaces). 
      Ensure there are no extra spaces at the top of the email.
    `;

    const dataText = await callOpenAITextAPI(prompt, n, stop, temperature);
    
    if (dataText === "" || dataText === null) {
      setEmailSugerido(null);
    } else {
      setEmailSugerido(dataText);
    }

    setIsLoading(false);
  };

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopyClick = () => {
    const el = document.createElement("div");
    el.innerHTML = emailSugerido;
    document.body.appendChild(el);

    const range = document.createRange();
    range.selectNodeContents(el);
    if (typeof window !== "undefined") {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    document.execCommand("copy");
    document.body.removeChild(el);

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
    <div className="hero h-1/2 w-screen">
      <div className="hero-content w-screen flex flex-row justify-start items-start">
        <div className="w-1/2 h-96 p-2" >
          <div className="flex flex-col h-96 bg-white border-4 border-black rounded-lg p-4 shadow-xl">
            <h3 className="mb-2">
              <span className="font-bold">Write your prompt 👇</span>
            </h3>
            <textarea
              className={`text-lg md:text-xl textarea  resize-none ${
                isLoading && "opacity-50"
              }`}
              placeholder="e.g.: Write an email with the excuse that I can't attend tomorrow's meeting"
              value={texto}
              onChange={handleTextoChange}
              onBlur={(e) => setIsTextareaEmpty(e.target.value === "")}
              onFocus={() => setIsTextareaEmpty(false)}
            />
            <button
              className="btn btn-primary text-sm mt-5 self-start"
              onClick={getResponseFromOpenAI}
              disabled={!texto}
              style={{ display: !texto ? "none" : "block" }}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </div>
        <div className="w-full h-1/2 p-2" style={{ width: "50%" }}>
          <div className="flex flex-col  bg-white border-4 border-black rounded-lg p-4 shadow-xl">
            <h3 className="mb-2">
              <span className="font-bold">Suggestion</span>
            </h3>
            {emailSugerido ? (
              <textarea
                className={`h-80 ${isLoading && "opacity-50"}`}
                value={emailSugerido}
                onChange={handleEmailSugeridoChange}
                readOnly={isLoading}
              />
            ) : (
              <div className=" flex items-center justify-center">
                <Image
                  width={276}
                  height={200}
                  src="/images/email_1x.webp"
                  alt="No email to edit"
                />
              </div>
            )}
            <div className="flex mt-12">
              {emailSugerido && !isLoading && (
                <button
                  className="btn btn-link text-sm"
                  onClick={handleResetClick}
                >
                  Reset all
                </button>
              )}
              {emailSugerido  && (
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
