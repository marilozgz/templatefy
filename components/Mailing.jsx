import { useState, useRef, useEffect } from "react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";



export const Mailing = () => {
  const [texto, setTexto] = useState("");
  const [emailSugerido, setEmailSugerido] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTextareaEmpty, setIsTextareaEmpty] = useState(' ');
  const [htmlContent, setHtmlContent] = useState("");

  const textareaRef = useRef(null);
  const n = 1;
  const stop = "";
  const temperature = 0.7;

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
    setIsTextareaEmpty(event.target.value === "");
  };

  const handleEmailSugeridoChange = (event) => {
    setEmailSugerido(event.target.value);
    setHtmlContent(event.target.value);
  };

  const getResponseFromOpenAI = async () => {
    setIsLoading(true);
    const prompt = `Compose an email based on the input text '${texto}' and in the same language introduced. 
    Include additional details such as the recipient, the purpose of the email, and any other relevant information. 
    The email should be structured using HTML tags and Arial font. 
    Ensure there are no extra spaces at the top of the email.
    
    The email body must be placed with 20px padding. 
    Placed at top must have a logo image 100x36px http://via.placeholder.com/100x36. 
    Below at 10px goes the message
    Put at the end an <hr>.
    Below at 10px, put the text www.myweb.com | +34 677 525 637 | info@myweb.com centered
    `;

    const response = await fetch("/api/openai/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1024,
        n: n,
        stop: stop,
        temperature: temperature,
      }),
    });

    const data = await response.json();
    setIsLoading(false);
    setEmailSugerido(data.text);
    setHtmlContent(data.text);
  };

  const handleResetClick = () => {
    setTexto("");
    setEmailSugerido("");
    setHtmlContent("");
  };

  const resetIframeContent = () => {
    const iframe = document.querySelector("iframe");
    iframe.srcdoc = "";
  }

  const [tooltipVisible, setTooltipVisible] = useState(false);


  const handleCopyStylesClick = () => {
    const iframe = document.querySelector("iframe");
    const emailContent = iframe.contentDocument.body.innerHTML;
    const el = document.createElement("div");
    el.innerHTML = emailContent;

    // Función para restablecer el color de fondo de todos los elementos
    const resetBackgroundColor = (element) => {
      element.style.backgroundColor = 'transparent';
      for (const child of element.children) {
        resetBackgroundColor(child);
      }
    };

    // Restablece el color de fondo del elemento y sus hijos
    resetBackgroundColor(el);

    document.body.appendChild(el);

    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy");
    document.body.removeChild(el);

    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 1000);
  };

  return (
    <div className="hero h-screen w-screen">
      <div className="hero-content w-screen h-screen flex flex-col justify-start mt-4">
        <div className="w-full h-1/1 p-2">
          <div className="flex flex-col h-full bg-white border-4 border-black rounded-lg p-4 shadow-xl">
            <h3 className="mb-2">Write your prompt! you will be able to edit the code and copy paste the preview</h3>
            <textarea
              className={`text-lg md:text-xl textarea h-full resize-none ${isLoading && "opacity-50"}`}
              placeholder="e.g.: Write an email with the news that we already allow crypto paymentes"
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
        <div className="w-full h-1/2 flex">
          <div className="w-1/2 p-2">
            <div className="flex flex-col h-full bg-white border-4 border-black rounded-lg p-4 shadow-xl">
              <h3 className="mb-2">Email Code</h3>
              <AceEditor
                value={emailSugerido}
                onChange={(value) => {
                  setEmailSugerido(value);
                  setHtmlContent(value);
                }}
                mode="html"
                theme="monokai"
                name="email-editor"
                width="100%"
                height="100%"
                editorProps={{ $blockScrolling: true }}
              />


            </div>
          </div>
          <div className="w-1/2 p-2">
            <div className="flex flex-col h-full bg-white border-4 border-black rounded-lg p-4 shadow-xl">
              <h3 className="mb-2">Email Preview</h3>
              <iframe
                className="w-full h-full resize-none"
                srcDoc={
                  emailSugerido
                    ? htmlContent
                    : `<div style="display:flex;justify-content:center;align-items:center;height:100%;">
                        ${!emailSugerido ? '<img src="/images/mailing_1x.webp" alt="Mailing generated" style="max-width:100%;max-height:100%;" />' : ''}
                      </div>`
                }
                title="Email Preview"
                sandbox="allow-same-origin"
              />

              {emailSugerido.length > 0 && (
                <div className="relative mt-2 flex justify-between bg-gray-100 rounded-md">
                <div>
                  <button
                    className="btn btn-link text-sm"
                    disabled={isLoading || !texto}
                    onClick={handleCopyStylesClick}
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
                <div>
                  <button
                    className="btn btn-link text-sm"
                    onClick={() => {
                      handleResetClick();
                      resetIframeContent();
                    }}
                    disabled={!texto}
                  >
                    Reset all
                  </button>
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
