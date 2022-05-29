import './App.css';
import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Degree from './view/degree/Add';
import Dispo from './view/dispo/Add';
import Experience from './view/experience/Add';
import Jcat from './view/jobCat/Add';
import AjouterOffer from './view/jobOfferList/Add';
import Home from './view/home';
import Guard from './components/guard';
import TableDegree from './view/degree/tableDegree';
import TableDispo from './view/dispo/tableDispo';
import TableExp from './view/experience/tableExp';
import TableJcat from './view/jobCat/tableJcat';
import OfferList from './view/jobOfferList/liste';
import EditDegree from './view/degree/edit';
import EditDispo from './view/dispo/edit';
import EditExperience from './view/experience/edit';
import EditJcat from './view/jobCat/edit';
import EditOffer from './view/jobOfferList/edit';
import OffreDetails from './view/home/details';
import Candidature from './view/candidature/Add';
import TableCandid from './view/candidature/tableCandid';
import Category from './view/category/Add';
import EditCategory from './view/category/edit';
import TableCategory from './view/category/table';
import TableNiveau from './view/niveaux/table';
import Levels from './view/niveaux/Add';
import EditNiveau from './view/niveaux/edit';
import KeyCloud from './view/keycloud/Add';
import TableKeyCloud from './view/keycloud/table';
import EditKeyCloud from './view/keycloud/edit';
import FileUpload from './view/candidature/links/FileUpload';
import SignUp from './authentification/sign-up/signup';
import RH from './authentification/recruteurs';
import Valid from './authentification/confirmations/confirm';
import ValidRH from './authentification/confirmations/listconfirm'
import Logins from './view/login';
import Quiz from "./view/quiz/Quiz"
import ListLibrary from "./view/createQuiz/libraryList"

import { createContext, useState, useEffect } from 'react'





export const UserContext = createContext()
function App() {
  const navigate = useNavigate()
  const [candidat, setCandidat] = useState(null)
  const [userData, setUserData] = useState({
    tocken: undefined,
    collab: undefined,
  })

  useEffect(()=>{
    const collab = JSON.parse(localStorage.getItem("collab"))
    setUserData({...userData,collab})
    console.log(userData)
  },[])
  // useEffect(()=>{
  //   if(window.location.pathname !=="/auth"&&window.location.pathname !=="/"&&window.location.pathname !=="/quiz"&&window.location.pathname !=="/postuler")
  //     if(!localStorage.getItem("collab"))
  //     navigate("/auth")
  // },[window.location.pathname])
  return (
    <div style={{height:"100vh",width:"100vw"}}>
      <UserContext.Provider value={{ userData, setUserData }}>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/AddOffer" element={<AjouterOffer />} />
          <Route exact path="/OfferList" element={<OfferList />} />
          <Route exact path="/degree" element={<Degree />} />
          <Route exact path="/dispo" element={<Dispo />} />
          <Route exact path="/jcat" element={<Jcat />} />
          <Route exact path="/auth" element={<Logins />} />
          <Route exact path="/exp" element={<Experience />} />
          <Route exact path="/Tdegree" element={<TableDegree />} />
          <Route exact path="/Tdispo" element={<TableDispo />} />
          <Route exact path="/Texp" element={<TableExp />} />
          <Route exact path="/TJcat" element={<TableJcat />} />
          <Route exact path="/editDegree/:id" element={<EditDegree />} />
          <Route exact path='/editDispo/:id' element={<EditDispo />} />
          <Route exact path='/editExp/:id' element={<EditExperience />} />
          <Route exact path='/editjcat/:id' element={<EditJcat />} />
          <Route exact path='/editoffre/:id' element={<EditOffer />} />
          <Route exact path='/detailsOffre/:id' element={<OffreDetails />} />
          <Route exact path='/postuler' element={<Candidature setCandidat = {setCandidat} />} />
          <Route exact path='/candidatlist' element={<TableCandid />} />
          <Route exact path='/cateogry' element={<Category />} />
          <Route exact path='/editCategory/:id' element={<EditCategory />} />
          <Route exact path='/categoryList' element={<TableCategory />} />
          <Route exact path='/Tlevels' element={<TableNiveau />} />
          <Route exact path='/levels' element={<Levels />} />
          <Route exact path='/editLevels/:id' element={<EditNiveau />} />
          <Route exact path='/keyCloud' element={<KeyCloud />} />
          <Route exact path='/Tkeycloud' element={<TableKeyCloud />} />
          <Route exact path='/editKeycloud/:id' element={<EditKeyCloud />} />
          <Route exact path='/CV' element={<Guard component={<FileUpload />} roles={[2]} />} />
          <Route exact path='/signUp' element={<SignUp />} />
          <Route exact path='/rh' element={<RH />} />
          <Route exact path='/valid/:email' element={<Valid/>}/>
          <Route exact path='/validrh' element={<ValidRH/>}/>
          <Route exact path='/quiz' element={<Quiz candidat={candidat}/>}/>
          <Route exact path='/listLibrary' element={<ListLibrary />}/>
          
        </Routes>

      </UserContext.Provider>
    </div>
  );
}

export default App;
