export const Tabs = ({ activeTab, handleTabClick }) => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="tabs">
        <a
          className={`tab tab-custom ${activeTab === 'emails' ? 'tab-custom-active' : ''}`}
          onClick={() => handleTabClick('emails')}
        >
          Emails
        </a> 
        <a
          className={`tab tab-custom ${activeTab === 'slides' ? 'tab-custom-active' : ''}`}
          onClick={() => handleTabClick('slides')}
        >
          Slides
        </a> 
        <a
          className={`tab tab-custom ${activeTab === 'tweets' ? 'tab-custom-active' : ''}`}
          onClick={() => handleTabClick('tweets')}
        >
          Tweets
        </a>
        <a
          className={`tab tab-custom ${activeTab === 'instagram' ? 'tab-custom-active' : ''}`}
          onClick={() => handleTabClick('instagram')}
        >
          Instagram
        </a>
      </div>
    </div>
  );
};
