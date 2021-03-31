import React from "react";
import logo from "../../assets/logo.svg";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";

import { auth } from "../../services/firebase";

export default function Login() {
  const login = async () => {
    auth.google.login();
  };
  return (
    <div className="Login">
      <div className="head">
        <div className="logo">
          <img src={logo} alt="Flame Bond logo" />
        </div>
        <div className="text">
          <h1>David Sling • Admin</h1>
          <p>
            BUILT USING{" "}
            <a href="https://github.com/david-sling/flame-bond">FLAME BOND</a>
          </p>
        </div>
      </div>
      <div className="buttons">
        <button className="button" onClick={login}>
          <img src={google} alt="Google logo" />
          <p>Sign in with Google</p>
        </button>
        <div className="github">
          <a href="https://github.com/david-sling/davidsling-admin">
            <img src={github} alt="GitHub logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
