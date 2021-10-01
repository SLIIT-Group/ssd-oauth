import React, { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const Login = () => {
  useEffect(() => {
    axios
      .get(`/googleDrive/getAuthURL`)
      .then((data) => {
        if (data) {
          load(data.data);
        }
      })
      .catch((err) => {
        swal("Unsuccessful", "Google authentication failed", "error");
      });
  }, []);

  const load = (data) => {
    window.location.href = data;
  };

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
