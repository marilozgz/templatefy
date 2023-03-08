import { useState, useEffect } from 'react';

export const Hero = () => {
  const palabras = ['presentations', 'emails', 'tweets'];
  const [textoActual, setTextoActual] = useState(palabras[0]);
  const [letraActual, setLetraActual] = useState(0);
  const [error, setError] = useState(false);
  const [texto, setTexto] = useState('');
  const [reset, setReset] = useState(false);

  const handleTextoChange = (event) => {
    const texto = event.target.value;
    if (texto.length > 300) {
      return;
    }
    setTexto(texto);
    if (texto.trim() !== '') {
      setError(false);
    }
  };
  

  useEffect(() => {
    const intervalo = setInterval(() => {
      setLetraActual(letraActual => letraActual + 1);
    }, 350);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (letraActual >= textoActual.length) {
      const indicePalabra = palabras.indexOf(textoActual);
      const siguientePalabra = palabras[(indicePalabra + 1) % palabras.length];
      setTextoActual(siguientePalabra);
      setLetraActual(0);
    }
  }, [letraActual, textoActual, palabras]);

  const handleGenerarClick = () => {
    if (texto.trim() === '') {
      setError(true);
    } else {
      setError(false);
      // Aquí iría la lógica para generar el texto con AI
    }
  };

  const handleResetClick = () => {
    setTexto('');
    setReset(!reset);
  };

  return (
    <div className="hero h-auto justify-left flex-col mt-20">
      <div className="hero-content flex-col-reverse w-screen lg:flex-row-reverse h-fit">
        <div className="flex-0 h-64 lg:h-96 w-full lg:w-1/2 mx-auto relative flex items-center">
          <div className="relative w-full">
            <textarea
              className="text-1xl lg:text-xl textarea textarea-ghost h-56 sm:h-80 w-full border-8 border-black rounded-lg p-6 shadow-xl resize-none bg-white"
              placeholder="ex: Give me a presentation of about 15 slides about the mating season of mussels in the north of Spain, in yellow and in Spanish"
              value={texto}
              onChange={handleTextoChange}
              key={reset}
            />

            <div className="absolute bottom-0 right-0 flex items-center mr-6 mb-6">
              <p className={`text-${300 - texto.length > 20 ? 'gray-700' : 'red-500'}`}>
                max.{300 - texto.length}
              </p>▪️
              <a
                href="#"
                className="text-cyan-500 hover:underline"
                onClick={handleResetClick}>
                 Reset
              </a>
            </div>
          </div>
          <button
            className="btn  btn-secondary rounded-full text-sm absolute bottom-16 left-1/2 transform -translate-x-1/2"
            onClick={handleGenerarClick}
          >
            Generate!
          </button>
          
          {error && (
            <p className="text-red-500 absolute bottom-7 left-0 ml-6 mb-6">
              👆 Please, prompt something.
            </p>
          )}
          
        </div>
        <div className="flex-auto w-full lg:w-1/2">
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-6xl lg:text-5xl font-normal text-left">Try to Generate a...</h1>
            <h1 id="texto" className="text-4xl lg:text-7xl font-extrabold w-120 text-left">
              _{textoActual.substring(0, letraActual)}
            </h1>
           
            <div>
              <h2 className="text-2xl font-normal mt-6 text-left pt-5">
                You have one shot for <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-2xs font-medium bg-green-500 text-white">
                Free
              </span> 👉
              </h2>
              <div className="mt-2 flex items-center">
              <span className="text-3xl mr-2 flex items-center pt-">
                <p className="fas fa-star">⭐</p>
                <p className="fas fa-star">⭐</p>
                <p className="fas fa-star">⭐</p>
                <p className="fas fa-star">⭐</p>
                <p className="fas fa-star">⭐</p>
              </span>
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

