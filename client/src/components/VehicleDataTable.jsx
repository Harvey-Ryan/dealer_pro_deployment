
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './tableTheme.jsx';
import CustomLoader from './CustomLoader';
import format from 'date-fns/format';



const VehicleDataTable = ({ expandableRows }) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        // GET VEHICLE DATA
        const fetchVehicleData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/vehicle');
                // SORT BY NEWEST TO OLDEST
                const sortedData = response.data.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setVehicles(sortedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
                setLoading(false);
            }
        };
        fetchVehicleData();
    }, []);

    // DELETE VEHICLE
    const handleDelete = async (id) => {
        try {
            // CONFIRM DELETION
            const confirmDelete = window.confirm('Are you sure you want to delete this Trade?');

            if (!confirmDelete) {
                // IF USER CANCELS DELETION
                return;
            }

            await axios.delete(`http://localhost:8000/api/vehicle/${id}`);
            console.log('Item deleted');

            // CLOSE EXPANDED ROW
            if (expandedRows.includes(id)) {
                // setExpandedRows(expandedRows.filter(rowId => rowId !== id));
                const updatedExpandedRows = expandedRows.filter((rowId) => rowId !== id);
                setExpandedRows(updatedExpandedRows);
            }

            const response = await axios.get('http://localhost:8000/api/vehicle');
            setVehicles(response.data);
            console.log('Data refreshed:', response.data);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // SET DESIRED COLUMNS
    const columns = [
        {
            name: 'Date',
            selector: 'createdAt',
            sortable: true,
            selector: row => row.createdAt,
            striped: true,
            cell: (row) => format(new Date(row.createdAt), 'MM/dd/yy'),
        },
        {
            name: 'Stock#',
            selector: 'stocknumber',
            sortable: true,
            selector: row => row.stocknumber,
            striped: true,
        },
        {
            name: 'Year',
            selector: 'year',
            sortable: true,
            selector: row => row.year,
            striped: true,
        },
        {
            name: 'Make',
            selector: 'make',
            sortable: true,
            selector: row => row.make,
            striped: true,
        },
        {
            name: 'Model',
            selector: 'model',
            sortable: true,
            selector: row => row.model,
            striped: true,
        },
        {
            name: 'ACV',
            selector: 'bookedat',
            sortable: true,
            selector: (row) => row.bookedat.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            striped: true,
        },
        {
            name: 'Disposition',
            selector: 'retail',
            sortable: true,
            selector: row => row.retail,
            striped: true,
            conditionalCellStyles: [
                {
                    when: (row) => row.retail === 'Retail',
                    style: {
                        backgroundColor: '#A3FFAB', // Softer green
                    },
                },
                {
                    when: (row) => row.retail !== 'Retail',
                    style: {
                        backgroundColor: '#FFA3A3', // Softer red
                    },
                },
            ],
        },
    ];

    // ADD EXPANDED COLUMNS WITH COMMENTS AND EDIT/DELETE BUTTONS
    const ExpandedComponent = ({ data }) => (
        <div className='p-4 bg-light'>
            <p>Comments: {data.comments}</p>
            <div className='w-25 d-flex justify-content-around'>
                <a href={`/tradesheet/${data._id}`} role="button" className="btn btn-info">Edit</a>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(data._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );

    const data = vehicles
    return (
        <div className='d-flex mt-5'>
            <div className='d-flex flex-column container'>
                <h3 className="d-flex">Recent Trades:</h3>
                <div className='container p-0 border border-secondary rounded'>
                    <DataTable
                        columns={columns}
                        data={data}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        expandableRowExpanded={(row) => expandedRows.includes(row._id)}
                        onRowExpandToggled={(state, row) => {
                            if (state) {
                                // If the row is expanded, add its ID to expandedRows
                                setExpandedRows([...expandedRows, row._id]);
                            } else {
                                // If the row is collapsed, remove its ID from expandedRows
                                setExpandedRows(expandedRows.filter((rowId) => rowId !== row._id));
                            }
                        }}
                        progressComponent={<CustomLoader />}
                        theme='custom'
                        pagination
                        defaultSortField="createdAt"
                        defaultSortAsc={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default VehicleDataTable;