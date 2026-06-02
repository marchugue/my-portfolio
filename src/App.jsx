import {
  ParticleBackground,
  Navigation,
  Hero,
  TechStack,
  Projects,
  Contact,
} from './components'

function App() {
  return (
    <div className="relative min-h-screen bg-dark-900">
      <ParticleBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <TechStack />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
