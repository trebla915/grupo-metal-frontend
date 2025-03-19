import HomeSection from '@/sections/Home'
import Shows from '@/sections/Shows'
import Bio from '@/sections/Bio'
import Merch from '@/sections/Merch'
import Gallery from '@/sections/Gallery'
import Contact from '@/sections/Contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grupo Metal - Home',
  description: 'Official website of Grupo Metal - South Texas Metal Band',
}

// Allow dynamic content
export const dynamic = 'auto'
export const revalidate = 3600 // Revalidate every hour

export default function HomePage() {
  return (
    <main className="w-full">
      <section id="home" className="min-h-screen w-full">
        <HomeSection />
      </section>
      <section id="shows" className="min-h-screen w-full bg-black">
        <Shows />
      </section>
      <section id="bio" className="min-h-screen w-full bg-black">
        <Bio />
      </section>
      <section id="merch" className="min-h-screen w-full bg-black">
        <Merch />
      </section>
      <section id="gallery" className="min-h-screen w-full bg-black">
        <Gallery />
      </section>
      <section id="contact" className="min-h-screen w-full bg-black">
        <Contact />
      </section>
    </main>
  )
}
