import { Sparkles } from 'lucide-react'

function Hero({ onShopClick }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -inset-20 -z-10 opacity-30 blur-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-700 via-purple-700 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-purple-100">
              Elevate your style in black & purple
            </h1>
            <p className="mt-4 text-purple-300/80 max-w-prose">
              Curated essentials with a sleek, neon-night aesthetic. Browse the latest arrivals and build your perfect setup.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={onShopClick}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white px-5 py-2.5 rounded-md shadow-lg shadow-purple-900/30"
              >
                <Sparkles className="h-4 w-4" />
                Shop now
              </button>
              <a
                href="#collections"
                className="inline-flex items-center gap-2 border border-purple-900/50 text-purple-200 hover:text-purple-100 hover:border-purple-700/70 px-5 py-2.5 rounded-md"
              >
                Explore collections
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-purple-900/40 to-black border border-purple-900/40 shadow-2xl shadow-black/60" />
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-700 blur-xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
