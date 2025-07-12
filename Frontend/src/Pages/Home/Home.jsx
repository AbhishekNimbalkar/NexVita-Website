import MainInterface from "./MainInterface";

import WorkProcess from "./WorkProcess";
import HomeServices from "../Services/HomeService";
import Work from "./Work";
import AboutIntro from "./AboutIntro";

const Home = () => {
  return (
    <div>
      <MainInterface></MainInterface>
      <HomeServices></HomeServices>
      <WorkProcess></WorkProcess>
      <Work></Work>
      <AboutIntro></AboutIntro>
    </div>
  );
};

export default Home;
