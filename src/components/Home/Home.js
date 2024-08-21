import videoHomepage from "../../assets/video-homepage.mp4";
import "./Home.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });
  const navigate = useNavigate();

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
          {isAuthenticated === false ? (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Get started. It's free
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              Doing Quiz Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
