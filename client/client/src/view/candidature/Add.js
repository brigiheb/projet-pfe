import React, { Component, useState } from 'react'
import Asidebar from '../../components/aside-bar/asidebar';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Navbar from '../../components/nav-bar/navbar';
import AsidebarAdmin from '../../components/aside-bar/asideBar-admin';
import { useNavigate } from 'react-router-dom';

const baseURL = "http://localhost:5000/candidaturePost";
const baseURLDoc = "http://localhost:5000/linkPost"


export default function Candidature(props) {
    const navigate = useNavigate()
    const [link, setLink] = useState('');
    const [message, setMessage] = useState(null);
    const [messageErr, setMessageErr] = useState(null);
    // const postFile = async (e) => {
    //     e.preventDefault()
    //     setMessage(null);
    //     const formData = new FormData()
    //     formData.append('link', link)
    //     try {
    //         const resp = await axios.post("http://localhost:5000/linkPost", formData, {
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Access-Control-Allow-Origin': '*',
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         })
    //         setMessage(toast.success("Test"))
    //     }

    //     catch (err) {
    //         setMessageErr(toast.error("Test"))
    //     }
    // }

    const [state, setState] = useState({

        cv: '',
        type: ''
    });

    // const handleDoc = (e) => {
    //     e.preventDefault();
    //     const Dispo = {
    //         cv: state.cv
    //     };
    //     axios.post(baseURLDoc, Dispo).then((response) => {
    //         console.log(response.status);
    //         console.log(response.data);
    //     });
    // };
    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const Dispo = {
            nom: state.nom,
            prénom: state.prénom,
            email: state.email,
            dateNaissance: state.dateNaissance,
            telNum: state.telNum,
            skills: state.skills
        };
        axios.post(baseURL, Dispo).then((response) => {
            console.log(response.status);
            props.setCandidat(response.data.id)
            navigate("/quiz")
            
        });
    };


    return (
        <div className='toRight'>
            <div>
                <Asidebar />
            </div>

            <div className='Right'>

                <div className='formCenter'>
                    <div className="card mb-5 mb-xl-10">
                        {/*begin::Card header*/}
                        <div className="card-header border-0 cursor-pointer" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                            {/*begin::Card title*/}
                            <div className="card-title m-0">
                                <a href='/'><button type="back" className="btn btn-light btn-active-light-primary me-2"><ArrowBackIcon /></button></a>
                                <h3 className="fw-bolder m-0">Postuler</h3>
                            </div>
                            {/*end::Card title*/}
                        </div>
                        {/*begin::Card header*/}

                        {/*begin::Content*/}
                        <div id="kt_account_profile_details" className="collapse show">
                            {/*begin::Form*/}
                            <form id="kt_account_profile_details_form" className="form" onSubmit={handleSubmit} >
                                {/*begin::Input group*/}
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Nom</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input
                                            type="text"
                                            name="nom"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Nom"
                                            value={state.nom}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                {/*end::Input group*/}
                                {/*begin::Input group*/}
                                {/*end::Input group*/}
                                {/*begin::Input group*/}
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Prénom</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input
                                            type="text"
                                            name="prénom"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Prénom"
                                            value={state.prénom}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                {/*begin::Input group*/}
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">E-mail</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Exemple@exemple.com"
                                            value={state.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Competances</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input
                                            type="text"
                                            name="skills"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Skills"
                                            value={state.skills}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>

                                {/*begin::Input group*/}
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label fw-bold fs-6">Date de Naissance</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input type="date"
                                            name="dateNaissance"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Date de Naissance"
                                            value={state.dateNaissance}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label fw-bold fs-6">Téléphone</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input type="number"
                                            name="telNum"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="(+216 XX.XXX.XXX)"
                                            value={state.telNum}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                
                                <div className="card-footer d-flex justify-content-end py-6 px-9">
                                    <button type="reset" className="btn btn-light btn-active-light-primary me-2">Annuler</button>

                                    <input type="submit" className="btn btn-sm btn-primary me-3" value={"Suivant"}/>
                                </div>
                                {/*end::Actions*/}
                            </form>
                            {/*end::Form*/}
                        </div>
                        {/*end::Content*/}

                    </div>
                </div>
            </div>
        </div>
    )
}

