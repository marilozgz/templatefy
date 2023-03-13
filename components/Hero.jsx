export const Hero = () => {
  return (
    <>
      <div className="hero text-center">
        <div className="flex flex-col mt-0 pt-8">
          <div>
            <h1 className="text-3xl">
              Generate templates for:
            </h1>
          </div>   
        </div>   
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .hero h1 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
};
