import Head from 'next/head'
import { Nunito } from '@next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Drawer } from '@/components/Drawer'
const nunito = Nunito({ subsets: ['latin'] })
import Script from 'next/script'
export default function Profile() {
  
  return (
    <>
    <Head>
        <title>Account area</title>
        <Script src="https://js.stripe.com/v3/"/>
      </Head>
      <main>
        
        <Navbar />
        <Drawer />
        <Footer />
      </main>
     
    </>
  )
}
