import React from "react";
import { FaLightbulb } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';

const experiences = [
  {
    title: "Paltech",
    date: "Jul 2025 - Dec 2025",
    role: "Trainee Data Engineer",
    type: "Full Time",
    location: "Hyderabad",
    link: "https://www.pal.tech/",
    description: [
      "Developed and optimized SQL Data Warehouse solutions for large-scale data processing",
      "Built scalable ETL pipelines using Databricks and PySpark",
      "Implemented performance tuning and data quality checks for analytics delivery"
    ]
  },
  {
    title: "PSDC",
    date: "May 2025 - Jun 2025",
    role: "Full Stack Developer (Angular & Node.js)",
    type: "Full Time",
    location: "Pune",
    link: "https://pratibhaskilldevelopment.com/",
    description: [
      "Built a skill training platform with scalable full-stack architecture",
      "Developed responsive UI, backend APIs, and admin dashboard",
      "Integrated Razorpay for payments and deployed on AWS"
    ]
  },
  // {
  //   title: "GirlScript Summer of Code (GSSoC) 2024",
  //   date: "Oct 2024 - Nov 2024",
  //   role: "Contributor",
  //   type: "Part Time",
  //   location: "Remote",
  //   description: [
  //     "Contributed to open-source projects as part of GSSoC 2024",
  //     "Collaborated with mentors and developers to improve software solutions",
  //     "Enhanced skills in problem-solving, collaboration, and coding"
  //   ]
  // }
];

const Experience = () => {
  return (
    <section
  id="experience"
  className="py-20 bg-white text-gray-900"
>
  <div className="max-w-6xl mx-auto px-6">

    {/* Section Header */}
    <div className="max-w-2xl mb-16">
      <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
        Professional Journey
      </p>
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        Experience & Industry Work
      </h2>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Hands-on experience working across data engineering, full-stack
        development, and real-world production systems.
      </p>
    </div>

    {/* Experience List */}
    <div className="space-y-12">
      {experiences.map((exp) => (
        <div
          key={exp.title}
          className="
            bg-gray-50 rounded-3xl p-8
            hover:shadow-md transition
          "
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-600">
                {exp.link ? (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {exp.title}
                  </a>
                ) : (
                  exp.title
                )}
              </h3>

              <p className="text-gray-800 font-medium">
                {exp.role}
              </p>

              <p className="text-sm text-gray-500">
                {exp.location}
              </p>
            </div>

            <div className="text-sm text-gray-500 text-left md:text-right">
              <p className="font-medium">{exp.date}</p>
              {exp.type && <p>{exp.type}</p>}
            </div>
          </div>

          {/* Responsibilities */}
          <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
            {exp.description.map((line, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-600"></span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

  </div>
</section>

  );
};

export default Experience;
