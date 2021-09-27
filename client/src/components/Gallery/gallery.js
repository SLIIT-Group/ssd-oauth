import React, {useEffect, useState} from 'react';
import axios from "axios";
import swal from "sweetalert";


const Gallery = () =>  {

    const [token, setToken] = useState(null);
    const [files, setFiles] = useState(null);


    const handleDownload = (link) => {
        window.open(link);
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
                if (data) {
                    swal("Successful", "File deleted", "success");
                    console.log(data);
                    loadFiles(token);
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
                                        <img
                                            className="py-2"
                                            alt="packageImg"
                                            height="100%"
                                            width="100%"
                                            src={item.webContentLink}
                                        />
                                    </div>
                                    <div className="col-md-3 justify-content-center text-center"/>

                                    <div className="col-md-5 justify-content-end text-center">
                                        <h6 className="font-weight-bold text-center text-secondary pt-3">
                                            Image Name :
                                        </h6>
                                        <h5 className="font-weight-bold text-center text-dark">
                                            {item.name}
                                        </h5>
                                        <button className="btn btn-primary mt-2  col-md-12" onClick={() => handleDownload(item.webContentLink)}>
                                            <strong>Download</strong>
                                        </button>
                                        <button className="btn btn-danger mt-1 col-md-12" onClick={() => handleDelete(item.id)}>
                                            <strong lassName="px-5">Remove</strong>
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