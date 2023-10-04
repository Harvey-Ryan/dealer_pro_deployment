import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from'react-router-dom'
import Dashboard from './components/Dashboard'
import CreateTradesheet from './components/Tradesheet'
import EditTradesheet from './components/EditTradesheet'
import Layout from './components/Layout'
import NotFound from './components/NotFound'




function App() {

  return (
    // <div className="App"> {/* TODO: MAY NEED TO DELETE DIV */}
      <Router>
          <Routes>
            <Route path="/" element={<Layout />} > {/* SETS THE HEADER AND NAV FOR ALL NESTED ROUTES */}
              <Route path="dashboard"> {/* TODO */}
                <Route index element={<Dashboard />} /> {/* TODO */}
              </Route>
              <Route path="tradesheet" >
                <Route index element={<CreateTradesheet />} /> {/* TODO */}
                <Route path=":id" element={<EditTradesheet />} /> {/* TODO */}
              </Route>
              <Route path="*" element={<NotFound />} /> {/* TODO */}
            </Route>
          </Routes>
      </Router>
    // </div>
  );
}

export default App
