



import React, { Component, useState, useEffect } from 'react'

import './index.css';
import axios from 'axios';

import AddIcon from '@mui/icons-material/Add';
import AsidebarAdmin from './../components/aside-bar/asideBar-admin';
import Navbar from './../components/nav-bar/navbar';


const baseURL = "http://localhost:5000/userGetAll";
const baseURLDel = `http://localhost:5000//userDel/:id`




export default function RH() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([])
    const [nom, setNom] = useState('');
    const [prénom, setPrénom] = useState('');
    const [email, setEmail] = useState('');
    const [telNum, setnumTel] = useState('');
    const [companyName, setCompanyName] = useState('');
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
        let item = users[id - 1];
        setNom(item.nom)
        setPrénom(item.prénom);
        setEmail(item.email);
        setnumTel(item.telNum);
        setCompanyName(item.companyName);
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
        fetch(`http://localhost:5000/userDel/${id}`, {
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
                <AsidebarAdmin />
            </div>
            <div className='Right'>
                <div className='cardCenter'>
                    <Navbar />
                </div>
                <div className='Left'>
                    <div className="formCenter">
                        {/*begin::Tables Widget 9*/}
                        <div className="col-xl-8">
                            {/*begin::Tables Widget 9*/}
                            <div className="card card-xl-stretch mb-5 mb-xl-8">
                                {/*begin::Header*/}
                                <div className="card-header border-0 pt-5">
                                    <h3 className="card-title align-items-start flex-column">
                                        <span className="card-label fw-bolder fs-3 mb-1">Accout Requirements</span>
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
                                                    <th className="w-25px">
                                                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                            <input className="form-check-input" type="checkbox" defaultValue={1} data-kt-check="true" data-kt-check-target=".widget-9-check" />
                                                        </div>
                                                    </th>
                                                    <th className="min-w-150px">Recruter</th>
                                                    <th className="min-w-140px">Company</th>
                                                    <th className="min-w-120px">Phone Number</th>
                                                    <th className="min-w-120px">E-mail</th>
                                                    <th className="min-w-100px text-end">Actions</th>
                                                </tr>
                                            </thead>
                                            {/*end::Table head*/}
                                            {/*begin::Table body*/}
                                            <tbody>
                                                {posts.map((post) => (
                                                    <tr>
                                                        <td>
                                                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                                <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="symbol symbol-45px me-5">
                                                                    <img src="assets/media/avatars/150-11.jpg" alt />
                                                                </div>
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">{post.nom} {post.prénom}</a>
                                                                    <span className="text-muted fw-bold text-muted d-block fs-7">{ }</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="#" className="text-dark fw-bolder text-hover-primary d-block fs-6">{post.companyName}</a>
                                                            <span className="text-muted fw-bold text-muted d-block fs-7"></span>
                                                        </td>

                                                        <td>
                                                            <a href="#" className="text-dark fw-bolder text-hover-primary d-block fs-6">{post.telNum}</a>
                                                            <span className="text-muted fw-bold text-muted d-block fs-7"></span>
                                                        </td>
                                                        <td>
                                                            <a href="#" className="text-dark fw-bolder text-hover-primary d-block fs-6">{post.email}</a>
                                                            <span className="text-muted fw-bold text-muted d-block fs-7"></span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                <a className="btn btn-sm btn-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_offer_a_deal" onClick={() => deleteHandler(post.id)}>Delete</a>
                                                                <a href={`/valid/${post.email}`} className="btn btn-sm btn-primary me-3"  >Approuve</a>

                                                            </div>
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
                        {/*end::Tables Widget 9*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
