export const metadata = {
  title: 'Info | Immersive 3D Blog',
  description: 'Learn more about our immersive 3D blog platform',
}

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            About This Project
          </h1>

          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What is Immersive 3D Blog?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-4">
                Immersive 3D Blog reimagines what a blog can be. Instead of
                traditional text-based posts, each blog entry is an immersive
                experience that combines:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Interactive 3D globe navigation</li>
                <li>Location-specific ambient soundscapes</li>
                <li>Time-aware day/night cycles</li>
                <li>Aurora effects for polar regions</li>
                <li>Optional Google Earth 360° integration</li>
                <li>Weather-appropriate visual ambience</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Technology Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Frontend
                  </h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• Next.js 14 (React 18)</li>
                    <li>• TypeScript</li>
                    <li>• TailwindCSS</li>
                    <li>• Zustand (State)</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    3D & Audio
                  </h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• React Three Fiber</li>
                    <li>• Three.js</li>
                    <li>• @react-three/drei</li>
                    <li>• Howler.js</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Content
                  </h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• Markdown + Frontmatter</li>
                    <li>• Gray Matter</li>
                    <li>• React Markdown</li>
                    <li>• Remark GFM</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Deployment
                  </h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• Vercel (Recommended)</li>
                    <li>• GitHub Actions</li>
                    <li>• CDN for assets</li>
                    <li>• SSR/SSG Support</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Features</h2>
              <div className="space-y-4">
                <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">
                    🌍 3D World Navigation
                  </h3>
                  <p className="text-white/70 text-sm">
                    Explore a beautiful 3D globe with blog posts pinned to their
                    real-world locations. Smooth camera transitions take you from
                    one experience to another.
                  </p>
                </div>

                <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">
                    🎵 Ambient Audio
                  </h3>
                  <p className="text-white/70 text-sm">
                    Each location has its own ambient soundscape - arctic winds,
                    ocean waves, city sounds, or forest ambience. Audio respects
                    browser autoplay policies and includes volume controls.
                  </p>
                </div>

                <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">
                    🌌 Time-Aware Sky
                  </h3>
                  <p className="text-white/70 text-sm">
                    The sky automatically adjusts to your local time - day or
                    night. Polar regions get beautiful aurora effects when it's
                    nighttime.
                  </p>
                </div>

                <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">
                    ♿ Accessibility
                  </h3>
                  <p className="text-white/70 text-sm">
                    WebGL fallback for unsupported browsers, keyboard navigation,
                    high-contrast mode support, and reduced motion preferences.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4">
                Browser Support
              </h2>
              <p className="text-white/70 mb-4">
                This application requires WebGL support for the full 3D
                experience. Supported browsers include:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Chrome/Edge 90+</li>
                <li>Firefox 88+</li>
                <li>Safari 14+</li>
                <li>Opera 76+</li>
              </ul>
              <p className="text-white/50 text-sm mt-4">
                A fallback view is provided for browsers without WebGL support.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
