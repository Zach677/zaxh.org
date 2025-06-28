import type { Route } from './+types/about'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "关于我 - Zach's Blog" },
    { name: 'description', content: '了解更多关于博客作者的信息' },
  ]
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            关于我
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  你好，我是 Zach
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  我是一名前端开发工程师，对技术充满热情，喜欢探索新的技术和工具。
                  在这个博客中，我会分享我在开发过程中的经验、学到的知识以及对技术的思考。
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  除了技术文章，我也会分享一些生活感悟和个人思考。
                  我相信技术不仅仅是工具，更是改善生活、解决问题的方式。
                </p>
              </div>

              <div className="md:w-64">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    技能栈
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
                  我的兴趣
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>前端技术研究与实践</li>
                  <li>开源项目贡献</li>
                  <li>技术写作与分享</li>
                  <li>用户体验设计</li>
                  <li>阅读与思考</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  联系我
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  如果你想和我交流技术问题，或者有任何建议和想法，
                  欢迎通过以下方式联系我：
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
                💡 <strong>博客目标：</strong>
                通过分享知识和经验，与更多开发者交流学习，
                共同成长，推动技术社区的发展。
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
