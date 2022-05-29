import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from '../../services/auth.service';
import axios from "axios";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Ce champs est obligatoire!
        </div>
      );
    }
  };

const Logins = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [email,setEmail] = useState("") 
  const[motdepasse,setMotdepasse]=useState("")
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeLogin = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const motdepasse = e.target.value;
    setMotdepasse(motdepasse);
  };

  const handleLogin= (e) =>{
    e.preventDefault();
    setMessage("");
    setLoading(true);

    form.current.validateAll();
    if(checkBtn.current.context._errors.length === 0){
        AuthService.auth(email,motdepasse)
        axios.post("http://localhost:5000/login",{email,motdepasse},{
            headers:{
              'Authorization': "JWT_TOKEN",
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            if (response.data.tocken) {
              localStorage.setItem("collab", JSON.stringify(response.data));
            }
      
            return response.data;
          })
        .then(()=>{
            navigate("/OfferList");
        },
    (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );  
  }else{
      setLoading(false);
  }
}

  return (
    <div className="d-flex flex-column flex-root">
       <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: 'url(assets/media/illustrations/sketchy-1/14-dark.png'}}>
    <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
    <a href="../../demo1/dist/index.html" className="mb-12">
        <img alt="Logo" src="assets/media/logos/Pinops.svg" className="h-40px" />
      </a>
      <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
        <Form onSubmit={handleLogin} ref={form} className="form w-100" id="kt_sign_in_form"  noValidate="novalidate">
        <div className="text-center mb-10">
            {/*begin::Title*/}
            <h1 className="text-dark mb-3">Bienvenue sur Pinops HR</h1>
            {/*end::Title*/}
            
          </div>
          <div className="fv-row mb-10">
          <label className="form-label fs-6 fw-bolder text-dark" >Nom d'utilisateur</label>
            <Input
              type="text"
              className="form-control form-control-lg form-control-solid"
              name="email"
              value={email}
              onChange={onChangeLogin}
              validations={[required]}
            />
          </div>

          <div className="fv-row mb-10">
          <div className="d-flex flex-stack mb-2">
              {/*begin::Label*/}
              <label className="form-label fw-bolder text-dark fs-6 mb-0">Mot de passe</label>
              {/*end::Label*/}
             
            </div>
            <Input
              type="password"
              className="form-control form-control-lg form-control-solid"
              name="motdepasse"
              value={motdepasse}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="text-center">
            <button id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5" disabled={loading}>
              {loading && (
                 <span className="indicator-label">Se connecter</span>
                 

              )}
              <span>Se connecter</span>
            </button>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                <span className="indicator-label">Identifiant ou mot de passe incorrect</span>
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </div>
        </Form>
        </div>
        </div>
        <div className="d-flex flex-center flex-column-auto p-10">
      {/*begin::Links*/}
      <div className="d-flex align-items-center fw-bold fs-6">
        <a href="https://keenthemes.com" className="text-muted text-hover-primary px-2">About</a>
        <a href="mailto:support@keenthemes.com" className="text-muted text-hover-primary px-2">Contact</a>
        <a href="https://1.envato.market/EA4JP" className="text-muted text-hover-primary px-2">Contact Us</a>
      </div>
      {/*end::Links*/}
    </div>
      </div>
    </div>
    );
}

export default Logins;