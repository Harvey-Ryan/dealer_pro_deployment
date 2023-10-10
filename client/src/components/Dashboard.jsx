import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleDataTable from './VehicleDataTable';
import DealDataTable from './DealDataTable';


const Dashboard = () => {

    return (
        <div>
            <div className='w-80'>
                <VehicleDataTable />
            </div>
            <div>
                <DealDataTable />
            </div>
        </div>
    );
};


export default Dashboard;