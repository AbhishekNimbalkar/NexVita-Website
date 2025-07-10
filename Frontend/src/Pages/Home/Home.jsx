import MainInterface from "./MainInterface";

import WorkProcess from "./WorkProcess";
import HomeServices from "../Services/HomeService";

const Home = () => {
  return (
    <div>
      <MainInterface></MainInterface>
      <HomeServices></HomeServices>
      <WorkProcess></WorkProcess>
    </div>
  );
};

export default Home;
