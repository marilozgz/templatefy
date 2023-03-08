import Image from "next/image";

export const Result = () => {
  return (
    <>
      <div className="hero h-52 mt-40">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">The final result</h1>
            <p className="text-2xl mt-4 text-center">Do not you believe it? Try it!</p>
          </div>
        </div>
      </div>
      <div className="hero h-auto pb-24">
        <div className="hero-content w-full ">
          <div className="w-full lg:flex lg:flex-row lg:space-x-10 m-auto items-center">
            <div className="w-full lg:w-auto mb-10 lg:mb-0">
              <Image
                src="/images/izquierda.webp"
                alt="imagen_api"
                width={336}
                height={273}
              />
            </div>
            <div className="card w-full lg:w-1/2 shadow-xl">
              <figure className="px-10 pt-10">
                <Image
                  src="/images/group.webp"
                  width={600}
                  height={600}
                  alt="imagen_api"
                />
              </figure>
              <div className="card-body items-center text-center">
                <div className="card-actions">
                  <button className="btn btn-secondary rounded-full">
                  Let’s try it!
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-auto">
              <Image
                src="/images/derecha.webp"
                alt="imagen_api"
                width={300}
                height={70}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
