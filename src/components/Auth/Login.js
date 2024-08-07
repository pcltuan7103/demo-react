import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    //validate

    //submit
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an acount yet?</span>
        <button>Sign Up</button>
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
          >
            Login to HoiDanIT
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
