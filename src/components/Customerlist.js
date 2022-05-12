import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';

function Customerlist() {
  const [customers, setCustomers] = useState([]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
	fetchCustomers();
	}, []);

  const openSnackBar = () => {
	setOpen(true);
  }

  const closeSnackBar = () => {
	setOpen(false);
  }


	const fetchCustomers = () => {
		fetch('https://customerrest.herokuapp.com/api/customers')
		.then(response => response.json())
		.then(data => setCustomers(data.content))
		.catch(err => console.error(err))
	}

	const deleteCustomer = (url) => {
		if (window.confirm('Are you sure you want to delete this customer?')) {
		fetch(url, { method: 'DELETE' })
		.then(response => {
			if(response.ok)
				fetchCustomers();
			else
				alert('Something went wrong when trying to delete customer. Please try again!')
		})
		.catch(err => console.error(err))
		}
	}

	const addCustomer = (newCustomer) => {
		fetch('https://customerrest.herokuapp.com/api/customers',
		{
		  method: 'POST',
		  body: JSON.stringify(newCustomer),
		  headers: { 'Content-type' : 'application/json' }
		})
		.then(_ => fetchCustomers())
		.then(_ => {
		  setOpen(true);
		})
		.catch(err => console.error(err))  
	  }

  const saveTraining = (newTraining) => {
	fetch('https://customerrest.herokuapp.com/api/trainings', {
	  method: 'POST',
	  body: JSON.stringify(newTraining),
	  headers: { 'Content-type' : 'application/json'  }
	})
	.then(response => {
        if(response.ok) {
          setMessage('Training added');
          openSnackBar();
          fetchCustomers();
        }
        else
          alert('Error');
      })
      .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
          method: 'PUT',
          body: JSON.stringify(customer),
          headers: { 'Content-type' : 'application/json'}
        })
		.then(response => {
			if(response.ok)
				fetchCustomers();
			else
			alert('Update error');
		})
        .catch(err => console.error(err))
      }


	const columns = [
		{ field: 'lastname', filter: true, sortable: true, width: 150 },
		{ field: 'firstname', filter: true, sortable: true, width: 150 },
		{ field: 'streetaddress', filter: true, sortable: true},
		{ field: 'postcode', filter: true, sortable: true, width: 150},
        { field: 'city', filter: true, sortable: true, },
        { field: 'email', filter: true, sortable: true, },
        { field: 'phone', filter: true, sortable: true,},
		{
			headerName: 'EDIT',
			field: 'links.0.href',
			width: 100,
			cellRendererFramework: params => <EditCustomer link={params.value} customer={params.data} updateCustomer={updateCustomer} />
		},
		{
			headerName: '',
        	field: 'links',
			width: 165,
        	cellRendererFramework: params => <AddTraining AddTraining={saveTraining} params={params}/>
		},
		{ 
			headerName: 'Delete',
			field: 'links.0.href', 
			width: 100,
			cellRendererFramework: params => 
				<IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
					<DeleteIcon />
				</IconButton>,
				
		}
	]

  return (
	  <div>
		  <AddCustomer  addCustomer={addCustomer}/>
		<div className='ag-theme-material' style={{ height: 800, width: '90%', margin: 'auto'}}>
			<AgGridReact 
				rowData={customers}
				columnDefs={columns}
				pagination={true}
				paginationPageSize={10}
				floatingFilter={true}
				suppressCellSelection={true}/>
		</div>
		<Snackbar
            open={open}
            message={message}
            autoHideDuration={3000}
            onClose={closeSnackBar}/>
	  </div>
  );
}

export default Customerlist;