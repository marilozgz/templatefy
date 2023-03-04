import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-white text-gray-400 mt-4">
    <div>
      <div>
        <Image src="/images/logo.webp" width={200} height={90} alt="logo "/>
        </div>
        <div className="divider bg-black"></div> 
        <div className="grid grid-flow-col gap-4">
        <p>© 2023 Templatefy | Legal notice | Terms and conditions | Cookies</p>
        </div>
      </div>
      <div>
        
      </div>
    </footer>
  );
};
