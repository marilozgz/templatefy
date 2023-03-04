import Image from "next/image";
export const Result = () => {
  return (
    <>
      <div className="hero h-52 bg-slate-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">El resultado</h1>
            <p className="py-6">¿No te lo crees?, pruébalo!</p>
          </div>
        </div>
      </div>
      <div className="hero h-auto pb-24 bg-slate-100">
        <div className="hero-content w-full ">
          <div className="w-full flex flex-row  m-auto space-x-10 items-center">
            <div className="">
              {" "}
              <Image
                src="/images/izquierda.webp"
                alt="imagen_api"
                width={336}
                height={273}
              />
            </div>
            <div className="card w-auto bg-base-100 shadow-xl">
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
                  <button className="btn btn-primary bg-black rounded-full">
                    Quiero probar!!
                  </button>
                </div>
              </div>
            </div>
            <div>
              {" "}
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
