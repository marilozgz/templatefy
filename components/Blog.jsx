import { useState, useRef } from "react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const callOpenAITextAPI = async (prompt, n, stop, temperature) => {
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
  return data.text;
};

export const Blog = () => {
  const [texto, setTexto] = useState("");
  const [emailSugerido, setEmailSugerido] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTextareaEmpty, setIsTextareaEmpty] = useState(" ");
  const [htmlContent, setHtmlContent] = useState("");

  const quillRef = useRef(null);
  const n = 1;
  const stop = "";
  const temperature = 0.7;

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
    setIsTextareaEmpty(event.target.value === "");
  };

  const handleEmailSugeridoChange = (value) => {
    setEmailSugerido(value);
    setHtmlContent(value);
  };

  const getResponseFromOpenAI = async () => {
    setIsLoading(true);
    const prompt = `Compose an article based on the input text '${texto}' and in the same language introduced. 
      Include additional details such as why you are writing this, the purpose of the post, and any other relevant information. 
      The article must be with html structure (spaces) and use Arial font. 
      Ensure there are no extra spaces at the top of the article.
      And add small images related from Unsplash
    `;
  
    // Obtener una imagen aleatoria de Unsplash
    const response = await fetch('/api/openai/image');
    const data = await response.json();
    const imageUrl = data.urls.small;
  
    const dataText = await callOpenAITextAPI(prompt, n, stop, temperature);
    setIsLoading(false);

    const emailHtml = `
      <html>
        <head>
          <style>
            /* Estilos CSS para el correo electrónico */
          </style>
        </head>
        <body>
        ${dataText}
          <img src="${imageUrl}" height="100px">
         
        </body>
      </html>
    `;
  
    setEmailSugerido(emailHtml);
  };
  
  

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopyClick = () => {
    const quillEditor = quillRef.current.getEditor();
    const content = quillEditor.root.innerHTML;
  
    const el = document.createElement("div");
    el.innerHTML = content;
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
    }, 2000);
  };
  

  const handleResetClick = () => {
    setTexto("");
    setEmailSugerido("");
  };
   
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['hr'],
      ['clean']
    ],
  };
  
  const formats = [
    'bold', 'italic', 'underline',
    'header',
    'list', 'bullet',
    'align',
    'link', 'image',
    'hr'
  ];

  return (
    <div className="hero h-screen w-screen">
  <div className="hero-content w-screen h-screen flex flex-row justify-start items-start">
    <div className="w-full h-screen" style={{ width: "50%" }}>
      <div className="flex flex-col h-full bg-white border-4 border-black rounded-lg p-4 shadow-xl">
        <h3 className="mb-2"><span className="font-bold">Input: </span>Write something related with your post</h3>
        <textarea
          className={`text-lg md:text-xl textarea h-auto resize-none ${isLoading && "opacity-50"}`}
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
    <div className="w-full  h-screen" style={{ width: "50%" }}>
      <div className="flex flex-col h-full bg-white border-4 border-black rounded-lg p-4 shadow-xl">
        <h3 className="mb-2"><span className="font-bold">Article edition: </span> You will be able to edit, copy & paste the article</h3>
        {emailSugerido.length > 0 ? (
          <ReactQuill
            ref={quillRef}
            className={`h-screen ${isLoading && "opacity-50"}`}
            value={emailSugerido}
            onChange={handleEmailSugeridoChange}
            readOnly={isLoading}
            theme="snow"
            modules={modules}
            formats={formats}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <img src="/images/empty_1x.webp" alt="No email to edit" />
          </div>
        )}
        <div className="flex mt-12">
          {emailSugerido.length > 0 && !isLoading && (
            <button
              className="btn btn-link text-sm"
              onClick={handleResetClick}
            >
              Reset all
            </button>
          )}
          {emailSugerido.length > 0 && (
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