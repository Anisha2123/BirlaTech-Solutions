import Hero from "../components/Hero";
import Services from "../components/Services";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import Contact from "../components/Contact";
import ProofMetrics from "../components/ProofMetrics";
import IndustryUseCases from "../components/IndustryUseCases";
import TechStack from "../components/TechStack";
import TrustSlider from "../components/TrustSlider";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
const Home = () => {
  return (
   <>
  <Hero />                
  {/* // Outcome + Authority */}
  <ProofMetrics />        
  {/* // Trust & credibility early */}
  <Services />            
  {/* // What problems you solve (NOT features) */}
  <Skills />         
  {/* // How you deliver (Discover → Build → Scale) */}
  <IndustryUseCases />    
  {/* // “Have you worked with people like me?” */}
  <Testimonials />        
  {/* // Social proof (after value is clear) */}
  <FAQ />                 
  {/* // Objection handling */}
  <Contact />             
  {/* // Conversion */}
</>

  );
};

export default Home;
