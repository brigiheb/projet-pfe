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

const baseURL = "http://localhost:5000/experiencePost";

export default function EditCategory() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [categoryName, setcategoryName] = useState('');

    


    useEffect(() => {
        const getDataById = async () => {
            const { data } = await axios.get(`http://localhost:5000/categoryGet/${id}`)
            setcategoryName(data.categoryName)

        }

        getDataById()
    }, [id])



    const putData = async (e) => {
        e.preventDefault()
        const Data = {
            categoryName: categoryName,

        }
        await axios.put(`http://localhost:5000/categoryUp/${id}`, Data)
        navigate('/Texp')
    }



    return (
        <div className='toRight'>
            <div>
                <AsidebarAdmin />
            </div>
            <div>
                <Navbar/>
            </div>
            <div className='cardCenter'>

            </div>
            <div className='Right'>
                <div className='formCenter'>
                    <div className="card mb-5 mb-xl-10">
                        {/*begin::Card header*/}
                        <div className="card-header border-0 cursor-pointer" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                            {/*begin::Card title*/}
                            <div className="card-title m-0">
                                <a href='/categoryList'><button type="back" className="btn btn-light btn-active-light-primary me-2"><ArrowBackIcon /></button></a>
                                <h3 className="fw-bolder m-0">Categorie </h3>
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
                                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Categorie</label>
                                    {/*end::Label*/}
                                    {/*begin::Col*/}
                                    <div className="col-lg-8 fv-row">
                                        <input
                                            type="text"
                                            name="nmbrExperience"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Experience"
                                            value={categoryName} onChange={(e) => { setcategoryName(e.target.value) }}
                                        />
                                    </div>
                                    {/*end::Col*/}
                                </div>
                                {/*end::Input group*/}
                                {/*begin::Input group*/}

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


