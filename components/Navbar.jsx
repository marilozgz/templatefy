import Image from "next/image";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';

export const Navbar = () => {
  const { user } = useUser();

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
        <ul className="menu menu-horizontal text-2xl font-nunito pt-4">
          <li>
            <a className="font-nunito">Home</a>
          </li>
          <li>
            <a>Pricing</a>
          </li>
        </ul>
      </div>

      {user ? (
        <div className="dropdown dropdown-bottom dropdown-end">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img
                tabIndex={0}
                src={user.picture}
                alt={user.name}
                width="auto"
                height="auto"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/profile">Mi Profile</Link>
            </li>
            <li>
              <Link href="/api/auth/logout">Log out</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex-0 space-x-4 lg:space-x-0 lg:ml-4 mt-4">
          <Link href="/api/auth/login">
            <button className="btn btn-secondary mr-2">Log in</button>
          </Link>
          <button className="btn btn-primary">Register</button>
        </div>
      )}
    </div>
  );
};
