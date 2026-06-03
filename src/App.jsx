import {
  ParticleBackground,
  Navigation,
  Hero,
  TechStack,
  Projects,
  Contact,
  Chatbot,
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
      <Chatbot />
    </div>
  )
}

export default App
