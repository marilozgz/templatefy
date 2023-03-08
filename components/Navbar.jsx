import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "./Pricing";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="navbar pt-8 px-10 justify-between align-baseline bg-white w-full flex-col lg:flex-row lg:max-w-full lg:mx-auto pb-8">
      <div className="flex-0 mr-10 flex-shrink-0">
        <Link href="./">
          <Image
            src="/images/logo.webp"
            alt="logo_templify"
            width={240}
            height={100}
          ></Image>
        </Link>
      </div>
      <div className="flex flex-wrap">
        <h1 className="text-2xl mt-4 text-center">
          Upgrade to pro,<span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-2xs font-bold">
          Cancel at any time
              </span>
        </h1>
      </div>

      <div className="flex-0 space-x-4 lg:space-x-0 lg:ml-4 mt-4">
        <button className="btn btn-primary mr-2" onClick={handleOpenModal}>
          🔥 Upgrade to pro
        </button>
      </div>

      {showModal && <Modal onClose={handleCloseModal} />}
    </div>
  );
};
