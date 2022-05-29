import React, { Component, useState, useEffect } from 'react'
import InfoRec from '../../components/info/infoRec';
import { withRouter } from "react-router-dom";
import Asidebar from '../../components/aside-bar/asidebar';
import './index.css';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Degree from './Add';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../../components/nav-bar/navbar';
import AsidebarAdmin from '../../components/aside-bar/asideBar-admin';


const baseURL = "http://localhost:5000/offrePost";

export default function EditOffer() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [titre, settitre] = useState('');
    const [typeTravail, settypeTravail] = useState('');
    const [description, setdescription] = useState('');
    const [salaireMin, setsalaireMin] = useState('');
    const [salaireMax, setsalaireMax] = useState('');
    const [dateDebut, setdateDebut] = useState('');
    const [dateFin, setdateFin] = useState('')
    

    


    useEffect(() => {
        const getDataById = async () => {
            const { data } = await axios.get(`http://localhost:5000/offreGet/${id}`)
            settitre(data.titre)
            settypeTravail(data.typeTravail)
            setdescription(data.description)
            setsalaireMin(data.salaireMin)
            setsalaireMax(data.salaireMax)
            setdateDebut(data.dateDebut)
            setdateFin(data.dateFin)
        }

        getDataById()
    }, [id])



    const putData = async (e) => {
        e.preventDefault()
        const Data = {
            titre: titre,
            typeTravail: typeTravail,
            description: description,
            salaireMin: salaireMin,
            salaireMax: salaireMax,
            dateDebut: dateDebut,
            dateFin: dateFin,
        }
        await axios.put(`http://localhost:5000/offreUp/${id}`, Data)
        navigate('/OfferList')
    }

  

    return (
        <div className='toRight'>
            <div>
                <Asidebar />
            </div>
            <div>
                <Navbar/>
            </div>
            <div className='Right'>

                <div className='formCenter'>
                    <div className="card mb-5 mb-xl-10">
                        {/*begin::Card header*/}
                        <div className="card-header border-0 cursor-pointer" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                            {/*begin::Card title*/}
                            <div className="card-title m-0">
                                <a href='/'><button type="back" className="btn btn-light btn-active-light-primary me-2"><ArrowBackIcon /></button></a>
                                <h3 className="fw-bolder m-0">Offre de travail</h3>
                            </div>
                            {/*end::Card title*/}
                        </div>
                        {/*begin::Card header*/}

                        {/*begin::Content*/}
                        <div id="kt_account_profile_details" className="collapse show">
                            {/*begin::Form*/}
                            <form id="kt_account_profile_details_form" className="form" onSubmit={putData}>
                                {/*begin::Input group*/}
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Titre</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input
                                            type="text"
                                            name="titre"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Titre"
                                            value={titre} onChange={(e) => { settitre(e.target.value) }}
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
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Type de travail</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input
                                            type="text"
                                            name="typeTravail"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Type de travail"
                                            value={typeTravail} onChange={(e) => { settypeTravail(e.target.value) }}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                {/*begin::Input group*/}
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Description</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <textarea
                                            type="textarea"
                                            name="description"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Description"
                                            value={description} onChange={(e) => { setdescription(e.target.value) }}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>

                                {/*begin::Input group*/}
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label fw-bold fs-6">Salaire Minimal</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input type="text"
                                            name="salaireMin"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Salaire Minimal"
                                            value={salaireMin} onChange={(e) => { setsalaireMin(e.target.value) }}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label fw-bold fs-6">Salaire Maximal</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input type="text"
                                            name="salaireMax"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Salaire Maximal"
                                            value={salaireMax}onChange={(e) => { setsalaireMax(e.target.value) }}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label fw-bold fs-6">Date de début</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input type="date"
                                            name="dateDebut"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Date de début"
                                            value={dateDebut} onChange={(e) => { setdateDebut(e.target.value) }}

                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label fw-bold fs-6">Date de fin</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input type="date"
                                            name="dateFin"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Date de fin"
                                            value={dateFin} onChange={(e) => { setdateFin(e.target.value) }}

                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                {/*end::Input group*/}
                                {/*begin::Input group*/}
                                <div className="row mb-6">

                                </div>
                                {/*end::Input group*/}

                                <div className="card-footer d-flex justify-content-end py-6 px-9">
                                    <button type="reset" className="btn btn-light btn-active-light-primary me-2">Annuler</button>
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
                        {/*end::Content*/}

                    </div>
                </div>
            </div>
        </div>
    )

}