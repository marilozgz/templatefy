import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isSelected = (item) => (router.pathname === item ? "selected" : "");

  return (
    <>
      <div className="navbar pt-8 px-10 justify-between align-baseline bg-white w-full flex-col lg:flex-row lg:max-w-full lg:mx-auto pb-8">
        <button onClick={() => setIsOpen(!isOpen)} className="block lg:hidden">
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              fillRule="evenodd"
              d="M0 3a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1zm0 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1zm0 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z"
            />
          </svg>
        </button>
        <nav className={`lg:flex justify-start flex-wrap bg-white py-4 px-6 ${isOpen ? "block" : "hidden"
          } w-full lg:text-center lg:flex-row lg:justify-between`}>
          <div className="flex  justify-start lg:justify-start lg:justify-start">
            <Link href="./">
              <Image
                src="/images/logo.webp"
                alt="logo_templify"
                width={240}
                height={100}
              />
            </Link>
          </div>
          <div className="flex justify-start">
            <ul className="menu menu-horizontal text-2xl font-nunito pt-4">
              <li>
                <Link href="/" className={`font-nunito ${isSelected("/")}`}>Home</Link>
              </li>
              <li>
                <Link href="/mailing" className={`font-nunito ${isSelected("/mailing")}`}>Emails</Link>
              </li>
              <li>
                <Link href="/presentations" className={`font-nunito ${isSelected("/presentations")}`}>Presentations</Link>
              </li>
              <li>
                <Link href="/tweets" className={`font-nunito ${isSelected("/tweets")}`}>Tweets</Link>
              </li>
              <li>
                <Link href="/blog" className={`font-nunito ${isSelected("/blog")}`}>Articles</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center lg:justify-center w-full lg:w-auto">
            <h1 className="text-2xl mt-4 text-center">
              <button
                className="btn btn-primary mr-2 gradient-bg w-full lg:w-auto"
              >
                ☕ Buy me a coffe
              </button>
              <style jsx>{`
        .gradient-bg {
          background-image: linear-gradient(90deg, #ffff80, #FF30EA);
          background-size: 200%;
          transition: background-position 0.5s ease;
        }

        .gradient-bg:hover {
          background-position: right;
        }
      `}</style>
            </h1>
          </div>
        </nav>


      </div>
    </>
  );
};
