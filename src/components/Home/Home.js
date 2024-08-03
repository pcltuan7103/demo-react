import videoHomepage from "../../assets/video-homepage.mp4";
import "./Home.scss";

const Home = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;
