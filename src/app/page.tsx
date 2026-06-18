import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Cockpit from '@/components/sections/Cockpit'
import ProblemSolution from '@/components/sections/ProblemSolution'
import Pricing from '@/components/sections/Pricing'
import Cta from '@/components/sections/Cta'

export default function Home() {
  return (
    <>
      <Navbar />
      <span id="top" />
      <Hero />
      <Cockpit />
      <ProblemSolution />
      <Pricing />
      <Cta />
      <Footer />
    </>
  )
}
