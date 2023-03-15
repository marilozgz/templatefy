
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Slides } from '@/components/Slides'

export default function presentations() {

  return (
    <>
      <main> 
        <Navbar />    
        <Slides />        
        <Footer />
      </main>
     
    </>
  )
}
