import React, { Component, useState, useEffect } from 'react'
import Asidebar from '../../components/aside-bar/asidebar';
import InfoRec from '../../components/info/infoRec';
import './index.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from '../../components/nav-bar/navbar';
const baseURL = "http://localhost:5000/offreGetAll";

export default function Home() {
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
                <Navbar />
            </div>

            <div className='Right'>

                <div className='cardCenter'>
                    {posts.map((post) => (
                        <div className="comCenter">
                            {/*begin::Card*/}
                            <a href={`/detailsOffre/${post.id}`} className="card border border-2 border-gray-300 border-hover">
                                {/*begin::Card header*/}
                                <div className="card-header border-0 pt-9">
                                    {/*begin::Card Title*/}
                                    <div className="card-title m-0">
                                        {/*begin::Avatar*/}
                                        <div className="symbol symbol-50px w-50px bg-light">
                                            <img src="assets/media/svg/brand-logos/plurk.svg" alt="image" className="p-3" />
                                        </div>
                                        {/*end::Avatar*/}
                                    </div>
                                    {/*end::Car Title*/}
                                    {/*begin::Card toolbar*/}
                                    {/*end::Card toolbar*/}
                                </div>
                                {/*end:: Card header*/}
                                {/*begin:: Card body*/}
                                <div className="card-body p-9">
                                    {/*begin::Name*/}
                                    <div className="fs-3 fw-bolder text-dark">{post.titre}</div>
                                    {/*end::Name*/}
                                    {/*begin::Description*/}
                                    <p className="text-gray-400 fw-bold fs-5 mt-1 mb-7" ><p className='text'>{post.description}</p></p>
                                    {/*end::Description*/}
                                    {/*begin::Info*/}
                                    <div className="d-flex flex-wrap mb-5">
                                        {/*begin::Budget*/}
                                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
                                            <div className="fs-6 text-gray-800 fw-bolder">{post.salaireMin}Dt</div>
                                            <div className="fw-bold text-gray-400">Salaire Minimal</div>
                                        </div>
                                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
                                            <div className="fs-6 text-gray-800 fw-bolder">{post.salaireMax}Dt</div>
                                            <div className="fw-bold text-gray-400">Salaire Maximal</div>
                                        </div>
                                        {/*end::Budget*/}
                                    </div>
                                    <div className="d-flex flex-wrap mb-5">
                                        {/*begin::Due*/}
                                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
                                            <div className="fs-6 text-gray-800 fw-bolder">{post.dateDebut}</div>
                                            <div className="fw-bold text-gray-400">Date Début</div>
                                        </div>
                                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
                                            <div className="fs-6 text-gray-800 fw-bolder">{post.dateFin}</div>
                                            <div className="fw-bold text-gray-400">Date Fin</div>
                                        </div>
                                        {/*end::Due*/}
                                    </div>
                                    {/*end::Info*/}
                                    {/*begin::Progress*/}

                                    {/*end::Progress*/}

                                </div>
                                {/*end:: Card body*/}
                            </a>
                            {/*end::Card*/}
                        </div>
                    ))}
                    <div className="comCenter">
                        <div className="card-header border-0 pt-9">
                            {/*begin::Card Title*/}
                            <div className="card-title m-0">
                                {/*begin::Avatar*/}
                                <div className="symbol symbol-50px  bg-light">
                                    <h1>Aucune Résultat</h1>
                                </div>
                                {/*end::Avatar*/}
                            </div>
                            {/*end::Car Title*/}
                            {/*begin::Card toolbar*/}

                            {/*end::Card toolbar*/}
                        </div>

                    </div>
                </div>







            </div>
        </div>
    )
}
