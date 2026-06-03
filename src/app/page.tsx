import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import JobWall from '@/components/sections/JobWall'
import ProblemSolution from '@/components/sections/ProblemSolution'
import HowItWorks from '@/components/sections/HowItWorks'
import Pricing from '@/components/sections/Pricing'
import Cta from '@/components/sections/Cta'

export default function Home() {
  return (
    <>
      <Navbar />
      <span id="top" />
      <Hero />
      <JobWall />
      <ProblemSolution />
      <HowItWorks />
      <Pricing />
      <Cta />
      <Footer />
    </>
  )
}
