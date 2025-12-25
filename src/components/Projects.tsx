
import "../App.css";
import { useState } from "react";

import {
  FaExternalLinkAlt,
  FaGithub,
  FaChartLine,
  FaTooth,
  FaBrain,
  FaGraduationCap,
  FaPalette,
  FaChalkboardTeacher,
} from "react-icons/fa";

const allProjects = [
  {
  title: "Xsploit",
  icon: <FaBrain />,
  tech: [
    "MERN",
    "AWS EC2",
    "AWS S3",
    "CloudFront",
    "Razorpay",
    "Brevo"
  ],
 description:
  "Production-grade cybersecurity platform with OTP-based authentication offering structured courses, Razorpay payments, user dashboards, and scalable REST APIs deployed on AWS.",
  date: "Nov 2025 - Dec 2025",
  live: "https://www.xsploithack.com",
  github: "https://github.com/Anisha2123/Xscploit_Lovelish"
},
  {
    title: "PSDC",
    icon: <FaChalkboardTeacher />,
    tech: ["Angular", "Node.js", "MongoDB", "Razorpay", "AWS"],
    description:
      "A skill training platform for youth, built with Angular and Node.js. Features include course listing, admin dashboard, contact form, Razorpay payments, and full deployment on AWS.",
    date: "May 2025 - Jun 2025",
    live: "https://pratibhaskilldevelopment.com/",
    github: "Private Repository (Institutional)",
  },
  {
    title: "4eDentalAI",
    icon: <FaTooth />,
    tech: ["Angular", "Node.js", "MongoDB", "Stripe", "Calendly"],
    description:
      "An AI-powered dental assistant platform using Angular, Node.js, MongoDB. Includes X-ray analysis API, Stripe payments, Calendly scheduling, and real-time admin dashboards.",
    date: "Jan 2025 - Feb 2025",
    live: "https://4edentalai.com",
    github: "Private Repository (Institutional)",
  },
  {
    title: "TopDataCoach",
    icon: <FaGraduationCap />,
    tech: ["MERN Stack", "Stripe", "Admin Dashboard", "REST API"],
    description:
      "An online learning platform for data science and web dev with Stripe integration, role-based access, RESTful APIs, and admin dashboard.",
    date: "Feb 2025 - Mar 2025",
    live: "https://topdatacoach.com/",
    github: "Private Repository (Institutional)",
  },
  
  {
    title: "Discord Color Generator",
    icon: <FaPalette />,
    tech: ["React", "TailwindCSS", "TypeScript"],
    description:
      "A responsive and animated color code generator for Discord themes. Users can preview and copy color combos, with sleek UI animations and accessibility features.",
    date: "Mar 2025 - Mar 2025",
    live: "https://video-dubber-task-tawny.vercel.app/",
    github: "https://github.com/Anisha2123/VideoDubberTask",
  },
];

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);

  const currentProjects = allProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
     <section
  id="projects"
  className="py-28 bg-gray-50 text-gray-900"
>
  <div className="max-w-6xl mx-auto px-6">

    {/* Section Header */}
    <div className="max-w-2xl mb-16">
      <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
        Selected Work
      </p>
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        Projects That Reflect Quality & Scale
      </h2>
      <p className="mt-4 text-gray-600 leading-relaxed">
        A curated selection of real-world applications, platforms, and systems
        built with performance, scalability, and business impact in mind.
      </p>
    </div>

    {/* Projects Grid */}
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {currentProjects.map((proj) => (
        <div
          key={proj.title}
          className="
            group bg-white rounded-3xl p-7
            shadow-sm hover:shadow-xl
            transition-all duration-300
            flex flex-col justify-between
          "
        >
          {/* Top Content */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold">
              {proj.icon}
              <h3 className="text-lg">{proj.title}</h3>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              {proj.date}
            </p>

            <p className="text-gray-700 text-justify leading-relaxed text-sm">
              {proj.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-5">
              {proj.tech.map((tech) => (
                <span
                  key={tech}
                  className="
                    text-xs px-3 py-1 rounded-full
                    bg-gray-100 text-gray-700
                    font-medium
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-6 mt-8 text-sm font-medium">
            <a
              href={proj.live}
              target="_blank"
              rel="noreferrer"
              className="
                text-blue-600 hover:text-blue-800
                flex items-center gap-1
                transition
              "
            >
              View Live <FaExternalLinkAlt size={13} />
            </a>

            {proj.github && proj.github !== "Private Repository (Institutional)" ? (
              <a
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                className="
                  text-gray-600 hover:text-gray-900
                  flex items-center gap-1
                  transition
                "
              >
                Source <FaGithub size={15} />
              </a>
            ) : (
              <span className="text-xs italic text-gray-400">
                Private / Institutional
              </span>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Pagination – Clean & Subtle */}
    {/* Pagination – Mobile-Friendly & Elegant */}
<div className="mt-14 flex items-center justify-center gap-3 md:gap-6 text-sm font-medium text-gray-600">

  {/* Previous */}
  <button
    onClick={handlePrev}
    disabled={currentPage === 1}
    className="
      flex items-center justify-center gap-2
      h-10 px-4 md:px-5
      rounded-full
      bg-white border border-gray-300
      hover:border-blue-600 hover:text-blue-600
      disabled:opacity-40
      transition
    "
  >
    <span className="text-lg">←</span>
    <span className="hidden md:inline">Previous</span>
  </button>

  {/* Page Indicator */}
  <span className="
    px-4 py-2
    rounded-full
    bg-gray-100 text-gray-600
    text-xs md:text-sm
  ">
    {currentPage} / {totalPages}
  </span>

  {/* Next */}
  <button
    onClick={handleNext}
    disabled={currentPage === totalPages}
    className="
      flex items-center justify-center gap-2
      h-10 px-4 md:px-5
      rounded-full
      bg-white border border-gray-300
      hover:border-blue-600 hover:text-blue-600
      disabled:opacity-40
      transition
    "
  >
    <span className="hidden md:inline">Next</span>
    <span className="text-lg">→</span>
  </button>

</div>


  </div>
</section>

  );
};

export default Projects;
