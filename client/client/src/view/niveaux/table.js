import React, { Component, useState, useEffect } from 'react'
import InfoRec from '../../components/info/infoRec';
import Asidebar from '../../components/aside-bar/asidebar';
import './index.css';
import axios from 'axios';

import AddIcon from '@mui/icons-material/Add';
import Navbar from '../../components/nav-bar/navbar';
import AsidebarAdmin from '../../components/aside-bar/asideBar-admin';
const baseURL = "http://localhost:5000/levelGetAll";


export default function TableNiveau() {
    const [posts, setPosts] = useState([]);
    const [levels, setLevels] = useState([])
    const [levelName, setlevelName] = useState("");
    const [Id, setId] = useState(null)


    useEffect(() => {
        getExp();
    }, []);

    function getExp() {
        const getPosts = async () => {
            const { data: res } = await axios.get(baseURL);
            setPosts(res);
        };
        getPosts();
    }
    function select(id) {
        let item = levels[id - 1];
        setlevelName(item.levelName)
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

    function deleteDegree(id) {
        fetch(`http://localhost:5000/levelDel/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
        getExp();
    }



    return (
        <div className='toRight'>
            <div>
                <AsidebarAdmin />
            </div>
            <div className='Right'>
                <div className='cardCenter'>
                    <Navbar />
                </div>
                <div className='Left'>


                    <div className="formCenter">
                        {/*begin::Tables Widget 9*/}
                        <div className="card card-xl-stretch mb-5 mb-xl-8">
                            {/*begin::Header*/}
                            <div className="card-header border-0 pt-5">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bolder fs-3 mb-1">Niveaux</span>
                                </h3>
                                <div className="card-toolbar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add an offer">
                                    <a href='/levels' className="btn btn-sm btn-light btn-active-primary" >
                                        {/*begin::Svg Icon | path: icons/duotune/arrows/arr075.svg*/}

                                        <AddIcon />Ajouter</a>
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

                                                <th className="min-w-160px">Niveau</th>
                                                <th className="min-w-140px">Date de création</th>
                                                <th className="min-w-140px">Date de modification</th>
                                                <th className="min-w-140px">Action</th>
                                            </tr>
                                        </thead>
                                        {/*end::Table head*/}
                                        {/*begin::Table body*/}

                                        <tbody >
                                            {posts.map((post) => (
                                                <tr>
                                                    <td>{post.levelName} </td>
                                                    <td>{post.createdAt}</td>
                                                    <td>{post.updatedAt}</td>
                                                    <td>
                                                        <a className="btn btn-sm btn-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_offer_a_deal" onClick={() => deleteDegree(post.id)}>Supprimer</a>
                                                        <a href={`/editLevels/${post.id}`} className="btn btn-sm btn-primary me-3"  >Modifier</a>
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
