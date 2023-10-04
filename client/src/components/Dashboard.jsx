import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleDataTable from './VehicleDataTable';


const Dashboard = () => {
    
    return (
        <div className='w-80'>
            <VehicleDataTable />
        </div>
    );
    };


export default Dashboard;