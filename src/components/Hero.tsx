import profile from "../assets/pic1.png";
import Typewriter from "react-typewriter-effect";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-80px)] flex items-center bg-gray-50 pt-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-1">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          <h1 className="text-4xl md:text-4xl font-bold text-gray-900 leading-tight">
            Building Scalable Digital Solutions
          </h1>

          <h2 className="text-lg font-medium text-gray-700">
            Founded & led by{" "}
            <span className="text-blue-600 font-semibold">Anisha Birla</span>
          </h2>

          {/* Typewriter */}
          <div className="text-gray-600 text-lg">
            <Typewriter
              textStyle={{
                fontSize: "1.05rem",
                fontWeight: 500,
                color: "#4B5563",
                fontFamily: "Inter, sans-serif",
              }}
              startDelay={300}
              cursorColor="#2563EB"
              multiText={[
                "Trainee Data Engineer @ PalTech",
                "Full Stack Development • MERN • Angular • Next.js",
                "500+ LeetCode Problems • Top 15% Globally",
                "Web Platforms • Data-Driven Systems • Cloud Solutions",
              ]}
              multiTextDelay={1700}
              typeSpeed={50}
            />
          </div>

          {/* Summary */}
          <p className="text-gray-600 max-w-xl leading-relaxed border-l-4 border-blue-600 pl-4">
            From idea to deployment, we provide end-to-end web development —
            making this your{" "}
            <span className="font-semibold text-gray-900">
              one-stop solution
            </span>{" "}
            for modern, scalable, and high-quality digital products.
          </p>

          {/* Tech Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              MERN, MEAN, Next.js, SQL, MongoDB
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              AWS, REST APIs, System Design
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              AI, FinTech & EdTech Projects
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Strong DSA • 500+ LeetCode
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-gray-300 hover:border-blue-600 hover:text-blue-600 font-semibold transition"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE — Hidden on Small Screens */}
        <div className="hidden md:flex justify-end">
          <div className="relative">
            <img
              src={profile}
              alt="Anisha Birla"
              className="
                w-[300px] lg:w-[330px]
                max-h-[540px]
                object-cover
                rounded-3xl 
              "
            />

            {/* Accent */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-blue-100"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
