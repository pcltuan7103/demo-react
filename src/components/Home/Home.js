import videoHomepage from "../../assets/video-homepage.mp4";
import "./Home.scss";
import { useSelector } from "react-redux";

const Home = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });
  const account = useSelector((state) => {
    return state.user.account;
  });

  return (
    <div class="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div class="homepage-content">
        <div class="title-1">Make forms worth filling out</div>
        <div class="title-2">
          Get more data—like signups, feedback, and anything else—with forms
          designed to be refreshingly different.
        </div>
        <div class="title-3">
          <button>Get started. It's free</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
