import { Nunito } from '@next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Drawer } from '@/components/Drawer'
const nunito = Nunito({ subsets: ['latin'] })

export default function Profile() {
  
  return (
    <>
      <main>
        
        <Navbar />
        <Drawer />
        <Footer />
      </main>
     
    </>
  )
}
