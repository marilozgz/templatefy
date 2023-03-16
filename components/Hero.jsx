import { useState, useEffect } from 'react';

export const Hero = () => {
  const palabras = ['slidess', 'emailss', 'tweetss'];
  const [textoActual, setTextoActual] = useState(palabras[0]);
  const [letraActual, setLetraActual] = useState(0);

  const [texto, setTexto] = useState('');

  useEffect(() => {
    const intervalo = setInterval(() => {
      setLetraActual((letraActual) => letraActual + 1);
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

  return (
    <div className="hero h-auto justify-left flex-col mt-20">
      <div className="hero-content flex-col-reverse w-screen lg:flex-row-reverse h-fit">
        <div className="flex-0 h-auto lg:h-96 w-full lg:w-1/2 mx-auto relative flex items-center">
          <div className="relative w-full">
            Aqui va un video
           </div>
          
        </div>
        <div className="flex-auto w-full lg:w-1/2">
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-5xl lg:text-5xl font-normal text-left">Try to Generate...</h1>
            <h1 id="texto" className="text-4xl lg:text-7xl font-extrabold w-120 text-left">
              _{textoActual.substring(0, letraActual)} 
            </h1>
           
            <div>
              <h2 className="text-2xl font-normal mt-6 text-left pt-5">
                Use it. It&apos;s  <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-2xs font-medium bg-green-500 text-white">
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