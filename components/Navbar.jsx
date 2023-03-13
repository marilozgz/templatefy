import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="navbar pt-8 px-10 justify-between align-baseline bg-white w-full flex-col lg:flex-row lg:max-w-full lg:mx-auto pb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block lg:hidden"
      >
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
      <nav className={`lg:flex items-center justify-between flex-wrap bg-white py-4 px-6 ${isOpen ? "block" : "hidden"} w-full lg:text-center lg:flex-row lg:justify-between`}>

        <div className="flex items-center justify-center lg:justify-start lg:w-1/3">
          <Link href="/">
            <Image
              src="/images/logo.webp"
              alt="logo_templify"
              width={240}
              height={100}
            />
          </Link>
        </div>
        <div className="flex items-center justify-center lg:justify-center lg:w-1/3">
          <h1 className="text-2xl mt-4 text-center">
          <button className="btn btn-primary mr-2 gradient-bg" onClick={handleOpenModal}>
  🔥 Upgrade to pro
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

            <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-2xs font-bold">
              Cancel at any time
            </span>
          </h1>
        </div>
        <div className="flex items-center justify-center lg:justify-end lg:w-1/3">
          <button className="btn btn-primary mr-2">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Access
          </button>
        </div>
      </nav>
      {showModal && <Modal onClose={handleCloseModal} />}
    </div>
  );
      };
