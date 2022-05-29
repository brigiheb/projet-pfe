import React, { Component, useState , useEffect } from 'react'
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
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


const baseURL = "http://localhost:5000/offrePost";

export default function AjouterOffer() {
    const navigate = useNavigate();
    const [titre, setTitre] = useState('');
    const [typeTravail, setTypeTravail] = useState('');      
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [salaireMin, setSalaireMin] = useState('');
    const [salaireMax, setSalaireMax] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFdateFin] = useState('');
    // const [user, setUser] = useState('');
  
    // const getUser = async()=>{
    //     const collab = JSON.parse(localStorage.getItem("collab"))
    //     const id = collab.collabID
    //     axios.get(`http://localhost:5000/user/profile/${id}`,{headers:{
    //         'Authorization': "bearer " + collab.tocken ,
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then((response=>setUser(response.data)))
    //     .catch((err)=>{
    //         console.log(err.message)
    //       })
    // }
    // useEffect(()=>{
    //     getUser()
    // },[])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const Dispo = {
            titre,
            typeTravail,
            description,
            requirements,
            salaireMin,
            salaireMax,
            dateDebut,
            dateFin,
           
            
            
        };
        const collab = JSON.parse(localStorage.getItem("collab"))

        axios.post(baseURL, Dispo,  {headers:{
            'Authorization': "bearer " + collab.tocken ,
            'Content-Type': 'application/json'
          }}).then((response) => {
            console.log(response.status);
            console.log(response.data);
        });
        navigate('/')
    };

    return (
        <div className='toRight'>
            <div>
                <Asidebar />
            </div>
            <div>
                <Navbar />
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
                            <form id="kt_account_profile_details_form" className="form" onSubmit={handleSubmit}>
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
                                            value={titre}
                                            onChange={(e) => setTitre(e.target.value)}
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
                                            value={typeTravail}
                                            onChange={(e) => setTypeTravail(e.target.value)}
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
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                <div className="row mb-6">
                                    {/*begin::Label*/}
                                    <label className="col-lg-4 col-form-label fw-bold fs-6">Requirements</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input type="autocomplete"
                                            name="requirements"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Salaire Minimal"
                                            value={requirements}
                                            onChange={(e) => setRequirements(e.target.value)}
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
                                            value={salaireMin}
                                            onChange={(e) => setSalaireMin(e.target.value)}
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
                                            value={salaireMax}
                                            onChange={(e) => setSalaireMax(e.target.value)}
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
                                            value={dateDebut}
                                            onChange={(e) => setDateDebut(e.target.value)}
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
                                            value={dateFin}
                                            onChange={(e) => setDateFdateFin(e.target.value)}
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
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    }]