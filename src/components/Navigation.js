import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../img/c_logo.svg';

function Navigation() {
    return (
        <div className="card">
            <div className="navigation">
                <nav className="navbar navbar-light navbar-expand bg-white">
                    <div className="container">
                        <NavLink className="navbar-brand" to="/">
                            <img className="main-logo" src={logo} alt=""/>
                            Кредитный конвейер
                        </NavLink>
                        <div>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">
                                        Заявки
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/preliminary">
                                        Несозданные заявки
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/posReports">
                                        Отчеты POS
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navigation;