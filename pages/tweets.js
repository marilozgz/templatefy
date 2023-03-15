
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Tweets } from '@/components/Tweets'

export default function tweets() {

  return (
    <>
      <main> 
        <Navbar />
     
        <Tweets />
        
        <Footer />
      </main>
     
    </>
  )
}
