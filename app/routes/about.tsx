import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const meta = () => {
  return [
    { title: "About Me - Zach's Blog" },
    { name: 'description', content: 'Learn more about the blog author' },
  ]
}

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12 pt-32">
        <article>
          <header className="mb-8">
            <h1 className="text-h1 text-gray-900 dark:text-white mb-4">
              About Me
            </h1>
          </header>

          <div className="prose-enhanced max-w-none">
            <p className="text-body-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Hello, I'm Zach, a frontend development engineer with a passion
              for technology. I enjoy exploring new technologies and tools, and
              in this blog, I'll share my experiences in development, knowledge
              I've learned, and thoughts about technology.
            </p>

            <h2 className="text-h3 text-gray-900 dark:text-white mb-4 mt-8">
              What I Do
            </h2>

            <p className="text-body text-gray-600 dark:text-gray-300 mb-4">
              I'm a frontend developer focused on creating modern, performant
              web applications. My work involves building user interfaces with
              React, TypeScript, and modern CSS, while always keeping user
              experience at the forefront.
            </p>

            <h2 className="text-h3 text-gray-900 dark:text-white mb-4 mt-8">
              Technologies I Work With
            </h2>

            <p className="text-body text-gray-600 dark:text-gray-300 mb-4">
              <strong>Frontend:</strong> React, TypeScript, Next.js, Vue.js
            </p>

            <p className="text-body text-gray-600 dark:text-gray-300 mb-4">
              <strong>Styling:</strong> Tailwind CSS, Styled Components, Sass
            </p>

            <p className="text-body text-gray-600 dark:text-gray-300 mb-4">
              <strong>Tools:</strong> Vite, Webpack, Git, Docker
            </p>

            <h2 className="text-h3 text-gray-900 dark:text-white mb-4 mt-8">
              My Interests
            </h2>

            <p className="text-body text-gray-600 dark:text-gray-300 mb-4">
              I'm passionate about modern web technologies and enjoy exploring
              cutting-edge frameworks and tools that push the boundaries of web
              development. I believe in creating intuitive and delightful
              interfaces that users love to interact with.
            </p>

            <p className="text-body text-gray-600 dark:text-gray-300 mb-4">
              Performance optimization is another area I'm deeply interested in
              - building fast, efficient applications that provide excellent
              user experiences.
            </p>

            <h2 className="text-h3 text-gray-900 dark:text-white mb-4 mt-8">
              My Philosophy
            </h2>

            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-6 italic text-body text-gray-600 dark:text-gray-300">
              Technology is not just a tool, but a way to improve life and solve
              problems. I believe in writing clean, maintainable code that not
              only works well but also tells a story and makes the lives of
              other developers easier.
            </blockquote>

            <p className="text-body text-gray-600 dark:text-gray-300 mb-4">
              Besides technical articles, I also share some life insights and
              personal reflections. I'm always excited to connect with fellow
              developers and learn from the community.
            </p>

            <h2 className="text-h3 text-gray-900 dark:text-white mb-4 mt-8">
              Get In Touch
            </h2>

            <p className="text-body text-gray-600 dark:text-gray-300 mb-4">
              Feel free to reach out if you'd like to discuss technology,
              collaborate on projects, or just have a chat about web
              development.
            </p>

            <p className="text-body text-gray-600 dark:text-gray-300">
              Email:{' '}
              <a
                href="mailto:your-email@example.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                your-email@example.com
              </a>
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

export default About
