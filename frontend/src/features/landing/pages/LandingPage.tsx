import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import HowItWorks from "../components/HowItWorks"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
