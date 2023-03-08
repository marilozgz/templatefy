import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-white text-gray-400 mt-4 flex-col justify-center">
      <div>
        <div className="text-center">
      
          <Image
            src="/images/logo.webp"
            alt="logo_templify"
            width={240}
            height={100}
          ></Image>
       
        </div>
        <div className="divider bg-black"></div> 
        <div className="text-1xl lg:text-xl grid grid-flow-col gap-4 text-center">
          <p>© 2023 Templatefy.app | Legal notice | Terms and conditions | Cookies</p>
        </div>
      </div>
    </footer>
  );
};
