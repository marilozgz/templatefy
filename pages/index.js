import Head from 'next/head'
import { Nunito } from '@next/font/google'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { HowWorks } from '@/components/HowWorks'
import { Result } from '@/components/Result'
import { Footer } from '@/components/Footer'
import { Emails } from '@/components/Emails'
import { Slides } from '@/components/Slides'
import { Tweets } from '@/components/Tweets'
import { Instagram } from '@/components/Instagram'
import { Tabs } from '@/components/Tabs'


const nunito = Nunito({ subsets: ['latin'] })

export default function Home() {
  const [activeTab, setActiveTab] = useState('emails');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.sessionStorage.setItem('activeTab', tab);
  };

  useEffect(() => {
    const storedTab = window.sessionStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  let activeComponent;

  if (activeTab === 'emails') {
    activeComponent = <Emails />;
  } else if (activeTab === 'slides') {
    activeComponent = <Slides />;
  } else if (activeTab === 'tweets') {
    activeComponent = <Tweets />;
  } else if (activeTab === 'instagram') {
    activeComponent = <Instagram />;
  }

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
        <div className="tabs-container">
          <Tabs activeTab={activeTab} handleTabClick={handleTabClick} />
          {activeComponent}
        </div>
        <HowWorks />
        <Result />
        <Footer />
      </main>
     
    </>
  )
}
