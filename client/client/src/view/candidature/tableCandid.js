import React, { Component, useState, useEffect } from 'react'
import InfoRec from '../../components/info/infoRec';
import Asidebar from '../../components/aside-bar/asidebar';
import './index.css';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import AddIcon from '@mui/icons-material/Add';
import Navbar from '../../components/nav-bar/navbar';
import AsidebarAdmin from '../../components/aside-bar/asideBar-admin';


const baseURL = "http://localhost:5000/candidatureGetAll";




export default function TableCandid() {
    const [posts, setPosts] = useState([]);
    const [candidature, setCandidature] = useState([])
    const [nom, setNom] = useState('');
    const [prénom, setPrénom] = useState('');
    const [email, setEmail] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [telNum, setTelnum] = useState('');
    const [Id, setId] = useState(null)


    useEffect(() => {
        getData();
    }, []);

    function getData() {
        const getPosts = async () => {
            const { data: res } = await axios.get(baseURL);
            setPosts(res);
        };
        getPosts();
    }
    function select(id) {
        let item = candidature[id - 1];
        setNom(item.nom)
        setPrénom(item.prénom);
        setEmail(item.email);
        setDateNaissance(item.dateNaissance);
        setTelnum(item.telNum);
        setId(item.id)
    }




    function deleteHandler(id) {
        fetch(`http://localhost:5000/candidatureDel/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
        getData();
    }


    return (
        <div className='toRight'>
            <div>
                <Asidebar />
            </div>
            <div >
                <Navbar />
            </div>
            <div className='Right'>
                <div className="formCenter">
                    {/*begin::Tables Widget 9*/}
                    <div className="card card-xl-stretch mb-5 mb-xl-8">
                        {/*begin::Header*/}
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bolder fs-3 mb-1">Liste des Candidats</span>
                            </h3>
                        </div>
                        {/*end::Header*/}
                        {/*begin::Body*/}
                        <div className="card-body py-3">
                            {/*begin::Table container*/}
                            <div className="table-responsive">
                                {/*begin::Table*/}
                                <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                    {/*begin::Table head*/}
                                    <thead>
                                        <tr className="fw-bolder text-muted">

                                            <th className="min-w-160px">Nom </th>
                                            <th className="min-w-160px">Prénom</th>
                                            <th className="min-w-140px">E-Mail</th>
                                            <th className="min-w-140px">Date de Naissance</th>
                                            <th className="min-w-140px">Téléphone</th>
                                            <th className="min-w-140px">Date de Création</th>
                                            <th className="min-w-140px">Action</th>
                                        </tr>
                                    </thead>
                                    {/*end::Table head*/}
                                    {/*begin::Table body*/}

                                    <tbody >
                                        {posts.map((post) => (
                                            <tr>
                                                <td>{post.nom} </td>
                                                <td>{post.prénom} </td>
                                                <td>{post.email} </td>
                                                <td>{post.dateNaissance} </td>
                                                <td>{post.telNum} </td>
                                                <td>{post.createdAt}</td>
                                                <td>

                                                    <a className="btn btn-sm btn-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_offer_a_deal" onClick={() => deleteHandler(post.id)}>Supprimer</a>


                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>



                                    {/*end::Table body*/}
                                </table>
                                {/*end::Table*/}
                            </div>
                            {/*end::Table container*/}
                        </div>
                        {/*begin::Body*/}
                    </div>
                    {/*end::Tables Widget 9*/}
                </div>

            </div>
        </div>
    )
}

