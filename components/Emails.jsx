import { useState, useRef } from 'react';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Emails = () => {
  const [texto, setTexto] = useState('');
  const [emailSugerido, setEmailSugerido] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
  };

  const handleGenerarClick = async () => {
    setIsLoading(true);
    const prompt = `Please write an email, in the language introduced, in base to "${texto}"  and provide more details such as the recipient, the purpose of the email, etc.`;
    const model = "text-davinci-003";
    const maxTokens = 500;
    const n = 1;
    const stop = "";
    const temperature = 0.7;

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
    setEmailSugerido(suggestion);
    setIsLoading(false);
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
    setTexto('');
    setEmailSugerido('');
  };
  

  return (
    <div className="hero h-auto justify-left flex-col mt-5">
      <div className="hero-content flex-col-reverse w-screen lg:flex-row-reverse h-fit">
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
              className={`text-lg md:text-xl textarea h-56 sm:h-80 w-full border-4 border-black rounded-lg p-4 shadow-xl resize-none bg-white ${isLoading && 'opacity-50'}`}
              placeholder="Email suggestion"
              value={emailSugerido}
              readOnly
            />

            </div>
            <div className="flex justify-between">
              <button
                className="btn btn-secondary text-sm"
                onClick={handleResetClick}
              >
                Reset
              </button>
              {emailSugerido.length > 0 && (
               <div className="relative">
               <button
                 className="btn text-sm"
                 onClick={handleCopyClick}
               >
                 <FontAwesomeIcon icon={faCopy} />
               </button>
               {tooltipVisible && (
                 <div>
                   Copied!
                 </div>
               )}
             </div>
             
              )}
            </div>
          </div>
        </div>
        <div className="flex-0 h-auto lg:h-96 w-full lg:w-1/2 mx-auto relative flex items-center">
          <div className="relative w-full">
            <textarea
              className={`text-lg md:text-xl textarea h-56 sm:h-80 w-full border-4 border-black rounded-lg p-4 shadow-xl resize-none bg-white ${isLoading && 'opacity-50'}`}
              placeholder="e.g.: Write an email with the excuse that I can't attend tomorrow's meeting"
              value={texto}
              onChange={handleTextoChange}
            />
            <button
              className="btn btn-primary text-sm mt-2 self-start"
              onClick={handleGenerarClick}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
