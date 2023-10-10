
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './tableTheme.jsx';
import CustomLoader from './CustomLoader';
import format from 'date-fns/format';
import { useData } from './context/DataContext.jsx';



const DealDataTable = ({ expandableRows }) => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);
    const { state, dispatch } = useData();

    // Fetch Deal data
    useEffect(() => {
        // GET DEAL DATA
        const fetchDealData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/deal');
                // SORT BY NEWEST TO OLDEST
                const sortedData = response.data.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                dispatch({ type: 'UPDATE_DEALS', payload: sortedData });
                setDeals(sortedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching deal data:', error);
                setLoading(false);
            }
        };
        fetchDealData();
    }, [dispatch]);

    // Fetch vehicle data by ID
    const fetchVehicleDataById = async (vehicleId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/vehicle/${vehicleId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching vehicle data:', error);
            return null;
        }
    };

    // DELETE DEAL
    const handleDelete = async (id) => {
        try {
            // CONFIRM DELETION
            const confirmDelete = window.confirm('Are you sure you want to delete this Trade?');

            if (!confirmDelete) {
                // IF USER CANCELS DELETION
                return;
            }

            await axios.delete(`http://localhost:8000/api/deal/${id}`);
            console.log('Item deleted');

            // CLOSE EXPANDED ROW
            if (expandedRows.includes(id)) {
                const updatedExpandedRows = expandedRows.filter((rowId) => rowId !== id);
                setExpandedRows(updatedExpandedRows);
            }
            const response = await axios.get('http://localhost:8000/api/deal');
            setDeals(response.data);
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
            // selector: row => row.createdAt,
            striped: true,
            selector: (row) => format(new Date(row.createdAt), 'MM/dd/yy'),
        },
        {
            name: 'Description',
            selector: 'description',
            selector: row => row.description,
            striped: true,
        },
        {
            name: 'New/Used',
            selector: 'newUsed',
            selector: row => row.newUsed,
            striped: true,
        },
        {
            name: 'Sales Person',
            selector: 'salesPerson',
            sortable: true,
            selector: row => row.salesPerson,
            striped: true,
        },
        {
            name: 'Age',
            selector: 'age',
            selector: row => row.age,
            striped: true,
        },
        // {
        //     name: 'We Owe',
        //     selector: 'weOwe',
        //     selector: (row) => {
        //         const weOwe = parseInt(row.weOwe);
        //         if (!isNaN(weOwe)) {
        //             return weOwe.toLocaleString('en-US', {
        //                 style: 'currency',
        //                 currency: 'USD',
        //                 minimumFractionDigits: 0,
        //                 maximumFractionDigits: 2,
        //             });
        //         } else {
        //             return 'N/A';
        //         }
        //     },
        //     striped: true,
        // },
        // {
        //     name: 'Driver Fee',
        //     selector: 'driverFee',
        //     selector: (row) => {
        //         const driverFee = parseInt(row.driverFee);
        //         if (!isNaN(driverFee)) {
        //             return driverFee.toLocaleString('en-US', {
        //                 style: 'currency',
        //                 currency: 'USD',
        //                 minimumFractionDigits: 0,
        //                 maximumFractionDigits: 2,
        //             });
        //         } else {
        //             return 'N/A';
        //         }
        //     },
        //     striped: true,
        // },
        {
            name: 'Profit After',
            selector: 'profitAfter',
            sortable: true,
            selector: (row) => {
                const profitAfter = parseInt(row.profitAfter);
                if (!isNaN(profitAfter)) {
                    return profitAfter.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                    });
                } else {
                    return 'N/A';
                }
            },
            striped: true,
        },
        // {
        //     name: 'Hold Back',
        //     selector: 'holdBack',
        //     selector: (row) => {
        //         const holdBack = parseInt(row.holdBack);
        //         if (!isNaN(holdBack)) {
        //             return holdBack.toLocaleString('en-US', {
        //                 style: 'currency',
        //                 currency: 'USD',
        //                 minimumFractionDigits: 0,
        //                 maximumFractionDigits: 2,
        //             });
        //         } else {
        //             return 'N/A';
        //         }
        //     },
        //     striped: true,
        // },
        // {
        //     name: 'FI Reserve',
        //     selector: 'financeReserve',
        //     selector: (row) => {
        //         const financeReserve = parseInt(row.financeReserve);
        //         if (!isNaN(financeReserve)) {
        //             return financeReserve.toLocaleString('en-US', {
        //                 style: 'currency',
        //                 currency: 'USD',
        //                 minimumFractionDigits: 0,
        //                 maximumFractionDigits: 2,
        //             });
        //         } else {
        //             return 'N/A';
        //         }
        //     },
        //     striped: true,
        // },
        // {
        //     name: 'VSC & GAP',
        //     selector: 'warrantyGap',
        //     selector: (row) => {
        //         const warrantyGap = parseInt(row.warrantyGap);
        //         if (!isNaN(warrantyGap)) {
        //             return warrantyGap.toLocaleString('en-US', {
        //                 style: 'currency',
        //                 currency: 'USD',
        //                 minimumFractionDigits: 0,
        //                 maximumFractionDigits: 2,
        //             });
        //         } else {
        //             return 'N/A';
        //         }
        //     },
        //     striped: true,
        // },
        // {
        //     name: 'ID / Etch',
        //     selector: 'idTheftEtch',
        //     selector: (row) => {
        //         const idTheftEtch = parseInt(row.idTheftEtch);
        //         if (!isNaN(idTheftEtch)) {
        //             return idTheftEtch.toLocaleString('en-US', {
        //                 style: 'currency',
        //                 currency: 'USD',
        //                 minimumFractionDigits: 0,
        //                 maximumFractionDigits: 2,
        //             });
        //         } else {
        //             return 'N/A';
        //         }
        //     },
        //     striped: true,
        // },
        // {
        //     name: 'Doc Fee',
        //     selector: 'docFee',
        //     selector: (row) => {
        //         const docFee = parseInt(row.docFee);
        //         if (!isNaN(docFee)) {
        //             return docFee.toLocaleString('en-US', {
        //                 style: 'currency',
        //                 currency: 'USD',
        //                 minimumFractionDigits: 0,
        //                 maximumFractionDigits: 2,
        //             });
        //         } else {
        //             return 'N/A';
        //         }
        //     },
        //     striped: true,
        // },
        {
            name: 'Total',
            selector: 'total',
            sortable: true,
            striped: true,
            selector: (row) => {
                const profitAfter = parseFloat(row.profitAfter) || 0;
                const holdBack = parseFloat(row.holdBack) || 0;
                const financeReserve = parseFloat(row.financeReserve) || 0;
                const warrantyGap = parseFloat(row.warrantyGap) || 0;
                const idTheftEtch = parseFloat(row.idTheftEtch) || 0;
                const docFee = parseFloat(row.docFee) || 0;

                const total = profitAfter + holdBack + financeReserve + warrantyGap + idTheftEtch + docFee;

                // Format the total
                return `$${total.toFixed(2)}`;
            },
        },
        {
            name: 'Commission',
            selector: 'commission',
            sortable: true,
            selector: (row) => {
                const commission = parseInt(row.commission);
                if (!isNaN(commission)) {
                    return commission.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                    });
                } else {
                    return 'N/A';
                }
            },
            striped: true,
        },
        {
            name: 'Trade',
            selector: 'tradeInVehicles',
            selector: (row) => row.tradeInVehicles,
            striped: true,
            responsive: true,
            cell: (row) => {
                const [tradeInfo, setTradeInfo] = useState(null);
                const [loading, setLoading] = useState(false);
                const [tradeId, setTradeId] = useState(null); // Add a state variable for tradeId
        
                useEffect(() => {
                    if (Array.isArray(row.tradeInVehicles) && row.tradeInVehicles.length > 0) {
                        setLoading(true);
                        Promise.all(
                            row.tradeInVehicles.map(async (tradeId) => {
                                try {
                                    const response = await axios.get(`http://localhost:8000/api/vehicle/${tradeId}`);
                                    const vehicleData = response.data;
                                    if (vehicleData && vehicleData.year && vehicleData.make && vehicleData.model) {
                                        console.log("###############################");
                                        console.log("Vehicle Data: ", vehicleData);
                                        // Set tradeId here
                                        setTradeId(tradeId);
                                        return `${vehicleData.year} \n ${vehicleData.make} \n ${vehicleData.model}`;
                                    } else {
                                        return 'NO TRADE';
                                    }
                                } catch (error) {
                                    console.error('Error fetching vehicle data:', error);
                                    return 'NO TRADE';
                                }
                            })
                        )
                        .then((resolvedTradeInfo) => {
                            setTradeInfo(resolvedTradeInfo.join('\n'));
                            setLoading(false);
                        });
                    } else {
                        setTradeInfo('NO TRADE');
                    }
                }, [row.tradeInVehicles]);
        
                if (loading) {
                    return <CustomLoader />;
                }
                console.log("###############################");
                console.log("Trade Info: ", tradeInfo);
                
                // Use tradeId in the <a> tag
                return tradeId ? (
                    <div>
                        <a href={`/tradesheet/${tradeId}`}>{tradeInfo}</a>
                    </div>
                ) : tradeInfo;
            },
        },
        {
            name: 'Bank',
            selector: 'purchaseType',
            selector: row => row.purchaseType,
            striped: true,
        },
        {
            name: 'Manager',
            selector: 'dealManager',
            sortable: true,
            selector: row => row.dealManager,
            striped: true,
        }
    ];

    // ADD EXPANDED COLUMNS WITH COMMENTS AND EDIT/DELETE BUTTONS
    const ExpandedComponent = ({ data }) => (
        <div className='p-4 bg-light'>
            <p>Comments: {data.comments}</p>
            <div className='w-25 d-flex justify-content-around'>
                {/* TODO: EDIT DEAL FORM */}
                <a href='#' className='btn btn-primary' disabled>Edit</a>
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

    const data = deals;
    return (
        <div className='d-flex mt-5'>
            <div className='d-flex flex-column container'>
                <h3 className="d-flex">Recent Deals:</h3>
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

export default DealDataTable;
