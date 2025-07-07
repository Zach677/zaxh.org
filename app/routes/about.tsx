import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { LiquidCard, LiquidButton, LiquidTag } from '../components/LiquidGlass'

export const meta = () => {
  return [
    { title: "About Me - Zach's Blog" },
    { name: 'description', content: 'Learn more about the blog author' },
  ]
}

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">
      {/* 动态背景 */}
      <div className="liquid-background" />

      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12 pt-32 relative z-10">
        {/* 个人介绍主卡片 */}
        <LiquidCard
          title="About Me"
          subtitle="Frontend Developer & Tech Enthusiast"
          className="mb-8 text-center"
        >
          <div className="mt-6">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">Z</span>
            </div>

            <h1 className="text-h2 text-gray-900 dark:text-white mb-4">
              Hello, I'm Zach
            </h1>

            <p className="text-body-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              I'm a frontend development engineer with a passion for technology,
              who enjoys exploring new technologies and tools. In this blog,
              I'll share my experiences in development, knowledge I've learned,
              and thoughts about technology.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <LiquidTag color="blue">Frontend Developer</LiquidTag>
              <LiquidTag color="purple">UI/UX Enthusiast</LiquidTag>
              <LiquidTag color="green">Open Source Contributor</LiquidTag>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LiquidButton
                variant="primary"
                size="md"
                onClick={() => (window.location.href = '/')}
              >
                View My Work
              </LiquidButton>
              <LiquidButton
                variant="secondary"
                size="md"
                onClick={() =>
                  window.open('mailto:your-email@example.com', '_blank')
                }
              >
                Get In Touch
              </LiquidButton>
            </div>
          </div>
        </LiquidCard>

        {/* 技能与经验 */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <LiquidCard
            title="Technical Skills"
            subtitle="Technologies I work with"
          >
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-body font-medium text-gray-900 dark:text-white mb-2">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  <LiquidTag color="blue">React</LiquidTag>
                  <LiquidTag color="purple">TypeScript</LiquidTag>
                  <LiquidTag color="pink">Next.js</LiquidTag>
                  <LiquidTag color="orange">Vue.js</LiquidTag>
                </div>
              </div>
              <div>
                <h4 className="text-body font-medium text-gray-900 dark:text-white mb-2">
                  Styling
                </h4>
                <div className="flex flex-wrap gap-2">
                  <LiquidTag color="green">Tailwind CSS</LiquidTag>
                  <LiquidTag color="blue">Styled Components</LiquidTag>
                  <LiquidTag color="purple">Sass</LiquidTag>
                </div>
              </div>
              <div>
                <h4 className="text-body font-medium text-gray-900 dark:text-white mb-2">
                  Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  <LiquidTag color="orange">Vite</LiquidTag>
                  <LiquidTag color="pink">Webpack</LiquidTag>
                  <LiquidTag color="green">Git</LiquidTag>
                  <LiquidTag color="blue">Docker</LiquidTag>
                </div>
              </div>
            </div>
          </LiquidCard>

          <LiquidCard title="Interests" subtitle="What drives my passion">
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-body font-medium text-gray-900 dark:text-white mb-1">
                    Modern Web Technologies
                  </h4>
                  <p className="text-body-sm text-gray-600 dark:text-gray-400">
                    Exploring cutting-edge frameworks and tools that push the
                    boundaries of web development.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-body font-medium text-gray-900 dark:text-white mb-1">
                    User Experience
                  </h4>
                  <p className="text-body-sm text-gray-600 dark:text-gray-400">
                    Creating intuitive and delightful interfaces that users love
                    to interact with.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-body font-medium text-gray-900 dark:text-white mb-1">
                    Performance Optimization
                  </h4>
                  <p className="text-body-sm text-gray-600 dark:text-gray-400">
                    Building fast, efficient applications that provide excellent
                    user experiences.
                  </p>
                </div>
              </div>
            </div>
          </LiquidCard>
        </div>

        {/* 个人理念 */}
        <LiquidCard className="text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-h3 text-gray-900 dark:text-white mb-6">
              My Philosophy
            </h2>
            <blockquote className="text-body-lg text-gray-600 dark:text-gray-300 italic leading-relaxed mb-6">
              "Technology is not just a tool, but a way to improve life and
              solve problems. I believe in writing clean, maintainable code that
              not only works well but also tells a story and makes the lives of
              other developers easier."
            </blockquote>
            <p className="text-body text-gray-600 dark:text-gray-300">
              Besides technical articles, I also share some life insights and
              personal reflections. I'm always excited to connect with fellow
              developers and learn from the community.
            </p>
          </div>
        </LiquidCard>
      </main>

      <Footer />
    </div>
  )
}

export default About
