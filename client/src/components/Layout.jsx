
import React from 'react'
import Header from './Header'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import '../App.css'

const Layout = () => {
    return (
        <div className="App">
            <Nav />
            <Outlet />
        </div>
    )
}

export default Layout
