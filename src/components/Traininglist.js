import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }


    const deleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete this training?')){
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    setMessage('TRAINING DELETED succesfully!');
                    openSnackbar();
                    fetchTrainings();
                }
                else
                    alert('Something went wrong with customer deletion :(');
            })
            .catch(err => console.error(err))
        }
    }

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const column = [
		{
            headerName: 'Lastname',
            field: 'customer.lastname',
            sortable: true, 
            filter: true
        },
		{
            headerName: 'Firstname',
            field: 'customer.firstname',
            sortable: true, 
            filter: true
        },
        { 
            field: 'date', sortable: true, filter: true, width: 250, 
            cellRenderer: params => { return moment(params.value).format('LL DD-MM')}
        },
        { field: 'duration', sortable: true, filter: true  },
        { field: 'activity', sortable: true, filter: true  },
		{ 
            headerName: '',
            field: 'id',
            width: 100,
            sortable: true, 
            filter: true,
            cellRendererFramework: params => 
			<Button variant="contained" size="small" color="secondary" 
			onClick={() => deleteTraining(params.value)}>Delete
            </Button>
        }

    ]

    return (
        <div className="App">
            <div className="ag-theme-material" style={{ height: 800, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={column}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar 
                open={open}
                message={message}
                autoHideDuration={3000}
                onClose={closeSnackbar}
            />
        </div>
    );
}