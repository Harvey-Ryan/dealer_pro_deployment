
import React from 'react'
import Header from './Header'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Layout = () => {
    return (
        <div className="App">
            <Nav />
            <div className='m-5'>
            <Outlet />
            </div>
        </div>
    )
}

export default Layout
