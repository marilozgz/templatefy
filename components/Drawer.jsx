import { useState } from 'react';
import { Stripe } from './Stripe';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Drawer = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-start mt-10">
                    {activeTab === 'profile' && (
                        <>
                            <div className="bg-white p-8 rounded-lg shadow-lg sm:w-full md:max-w-3xl">
                                <div className="relative">
                                    <h1>My Profile</h1>
                                    <p>Here is your profile information...</p>
                                </div>
                            </div>
                        </>
                    )}
                    {activeTab === 'planDetails' && (
                        <>
                            <div className="bg-white p-8 rounded-lg shadow-lg sm:w-full md:max-w-3xl">
                                <div className="relative pt-0">
                                    <h1>Plan details</h1>
                                    <p className="pb-5">Join +200 brands and agencies already on the PRO plan</p>
                                    <Stripe />
                                </div>
                            </div>
                        </>
                    )}
                    {activeTab === 'invoices' && (
                        <>
                            <div className="bg-white p-8 rounded-lg shadow-lg sm:w-full md:max-w-3xl">
                                <div className="relative pt-0">
                                    <h1>Your invoices</h1>
                                    <p className="pb-5">Stripe iframe</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="drawer-side hidden md:block">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li>
                            <span className="font-bold">
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                ACCOUNT AREA
                            </span>
                        </li>
                        <li className="my-2">
                            <a
                                onClick={() => handleTabClick('profile')}
                                className={activeTab === 'profile' ? 'active' : ''}
                                style={{ backgroundColor: activeTab === 'profile' ? '#DCDFE8' : 'transparent' }}
                            >
                                <div>
                                    <p className="mb-0 text-black">My profile</p>
                                    <span className="mt-0 text-sm text-gray-500">Edit, view or log out.
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                onClick={() => handleTabClick('planDetails')}
                                className={activeTab === 'planDetails' ? 'active' : ''}
                                style={{
                                    backgroundColor:
                                        activeTab === 'planDetails' ? '#DCDFE8' : 'transparent',
                                }}
                            >
                                <div>
                                    <p className="mb-0 text-black">Plan details</p>
                                    <span className="mt-0 text-sm text-gray-500">
                                        View your current plan, buy, upgrade, downgrade or cancel at
                                        any time.
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                onClick={() => handleTabClick('invoices')}
                                className={activeTab === 'invoices' ? 'active' : ''}
                                style={{
                                    backgroundColor:
                                        activeTab === 'invoices' ? '#DCDFE8' : 'transparent',
                                }}
                            >
                                <div>
                                    <p className="mb-0 text-black">Your invoices</p>
                                    <span className="mt-0 text-sm text-gray-500">
                                        Change your payment method or manage and download your
                                        invoices.
                                    </span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div></div></>
    );
};