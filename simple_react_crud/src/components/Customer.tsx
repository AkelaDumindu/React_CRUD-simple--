import React, { useEffect, useState } from "react";
import {Modal} from "react-bootstrap";
import AxiosInstance  from '../config/axiosInstance'; 

interface Customer {

    _id:string,
    name:string,
    address:string,
    salary:number
}

const Customer:React.FC= ()=> {


    const [customers, setCustomers] = useState<Customer[]>([]);
    const [modalState, setModalState] = useState<boolean>(false);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [selectedId, setSelectedId] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');
    const [updateSalary, setUpdateSalary] = useState<number | ''>('');



    useEffect(()=>{
        findAllCustomers();
    }, []);


    const updateCustomer = async ()=>{
        
        
        try {
            const response = await AxiosInstance.put('/customers/update-customer/'+selectedId, {
                name:updateName, address:updateAddress, salary:updateSalary
            });
    
            
           
            setModalState(false);
            findAllCustomers();
            
        } catch (error) {
            console.log(error);
            
            
        }

    }
    



    const findAllCustomers = async ()=>{
        const response = await AxiosInstance.get('/customers/find-all-customer');
        // const response = await axios.get('/customers/find-all-customer?searchText=&page=1&size=10');
        setCustomers(response.data.data);
        
        
    }

    const deleteCustomer = async (id: string)=>{
        const response = await AxiosInstance.delete('/customers/delete-by-id/'+id);

        findAllCustomers();
        
    }

    const loadModal = async(id:string)=>{
        const customer = await AxiosInstance.get('/customers/find-customer/'+id);
        setSelectedId(customer.data.data._id);
        setUpdateName(customer.data.data.name);
        setUpdateAddress(customer.data.data.address);
        setUpdateSalary(parseFloat(customer.data.data.salary));
        setModalState(true);
        
    }


    const saveCustomer = async ()=>{
        
        try {
            const response = await AxiosInstance.post('/customers/save-customer', {
                name, address, salary
            });
    
            console.log(response);
            setName('');
            setAddress('');
            setSalary('');
            
        } catch (error) {
            console.log(error);
            
            
        }

        
        
        
    }

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                        <label htmlFor="customerName">Customer name</label>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" id="customerName" />
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                            <label htmlFor="customerAddress">Customer Address</label>
                            <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" id="customerAddress" />
                        </div>
                    </div>
                <div className="col-12 col-sm-6 col-md-4">
                <div className="form-group">
                            <label htmlFor="customerName">Customer Salary</label>
                            <input value={salary} onChange={(e)=>{setSalary(e.target.value==''?'':parseFloat(e.target.value))}} type="number" className="form-control" id="customerSalary" />
                        </div>
                    </div>
            </div>
                <br />
            <div className="row">
            <div className="col-12">
                <button onClick={saveCustomer} className="btn btn-primary col-12">Save Customer</button>
            </div>
            </div>

            
            <hr />

            <div className="row">
                <div className="col-12">
                    <form className="col-12">
                        <input type="search" className="form-control" placeholder="search customer here" />
                    </form>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-12">
                    <table className="table table-hover table-border">
                        <thead>
                        <tr>
                            <th>#Id</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Delete Option</th>
                            <th>Update Option</th>  
                            
                        </tr>
                        </thead>

                        <tbody>

                            {customers.map((customer, index)=>
                            <tr key={index}>
                            <td>#{index}</td>
                            <td> {customer.name} </td>
                            <td> {customer.address} </td>
                            <td> {customer.salary} </td>
                            <td>
                                <button 
                                onClick={()=>{
                                    if(confirm('Are you sure')){
                                        deleteCustomer(customer._id)
                                    }
                                }}
                                className="btn btn-outline-danger btn-sm">Delete</button>
                            </td>
                            <td>
                                <button 
                                onClick={()=>{
                                    loadModal(customer._id);
                                }}
                                className="btn btn-outline-success btn-sm">Update</button>
                            </td>
                        </tr>
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


            
            

{/************************************************* */}

    <Modal show={modalState}>
        div
                <div className="p-4">
                    <h2>Update Customer</h2>
                    <hr />


                

                <div className="col-12">
                    <div className="form-group">
                        <input
                        onChange={(e)=>{setUpdateName(e.target.value)}}
                         type="text" 
                         defaultValue={updateName} className="form-control" />
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <div className="form-group">
                        <input 
                        onChange={(e)=>{setUpdateAddress(e.target.value)}}
                        type="text" defaultValue={updateAddress} className="form-control" />
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <div className="form-group">
                        <input 
                        onChange={(e)=>{setUpdateSalary(e.target.value==''?'':parseFloat(e.target.value))}}
                        type="text" 
                        defaultValue={updateSalary} className="form-control" />
                    </div>
                </div>
                <br />
                

                <div className="col-12">
                    <button onClick={updateCustomer} type="button" className="btn btn-success col-12">Update Customer</button>
                    <br />
                    <br />
                    <button type="button" className="btn btn-secondary col-12" onClick={()=>setModalState(false)}>Close Modal</button>
                </div>
                
                </div>

    </Modal>       
{/************************************************* */}        
            </>
    )
    
}

export default Customer;