import React, { Component, useState, useEffect } from 'react'
import InfoRec from '../../components/info/infoRec';
import Asidebar from '../../components/aside-bar/asidebar';
import './index.css';
import axios from 'axios';

import AddIcon from '@mui/icons-material/Add';
import Navbar from '../../components/nav-bar/navbar';

const baseURL = "http://localhost:5000/offreGetAll";




export default function OfferList() {
    const [posts, setPosts] = useState([]);
    const [offre, setOffre] = useState([])
    const [titre, settitre] = useState('');
    const [typeTravail, settypeTravail] = useState('');
    const [description, setdescription] = useState('');
    const [salaireMin, setsalaireMin] = useState('');
    const [salaireMax, setsalaireMax] = useState('');
    const [dateDebut, setdateDebut] = useState('');
    const [dateFin, setdateFin] = useState('')
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
        let item = offre[id - 1];
        settitre(item.titre)
        settypeTravail(item.typeTravail);
        setdescription(item.description);
        setsalaireMin(item.salaireMin);
        setsalaireMax(item.salaireMax);
        setdateDebut(item.dateDebut);
        setdateFin(item.dateFin);
        setId(item.id)
    }


    const handleUpdate = async (post) => {
        post.nomDegree = "Updated";
        await axios.put(baseURL + "/" + post.id);
        const postsClone = [...posts];
        const index = postsClone.indexOf(post);
        postsClone[index] = { ...post };
        setPosts(postsClone);
    };

    function deleteHandler(id) {
        fetch(`http://localhost:5000/offreDel/${id}`, {
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
            <div>
                <Navbar/>
            </div>
            <div className='Right'>
                <div className='cardCenter'>
                    <InfoRec />
                </div>

                <div className="Left">
                    <div className="formCenter">
                        {/*begin::Tables Widget 9*/}
                        <div className="card card-xl-stretch mb-5 mb-xl-8">
                            {/*begin::Header*/}
                            <div className="card-header border-0 pt-5">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bolder fs-3 mb-1">Liste des Offres</span>
                                </h3>
                                <div className="card-toolbar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add an offer">
                                    <a href='/AddOffer' className="btn btn-sm btn-light btn-active-primary" >
                                        {/*begin::Svg Icon | path: icons/duotune/arrows/arr075.svg*/}

                                        <AddIcon />Nouveau Offre</a>
                                </div>
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
                                                <th className="min-w-160px">Titre</th>
                                                <th className="min-w-160px">Type d'emploi</th>
                                                <th className="min-w-160px">Description</th>
                                                <th className="min-w-160px">Salaire Minimal</th>
                                                <th className="min-w-160px">Salaire Maximal</th>
                                                <th className="min-w-160px">Date debut</th>
                                                <th className="min-w-160px">Date fin </th>
                                                <th className="min-w-140px">Date de création</th>
                                                <th className="min-w-140px">Date de modification</th>
                                                <th className="min-w-160px">Action</th>
                                            </tr>
                                        </thead>
                                        {/*end::Table head*/}
                                        {/*begin::Table body*/}

                                        <tbody >
                                            {posts.map((post) => (
                                                <tr>
                                                    <td>{post.titre} </td>
                                                    <td>{post.typeTravail} </td>
                                                    <td ><p className="text-gray-400 fw-bold fs-5 mt-1 mb-7" ><p className='text'>{post.description}</p></p></td>
                                                    <td>{post.salaireMin} </td>
                                                    <td>{post.salaireMax} </td>
                                                    <td>{post.dateDebut} </td>
                                                    <td>{post.dateFin} </td>
                                                    <td>{post.createdAt}</td>
                                                    <td>{post.updatedAt}</td>
                                                    <td>

                                                        <a className="btn btn-sm btn-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_offer_a_deal" onClick={() => deleteHandler(post.id)}>Supprimer</a>
                                                        <a href={`/editDispo/${post.id}`} className="btn btn-sm btn-primary me-3"  >Modifier</a>

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
        </div>

    )
}
