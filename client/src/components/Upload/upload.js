import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const Upload = () => {
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);

  const handleUpload = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const submitUpload = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image,  image.name);
    formData.append("token", JSON.stringify(token));
    for (let [name, value] of formData) {
      console.log(`FORM DATA ${name} = ${value}`);
    }


      axios
        .post(`http://localhost:5000/googleDrive/fileUpload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          if (data.data) {
            swal("Successful", "File uploaded", "success");
          }
        })
        .catch((err) => {
          swal("Unsuccessful", "File uploading failed", "error");
        });

  };

  useEffect(() => {
    const token = {
      access_token: localStorage.getItem("access_token"),
      scope: localStorage.getItem("scope"),
      token_type: localStorage.getItem("token_type"),
      expiry_date: localStorage.getItem("expiry_date"),
      id_token: localStorage.getItem("id_token"),
    };
    setToken(token);
  }, []);

  return (
    <div className="container border">
      <br />
      <h2>Upload</h2>
      <br />
      <form onSubmit={submitUpload}>
        <div className="form-group">
          <label>Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="form-control"
          />
          <br />
          <div className="form-group col-12 px-0">
            <input
              type="submit"
              value="Upload"
              className="btn btn-primary col-12"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Upload;
