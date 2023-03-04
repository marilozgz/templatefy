import Image from "next/image";
export const HowWorks = () => {
  return (
    <>
      <div className="hero pt-20 w-full bg-slate-100 ">
        <div className="w-8/12 px-12 flex flex-col lg:flex-col justify-items-start ">
          <div>
            <h1 className="text-5xl text-bold text-left">¿Cómo funciona?</h1>
          </div>
          <div>
            {" "}
            <h3 className="text-2xl mt-4">
              Escribe lo que necesitas, se generará una template:
            </h3>
          </div>
        </div>
      </div>
      <div className="hero pt-20 bg-slate-100 ">
        <div className="hero-content flex-col lg:flex-row w-screen justify-around space-x-10">
          <div className="flex flex-row w-1/2 ">
            <Image
              src="/images/start_building_api_2x.webp"
              alt="imagen_api"
              width={514}
              height={341}
              className="max-w-lg"
            />
          </div>
          <div className="flex flex-row w-1/2">
            <ul>
              <li className="mb-4">
                <div className="flex flex-row space-x-3">
                  <Image
                    src="/images/bullet.webp"
                    width={32}
                    height={32}
                    alt="icon list"
                  />
                  <h3 className="text-2xl">Contenido relacionado</h3>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex flex-row space-x-3">
                  <Image
                    src="/images/bullet.webp"
                    width={32}
                    height={32}
                    alt="icon list"
                  />
                  <h3 className="text-2xl">Imágenes, dibujos</h3>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex flex-row space-x-3">
                  <Image
                    src="/images/bullet.webp"
                    width={32}
                    height={32}
                    alt="icon list"
                  />
                  <h3 className="text-2xl">Textos editables</h3>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex flex-row space-x-3">
                  <Image
                    src="/images/bullet.webp"
                    width={32}
                    height={32}
                    alt="icon list"
                  />
                  <h3 className="text-2xl">Set de gráficos o iconos..</h3>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex flex-row space-x-3">
                  <Image
                    src="/images/bullet.webp"
                    width={32}
                    height={32}
                    alt="icon list"
                  />
                  <h3 className="text-2xl">
                    Google slides, Canva y Power Point
                  </h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
