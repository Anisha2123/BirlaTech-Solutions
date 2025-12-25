const Skills = () => {
  return (
    <section
      id="skills"
      className="py-12 px-6 md:px-16 bg-white text-gray-900"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Core <span className="text-[#2563EB]">Expertise</span>
          </h2>

          <div className="w-12 h-[2px] bg-[#2563EB] mt-3 mb-4" />

          <p className="text-gray-600 max-w-2xl text-sm md:text-base">
            I build scalable, performance-driven web applications with a strong
            focus on clean architecture, usability, and real business outcomes.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
          {/* Frontend */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">
              Frontend Development
            </h3>
            <p className="text-gray-600 leading-relaxed">
              React.js, Angular, Next.js, TypeScript, JavaScript, HTML5, CSS3,
              Tailwind CSS
            </p>
          </div>

          {/* Backend */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">
              Backend & Databases
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Node.js, Express.js, MongoDB, SQL, REST APIs
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">
              Tools & Engineering Practices
            </h3>
            <p className="text-gray-600 leading-relaxed">
              AWS, Git, GitHub, API Integration, Responsive Design, Performance
              Optimization
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
