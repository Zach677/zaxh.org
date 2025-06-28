import type { Route } from './+types/about'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Me - Zach's Blog" },
    { name: 'description', content: 'Learn more about the blog author' },
  ]
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            About Me
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Hello, I'm Zach
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  I'm a frontend development engineer with a passion for
                  technology, who enjoys exploring new technologies and tools.
                  In this blog, I'll share my experiences in development,
                  knowledge I've learned, and thoughts about technology.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Besides technical articles, I'll also share some life insights
                  and personal reflections. I believe technology is not just a
                  tool, but a way to improve life and solve problems.
                </p>
              </div>

              <div className="md:w-64">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tech Stack
                  </h3>
                  <div className="space-y-2">
                    {[
                      'JavaScript/TypeScript',
                      'React/Next.js',
                      'Vue.js/Nuxt.js',
                      'Node.js',
                      'CSS/Tailwind CSS',
                      'Git/GitHub',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  My Interests
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Frontend technology research and practice</li>
                  <li>Open source project contributions</li>
                  <li>Technical writing and sharing</li>
                  <li>User experience design</li>
                  <li>Reading and thinking</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Me
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you want to discuss technical issues with me, or have any
                  suggestions and ideas, feel free to contact me through the
                  following ways:
                </p>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>📧 Email: your.email@example.com</p>
                  <p>🐙 GitHub: @yourusername</p>
                  <p>🐦 Twitter: @yourusername</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                💡 <strong>Blog Goal:</strong>
                By sharing knowledge and experience, communicate and learn with
                more developers, grow together, and promote the development of
                the tech community.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
