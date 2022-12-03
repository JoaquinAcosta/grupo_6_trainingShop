import React from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {
    return (
        <ul
            className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            <Link className="sidebar-brand " to="/">
                <div className="sidebar-brand-icon">
                    <img
                        className="w-100"
                        src="/images/logo-mercado-liebre.svg"
                        alt="Mercado Liebre"
                    />
                </div>
            </Link>

            <hr className="sidebar-divider mb-0 mt-4" />

            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Actions</div>

            <li className="nav-item">
                <Link className="nav-link collapsed" to="/products">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Productos</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/users">
                    <i className="fas fa-users"></i>
                    <span>Usuarios</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/categories">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Categorias</span>
                </Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    );
};
