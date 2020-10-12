import React from 'react'
import './navigationBar.css'

class NavigationBar extends React.Component {

    render() {
        return(
            <nav className="navbar">

                <div className="navbar-logo">
                    <li className="navbar-title">News Archiver</li>
                </div>

                <ul className="navbar-nav">
                    <li className="nav-item">Acceuil</li>
                    <li className="nav-item">Informations</li>
                </ul>

            </nav>
        )
    }
}

export default NavigationBar