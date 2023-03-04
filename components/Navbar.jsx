import Image from "next/image";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';

export const Navbar = () => {
  const { user} = useUser();

  return (
    <>
      <div className="navbar pt-8 px-10 justify-between align-baseline ">
        <div className="flex-0 mr-10  ">
          <Image
            src="/images/logo.webp"
            alt="logo_templify"
            width={330}
            height={140}
          ></Image>
        </div>
        <div className="flex">
          <ul className="menu menu-horizontal text-2xl text-gray-500	font-nunito pt-4 ">
            <li className=" hover:text-cyan-500">
              <a className="font-nunito">Home</a>
            </li>
            {user && (
              <li className=" hover:text-cyan-500">
              <span>Mis Assets</span>
              </li>
            )}
          
            <li className=" hover:text-cyan-500">
              <span>Ejemplos</span>
            </li>
            <li className=" hover:text-cyan-500">
              <a>Precios</a>
            </li>
            <li className=" hover:text-cyan-500">
              <a>¿Necesitas ayuda?</a>
            </li>
          </ul>
        </div>
        
       {user ?(
        <div className="dropdown dropdown-bottom dropdown-end">
        <div className="avatar">
        <div className="w-8 rounded-full">
      
          <img tabIndex={0} src={user.picture} alt={user.name} width="auto" height="auto" />
       
        </div>
      </div>
        
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link href="/profile">Mi Profile</Link></li>
          <li><Link href="/api/auth/logout">Log out</Link></li>
        </ul>
      </div>

      
        ):(
        <div className="flex-0   space-x-4">
        <Link href="/api/auth/login"> <button className="btn btn-g rounded-full bg-cyan-500 text-xl" >Log in</button>
        </Link>
        <button className="btn btn-g rounded-full text-xl">Registrarme</button>
        </div>
        )}
      </div>
     
    </>
  );
};
