import Image from "next/image";
export const Hero = () => {
  return (
    <>
      <div className="hero h-auto   bg-slate-100">
        <div className="hero-content flex-col w-screen lg:flex-row-reverse h-fit">
          <div className="flex-0 h-96 w-1/2	 bg-[url('/images/textarea.webp')] bg-contain bg-no-repeat	 bg-center">
          <textarea className="textarea textarea-ghost  mt-10 h-68 w-full" placeholder=""></textarea>
          <button className="btn btn-m rounded-full bg-cyan-400 text-sm mt-6 relative top-32 left-60">
          Generar
        </button>
          </div>
          <div className="flex-auto w-1/2">
            <h1 className="text-9xl font-normal">Crea tus</h1>
            <h1 className="text-7xl font-extrabold">_presentaciones</h1>
            <div className="flex space-x-3">
              <h2 className="text-3xl font-normal mt-6">en segundos con AI</h2>
              <button className="btn btn-sm rounded-full bg-green-600 text-sm mt-6">
                gratis!!!
              </button>
            </div>
            <div className="flex space-x-3 mt-9 align-baseline">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                  checked
                />
              </div>
              <p className="text-xs underline mt-2 ">34 Opiniones</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
