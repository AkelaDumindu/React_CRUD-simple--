import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance  from '../config/axiosInstance';

const Login:React.FC= ()=> {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async ()=>{
        
        try {
            const response = await AxiosInstance.post('/v1/users/login', {
               email, password
            });
    
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate()+2);

            const cookieValue=encodeURIComponent('token')+'='
                +encodeURIComponent(response.data)+'; expires='+expirationDate.toUTCString()+'; path=/';
            document.cookie = cookieValue;

            console.log(response.data);
            
            setEmail('');
            setPassword('');
            
        } catch (error) {
            console.log(error);
            
            
        }
        
    }

    return(
        <>
        <br />
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e)=>{
                            setEmail(e.target.value)
                        }} type="email" className="form-control" placeholder="email here" />
                    </div>
                </div>
                <div className="col-6">
                <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e)=>{
                            setPassword(e.target.value)
                        }} type="password" className="form-control" placeholder="password here" />
                    </div>  
                </div>
                <div className="col-12">
                    <br />
                    <button onClick={(e)=>{
                        login();
                    }} className="btn btn-primary col-12">Login</button>

                    <br /><br />

                    <Link to="/Signup" className="btn btn-outline-dark col-12">Sign up</Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login;