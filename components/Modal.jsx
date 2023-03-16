import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Stripe } from "./Stripe";

export const Modal = ({ onClose }) => {
  const [stripeReady, setStripeReady] = useState(false);
  const [modalHeight, setModalHeight] = useState("auto");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    script.onload = () => setStripeReady(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Check if device width is less than 640px (mobile devices)
        const screenHeight = window.innerHeight;
        setModalHeight(`${screenHeight * 0.9}px`); // Set modal height to 90% of screen height
      } else {
        setModalHeight("auto"); // Set modal height to auto for larger devices
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex text-center items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg sm:w-full md:max-w-3xl overflow-y-scroll" style={{ height: modalHeight }}>
        <div className="relative">
          <button className="absolute top-0 right-0 m-0" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center ">Pricing</h2>
          <p className="mb-6">
            Upgrade, downgrade or cancel at <span className="font-bold">any time</span>
          </p>
          {stripeReady && (
            <Stripe />
          )}
        </div>
      </div>
    </div>
  );
};
