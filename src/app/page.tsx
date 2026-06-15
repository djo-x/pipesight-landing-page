import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Features from '@/components/sections/Features'
import TheAlert from '@/components/sections/TheAlert'
import Pricing from '@/components/sections/Pricing'
import Cta from '@/components/sections/Cta'

export default function Home() {
  return (
    <>
      <Navbar />
      <span id="top" />
      <Hero />
      <Stats />
      <Features />
      <TheAlert />
      <Pricing />
      <Cta />
      <Footer />
    </>
  )
}
