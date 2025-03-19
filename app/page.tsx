import HomeSection from './sections/Home'
import Shows from './sections/Shows'
import Bio from './sections/Bio'
import Merch from './sections/Merch'
import Gallery from './sections/Gallery'
import Contact from './sections/Contact'
import { JSX } from 'react'

// Force static generation
export const dynamic = 'force-static'
export const revalidate = false

export default function Home(): JSX.Element {
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
