import React, { Component, useState, useEffect } from 'react'
import InfoRec from '../../components/info/infoRec';
import Asidebar from '../../components/aside-bar/asidebar';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Navbar from '../../components/nav-bar/navbar';
import AsidebarAdmin from '../../components/aside-bar/asideBar-admin';


const baseURL = "http://localhost:5000/validPost";

export default function Valid() {
    const { email } = useParams()
    const {motdepasse} = useParams(); 


    useEffect(() => {
        const getDataByEmail = async () => {
            const { data } = await axios.get(`http://localhost:5000/userGet/${email},${motdepasse}`)
        }

        getDataByEmail()
    }, [email][motdepasse])


    const [state, setState] = useState({
        subject: '',
        text: '',
        mail: email,
        password: motdepasse,
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = {
            subject: state.subject,
            text: state.text,
            mail: state.mail,
            password: state.password
        };
        axios.post(baseURL, valid).then((response) => {
            console.log(response.status);
            console.log(response.data);
        });

    };   


    return (
        <div className="d-flex flex-column flex-root">
            {/*begin::Authentication - Sign-up */}
            <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{ backgroundImage: 'url(assets/media/illustrations/sketchy-1/14.png' }}>
                {/*begin::Content*/}
                <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                    {/*begin::Logo*/}
                    <a href="/" className="mb-12">
                        <img alt="Logo" src="/assets/media/logos/logopin.png" className="h-40px" />
                    </a>
                    {/*end::Logo*/}
                    {/*begin::Wrapper*/}
                    <div className="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                        {/*begin::Form*/}
                        <form className="form w-100" onSubmit={handleSubmit}>

                            {/*end::Separator*/}
                            {/*begin::Input group*/}
                            <div className="row fv-row mb-7">
                                {/*begin::Col*/}
                                <div className="col-xl-6">
                                    <label className="form-label fw-bolder text-dark fs-6">Objet</label>
                                    <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="subject" autoComplete="off" value={state.subject}
                                        onChange={handleChange} />
                                </div>
                                {/*end::Col*/}
                                {/*begin::Col*/}
                                <div className="col-xl-6">
                                    <label className="form-label fw-bolder text-dark fs-6">Mail</label>
                                    <textarea className="form-control form-control-lg form-control-solid" type="textarea" placeholder name="text" autoComplete="off" value={state.text}
                                        onChange={handleChange} />
                                </div>
                                {/*end::Col*/}
                            </div>
                            {/*end::Input group*/}
                            {/*begin::Input group*/}
                            <div className="fv-row mb-7">
                                <label className="form-label fw-bolder text-dark fs-6">Email</label>
                                <input className="form-control form-control-lg form-control-solid" type="email" placeholder name="mail" autoComplete="off" value={state.mail}
                                    onChange={handleChange} />
                            </div>
                            {/*end::Input group*/}
                            {/*begin::Input group*/}

                            {/*end::Input group=*/}
                            {/*begin::Input group*/}

                            {/*end::Input group*/}
                            {/*begin::Input group*/}

                            {/*end::Input group*/}
                            {/*begin::Actions*/}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    id="kt_account_profile_details_submit"
                                >Valider</button>
                            </div>
                            {/*end::Actions*/}
                        </form>
                        {/*end::Form*/}
                    </div>
                    {/*end::Wrapper*/}
                </div>
                {/*end::Content*/}
                {/*begin::Footer*/}
                <div className="d-flex flex-center flex-column-auto p-10">
                    {/*begin::Links*/}
                    <div className="d-flex align-items-center fw-bold fs-6">
                        <a href="/OfferList" className="text-muted text-hover-primary px-2">T3addaaaa hee</a>
                        <a href="https://keenthemes.com" className="text-muted text-hover-primary px-2">About</a>
                        <a href="mailto:support@keenthemes.com" className="text-muted text-hover-primary px-2">Contact</a>
                        <a href="https://1.envato.market/EA4JP" className="text-muted text-hover-primary px-2">Contact Us</a>
                    </div>
                    {/*end::Links*/}
                </div>
                {/*end::Footer*/}
            </div>
            {/*end::Authentication - Sign-up*/}
        </div>
    )
}
