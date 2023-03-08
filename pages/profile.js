import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Drawer } from '@/components/Drawer';
import { Footer } from '@/components/Footer';
export default function Profile() {
  return (
    <>
    <main >

      <Navbar/>
      <Drawer />
      <Footer/>
    </main>
  </>
  );
}

