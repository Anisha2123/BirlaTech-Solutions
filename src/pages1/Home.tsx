import Hero from "../components/Hero";
import Services from "../components/Services";
import Experience from "../components/Experience";
import Skills from "../components/ProcessSection";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import Contact from "../components/Contact";
import ProofMetrics from "../components/ProofMetrics";
import IndustryUseCases from "../components/IndustryUseCases";
import TechStack from "../components/TechStack";
import TrustSlider from "../components/TrustSlider";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import WorkShowcase from "../components/Workshowcase";
const Home = () => {
  return (
   <>
  <Hero />                
  {/* // Outcome + Authority */}
  {/* <ProofMetrics />         */}
  {/* // Trust & credibility early */}
  <Services />            
  {/* // What problems you solve (NOT features) */}
  <WorkShowcase />
  <Skills />         
  {/* // How you deliver (Discover → Build → Scale) */}
  <IndustryUseCases />    
  {/* // “Have you worked with people like me?” */}
  <FAQ />                 
  {/* // Objection handling */}
  <Contact />             
  {/* // Conversion */}
 
</>

  );
};

export default Home;
