import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
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
    //submit
    let data = await postRegister(email, password, username);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span>Already have an account?</span>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </button>
      </div>
      <div className="title mx-auto col-4">Hoi Dan IT</div>
      <div className="welcome mx-auto col-4">Who's this?</div>
      <div className="content-form mx-auto col-4">
        <div className="form-group">
          <label className="form-label">Email (*)</label>
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
          <label className="form-label">Password (*)</label>
          <div className="show-hide-pass">
            <input
              type={isShowPassword ? "text" : "password"}
              name="password"
              className="form-control"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button onClick={toggleVisibility} className="btn-show-hide">
              {isShowPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="btn-login"
            onClick={() => {
              handleRegister();
            }}
          >
            Sign Up
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

export default Register;
