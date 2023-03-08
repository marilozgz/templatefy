import { useState, useEffect } from "react";

export const Modal = ({ onClose }) => {
  const [stripeReady, setStripeReady] = useState(false);

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

  return (
    <div className="fixed inset-0 z-50 flex text-center items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-3/6">
        <h2 className="text-2xl font-bold mb-4 text-center ">Pricing</h2>
        <p className="mb-6">
          Upgrade, downgrade or cancel at <span className="font-bold">any time</span>
        </p>
        {stripeReady && (
          <stripe-pricing-table pricing-table-id="prctbl_1MjOdnLL8utQT13jQMnaO4RN"
          publishable-key="pk_live_51Lwq19LL8utQT13jhE31iP4RC7d1inXL9mBF5eARlJRRDcM7j8552VnQZ8MDrvgOKBE3gCvPEbE2jwdHlLwDAV91008duUHIY2">
          </stripe-pricing-table>
        )}
        <button className="btn btn-secondary mt-5" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
