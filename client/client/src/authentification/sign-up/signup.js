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


const baseURL = "http://localhost:5000/userPost";

export default function SignUp() {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [prénom, setPrénom] = useState('');
    const [email, setEmail] = useState('');
    const [motdepasse, setMotDePasse] = useState('');
    const [telNum, setTelNum] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [role, setRole] = useState([])
    const [roles, setRoles] = useState("");


    const getRoles = async () => {
        axios.get("http://localhost:5000/role/find").then((res) => {
            setRole(res.data);
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        getRoles();
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            nom,
            prénom,
            email,
            motdepasse,
            telNum,
            companyName,
            roles
        };
        axios.post(baseURL, user).then((response) => {
            console.log(response.status);
            console.log(response.data);
        });
        navigate('/')
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
                            {/*begin::Heading*/}
                            <div className="mb-10 text-center">
                                {/*begin::Title*/}
                                <h1 className="text-dark mb-3">Create an Account</h1>
                                {/*end::Title*/}
                                {/*begin::Link*/}
                                <div className="text-gray-400 fw-bold fs-4">Already have an account?
                                    <a href="../../demo1/dist/authentication/flows/basic/sign-in.html" className="link-primary fw-bolder">Sign in here</a></div>
                                {/*end::Link*/}
                            </div>
                            {/*end::Heading*/}
                            {/*begin::Action*/}
                            <button type="button" className="btn btn-light-primary fw-bolder w-100 mb-10">
                                <img alt="Logo" src="assets/media/svg/brand-logos/google-icon.svg" className="h-20px me-3" />Sign in with Google</button>
                            {/*end::Action*/}
                            {/*begin::Separator*/}
                            <div className="d-flex align-items-center mb-10">
                                <div className="border-bottom border-gray-300 mw-50 w-100" />
                                <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
                                <div className="border-bottom border-gray-300 mw-50 w-100" />
                            </div>
                            {/*end::Separator*/}
                            {/*begin::Input group*/}
                            <div className="row fv-row mb-7">
                                {/*begin::Col*/}
                                <div className="col-xl-6">
                                    <label className="form-label fw-bolder text-dark fs-6">First Name</label>
                                    <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="nom" autoComplete="off" value={nom}
                                        onChange={(e) => setNom(e.target.value)} />
                                </div>
                                {/*end::Col*/}
                                {/*begin::Col*/}
                                <div className="col-xl-6">
                                    <label className="form-label fw-bolder text-dark fs-6">Last Name</label>
                                    <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="prénom" autoComplete="off" value={prénom}
                                        onChange={(e) => setPrénom(e.target.value)} />
                                </div>
                                {/*end::Col*/}
                            </div>
                            <div className="row fv-row mb-7">
                                {/*begin::Col*/}
                                <div className="col-xl-6">
                                    <label className="form-label fw-bolder text-dark fs-6">Phone Number</label>
                                    <input className="form-control form-control-lg form-control-solid" type="number" placeholder name="telNum" autoComplete="off" value={telNum}
                                        onChange={(e) => setTelNum(e.target.value)} />
                                </div>
                                {/*end::Col*/}
                                {/*begin::Col*/}
                                <div className="col-xl-6">
                                    <label className="form-label fw-bolder text-dark fs-6">Company Name</label>
                                    <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="companyName" autoComplete="off" value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)} />
                                </div>
                                {/*end::Col*/}
                            </div>
                            {/*end::Input group*/}
                            {/*begin::Input group*/}
                            <div className="fv-row mb-7">
                                <label className="form-label fw-bolder text-dark fs-6">Email</label>
                                <input className="form-control form-control-lg form-control-solid" type="email" placeholder name="email" autoComplete="off" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {/*end::Input group*/}
                            {/*begin::Input group*/}
                            <div className="mb-10 fv-row" data-kt-password-meter="true">
                                {/*begin::Wrapper*/}
                                <div className="mb-1">
                                    {/*begin::Label*/}
                                    <label className="form-label fw-bolder text-dark fs-6">Password</label>
                                    {/*end::Label*/}
                                    {/*begin::Input wrapper*/}
                                    <div className="position-relative mb-3">
                                        <input className="form-control form-control-lg form-control-solid" type="password" placeholder name="motdepasse" autoComplete="off" value={motdepasse}
                                            onChange={(e) => setMotDePasse(e.target.value)} />
                                        <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
                                            <i className="bi bi-eye-slash fs-2" />
                                            <i className="bi bi-eye fs-2 d-none" />
                                        </span>
                                    </div>
                                    {/*end::Input wrapper*/}
                                    {/*begin::Meter*/}
                                    <div className="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
                                        <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
                                        <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
                                        <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
                                        <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px" />
                                    </div>
                                    {/*end::Meter*/}
                                </div>
                                {/*end::Wrapper*/}
                                {/*begin::Hint*/}
                                <div className="text-muted">Use 8 or more characters with a mix of letters, numbers &amp; symbols.</div>
                                {/*end::Hint*/}
                            </div>
                            <div className="row mb-6">
                                {/*begin::Label*/}
                                <label className="col-lg-4 col-form-label fw-bold fs-6">User role</label>
                                {/*end::Label*/}
                                {/*begin::Col*/}
                                <div className="col-lg-8 fv-row">
                                    <select onChange={(e) => { setRoles(e.target.value); console.log(e.target.value) }} value={roles}>
                                        <option >Select role</option>
                                        {role.map((rol) =>
                                            <option value={rol.id}>{rol.name}</option>
                                        )}
                                    </select>
                                </div>
                                {/*end::Col*/}
                            </div>
                            {/*end::Input group=*/}
                            {/*begin::Input group*/}

                            {/*end::Input group*/}
                            {/*begin::Input group*/}
                            <div className="fv-row mb-10">
                                <label className="form-check form-check-custom form-check-solid form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="toc" defaultValue={1} />
                                    <span className="form-check-label fw-bold text-gray-700 fs-6">I Agree
                                        <a href="#" className="ms-1 link-primary">Terms and conditions</a>.</span>
                                </label>
                            </div>
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
