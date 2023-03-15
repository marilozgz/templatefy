import Head from 'next/head'
import { Nunito } from '@next/font/google'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { HowWorks } from '@/components/HowWorks'
import { Result } from '@/components/Result'
import { Footer } from '@/components/Footer'

const nunito = Nunito({ subsets: ['latin'] })

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Templatefy</title>
        <meta name="description" content="Crear una templates con AI? Si se puede!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>      
        <Navbar />
        <Hero />
        <HowWorks />
        <Result />
        <Footer />
      </main>
     
    </>
  )
}
