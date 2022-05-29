import React, { Component } from 'react'

import { Outlet, Link ,useNavigate} from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate()
    return (

        <div id="kt_header" style={{}} className="header align-items-stretch">
            {/*begin::Container*/}
            <div className="container-fluid d-flex align-items-stretch justify-content-between">

                <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                    {/*begin::Navbar*/}
                    <div className="d-flex align-items-stretch" id="kt_header_nav"><div className="header-menu align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_header_menu_mobile_toggle" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}" style={{}}>
                        {/*begin::Menu*/}
                        <div className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch" id="#kt_header_menu" data-kt-menu="true">
                            <div className="menu-item me-lg-1">
                                <a className="menu-link active py-3" href="/">
                                    <span className="menu-title">Home</span>
                                </a>
                            </div>
                            <div className="menu-item menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <a className="menu-link active py-3" href="/Tdegree">
                                        <span className="menu-title">Espace Admin</span>
                                    </a>
                                </span>

                            </div>
                            <div className="menu-item menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <a className="menu-link active py-3" href="/signUp">
                                        <span className="menu-title">Espace Recruteur</span>
                                    </a>
                                </span>

                            </div>
                            <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <span className="menu-title">Aide</span>
                                    <span className="menu-arrow d-lg-none" />
                                </span>
                            </div>
                            <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <button style={{marginLeft:500}} onClick={()=>{
                                        localStorage.removeItem("collab")
                                        navigate("/auth")
                                    }}> Se déconnecter </button>
                                    <span className="menu-arrow d-lg-none" />
                                </span>
                            </div>
                        </div>
                        {/*begin::Menu wrapper*/}
                        {/*end::Menu wrapper*/}
                    </div>
                        {/*end::Navbar*/}
                        {/*begin::Topbar*/}

                        {/*end::Topbar*/}
                    </div>
                    {/*end::Wrapper*/}
                </div>
                {/*end::Container*/}
            </div>
        </div>

    )
}