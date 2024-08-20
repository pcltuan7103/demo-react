import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner } from "react-icons/im";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    //validate
    const isValidateemail = validateEmail(email);
    if (!isValidateemail) {
      toast.error("Invalid Value");
      return;
    }

    if (!password) {
      toast.error("Invalid Password");
      return;
    }
    setIsLoading(true);
    //submit
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin());
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an acount yet?</span>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="title mx-auto col-4">Hoi Dan IT</div>
      <div className="welcome mx-auto col-4">Who's this?</div>
      <div className="content-form mx-auto col-4">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <span className="forgot-password">Forgot Password?</span>
        <div>
          <button
            className="btn-login"
            onClick={() => {
              handleLogin();
            }}
            disabled={isLoading}
          >
            {isLoading === true && <ImSpinner className="loader-icon" />}
            <span>Login to HoiDanIT</span>
          </button>
        </div>
        <div className=" text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            &#60;&#60; Go To Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
