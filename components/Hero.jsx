export const Hero = () => {

  return (
    <>
    <div className="hero text-center">
      <div className="flex flex-col mt-0 pt-8 ">
        <div>
          <h1 className="text-3xl">
            You have <span className='font-bold'>3 shots</span> for{' '}
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-1xs font-medium bg-green-500 text-white">
              Free
            </span>{' '}
            to generate
          </h1>
        </div>   
      </div>   
    </div>
    </>
  );
};
