import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Asidebar from '../../../components/aside-bar/asidebar';
import axios from "axios";
import {useNavigate} from "react-router-dom"

const baseURL = "http://localhost:5000/linkPost"
const FileUpload = () => {
  const navigate = useNavigate()
  const [link, setLink] = useState('');
  const [message, setMessage] = useState(null);
  const [messageErr, setMessageErr] = useState(null);

  const postFile = async (e) => {
    e.preventDefault()
    setMessage(null);
    const formData = new FormData()
    formData.append('link', link)
    try {
      const resp = await axios.post(baseURL, formData, {
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "multipart/form-data",
        },
      })
      setMessage(toast.success("Test"))
    }

    catch (err) {
      setMessageErr(toast.error("Test"))
    }
  }
  return (
    <div className='toRight'>
      <div>
        <Asidebar />
      </div>

      <div className='formCenter'>
        <br />
        <div className="d-flex flex-wrap flex-stack mb-6">
          {/*begin::Title*/}
          <h3 className="col-lg-4 col-form-label required fw-bold fs-6">Upload Documents
          </h3>
          {/*end::Title*/}
          {/*begin::Controls*/}
          <div className="d-flex my-2">
            {/*begin::Search*/}

            {/*end::Search*/}
            <Link to="/listeDocs"> <a className="btn btn-primary btn-sm" data-bs-toggle="tooltip">Upload document</a></Link>
          </div>
          {/*end::Controls*/}
        </div>

      </div>

      <br />
    <div className='formCenter'>
      <div className="card mb-5 mb-xl-10">
        <form onSubmit={postFile} method="POST" encType='multipart/form-data'>
        {message && <div>{
          <div className='d-grid gap-2 col-6 mx-auto'>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              File uploaded sucessfuly.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
        }
        </div>}
        {messageErr &&
          <div>{
            <div className='d-grid gap-2 col-6 mx-auto'>
              <div class="alert alert-danger alert-dismissible fade show" role="alert">
                There is something wrong
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </div>
          }
          </div>}

        {/*begin::Input group*/}
        <div className="row mb-6">
          {/*begin::Label*/}
          <label className="col-lg-4 col-form-label required fw-bold fs-6">CV</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8 fv-row">
            <input type="file"
              className="form-control form-control-lg form-control-solid"
              onChange={(e) => setLink(e.target.files[0])} name="link" id="link"
            />
          </div>
          {/*end::Col*/}
        </div>

        <div class="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary positionB" onClick={()=>{
            navigate("/quiz")
          }}>confirmer</button>
        </div>
      </form>
      </div>      
      
    </div>
      
    </div>

  );
}


export default FileUpload;