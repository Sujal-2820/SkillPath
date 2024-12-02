import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-[#000000] text-white bg-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-block mb-8 px-4 py-2 bg-white bg-opacity-10 text-sm font-medium text-white rounded-md transition-all duration-200 hover:bg-opacity-20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white">
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          About SkillPath
        </h1>
        
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">About the Developer</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="w-48 h-48 relative rounded-full overflow-hidden">
              <Image
                src="/static/images/Sujal-Soni1.jpg"
                alt="Developer"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">John Doe</h3>
              <p className="text-gray-300 leading-relaxed">
                  Sujal Soni is a final-year Computer Science Engineering student at Medi-Caps University with a passion for full-stack web development. With hands-on experience in modern technologies like React.js, Next.js, Node.js, MongoDB, and Firebase, Sujal has consistently demonstrated his ability to create scalable and user-centric web applications 🌐.
                  <br/>
                  He has successfully delivered impactful projects, such as EventSphere, a dynamic event management platform, and EstateVerse, a real estate app focused on special offers. His technical expertise extends to implementing secure payment gateways using Razorpay and leveraging Google Cloud services like Firebase Authentication, Firestore, and Google Places API for enhanced functionality and seamless user experiences 🧑🏻‍💻
                  <br/>
                  Sujal’s professional journey includes internships at NotesEra and Indo-Tech, where he contributed to building robust front-end and full-stack solutions, optimizing performance, and enhancing user engagement. Beyond his technical skills, Sujal has been an active contributor to the open-source community as a GDSC Open Source Mentor and Hacktoberfest Top Contributor 🗒️
                 <br/>
                  With strong communication, teamwork, and management skills, Sujal excels in collaborative environments and thrives on tackling challenges with innovative solutions. His forward-thinking mindset and dedication to learning make him a valuable asset to any team.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">About the Project</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
            <p className="text-gray-300 leading-relaxed mb-4">
              SkillPath is a personalized learning platform that tailors courses to users based on their skillset preferences and onboarding responses. The application dynamically adjusts module difficulty based on user performance, ensuring a structured and effective learning experience.
            </p>

            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-6">
              <li>Dynamic Course Recommendations: Suggests courses based on user answers during onboarding.</li>
              <li>Adaptive Learning: Automatically adjusts module difficulty based on user performance and feedback.</li>
              <li>Structured Learning Path: Provides a progressive sequence of modules tailored to the user's learning level.</li>
              <li>Customizable Difficulty: Users can influence module difficulty based on their feedback and quiz outcomes.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-6">
              <li>Frontend: <a href="https://nextjs.org/" className="text-blue-400 hover:underline">Next.js</a> - A React framework for building fast, scalable web applications.</li>
              <li>Backend & Database: <a href="https://firebase.google.com/docs/firestore" className="text-blue-400 hover:underline">Firebase Firestore</a> - NoSQL database for real-time data storage and retrieval.</li>
              <li>Authentication: <a href="https://firebase.google.com/docs/auth" className="text-blue-400 hover:underline">Firebase Authentication</a> - Secure Google Sign-In for user authentication.</li>
              <li>Storage: <a href="https://cloud.google.com/storage" className="text-blue-400 hover:underline">Google Cloud Storage</a> - Handles image and file uploads for the platform.</li>
            </ul>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Contributing</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
            <p className="text-gray-300 leading-relaxed mb-4">
              Contributions are welcome! Please fork the repository and create a pull request.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Check out <a href="https://github.com/Sujal-2820/SkillPath/blob/main/CONTRIBUTING.md" className="text-blue-400 hover:underline font-semibold">CONTRIBUTING.md</a> for a comprehensive guide on the contribution process.
            </p>
            <h3 className="text-xl font-semibold mb-4">NOTE</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-6">
              <li>Raising an "issue" first would increase the chances of your pull request being noticed.</li>
              <li>You can raise an issue to ask for .env.local file as it holds the necessary credentials for Firebase.</li>
              <li>The project requires a <code className="bg-gray-700 px-1 rounded">secret</code> file (apart from <code className="bg-gray-700 px-1 rounded">.env.local</code>) in order to fetch the content from "Cloud Storage" of "Google Cloud Platform". This shall be provided to you if asked for the same.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-4">Scope of Contribution</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-6">
              <li>This project particularly seeks improvement in the JSON content inside each file of <code className="bg-gray-700 px-1 rounded">courseFolder</code>. The JSON forms the basis of module data that is presented inside a particular course 📝.</li>
              <li>If you are someone who has got a good knowledge of Next JS, you are free to raise an issue and eventually a pull request of your solution/modifications to the code which could enhance the UI of the project 🌄</li>
              <li>Even your smallest contribution counts. You will be credited inside both the project as well as in the repository 🧑🏻‍💻.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Contact</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
            <p className="text-gray-300 leading-relaxed mb-4">
              For any inquiries, please reach out to:
            </p>
            <ul className="text-gray-300 leading-relaxed">
              <li>Email: <a href="mailto:sujal99ds@gmail.com" className="text-blue-400 hover:underline">sujal99ds@gmail.com</a></li>
              <li>GitHub: <a href="https://github.com/Sujal-2820" className="text-blue-400 hover:underline">https://github.com/Sujal-2820</a></li>
              <li>LinkedIn: <a href="https://www.linkedin.com/in/sujal-soni/" className="text-blue-400 hover:underline">https://www.linkedin.com/in/sujal-soni/</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

