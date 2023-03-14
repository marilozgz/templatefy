import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Mailing = () => {
  const [prompt, setPrompt] = useState('');
  const [html, setHtml] = useState('');
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateHtml = async () => {
    setIsLoading(true);
    const response = await fetch('/api/openai/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Convert the following text into HTML: \n${prompt}`,
        max_tokens: 2048,
        n: 1,
        stop: '\n',
        temperature: 0.5,
      }),
    });
    const data = await response.json();
    setHtml(data.html);
    setPreview(data.html);
    setIsLoading(false);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Generador de correo electrónico</h1>
      </header>
      <main>
        <div className="Input-section">
          <h2>Ingrese el prompt</h2>
          <textarea value={prompt} onChange={handlePromptChange} />
          <button onClick={generateHtml} disabled={isLoading}>
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              'Generar HTML'
            )}
          </button>
        </div>
        <div className="Preview-section">
          <h2>Previsualización</h2>
          <div dangerouslySetInnerHTML={{ __html: preview }} />
        </div>
        <div className="Code-section">
          <h2>Código HTML generado</h2>
          <code>{html}</code>
        </div>
      </main>
    </div>
  );
};
