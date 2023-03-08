import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Pricing from '@/components/Pricing';
export default function Profile() {
  return (
    <>
    <main >

      <Navbar/>
      <Pricing />
      <Footer/>
    </main>
  </>
  );
}

