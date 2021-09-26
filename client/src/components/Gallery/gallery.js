import React, {useEffect, useState} from 'react';
import axios from "axios";
import swal from "sweetalert";


const Gallery = () =>  {

    const [token, setToken] = useState(null);

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
            <h2>Gallery</h2>


        </div>
    );
}

export default Gallery;