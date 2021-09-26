import React, {useEffect, useState} from 'react';
import axios from "axios";
import swal from "sweetalert";



const Login = () =>  {


    const [url, setUrl] = useState("");

    useEffect(() => {

        axios.get(`/googleDrive/getAuthURL`)
            .then((data) => {
                if (data) {
                    load(data.data);
                    swal("Good job!", "File deleted", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "File not deleted", "error");
            })
    }, []);

    const load = (data) => {
        window.location.href =
            data;
    }

    return(
        <div>
            <h1>Login</h1>
        </div>
    );
}

export default Login;