import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { createContext, useState,useEffect } from 'react'


const Guard = ({roles,component}) => {
    const [role, setRole] = useState([])
    const [loading, setLoading] = useState(true);

    
    
      useEffect(()=>{
        const collab = JSON.parse(localStorage.getItem("collab"))
        setRole(collab.role ? collab.role : [])
        setLoading(false)
      },[])
      console.log(role)
      if (loading){
          return (<div> </div>)
      }
    return role.some(r => roles.includes(r.id)) ? <>{component}</> : <Navigate to={"/auth"}/> ;
}

export default Guard;