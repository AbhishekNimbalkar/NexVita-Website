import MainInterface from "./MainInterface";

import WorkProcess from "./WorkProcess";
import HomeServices from "../Services/HomeService";
import Work from "./Work";
import AboutIntro from "./AboutIntro";
import ServiceDetail from "./ServiceDetail";
import TestimonialsPart from "./TestimonialsPart";
import Question from "./Question";

const Home = () => {
  return (
    <div>
      <MainInterface></MainInterface>
      <HomeServices></HomeServices>
      <WorkProcess></WorkProcess>
      <Work></Work>
      <AboutIntro></AboutIntro>
      <ServiceDetail></ServiceDetail>
      <TestimonialsPart></TestimonialsPart>
      <Question></Question>
    </div>
  );
};

export default Home;
