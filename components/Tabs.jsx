import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlideshare, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
export const Tabs = ({ activeTab, handleTabClick }) => {
  return (
    <div className="mt-10">
      <div className="tabs">
        <a
          className={`tab tab-custom ${activeTab === "emails" ? "tab-custom-active" : ""}`}
          onClick={() => handleTabClick("emails")}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <span className="tab-text">Emails</span>
          </div>
        </a>

        <a
          className={`tab tab-custom ${activeTab === "slides" ? "tab-custom-active" : ""}`}
          onClick={() => handleTabClick("slides")}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faSlideshare} className="mr-2" />
            <span className="tab-text">Slides</span>
          </div>
        </a>

        <a
          className={`tab tab-custom ${activeTab === "tweets" ? "tab-custom-active" : ""}`}
          onClick={() => handleTabClick("tweets")}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faTwitter} className="mr-2" />
            <span className="tab-text">Tweets</span>
          </div>
        </a>

        <a
          className={`tab tab-custom ${activeTab === "instagram" ? "tab-custom-active" : ""}`}
          onClick={() => handleTabClick("instagram")}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faInstagram} className="mr-2" />
            <span className="tab-text">Instagram</span>
          </div>
        </a>
      </div>
      <style jsx>{`
        .tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tab-button {
          max-width: 150px; /* Definimos un ancho máximo para los botones */
        }

        @media (max-width: 640px) {
          .tab-text {
            display: none;
            padding: 0.5rem
          }
        }
      `}</style>
    </div>
  );
};



