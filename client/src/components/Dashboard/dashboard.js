import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'lodash';
import addFile from "../AddFiles/addFile";

class Dashboard extends Component {
    state = {
        fileName: null,
        fileSize: null,
        fileType: null
    }

    handleUpload = event => {
        const file = event.target.files[0];
        this.setState({
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type
        })
    }

    submitUpload = () => {
        const userData = {
            id: "11",
            driveID: "111"
        }

        axios.post(`http://localhost:5000/googleDrive/fileUpload`, userData)
            .then((data) => {
                if (data.data.success) {
                    swal("Good job!", "File uploaded", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "File uploading failed", "error");
            });

    }

    handleClick = (event, data) => {
        const userData = {
            id: "11",
            driveID: "111"
        }

        axios.post(`http://localhost:5000/googleDrive/download/${userData.id}`, userData)
            .then((data) => {
                if (data.data.success) {
                    swal("Good job!", "File downloaded", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "File downloading failed", "error");
            });

    }

    loadFiles = () => {
        const userData = {
            id: "11",
            driveID: "111"
        }

        axios.post(`http://localhost:5000/googleDrive/readDrive`, userData)
            .then((data) => {
                if (data.data.success) {
                    swal("Good job!", "File uploaded", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "Files not loaded", "error");
            });

    }

    handleDelete = (event, data) => {
        const userData = {
            id: "11",
            driveID: "111"
        }

        axios.post(`http://localhost:5000/googleDrive/deleteFile/${userData.id}`, userData)
            .then((data) => {
                if (data.data.success) {
                    swal("Good job!", "File deleted", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "File not deleted", "error");
            });

    }


    renderFolders() {
        return _.map(this.props.data, data => {
            if(data.mimeType === "application/vnd.google-apps.folder"){
                console.log(data);
                return (
                    <div key={data.id}>
                        <li className="list-group-item">
                            <img src="https://cdn0.iconfinder.com/data/icons/iconico-3/1024/63.png" height="30px" width="35px" />{data.name}
                            <a href={`https://www.drive.google.com/open?id=${data.id}`} target='_blank'>Open Folder</a>
                        </li>
                    </div>
                );
            }
        });
    }
    renderFiles() {
        return _.map(this.props.data, data => {
            if(data.mimeType !== "application/vnd.google-apps.folder"){
                return (
                    <div key={data.id}>
                        <li className="list-group-item">
                            <img src="https://procesdoen.nl/wp-content/uploads/text61.png" height="30px" width="35px" /> {data.name}
                            <a href={`https://www.drive.google.com/open?id=${data.id}`} target='_blank'>Open File</a>
                            <a href="/Dashboard" id={data.id} onClick={ event => this.handleClick(event, data) }>Download</a>
                        </li>
                    </div>
                );
            }
        });
    }
    renderContent() {
        if(this.props.auth) {
            return (
                <div className="dash-container-heading">
                    <h4 className="col-md-5">List Of Files  </h4>
                    <div className="dash-container-input">
                        <input type="file" onChange={this.handleUpload} />
                        <button className="btn btn-primary" onClick={this.submitUpload}>Upload</button>
                    </div>
                </div>
            );
        } else {
            return <h1 style={{textAlign:'center'}}>Login Please!!!</h1>
        }
    }

    render(){
        return (
            <div className="dash-container">
                {this.renderContent()}
                <div>
                    <ul className="list-group col-md-11 gap">
                        {this.renderFolders()}
                    </ul>
                </div>
                <div>
                    <ul className="list-group col-md-11 gap">
                        {this.renderFiles()}
                    </ul>
                </div>
            </div>
        );
    }
}
export default Dashboard;
