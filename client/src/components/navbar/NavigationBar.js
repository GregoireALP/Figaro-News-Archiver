import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import './navigationBar.css'

class NavigationBar extends React.Component {

    render() {
        return (
            <nav className="navbar">

                <div className="navbar-logo">
                    <li className="navbar-title">News Archiver</li>
                </div>

                <ul className="navbar-nav">
                    <a href="/" className="nav-item">Acceuil</a>
                    <a href="/about" className="nav-item">Informations</a>
                </ul>

            </nav>
        )
    }
}

export default NavigationBar