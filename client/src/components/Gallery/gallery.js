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

    const handleDelete = (event, data) => {
        const body = {
            token: token
        }

        axios.post(`http://localhost:5000/googleDrive/deleteFile/${body.id}`,body)
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
                                    <div className="col-md-8">
                                        <img
                                            className="py-2"
                                            alt="packageImg"
                                            height="100%"
                                            width="100%"
                                            src={""}
                                        />
                                        {console.log(item.webViewLink)}
                                        <br />
                                    </div>
                                    <div className="col-md-4">
                                        {/*<h4 className="font-weight-bold text-left mt-4 text-dark">
                                            {item.title}
                                        </h4>
                                        <h6 className="font-weight-bold text-left text-dark">
                                            {item.size} {item.sizeType}
                                        </h6>
                                        <h6 className="font-weight-bold text-left text-secondary">
                                            {item.region}, {item.propertyType}
                                        </h6>
                                        <h5 className="font-weight-bold text-left text-info">
                                            Rs {item.price}.00
                                        </h5>*/}

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