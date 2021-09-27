import React, {useEffect, useState} from 'react';
import axios from "axios";
import swal from "sweetalert";


const Gallery = () =>  {

    const [token, setToken] = useState(null);
    const [files, setFiles] = useState(null);

    const handleUpload = event => {
        const file = event.target.files[0];

    }

    const submitUpload = () => {
        const body = {
            file: "11",
            token: token
        }

        axios.post(`http://localhost:5000/googleDrive/fileUpload`, body)
            .then((data) => {
                if (data.data.success) {
                    swal("Successful", "File uploaded", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "File uploading failed", "error");
            });

    }




    const handleClick = (event, data) => {
        const body = {
            id: "11",
            driveID: "111"
        }

        axios.post(`http://localhost:5000/googleDrive/download/${body.id}`, body)
            .then((data) => {
                if (data.data.success) {
                    swal("Successful", "File downloaded", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "File downloading failed", "error");
            });

    }



    const loadFiles = (token) => {
        const body = {
            token: token
        }

        axios.post(`http://localhost:5000/googleDrive/readDrive`, body)
            .then((data) => {
                if (data) {
                    console.log(data);
                    setFiles(data.data);
                }
            })
            .catch((err) => {
                swal("Please Login","", "error");
            });

    }

    const handleDelete = (id) => {
        const body = {
            token: token
        }

        axios.post(`http://localhost:5000/googleDrive/deleteFile/${id}`,body)
            .then((data) => {
                if (data.data.success) {
                    swal("Successful", "File deleted", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "File not deleted", "error");
            });

    }


    useEffect(() => {

        const token = {
            access_token : localStorage.getItem('access_token'),
            scope : localStorage.getItem('scope'),
            token_type : localStorage.getItem('token_type'),
            expiry_date : localStorage.getItem('expiry_date'),
            id_token : localStorage.getItem('id_token'),
        }
        setToken(token);
        loadFiles(token);
    }, [])

    return(
        <div className="container">
            <br/>
            {files && <>

                <h2>Gallery</h2>
                {files.map((item) => (
                    <div key={item.id}>
                        <div className="container rounded-0 border border-warning p-0">
                            <div className="container p-0">
                                <div className="row col-md-12 p-0 m-0">
                                    <div className="col-md-4 justify-content-start text-left">
                                        <h5 className="font-weight-bold text-left mt-4 text-dark">
                                            Image Name :
                                        </h5>
                                        <h6 className="font-weight-bold text-left mt-0 text-dark">
                                            {item.name}
                                        </h6>
                                    </div>
                                    <div className="col-md-4 justify-content-center text-center">
                                        <button className="btn btn-success my-2">
                                            <strong className="px-2">Preview</strong>
                                        </button>
                                        <br/>
                                        <button className="btn btn-warning my-2">
                                            <strong>Download</strong>
                                        </button>
                                    </div>
                                    <div className="col-md-4 justify-content-end text-right">
                                        <button className="btn btn-danger mt-4" onClick={() => handleDelete(item.id)}>
                                            <strong lassName="px-5">Delete</strong>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                ))}

            </>
            }


        </div>
    );
}

export default Gallery;