import React, { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const Login = () => {
  useEffect(() => {
    axios
      .get(`/auth/getAuthURL`)
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
      <h3>Accessing OAuth Server...</h3>
    </div>
  );
};

export default Login;
