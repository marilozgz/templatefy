import Head from 'next/head'
import { Nunito } from '@next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Drawer } from '@/components/Drawer'
const nunito = Nunito({ subsets: ['latin'] })

export default function Profile() {
  
  return (
    <>
    <Head>
        <title>Account area</title>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <main>
        
        <Navbar />
        <Drawer />
        <Footer />
      </main>
     
    </>
  )
}
