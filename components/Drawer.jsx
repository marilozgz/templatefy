import { useState } from 'react';

export const Drawer = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {activeTab === 'profile' && (
            <>
              <h1>Profile</h1>
              <p>Here is your profile information...</p>
            </>
          )}
          {activeTab === 'billing' && (
            <>
              <h1>Billing</h1>
              <p>Here is your billing information...</p>
            </>
          )}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li><span className="font-bold">ACCOUNT AREA</span></li>
            <li>
              <a
                onClick={() => handleTabClick('profile')}
                className={activeTab === 'profile' ? 'active' : ''}
                style={{ backgroundColor: activeTab === 'profile' ? '#000000' : 'transparent' }}
              >
                My profile
              </a>
            </li>
            <li>
              <a
                onClick={() => handleTabClick('billing')}
                className={activeTab === 'billing' ? 'active' : ''}
                style={{ backgroundColor: activeTab === 'billing' ? '#000000' : 'transparent' }}
              >
                Billing
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
