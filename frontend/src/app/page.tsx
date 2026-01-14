import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black selection:bg-blue-500/30">
        
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />

      <div className="z-10 text-center max-w-4xl px-6">
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">v2.0 Live Now</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-white">
          ALPHA <span className="text-blue-500">TRADING</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          The next generation of trading intelligence. <br/>
          <span className="text-gray-500">Master markets with LSTM-powered predictions.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <Link href="/login" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
                Get Started
                <span className="absolute inset-0 rounded-full ring-2 ring-white/50 group-hover:ring-white transition-all duration-300 scale-105 opacity-0 group-hover:opacity-100"></span>
             </Link>
             <Link href="/learn" className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Explore Courses
             </Link>
        </div>
      </div>

      <div className="absolute bottom-12 w-full flex justify-between px-12 text-sm text-gray-600 font-mono uppercase tracking-widest">
        <span>© 2026 Alpha</span>
        <span className="hidden md:block">Scroll for more</span>
        <span>Harsh-H-Shah</span>
      </div>
    </main>
  )
}
